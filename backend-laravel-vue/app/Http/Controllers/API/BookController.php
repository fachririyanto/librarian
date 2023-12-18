<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    // get all books
    public function index() {
        $keyword    = request()->query('s');
        $cat        = request()->query('cat');
        $page       = request()->query('page');
        $limit      = request()->query('limit');

        $fields = [
            'id', 'title', 'author', 'publisher', 'cover', 'stock', 'description'
        ];

        $books = Book::select($fields)
            // search by title, author, publisher
            ->where(function($query) use ($keyword) {
                $query->where('title', 'like', "%$keyword%")
                    ->orWhere('author', 'like', "%$keyword%")
                    ->orWhere('publisher', 'like', "%$keyword%");
            })

            // filter by category
            ->when($cat, function($query, $cat) {
                return $query->where('category_id', $cat);
            })

            ->orderBy('title', 'asc')
            ->get();

        return response()->json([
            'data' => $books,
        ]);
    }

    // get book detail
    public function detail($id) {
        $book = Book::find($id);

        return response()->json([
            'data' => $book,
        ]);
    }
}
