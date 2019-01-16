<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateOrderLineItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_line_items', function (Blueprint $table) {
            $table->dropColumn('print_type');
            $table->dropColumn('size');
            $table->dropColumn('price');
            $table->dropColumn('additional_item');
            $table->dropColumn('width');
            $table->dropColumn('height');
            $table->dropColumn('us_canada_gb_shipping_charges');
            $table->dropColumn('eu_shipping_charges');
            $table->dropColumn('other_shipping_charges');
            $table->dropColumn('qr_code_charge');

            $table->unsignedInteger('price_list_id')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_line_items', function (Blueprint $table) {
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

            $table->dropColumn('price_list_id');
        });
    }
}
