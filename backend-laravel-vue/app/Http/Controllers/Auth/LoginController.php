<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LoginController extends Controller
{
    // render login page
    public function index() {
        return Inertia::render('Auth/Login', [
            'title' => 'Login',
        ]);
    }

    // do login
    public function login(Request $request) {
        // validate request
        $validator = Validator::make($request->all(), [
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // check if user exists
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            // check user status
            if (auth()->user()->status == 'inactive') {
                auth()->logout();

                return redirect()->back()->with('error', 'Your account is inactive');
            }

            return redirect()->intended('/admin/dashboard');
        }

        return redirect()->back()->with('error', 'Invalid login credentials');
    }

    // do logout
    public function logout() {
        auth()->logout();

        return redirect()->route('login');
    }
}
