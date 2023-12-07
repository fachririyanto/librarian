<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\Bookcase;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BookcaseController extends Controller
{
    // render bookcase page
    public function index() {
        $find = request()->input('find', '');

        // get bookcases query with users join table
        $bookcases = DB::table('bookcases')
            ->select('bookcases.*', 'users.name as created_by_name')
            ->leftJoin('users', 'users.id', '=', 'bookcases.created_by')
            ->where('bookcases.name', 'like', '%' . $find . '%')
            ->orderBy('bookcases.name', 'asc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Bookcase/Index', [
            'title'     => 'Bookcase',
            'find'      => $find,
            'bookcases' => $bookcases,
        ]);
    }

    // render page create bookcase
    public function create() {
        return Inertia::render('Bookcase/Create', [
            'title' => 'Add New Bookcase',
        ]);
    }

    // save new bookcase
    public function addBookcase(Request $request) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'bookcaseName'  => 'required',
            'position'      => 'required|unique:bookcases,position',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->route('admin/bookcases/create')->with('error', $error);
        }

        // save new bookcase
        $bookcase = new Bookcase();
        $bookcase->name = $input['bookcaseName'];
        $bookcase->position = $input['position'];
        $bookcase->created_by = auth()->user()->id;
        $bookcase->created_at = Carbon::now();
        $bookcase->updated_at = Carbon::now();
        $bookcase->save();

        // redirect to bookcase list page
        return redirect()->route('admin/bookcases/create')->with('success', 'Bookcase has been added.');
    }

    // render page edit bookcase
    public function edit($id) {
        // find bookcase by id
        $bookcase = Bookcase::find($id);

        // redirect back if not found
        if (!$bookcase) {
            return redirect()->back()->with('error', 'Bookcase not found.');
        }

        return Inertia::render('Bookcase/Edit', [
            'title'     => 'Edit Bookcase',
            'bookcase'  => $bookcase,
        ]);
    }

    // update bookcase
    public function updateBookcase(Request $request, $id) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'bookcaseName'  => 'required',
            'position'      => 'required',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // find bookcase by id
        $bookcase = Bookcase::find($id);

        // redirect back if not found
        if (!$bookcase) {
            return redirect()->back()->with('error', 'Bookcase not found.');
        }

        // update bookcase
        $bookcase->name = $input['bookcaseName'];
        $bookcase->position = $input['position'];
        $bookcase->updated_at = Carbon::now();
        $bookcase->save();

        // redirect to bookcase list page
        return redirect()->back()->with('success', 'Bookcase has been updated.');
    }

    // delete bookcase
    public function delete($id) {
        // find bookcase by id
        $bookcase = Bookcase::find($id);

        // redirect back if not found
        if (!$bookcase) {
            return redirect()->back()->with('error', 'Bookcase not found.');
        }

        // delete bookcase
        $bookcase->delete();

        // redirect to bookcase list page
        return redirect()->back()->with('success', 'Bookcase has been deleted.');
    }

    // delete selected bookcases
    public function deleteSelected($ids) {
        // convert string to array
        $ids = explode(',', $ids);

        // delete selected bookcases
        Bookcase::whereIn('id', $ids)->delete();

        // redirect to bookcase list page
        return redirect()->back()->with('success', 'Bookcases has been deleted.');
    }
}
