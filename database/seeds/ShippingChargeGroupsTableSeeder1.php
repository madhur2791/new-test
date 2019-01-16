<?php

use Illuminate\Database\Seeder;

class ShippingChargeGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shipping_charge_groups')->insert([
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '1', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '2', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '3', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '4', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '5', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '6', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '7', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '8', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '8', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '10', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '11', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '12', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 1, 'pricing_list_id' => '13', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '1', 'shipping_charge' => 10, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '2', 'shipping_charge' => 10, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '3', 'shipping_charge' => 10, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '4', 'shipping_charge' => 20, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '5', 'shipping_charge' => 20, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '6', 'shipping_charge' => 20, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '7', 'shipping_charge' => 30, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '8', 'shipping_charge' => 50, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '8', 'shipping_charge' => 50, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '10', 'shipping_charge' => 5, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '11', 'shipping_charge' => 10, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '12', 'shipping_charge' => 10, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['shipping_charge_group_id'=> 2, 'pricing_list_id' => '13', 'shipping_charge' => 0, 'created_at' => NOW(), 'updated_at' => NOW()]
        ]);
    }
}
