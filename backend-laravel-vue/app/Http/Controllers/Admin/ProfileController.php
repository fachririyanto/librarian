<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    // render profile page
    public function profile() {
        $profile = auth()->user()->only('id', 'name', 'email', 'avatar');

        return Inertia::render('Profile/Index', [
            'title'     => 'Update Profile',
            'profile'   => [
                'id'        => $profile['id'],
                'name'      => $profile['name'],
                'email'     => $profile['email'],
                'avatar'    => $profile['avatar'],
            ],
        ]);
    }

    // update profile
    public function updateProfile(Request $request) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'email' => 'required|email|unique:users,email,' . auth()->user()->id . ',id',
            'name'  => 'required',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // get profile
        $profile = auth()->user();

        // set avatar path
        $avatar_path = '';

        // delete avatar if user remove avatar
        if (empty($input['avatar_preview']) && empty($input['avatar'])) {
            if (Storage::exists('public/' . $profile->avatar)) {
                Storage::delete('public/' . $profile->avatar);
            }
        }

        // if user not change avatar
        if ($input['avatar_preview'] == ('/storage/' . $input['avatar_old'])) {
            $avatar_path = $input['avatar_old'];
        }

        // upload new avatar
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            // check file size
            if ($avatar->getSize() > 1000000) {
                return redirect()->back()->with('error', 'Avatar file size cannot be more than 1MB.');
            }

            // check file type
            if (!in_array($avatar->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                return redirect()->back()->with('error', 'Avatar file type must be jpg, jpeg, or png.');
            }

            // delete old avatar file
            if (Storage::exists('public/' . $profile->avatar)) {
                Storage::delete('public/' . $profile->avatar);
            }

            // save avatar file
            $upload_dir     = 'avatars';
            $file_name      = $profile->id . '.' . $avatar->getClientOriginalExtension();
            $avatar_path    = $avatar->storeAs($upload_dir, $file_name, 'public');
        }

        // update profile
        $profile->name      = $request->name;
        $profile->email     = $request->email;
        $profile->avatar    = $avatar_path;

        if ($profile->save()) {
            return redirect()->back()->with('success', 'Profile updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Something went wrong. Please try again later.');
        }
    }

    // render change password page
    public function changePassword() {
        return Inertia::render('Profile/ChangePassword', [
            'title' => 'Change Password',
        ]);
    }

    // update password
    public function updatePassword(Request $request) {
        $request->validate([
            'oldPassword'       => 'required',
            'newPassword'       => 'required|min:8',
            'confirmPassword'   => 'required|same:newPassword',
        ]);

        $profile = auth()->user();

        if (Hash::check($request->oldPassword, $profile->password)) {
            $profile->password = Hash::make($request->newPassword);

            if ($profile->save()) {
                return redirect()->back()->with('success', 'Password updated successfully.');
            } else {
                return redirect()->back()->with('error', 'Something went wrong. Please try again later.');
            }
        } else {
            return redirect()->back()->with('error', 'Old password is incorrect.');
        }
    }
}
