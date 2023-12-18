<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use Carbon\Carbon;

class LoanController extends Controller
{
    // loan books
    function loanBooks(Request $request) {
        // validate incoming request
        $validator = Validator::make($request->all(), [
            'books'     => 'required|array',
            'loan_date' => 'required|date',
            'due_date'  => 'required|date',
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

        // check book stock
        $books = $request->books;

        foreach ($books as $book_id) {
            // get book stock
            $stock = Book::find($book_id)->stock;

            // check if stock is enough
            if ($stock < 1) {
                return response()->json([
                    'code'      => 400,
                    'message'   => 'Book stock is not enough',
                    'data'      => [],
                ], 400);
            }
        }

        // get current user
        $member_id = $request->member_id;

        // save loan header data
        try {
            DB::beginTransaction();

            $loan_header = DB::table('loan_headers')->insertGetId([
                'member_id'     => $member_id,
                'loan_date'     => $request->loan_date,
                'due_date'      => $request->due_date,
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ]);

            // save loan detail data
            foreach ($books as $book_id) {
                DB::table('loan_details')->insert([
                    'loan_id'   => $loan_header,
                    'book_id'   => $book_id,
                ]);

                // update book stock
                $book = Book::find($book_id);
                $book->stock = $book->stock - 1;
                $book->save();
            }

            DB::commit();

            return response()->json([
                'code'      => 200,
                'message'   => 'Loan books success',
                'data'      => [],
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'code'      => 500,
                'message'   => $e->getMessage(),
                'data'      => [],
            ], 500);
        }
    }
}
