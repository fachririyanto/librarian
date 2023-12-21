<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\MemberController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\LoanController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// public routes
Route::middleware('api.key')->prefix('public')->group(function () {
    // category routes
    Route::get('/categories', [CategoryController::class, 'index']);

    // book routes
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/related/{id}', [BookController::class, 'related']);
    Route::get('/books/{id}', [BookController::class, 'detail']);
});

// auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [MemberController::class, 'register']);
    Route::post('/login', [MemberController::class, 'login']);

    Route::middleware('jwt.auth')->group(function () {
        Route::get('/me', [MemberController::class, 'profile']);
        Route::post('/refresh-token', [MemberController::class, 'refreshToken']);
        Route::post('/logout', [MemberController::class, 'logout']);
        Route::post('/logout-all', [MemberController::class, 'logoutAll']);
    });
});

// private routes
Route::middleware('jwt.auth')->prefix('private')->group(function () {
    // profile routes
    Route::post('/update-profile', [MemberController::class, 'updateProfile']);
    Route::post('/change-password', [MemberController::class, 'changePassword']);

    // token routes
    Route::get('/list-tokens', [MemberController::class, 'listTokens']);
    Route::delete('/delete-token/{id}', [MemberController::class, 'deleteToken']);

    // loan books routes
    Route::post('/loan-books', [LoanController::class, 'loanBooks']);
});
