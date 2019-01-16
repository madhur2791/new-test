<?php

use Illuminate\Database\Seeder;

class PricingListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pricing_lists')->insert([
            ['size' => '8"x8"', 'price' => 80, 'print_type' => 'Canvas', 'width' => 8, 'height' => 8, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '8"x12"', 'price' => 90, 'print_type' => 'Canvas', 'width' => 8, 'height' => 12, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '16"x16"', 'price' => 160, 'print_type' => 'Canvas', 'width' => 16, 'height' => 16, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '16"x24"', 'price' => 180, 'print_type' => 'Canvas', 'width' => 16, 'height' => 24, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '20"x30"', 'price' => 200, 'print_type' => 'Canvas', 'width' => 20, 'height' => 30, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '24"x24"', 'price' => 240, 'print_type' => 'Canvas', 'width' => 24, 'height' => 24, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '24"x36"', 'price' => 300, 'print_type' => 'Canvas', 'width' => 24, 'height' => 36, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '40"x40"', 'price' => 380, 'print_type' => 'Canvas', 'width' => 40, 'height' => 40, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '32"x48"', 'price' => 400, 'print_type' => 'Canvas', 'width' => 32, 'height' => 48, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '11"x17"', 'price' => 40, 'print_type' => 'Poster', 'width' => 11, 'height' => 17, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '18"x24"', 'price' => 90, 'print_type' => 'Poster', 'width' => 18, 'height' => 24, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => '24"x36"', 'price' => 120, 'print_type' => 'Poster', 'width' => 24, 'height' => 36, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()],
            ['size' => 'All sizes', 'price' => 25, 'print_type' => 'Digital', 'width' => 1, 'height' => 1, 'qr_code_charge' => 10, 'additional_item' => 0, 'created_at' => NOW(), 'updated_at' => NOW()]
        ]);
    }
}
