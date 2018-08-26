<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use FFMpeg\FFMpeg;
// use FFMpeg\Format\Audio\Mp3;
use Illuminate\Support\Facades\Storage;
// use Illuminate\Http\File;
use App\MediaFile;
// use FFMpeg\Coordinate\TimeCode;
use App\Services\MediaService;

class MediaController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->mediaService = new MediaService();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        $loggedInUser = $request->user();
        $mediaId = uniqid($loggedInUser->id);
        $assetNames = [
            'media_file_name' => uniqid('media_file_name'.$loggedInUser->id),
            'json_file_name' => uniqid('json_file_name'.$loggedInUser->id),
            'sample_wavefrom_image_name' => uniqid('sample_wavefrom_image_name'.$loggedInUser->id)
        ];

        $mediaFileObj = $this->mediaService->computeAndStoreMediaInfo(
            $request->file('uploaded-media-file'),
            $mediaId,
            $assetNames,
            $loggedInUser,
            $request->file('uploaded-media-file')->getClientOriginalName()
        );

        return $mediaFileObj;
    }

    public function editMediaFile(Request $request, $mediaId)
    {
        $startTime = $request->input('startTime');
        $endTime = $request->input('endTime');
        if ($endTime - $startTime < 0.98) {
            return [
                'error' => 'Media file length should be atleast 1 second'
            ];
        }
        $mediaFileObject = MediaFile::where('media_id', $mediaId)->first();

        Storage::disk('public')->put(
            $mediaFileObject->media_file_name,
            Storage::disk('s3')->get('resources/media-file/'.$mediaFileObject->media_file_name)
        );

        $clippedFilePath = $this->mediaService->clipMediaFile(
            $mediaFileObject->media_file_name,
            $startTime,
            $endTime
        );
        $assetNames = [
            'media_file_name' => $mediaFileObject->media_file_name,
            'json_file_name' => $mediaFileObject->waveform_raw_data_name,
            'sample_wavefrom_image_name' => $mediaFileObject->images->sample_waveform_name
        ];
        $mediaFileObj = $this->mediaService->computeAndStoreMediaInfo(
            $clippedFilePath,
            $mediaId,
            $request->user(),
            $mediaFileObject->uploaded_file_name
        );

        return $mediaFileObj;
    }

    public function getWaveformData(Request $request, $mediaId) {
        $jsonData = Storage::disk('s3')->get('resources/waveform-data/'.$mediaId.'.json');
         return response()->json(json_decode($jsonData));
    }

    public function getUploadedMediaFiles(Request $request) {
        return response()->json($this->mediaService->getUploadedMediaFiles($request->user()));
    }
}
