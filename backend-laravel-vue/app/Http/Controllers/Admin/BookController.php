<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Book;
use App\Models\Category;
use App\Models\Bookcase;
use Carbon\Carbon;

class BookController extends Controller
{
    // render page list books
    public function index() {
        $find = request()->input('find', '');

        // get books query with users join table
        $books = DB::table('books')
            ->select('books.*', 'users.name as created_by_name', 'categories.name as category_name')
            ->leftJoin('users', 'users.id', '=', 'books.created_by')
            ->leftJoin('categories', 'categories.id', '=', 'books.category_id')
            ->where('books.title', 'like', '%' . $find . '%')
            ->orderBy('books.title', 'asc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Book/Index', [
            'title' => 'Books',
            'find'  => $find,
            'books' => $books,
        ]);
    }

    // render page create book
    public function create() {
        $categories = Category::orderBy('name', 'asc')->get();
        $bookcases = Bookcase::orderBy('name', 'asc')->get();

        return Inertia::render('Book/Create', [
            'title'         => 'Add New Book',
            'categories'    => $categories,
            'bookcases'     => $bookcases,
        ]);
    }

    // store new book
    public function addBook(Request $request) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'isbn'          => 'required|unique:books,isbn',
            'title'         => 'required',
            'author'        => 'required',
            'publisher'     => 'required',
            'year'          => 'required|numeric|min:0|max:' . (date('Y') + 1),
            'category_id'   => 'required',
            'bookcase_id'   => 'required',
            'stock'         => 'required|numeric|min:0',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // check cover file
        $cover_path = '';

        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');

            // check file size
            if ($cover->getSize() > 2000000) {
                return redirect()->back()->with('error', 'Cover file size cannot be more than 2MB.');
            }

            // check file type
            if (!in_array($cover->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                return redirect()->back()->with('error', 'Cover file type must be jpg, jpeg, or png.');
            }

            // save cover file
            $upload_dir = 'covers';
            $file_name  = $request->isbn . '.' . $cover->getClientOriginalExtension();
            $cover_path = $cover->storeAs($upload_dir, $file_name, 'public');
        }

        // save new book
        $book = new Book();
        $book->isbn         = $request->isbn;
        $book->title        = $request->title;
        $book->author       = $request->author;
        $book->publisher    = $request->publisher;
        $book->year         = $request->year;
        $book->category_id  = $request->category_id;
        $book->bookcase_id  = $request->bookcase_id;
        $book->stock        = $request->stock;
        $book->description  = $request->description;
        $book->cover        = $cover_path;
        $book->created_by   = auth()->user()->id;
        $book->created_at   = Carbon::now();
        $book->updated_at   = Carbon::now();
        $book->save();

        return redirect()->back()->with('success', 'Book has been added.');
    }

    // render page edit book
    public function edit($id) {
        // find book by id
        $book = Book::find($id);

        // redirect back if not found
        if (!$book) {
            return redirect()->back()->with('error', 'Book not found.');
        }

        $categories = Category::orderBy('name', 'asc')->get();
        $bookcases = Bookcase::orderBy('name', 'asc')->get();

        return Inertia::render('Book/Edit', [
            'title'         => 'Edit Book',
            'book'          => $book,
            'categories'    => $categories,
            'bookcases'     => $bookcases,
        ]);
    }

    // update book
    public function updateBook(Request $request, $id) {
        $input = $request->all();

        // validate request
        $validator = Validator::make($input, [
            'isbn'          => 'required|unique:books,isbn,' . $id,
            'title'         => 'required',
            'author'        => 'required',
            'publisher'     => 'required',
            'year'          => 'required|numeric|min:0|max:' . (date('Y') + 1),
            'category_id'   => 'required',
            'bookcase_id'   => 'required',
            'stock'         => 'required|numeric|min:0',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // find book by id
        $book = Book::find($id);

        // redirect back if not found
        if (!$book) {
            return redirect()->back()->with('error', 'Book not found.');
        }

        // set cover path
        $cover_path = '';

        // delete cover file if user remove cover file
        if (empty($input['cover_preview']) && empty($input['cover'])) {
            if (Storage::exists('public/' . $book->cover)) {
                Storage::delete('public/' . $book->cover);
            }
        }

        // if user not change cover file
        if ($input['cover_preview'] == $input['cover_old']) {
            $cover_path = $input['cover_old'];
        }

        // upload new cover file
        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');

            // check file size
            if ($cover->getSize() > 2000000) {
                return redirect()->back()->with('error', 'Cover file size cannot be more than 2MB.');
            }

            // check file type
            if (!in_array($cover->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                return redirect()->back()->with('error', 'Cover file type must be jpg, jpeg, or png.');
            }

            // save cover file
            $upload_dir = 'covers';
            $file_name  = $request->isbn . '.' . $cover->getClientOriginalExtension();
            $cover_path = $cover->storeAs($upload_dir, $file_name, 'public');
        }

        // update book
        $book->isbn         = $request->isbn;
        $book->title        = $request->title;
        $book->author       = $request->author;
        $book->publisher    = $request->publisher;
        $book->year         = $request->year;
        $book->category_id  = $request->category_id;
        $book->bookcase_id  = $request->bookcase_id;
        $book->stock        = $request->stock;
        $book->description  = $request->description;
        $book->cover        = $cover_path;
        $book->updated_at   = Carbon::now();
        $book->save();

        // redirect to book list page
        return redirect()->back()->with('success', 'Book has been updated.');
    }

    // delete book
    public function delete($id) {
        // find book by id
        $book = Book::find($id);

        // redirect back if not found
        if (!$book) {
            return redirect()->back()->with('error', 'Book not found.');
        }

        // delete cover file
        if (Storage::exists('public/' . $book->cover)) {
            Storage::delete('public/' . $book->cover);
        }

        // delete book
        $book->delete();

        // redirect to book list page
        return redirect()->back()->with('success', 'Book has been deleted.');
    }

    // delete selected books
    public function deleteSelected($ids) {
        // convert ids to array
        $ids = explode(',', $ids);

        // find books by ids
        $books = Book::whereIn('id', $ids)->get();

        // delete cover files
        foreach ($books as $book) {
            if (Storage::exists('public/' . $book->cover)) {
                Storage::delete('public/' . $book->cover);
            }
        }

        // delete books
        Book::whereIn('id', $ids)->delete();

        // redirect to book list page
        return redirect()->back()->with('success', 'Books has been deleted.');
    }
}
