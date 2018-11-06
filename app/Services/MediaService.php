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
            "qr_code_value" => "https://google.com",
            "vertical_alignment" => 'bottom',
            "horizantal_alignment" => 'right',
            "color" => '000',
            "size" => '100'
        ];
        $this->defaultText = [
            "text" => "",
            "font_family" => "Arial",
            "font_size" => "20",
            "font_color" => "000",
            "vertical_alignment" => 'top',
            "horizantal_alignment" => 'left',
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
            'ffmpeg.binaries' => config('ffmpeg.ffmpeg_binaries'),
            'ffprobe.binaries' => config('ffmpeg.ffprobe_binaries')
        ));

        $media = $ffmpeg->open(storage_path('app').'/'.$mediaFilePath);

        $media->save(new Mp3(), storage_path('app').'/converted_files/'.$mediaFileName);

        $ffprobe = FFProbe::create(array(
            'ffmpeg.binaries' => config('ffmpeg.ffmpeg_binaries'),
            'ffprobe.binaries' => config('ffmpeg.ffprobe_binaries')
        ));
        $duration = $ffprobe->format(storage_path('app').'/converted_files/'.$mediaFileName)->get('duration');
        $zoom = round($sampleRate * $duration / $requiredSamples);

        shell_exec('audiowaveform -i '.storage_path('app').'/converted_files/'.$mediaFileName.' -o '.storage_path('app').'/json_files/'.$jsonFileName.' -z '.$zoom.' -b 16');

        Storage::disk('s3')->putFileAs(
            'resources/waveform-data',
            new File(storage_path('app').'/json_files/'.$jsonFileName),
            $jsonFileName
        );

        Storage::disk('s3')->putFileAs(
            'resources/media-file',
            new File(storage_path('app').'/converted_files/'.$mediaFileName),
            $mediaFileName,
            'public'
        );

        Storage::disk('local')->delete('/converted_files/'.$mediaFileName);
        Storage::disk('local')->delete($mediaFilePath);
        Storage::disk('local')->delete('/json_files/'.$jsonFileName);

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
            'ffmpeg.binaries' => config('ffmpeg.ffmpeg_binaries'),
            'ffprobe.binaries' => config('ffmpeg.ffprobe_binaries')
        ));

        $media = $ffmpeg->open(storage_path('app').'/uploaded_files/'.$mediaFileName);

        $media->filters()->clip(
            TimeCode::fromSeconds($startTime),
            TimeCode::fromSeconds($endTime - $startTime)
        );

        $media->save(new Mp3(), storage_path('app').'/clipped_files/'.$mediaFileName);

        Storage::disk('local')->delete('uploaded_files/'.$mediaFileName);

        return 'clipped_files/'.$mediaFileName;
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
            $waveformId = uniqid($mediaFileId);
            $this->defaultQrCode['qr_code_value'] = env('APP_URL').'/waveform/play-media/'.$waveformId;
            return
                WaveformStyle::create([
                    "media_file_id" => $mediaFileId,
                    "state" => "EDITING",
                    "waveform_id" => $waveformId,
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


    public function updateMediaFileStyle($user, $mediaId, $updatedWaveformStyle) {
        $mediaFileData = $this->getMediaFileData($user, $mediaId);
        if(!is_null($mediaFileData)) {
            $waveformStyle = $mediaFileData->currentWaveformStyle;
            if (array_key_exists('waveform_color', $updatedWaveformStyle)) {
                $waveformStyle->waveform_color = array_replace($waveformStyle->waveform_color, $updatedWaveformStyle['waveform_color']);
            }

            if (array_key_exists('waveform_style', $updatedWaveformStyle)) {
                $waveformStyle->waveform_style = array_replace($waveformStyle->waveform_style, $updatedWaveformStyle['waveform_style']);
            }

            if (array_key_exists('waveform_qr_code', $updatedWaveformStyle)) {
                $waveformStyle->waveform_qr_code = array_replace($waveformStyle->waveform_qr_code, $updatedWaveformStyle['waveform_qr_code']);
            }

            if (array_key_exists('waveform_text', $updatedWaveformStyle)) {
                $waveformStyle->waveform_text = array_replace($waveformStyle->waveform_text, $updatedWaveformStyle['waveform_text']);
            }

            $waveformStyle->save();
        }

        return [];
    }
}
