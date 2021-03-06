<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePricingListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pricing_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->text('size');
            $table->double('price', 8, 2);
            $table->text('print_type');
            $table->integer('width');
            $table->integer('height');
            $table->double('qr_code_charge', 8, 2);
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
        Schema::dropIfExists('pricing_lists');
    }
}
