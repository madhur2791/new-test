<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('order_id');
            $table->text('first_name');
            $table->text('last_name');
            $table->text('email');
            $table->text('phone_number');
            $table->text('address_line_1');
            $table->text('address_line_2');
            $table->text('city');
            $table->text('zipcode');
            $table->text('state');
            $table->text('country');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_addresses');
    }
}
