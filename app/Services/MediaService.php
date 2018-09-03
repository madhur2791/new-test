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
            TimeCode::fromSeconds($endTime),
            TimeCode::fromSeconds($startTime)
        );

        $media->save(new Mp3(), 'clipped_media_'.$mediaFileName);

        return 'clipped_media_'.$mediaFileName;
    }

    public function getUploadedMediaFiles($user)
    {
        return MediaFile::where('user_id', $user->id)->orderBy('id', 'desc')->get();
    }
}
