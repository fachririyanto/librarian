<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Set foreign key to superadmin
     * 
     * @param array<int> $ids
     */
    public function setForeignKeyToSuperadmin($ids) {
        // update create_by in categories table
        // set to superadmin
        DB::table('categories')
            ->whereIn('created_by', $ids)
            ->update(['created_by' => 1]);

        // update create_by in bookcases table
        // set to superadmin
        DB::table('bookcases')
            ->whereIn('created_by', $ids)
            ->update(['created_by' => 1]);

        // update create_by in books table
        // set to superadmin
        DB::table('books')
            ->whereIn('created_by', $ids)
            ->update(['created_by' => 1]);
    }
}
