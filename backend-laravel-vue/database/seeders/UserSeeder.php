<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id'                => 1,
            'name'              => 'Administrator',
            'email'             => 'admin@local.host',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
            'remember_token'    => Str::random(10),
            'role'              => 'superadmin', // 'superadmin', 'admin', or 'editor'
            'avatar'            => null,
            'status'            => 'active', // 'active' or 'inactive'
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);
    }
}
