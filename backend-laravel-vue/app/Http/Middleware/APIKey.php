<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class APIKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $api_key = config('app.api_key');

        if ($request->header('API-KEY') !== $api_key) {
            return response()->json([
                'code'      => 401,
                'message'   => 'Unauthorized',
            ], 401);
        }

        return $next($request);
    }
}
