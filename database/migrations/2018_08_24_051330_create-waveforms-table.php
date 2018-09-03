<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWaveformsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waveform_styles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('media_file_id');
            $table->uuid('waveform_id')->unique();
            $table->json('images');
            $table->json('waveform_color_pallet');
            $table->json('waveform_style');
            $table->json('waveform_text');
            $table->enum('state', ['EDITING', 'CART', 'ORDERED'])->default('EDITING');
            $table->foreign('media_file_id')->references('id')->on('media_files');
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
        Schema::dropIfExists('waveform_styles');
    }
}
