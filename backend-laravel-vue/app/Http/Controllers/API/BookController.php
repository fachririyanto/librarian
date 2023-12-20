<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    // get books
    public function index() {
        $keyword    = request()->query('s');
        $cat        = request()->query('cat');
        $page       = request()->query('page');
        $limit      = request()->query('limit');

        $fields = [
            'books.id', 'title', 'author', 'publisher', 'year', 'cover', 'stock', 'description',
            'categories.id as category_id', 'categories.name as category_name',
        ];

        // get book items
        $books = Book::select($fields)
            // join category table
            ->join('categories', 'categories.id', '=', 'books.category_id')

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
            ->paginate($limit, ['*'], 'page', $page);

        return response()->json($books);
    }

    // get related books
    public function related($id) {
        $book   = Book::find($id);
        $limit  = request()->query('limit');

        $books  = Book::select(
            'books.id', 'title', 'author', 'publisher', 'year', 'cover', 'stock', 'description',
            'categories.id as category_id', 'categories.name as category_name',
            )
            ->join('categories', 'categories.id', '=', 'books.category_id')
            ->where('category_id', $book->category_id)
            ->where('books.id', '!=', $id)
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        return response()->json([
            'data' => $books,
        ]);
    }

    // get book detail
    public function detail($id) {
        $book = Book::select(
            'books.id', 'title', 'author', 'publisher', 'year', 'cover', 'stock', 'description',
            'categories.id as category_id', 'categories.name as category_name',
        )
        ->join('categories', 'categories.id', '=', 'books.category_id')
        ->find($id);

        return response()->json([
            'data' => $book,
        ]);
    }
}
