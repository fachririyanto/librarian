<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\MemberToken;

class JWTAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $jwt_secret = config('app.api_jwt_secret');

        // check bearer token
        if (!$request->bearerToken()) {
            return response()->json([
                'code'      => 401,
                'message'   => 'Unauthorized',
            ], 401);
        }
    
        // get token
        $token = $request->bearerToken();

        // verify token
        try {
            $payload = JWT::decode($token, new Key($jwt_secret, 'HS256'));

            // check if token is valid
            $member_token = MemberToken::where('token', $token)->where('access_token_invalidated', '0')->first();

            if (!$member_token) {
                return response()->json([
                    'code'      => 401,
                    'message'   => 'Unauthorized',
                    'data'      => [],
                ], 401);
            }

            $request->merge([
                'member_id' => $payload->sub,
            ]);

            return $next($request);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 401,
                'message'   => 'Unauthorized',
                'data'      => [],
                'error'     => $th->getMessage(),
            ], 401);
        }
    }
}
