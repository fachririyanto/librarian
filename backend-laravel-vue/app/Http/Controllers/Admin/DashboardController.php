<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // render dashboard page
    public function index() {
        return Inertia::render('Dashboard/Index', [
            'title' => 'Dashboard',
        ]);
    }
}
