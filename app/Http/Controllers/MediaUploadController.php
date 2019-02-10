<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\MediaFile;
use App\Services\MediaService;

class MediaUploadController extends Controller
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
        $fileName = $request->file('uploaded-media-file')->getClientOriginalName();
        $filePath = $request->file('uploaded-media-file')->store('uploaded_files');

        if ($fileName === 'blob') {
            $fileName = "Recording";
        }

        $mediaFileObj = $this->mediaService->computeAndStoreMediaInfo(
            $filePath,
            $fileName,
            $mediaId,
            $loggedInUser,
            false,
            'VIDEO'
        );
        $this->mediaService->createDefaultStyle($mediaFileObj->id);
        Storage::disk('local')->delete($filePath);
        return response()->json($this->mediaService->getUploadedMediaFiles($request->user()));
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
        $loggedInUser = $request->user();
        $mediaFileObject = MediaFile::where('media_id', $mediaId)->first();


        if($mediaFileObject->media_file_type === "AUDIO") {
            $mediaFileName = $mediaFileObject->media_id.'.mp3';
        } else {
            $mediaFileName = $mediaFileObject->media_id.'.webm';
        }

        Storage::disk('local')->put(
            'uploaded_files/'.$mediaFileName,
            Storage::disk('s3')->get($mediaFileObject->media_file_url)
        );

        $clippedFilePath = $this->mediaService->clipMediaFile(
            $mediaFileName,
            $startTime,
            $endTime,
            $mediaFileObject->media_file_type
        );

        $mediaFileObj = $this->mediaService->computeAndStoreMediaInfo(
            $clippedFilePath,
            $mediaFileObject->uploaded_file_name,
            $mediaId,
            $loggedInUser,
            true,
            $mediaFileObject->media_file_type
        );
        Storage::disk('local')->delete($clippedFilePath);
        return response()->json($this->mediaService->getUploadedMediaFiles($request->user()));
    }

    public function getUploadedMediaFiles(Request $request) {
        return response()->json($this->mediaService->getUploadedMediaFiles($request->user()));
    }

    public function getMediaFileData(Request $request, $mediaId) {
        return response()->json($this->mediaService->getMediaFileData($request->user(), $mediaId));
    }

}
