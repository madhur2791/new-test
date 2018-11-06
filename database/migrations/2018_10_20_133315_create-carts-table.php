<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('waveform_id');
            $table->text('generated_image_url');
            $table->text('print_type');
            $table->text('size');
            $table->double('price', 8, 2);
            $table->double('additional_item', 8, 2);
            $table->integer('width');
            $table->integer('height');
            $table->double('us_canada_gb_shipping_charges', 8, 2);
            $table->double('eu_shipping_charges', 8, 2);
            $table->double('other_shipping_charges', 8, 2);
            $table->double('qr_code_charge', 8, 2);
            $table->unsignedInteger('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
}
