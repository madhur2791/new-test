@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div id="root" class="card-header">Dashboard</div>
                <div id="root1" class="card-header">
                    <form action="/api/media-upload" enctype='multipart/form-data' method="post">
                    <input type="file" name="asd" />
                    <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
