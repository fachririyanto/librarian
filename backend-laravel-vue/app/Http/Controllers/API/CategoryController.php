<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // get all categories
    public function index() {
        $categories = Category::select('id', 'name', 'slug')
            ->orderBy('name', 'asc')
            ->get();

        return response()->json([
            'data' => $categories,
        ]);
    }
}
