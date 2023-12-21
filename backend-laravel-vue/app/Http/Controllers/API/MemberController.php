<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Member;
use App\Models\MemberToken;
use Carbon\Carbon;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class MemberController extends Controller
{
    // register new member
    public function register(Request $request) {
        $input = $request->all();

        // validate the request
        $validator = Validator::make($input, [
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|unique:members',
            'password'      => 'required|string|min:8',
            'repassword'    => 'required|string|min:8|same:password',
        ]);

        // send failed response if request is not valid
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return response()->json([
                'code'      => 400,
                'message'   => $error,
                'data'      => [],
            ], 400);
        }

        // create new member
        $member = Member::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'phone'         => $request->phone ?? '',
            'address'       => $request->address ?? '',
            'avatar'        => '',
            'status'        => 'active',
            'created_at'    => Carbon::now(),
            'updated_at'    => Carbon::now(),
        ]);

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Register success',
            'data'      => [
                'email' => $member->email,
            ],
        ]);
    }

    // login member
    public function login(Request $request) {
        $input = $request->all();

        // validate the request
        $validator = Validator::make($input, [
            'email'         => 'required|email',
            'password'      => 'required|string|min:8',
        ]);

        // send failed response if request is not valid
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return response()->json([
                'code'      => 400,
                'message'   => $error,
                'data'      => [],
            ], 400);
        }

        // get member by email
        $member = Member::select(
            'id', 'password', 'status'
        )->where('email', $request->email)->first();

        // check member
        if (!$member) {
            return response()->json([
                'code'      => 400,
                'message'   => 'Email not found',
                'data'      => [],
            ], 400);
        }

        // check member status
        if ($member->status == 'inactive') {
            return response()->json([
                'code'      => 400,
                'message'   => 'Member inactive',
                'data'      => [],
            ], 400);
        }

        // check password
        if (!Hash::check($request->password, $member->password)) {
            return response()->json([
                'code'      => 400,
                'message'   => 'Password not match',
                'data'      => [],
            ], 400);
        }

        // generate access token
        $time_exp = 3600 * 24;

        $payload = [
            'iss'       => 'librarian',
            'sub'       => $member->id,
            'iat'       => time(),
            'exp'       => time() + $time_exp,
        ];

        $access_token = JWT::encode($payload, env('API_JWT_SECRET'), 'HS256');

        // generate refresh token
        $payload = [
            'iss'       => 'librarian',
            'sub'       => $member->id,
            'iat'       => time(),
            'exp'       => time() + ($time_exp * 30),
        ];

        $refresh_token = JWT::encode($payload, env('API_JWT_SECRET'), 'HS256');

        // save token
        $member_token = MemberToken::create([
            'member_id'                 => $member->id,
            'token'                     => $access_token,
            'refresh_token'             => $refresh_token,
            'access_token_invalidated'  => 0,
            'refresh_token_invalidated' => 0,
            'ip_address'                => $request->ip(),
            'user_agent'                => $request->userAgent(),
            'created_at'                => Carbon::now(),
            'updated_at'                => Carbon::now(),
        ]);

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Login success',
            'data'      => [
                'token'         => $access_token,
                'refresh_token' => $refresh_token,
                'duration'      => $time_exp,
            ],
        ]);
    }

    // get refresh token
    public function refreshToken(Request $request) {
        $input = $request->all();

        // validate the request
        $validator = Validator::make($input, [
            'refresh_token' => 'required|string',
        ]);

        // send failed response if request is not valid
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return response()->json([
                'code'      => 400,
                'message'   => $error,
                'data'      => [],
            ], 400);
        }

        // get refresh token
        $refresh_token = $request->refresh_token;

        // decode refresh token
        try {
            $payload = JWT::decode($refresh_token, new Key(env('API_JWT_SECRET'), 'HS256'));
            $member_id = $payload->sub;

            // find member token
            $member = MemberToken::select(
                'id', 'access_token_invalidated', 'refresh_token_invalidated'
            )->where('member_id', $member_id)->where('refresh_token', $refresh_token)->first();

            // check if member token not found
            if (!$member) {
                return response()->json([
                    'code'      => 400,
                    'message'   => 'Refresh token invalid',
                    'data'      => [],
                ], 400);
            }

            // check if refresh token invalidated
            if ($member->refresh_token_invalidated == 1) {
                return response()->json([
                    'code'      => 400,
                    'message'   => 'Refresh token invalid',
                    'data'      => [],
                ], 400);
            }

            // generate access token
            $time_exp = 3600 * 24;

            $payload = [
                'iss'       => 'librarian',
                'sub'       => $member_id,
                'iat'       => time(),
                'exp'       => time() + $time_exp,
            ];

            $access_token = JWT::encode($payload, env('API_JWT_SECRET'), 'HS256');

            // update refresh token
            $payload = [
                'iss'       => 'librarian',
                'sub'       => $member_id,
                'iat'       => time(),
                'exp'       => time() + ($time_exp * 30),
            ];

            $refresh_token = JWT::encode($payload, env('API_JWT_SECRET'), 'HS256');

            // update member token
            $member->token                      = $access_token;
            $member->access_token_invalidated   = 0;
            $member->refresh_token              = $refresh_token;
            $member->updated_at                 = Carbon::now();

            // send response
            return response()->json([
                'code'      => 200,
                'message'   => 'Refresh token success',
                'data'      => [
                    'token'         => $access_token,
                    'refresh_token' => $refresh_token,
                    'duration'      => $time_exp,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code'      => 400,
                'message'   => 'Refresh token invalid',
                'data'      => [],
                'error'     => $e->getMessage(),
            ], 400);
        }
    }

    // get member profile
    public function profile(Request $request) {
        $member_id = $request->member_id;

        // get member
        $member = Member::select(
            'name', 'email', 'phone', 'address', 'avatar'
        )->find($member_id);

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Get profile success',
            'data'      => [
                'member' => $member,
            ],
        ]);
    }

    // update member profile
    public function updateProfile(Request $request) {
        $member_id = $request->member_id;

        // validate the request
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'phone'     => 'required|string|max:20',
            'address'   => 'required|string|max:255',
            'avatar'    => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
        ]);

        // send failed response if request is not valid
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return response()->json([
                'code'      => 400,
                'message'   => $error,
                'data'      => [],
            ], 400);
        }

        // get member
        $member = Member::find($member_id);

        // get avatar
        $avatar = $request->file('avatar');

        // check avatar
        $avatar_path = $member->avatar;

        if (empty($avatar) && empty($request->avatar_old)) {
            if (Storage::disk('public')->exists($member->avatar)) {
                Storage::disk('public')->delete($member->avatar);
            }

            $avatar_path = '';
        }

        if ($avatar) {
            // check file size
            if ($avatar->getSize() > 1000000) {
                return response()->json([
                    'code'      => 400,
                    'message'   => 'Avatar size too large',
                    'data'      => [],
                ], 400);
            }

            // check file type
            if (!in_array($avatar->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                return response()->json([
                    'code'      => 400,
                    'message'   => 'Avatar type not allowed',
                    'data'      => [],
                ], 400);
            }

            // delete old avatar file
            if (!empty($member->avatar) && Storage::disk('public')->exists($member->avatar)) {
                Storage::disk('public')->delete($member->avatar);
            }

            // save avatar file
            $upload_dir     = 'members';
            $file_name      = $member_id . '.' . $avatar->getClientOriginalExtension();
            $avatar_path    = $avatar->storeAs($upload_dir, $file_name, 'public');
        }

        // update member
        $member->name       = $request->name ?? $member->name;
        $member->phone      = $request->phone ?? $member->phone;
        $member->address    = $request->address ?? $member->address;
        $member->avatar     = $avatar_path;
        $member->updated_at = Carbon::now();
        $member->save();

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Update profile success',
            'data'      => [
                'member_id' => $member_id,
                'avatar'    => $avatar_path ?? '',
            ],
        ]);
    }

    // change member password
    public function changePassword(Request $request) {
        // validate the request
        $validator = Validator::make($request->all(), [
            'old_password'      => 'required|string|min:8',
            'new_password'      => 'required|string|min:8',
            'renew_password'    => 'required|string|min:8|same:new_password',
        ]);

        // send failed response if request is not valid
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return response()->json([
                'code'      => 400,
                'message'   => $error,
                'data'      => [],
            ], 400);
        }

        // get member
        $member_id = $request->member_id;
        $member = Member::find($member_id);

        // check password
        if (!Hash::check($request->old_password, $member->password)) {
            return response()->json([
                'code'      => 400,
                'message'   => 'Old password not match',
                'data'      => [],
            ], 400);
        }

        // update member password
        $member->password = Hash::make($request->new_password);
        $member->updated_at = Carbon::now();
        $member->save();

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Change password success',
            'data'      => [],
        ]);
    }

    // logout member
    public function logout(Request $request) {
        $member_id = $request->member_id;

        // get token
        $token = $request->bearerToken();

        // delete token
        MemberToken::where('member_id', $member_id)->where('token', $token)->delete();

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Logout success',
            'data'      => [],
        ]);
    }

    // logout member from all device
    public function logoutAll(Request $request) {
        $member_id = $request->member_id;

        // delete token
        MemberToken::where('member_id', $member_id)->delete();

        // send response
        return response()->json([
            'code'      => 200,
            'message'   => 'Logout all success',
            'data'      => [],
        ]);
    }
}
