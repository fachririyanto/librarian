<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class UserController extends Controller
{
    // render user list
    public function index() {
        $find = request()->input('find', '');

        // list users except admin
        $users = DB::table('users')
            ->select('id', 'name', 'email', 'role', 'status', 'created_at')
            ->where([
                ['name', 'like', '%' . $find . '%'],
                ['id', '!=', 1],
                ['id', '!=', auth()->user()->id]
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('User/Index', [
            'title' => 'Users',
            'find'  => $find,
            'users' => $users,
        ]);
    }

    // render page create user
    public function create() {
        return Inertia::render('User/Create', [
            'title' => 'Add New User',
            'roles' => Role::getStaticRoles(),
        ]);
    }

    // save new user
    public function addUser(Request $request) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'userName'          => 'required',
            'email'             => 'required|unique:users,email',
            'role'              => 'required',
            'password'          => 'required',
            'confirmPassword'   => 'required|same:password',
            'status'            => 'required',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // save user
        $user = new User();
        $user->email            = $input['email'];
        $user->name             = $input['userName'];
        $user->role             = $input['role'];
        $user->remember_token   = Str::random(10);
        $user->status           = $input['status'];
        $user->created_at       = Carbon::now();
        $user->updated_at       = Carbon::now();
        $user->password         = Hash::make($input['password']);
        $user->save();

        // redirect to user list
        return redirect()->back()->with('success', 'User has been added.');
    }

    // render page edit user
    public function edit($id) {
        // get user by id
        $user = User::find($id);

        // check if user not found
        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }

        return Inertia::render('User/Edit', [
            'title' => 'Edit User',
            'user'  => $user,
            'roles' => Role::getStaticRoles(),
        ]);
    }

    // update user
    public function updateUser(Request $request, $id) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'userName'          => 'required',
            'email'             => 'required|unique:users,email,' . $id,
            'role'              => 'required',
            'status'            => 'required',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // if password not empty
        if (!empty($input['password'])) {
            // validate password
            $validator = Validator::make($input, [
                'password'          => 'required',
                'confirmPassword'   => 'required|same:password',
            ]);

            // send error to flash session
            if ($validator->fails()) {
                // get first error message
                $error = $validator->errors()->first();

                return redirect()->back()->with('error', $error);
            }
        }

        // update user
        $user = User::find($id);
        $user->email            = $input['email'];
        $user->name             = $input['userName'];
        $user->role             = $input['role'];
        $user->status           = $input['status'];

        // if password not empty
        if (!empty($input['password'])) {
            $user->password     = Hash::make($input['password']);
        }

        $user->updated_at       = Carbon::now();
        $user->save();

        // redirect to user list
        return redirect()->back()->with('success', 'User has been updated.');
    }

    // delete user
    public function delete($id) {
        if (empty($id)) {
            return redirect()->back()->with('error', 'User not found.');
        }

        // get user by id
        $user = User::find($id);

        // check if user not found
        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }

        // update create_by in all tables
        // set to superadmin
        User::setForeignKeyToSuperadmin([$id]);

        // delete user
        $user->delete();

        // redirect to user list
        return redirect()->back()->with('success', 'User has been deleted.');
    }

    // delete selected users
    public function deleteSelected($ids) {
        if (empty($ids)) {
            return redirect()->back()->with('error', 'Users not found.');
        }

        // convert string to array
        $ids = explode(',', $ids);

        // update create_by in all tables
        // set to superadmin
        User::setForeignKeyToSuperadmin($ids);

        // delete users
        User::whereIn('id', $ids)->delete();

        // redirect to user list
        return redirect()->back()->with('success', 'Users has been deleted.');
    }
}
