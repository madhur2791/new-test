<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePricingListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pricing_lists', function (Blueprint $table) {
            $table->dropColumn('us_canada_gb_shipping_charges');
            $table->dropColumn('eu_shipping_charges');
            $table->dropColumn('other_shipping_charges');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pricing_lists', function (Blueprint $table) {
            $table->double('us_canada_gb_shipping_charges', 8, 2);
            $table->double('eu_shipping_charges', 8, 2);
            $table->double('other_shipping_charges', 8, 2);
        });
    }
}
