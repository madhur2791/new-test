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
        $mediaFileObj = $this->mediaService->computeAndStoreMediaInfo(
            $filePath,
            $fileName,
            $mediaId,
            $loggedInUser
        );
        $this->mediaService->createDefaultStyle($mediaFileObj->id);
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

        Storage::disk('local')->put(
            'uploaded_files/'.$mediaFileObject->media_id.'.wav',
            Storage::disk('s3')->get($mediaFileObject->media_file_url)
        );

        $clippedFilePath = $this->mediaService->clipMediaFile(
            $mediaFileObject->media_id.'.wav',
            $startTime,
            $endTime
        );

        $mediaFileObj = $this->mediaService->computeAndStoreMediaInfo(
            $clippedFilePath,
            $mediaFileObject->uploaded_file_name,
            $mediaId,
            $loggedInUser,
            true
        );

        return response()->json($this->mediaService->getUploadedMediaFiles($request->user()));
    }

    public function getUploadedMediaFiles(Request $request) {
        return response()->json($this->mediaService->getUploadedMediaFiles($request->user()));
    }

    public function getMediaFileData(Request $request, $mediaId) {
        return response()->json($this->mediaService->getMediaFileData($request->user(), $mediaId));
    }

}
