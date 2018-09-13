<?php

namespace App\Services;
use FFMpeg\FFMpeg;
use FFMpeg\Format\Audio\Mp3;
use Illuminate\Support\Facades\Storage;
use App\MediaFile;
use App\WaveformStyle;
use FFMpeg\Coordinate\TimeCode;
use Illuminate\Http\File;
use FFMpeg\FFProbe;

class MediaService
{
    public function __construct() {
        $this->defaultColor = [
            "color_pallet_id" => 1,
            "colors" => ["dbc3d0", "5e0231", "c7a693", "856046"],
            "color_pallet_name" => 'Default',
            "color_option" => "mix",
            "color_diffusion_percentage" => "100"
        ];
        $this->defaultStyle = [
            "waveform_type" => "bars",
            "line_width" => "1",
            "line_spacing" => "0",
            "line_dash_width" => "0",
            "start_angle" => "0",
            "inner_radius" => "50"
        ];
        $this->defaultQrCode = [
            "qr_code_value" => null,
            "vertical_alignment" => 'bottom',
            "horizantal_alignment" => 'left',
            "color" => '000',
            "size" => '100'
        ];
        $this->defaultText = [
            "text" => "",
            "font_family" => "open-sans",
            "font_size" => "14",
            "font_color" => "#fff",
            "text_alignment" => [
                "horizantal" => "bottom",
                "vertical" => "center"
            ]
        ];
    }

    public function computeAndStoreMediaInfo($mediaFilePath, $fileOriginalName, $mediaId, $loggedInUser, $isCropped = false)
    {
        $requiredSamples = 900;
        $sampleRate = 44100;

        $mediaFileName = uniqid('media_file_name'.$loggedInUser->id).'.mp3';
        $jsonFileName = uniqid('json_file_name'.$loggedInUser->id).'.json';

        $ffmpeg = FFMpeg::create(array(
            'timeout' => 36000,
        ));

        $media = $ffmpeg->open($mediaFilePath);

        $media->save(new Mp3(), $mediaFileName);

        $ffprobe = FFProbe::create();
        $duration = $ffprobe->format($mediaFileName)->get('duration');
        $zoom = round($sampleRate * $duration / $requiredSamples);

        shell_exec('audiowaveform -i '.$mediaFileName.' -o '.$jsonFileName.' -z '.$zoom.' -b 16');

        Storage::disk('s3')->putFileAs(
            'resources/waveform-data',
            new File($jsonFileName),
            $jsonFileName
        );

        Storage::disk('s3')->putFileAs(
            'resources/media-file',
            new File($mediaFileName),
            $mediaFileName,
            'public'
        );

        Storage::disk('public')->delete($mediaFileName);
        Storage::disk('public')->delete($jsonFileName);

        $mediaFileObj = MediaFile::updateOrCreate(
            [
                "user_id" => $loggedInUser->id,
                "media_id" => $mediaId,
            ],
            [
                "uploaded_file_name" => $fileOriginalName,
                "media_file_url" => "resources/media-file/".$mediaFileName,
                "displayed_media_file_url" => "resources/media-file/".$mediaFileName,
                "waveform_raw_data_url" => "resources/waveform-data/".$jsonFileName,
                "media_file_type" => 'AUDIO',
                "is_cropped" => $isCropped
            ]
        );

        return $mediaFileObj;
    }

    public function clipMediaFile($mediaFileName, $startTime, $endTime)
    {
        $ffmpeg = FFMpeg::create(array(
            'timeout' => 36000,
        ));

        $media = $ffmpeg->open($mediaFileName);

        $media->filters()->clip(
            TimeCode::fromSeconds($startTime),
            TimeCode::fromSeconds($endTime - $startTime)
        );

        $media->save(new Mp3(), 'clipped_media_'.$mediaFileName);

        return 'clipped_media_'.$mediaFileName;
    }

    public function getUploadedMediaFiles($user)
    {
        return MediaFile::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->with(['currentWaveformStyle' => function ($query) {
                $query->where('state', 'EDITING');
            }])->get();
    }

    public function createDefaultStyle($mediaFileId)
    {
        $existingWaveformStyle = WaveformStyle::
            where('media_file_id', $mediaFileId)
            ->where('state', 'EDITING')
            ->orderBy('id', 'desc')->first();

        if(is_null($existingWaveformStyle)) {
            return
                WaveformStyle::create([
                    "media_file_id" => $mediaFileId,
                    "state" => "EDITING",
                    "waveform_id" => uniqid($mediaFileId),
                    "images" => [],
                    "waveform_color" => $this->defaultColor,
                    "waveform_style" => $this->defaultStyle,
                    "waveform_qr_code" => $this->defaultQrCode,
                    "waveform_text" => $this->defaultText
                ]);
        }

        return $existingWaveformStyle;
    }

    public function getMediaFileData($user, $mediaId) {
        return MediaFile::where('user_id', $user->id)
            ->where('media_id', $mediaId)
            ->with(['currentWaveformStyle' => function ($query) {
                $query->where('state', 'EDITING');
            }])->first();
    }
}
