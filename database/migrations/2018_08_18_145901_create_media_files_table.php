<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediaFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media_files', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('media_id')->unique();
            $table->char('uploaded_file_name', 100);
            $table->unsignedInteger('user_id');
            $table->text('media_file_url');
            $table->text('displayed_media_file_url');
            $table->text('waveform_raw_data_url');
            $table->text('images');
            $table->text('media_file_type');
            $table->boolean('is_cropped')->default(false);
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media_files');
    }
}
