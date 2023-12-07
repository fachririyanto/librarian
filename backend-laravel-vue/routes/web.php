<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookcaseController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['guest'])->group(function () {
    Route::get('/', [LoginController::class, 'index'])->name('login');
    Route::post('/auth/login', [LoginController::class, 'login'])->name('auth/login');
});


/**
 * Admin Routes
 */
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // dashboard routes
    Route::get('/', [DashboardController::class, 'index'])->name('admin');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin/dashboard');

    // books routes
    Route::get('/books', [BookController::class, 'index'])->name('admin/books');
    Route::get('/books/create', [BookController::class, 'create'])->name('admin/books/create');
    Route::post('/books/create', [BookController::class, 'addBook'])->name('admin/books/create/save');
    Route::get('/books/edit/{id}', [BookController::class, 'edit'])->name('admin/books/edit');
    Route::post('/books/edit/{id}', [BookController::class, 'updateBook'])->name('admin/books/edit/save');
    Route::delete('/books/delete/{id}', [BookController::class, 'delete'])->name('admin/books/delete');
    Route::delete('/books/delete-selected/{ids}', [BookController::class, 'deleteSelected'])->name('admin/books/deleteSelected');

    // category routes
    Route::get('/category', [CategoryController::class, 'index'])->name('admin/category');
    Route::get('/category/create', [CategoryController::class, 'create'])->name('admin/category/create');
    Route::post('/category/create', [CategoryController::class, 'addCategory'])->name('admin/category/create/save');
    Route::get('/category/edit/{id}', [CategoryController::class, 'edit'])->name('admin/category/edit');
    Route::post('/category/edit/{id}', [CategoryController::class, 'updateCategory'])->name('admin/category/edit/save');
    Route::delete('/category/delete/{id}', [CategoryController::class, 'delete'])->name('admin/category/delete');
    Route::delete('/category/delete-selected/{ids}', [CategoryController::class, 'deleteSelected'])->name('admin/category/deleteSelected');

    // bookcase routes
    Route::get('/bookcases', [BookcaseController::class, 'index'])->name('admin/bookcases');
    Route::get('/bookcases/create', [BookcaseController::class, 'create'])->name('admin/bookcases/create');
    Route::post('/bookcases/create', [BookcaseController::class, 'addBookcase'])->name('admin/bookcases/create/save');
    Route::get('/bookcases/edit/{id}', [BookcaseController::class, 'edit'])->name('admin/bookcases/edit');
    Route::post('/bookcases/edit/{id}', [BookcaseController::class, 'updateBookcase'])->name('admin/bookcases/edit/save');
    Route::delete('/bookcases/delete/{id}', [BookcaseController::class, 'delete'])->name('admin/bookcases/delete');
    Route::delete('/bookcases/delete-selected/{ids}', [BookcaseController::class, 'deleteSelected'])->name('admin/bookcases/deleteSelected');

    // users routes
    Route::middleware(['admin.role'])->group(function() {
        Route::get('/users', [UserController::class, 'index'])->name('admin/users');
        Route::get('/users/create', [UserController::class, 'create'])->name('admin/users/create');
        Route::post('/users/create', [UserController::class, 'addUser'])->name('admin/users/create/save');
        Route::get('/users/edit/{id}', [UserController::class, 'edit'])->name('admin/users/edit');
        Route::post('/users/edit/{id}', [UserController::class, 'updateUser'])->name('admin/users/edit/save');
        Route::delete('/users/delete/{id}', [UserController::class, 'delete'])->name('admin/users/delete');
        Route::delete('/users/delete-selected/{ids}', [UserController::class, 'deleteSelected'])->name('admin/users/deleteSelected');
    });

    // profile routes
    Route::get('/profile', [ProfileController::class, 'profile'])->name('admin/profile');
    Route::post('/profile', [ProfileController::class, 'updateProfile'])->name('admin/profile/save');

    // change password routes
    Route::get('/change-password', [ProfileController::class, 'changePassword'])->name('admin/change-password');
    Route::put('/change-password', [ProfileController::class, 'updatePassword'])->name('admin/change-password/save');

    // logout route
    Route::post('/logout', [LoginController::class, 'logout'])->name('admin/logout');
});