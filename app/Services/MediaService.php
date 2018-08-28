<?php

namespace App\Services;
use FFMpeg\FFMpeg;
use FFMpeg\Format\Audio\Mp3;
use Illuminate\Support\Facades\Storage;
use App\MediaFile;
use FFMpeg\Coordinate\TimeCode;
use Illuminate\Http\File;
use FFMpeg\FFProbe;

class MediaService
{
    public function __construct() {

    }

    public function computeAndStoreMediaInfo($mediaFilePath, $mediaId, $assetNames, $loggedInUser, $fileOriginalName, $isCropped = false)
    {
        $requiredSamples = 900;
        $sampleRate = 44100;

        $tempFileName = $assetNames['media_file_name'].'.mp3';
        $jsonFileName = $assetNames['json_file_name'].'.json';
        $waveformName = $assetNames['sample_wavefrom_image_name'].'.png';

        $ffmpeg = FFMpeg::create(array(
            'timeout' => 36000,
        ));

        $media = $ffmpeg->open($mediaFilePath);

        $media->save(new Mp3(), $tempFileName);

        $waveform = $media->waveform(640, 120, array('#00FF00'));
        $waveform->save($waveformName);

        $ffprobe = FFProbe::create();
        $duration = $ffprobe->format($tempFileName)->get('duration');
        $zoom = round($sampleRate * $duration / $requiredSamples);

        shell_exec('audiowaveform -i '.$tempFileName.' -o '.$jsonFileName.' -z '.$zoom.' -b 16');

        Storage::disk('s3')->putFileAs(
            'resources/waveform-data',
            new File($jsonFileName),
            $jsonFileName
        );

        Storage::disk('s3')->putFileAs(
            'resources/media-file',
            new File($tempFileName),
            $tempFileName,
            'public'
        );

        Storage::disk('s3')->putFileAs(
            'resources/images/raw_waveform',
            new File($waveformName),
            $waveformName,
            'public'
        );

        Storage::disk('public')->delete($tempFileName);
        Storage::disk('public')->delete($jsonFileName);
        Storage::disk('public')->delete($waveformName);

        $mediaFileObj = MediaFile::updateOrCreate(
            [
                "user_id" => $loggedInUser->id,
                "media_id" => $mediaId,
            ],
            [
                "uploaded_file_name" => $fileOriginalName,
                "media_file_url" => "resources/media-file/".$tempFileName,
                "displayed_media_file_url" => "resources/media-file/".$tempFileName,
                "waveform_raw_data_url" => "resources/waveform-data/".$jsonFileName,
                "images" => json_encode([
                    "sample_waveform_url" => "resources/images/raw_waveform/".$waveformName,
                    "generated_thumbnail" => null,
                ]),
                "media_file_type" => 'AUDIO',
                "is_cropped" => $isCropped
            ]
        );

        return $mediaFileObj;
    }

    public function clipMediaFile($mediaFileName, $startTime, $endTime)
    {
        // dd($mediaFileName, $startTime, $endTime);
        $ffmpeg = FFMpeg::create(array(
            'timeout' => 36000,
        ));

        $media = $ffmpeg->open($mediaFileName);

        $media->filters()->clip(
            TimeCode::fromSeconds($startTime),
            TimeCode::fromSeconds($endTime)
        );

        $media->save(new Mp3(), 'clipped_media_'.$mediaFileName);
        // dd( $startTime,
        //     TimeCode::fromSeconds($startTime),
        //     $endTime,
        //     TimeCode::fromSeconds($endTime)
        // );
        // dd('clippped');
        return 'clipped_media_'.$mediaFileName;
    }

    public function getUploadedMediaFiles($user)
    {
        return MediaFile::where('user_id', $user->id)->orderBy('id', 'desc')->get();
    }
}
