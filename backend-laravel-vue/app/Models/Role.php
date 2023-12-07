<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // get static role
    public static function getStaticRoles() {
        return [
            'admin'         => 'Admin',
            'editor'        => 'Editor',
        ];
    }
}
