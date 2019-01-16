<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShippingChargeGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping_charge_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('shipping_charge_group_id');
            $table->unsignedInteger('pricing_list_id');
            $table->double('shipping_charge', 8, 2);
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
        Schema::dropIfExists('shipping_charge_groups');
    }
}
