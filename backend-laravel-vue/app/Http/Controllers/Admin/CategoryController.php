<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    // render page list categories
    public function index() {
        $find = request()->input('find', '');

        // get categories query with users join table
        $categories = DB::table('categories')
            ->select('categories.*', 'users.name as created_by_name')
            ->leftJoin('users', 'users.id', '=', 'categories.created_by')
            ->where('categories.name', 'like', '%' . $find . '%')
            ->orderBy('categories.name', 'asc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Category/Index', [
            'title'         => 'Category',
            'find'          => $find,
            'categories'    => $categories,
        ]);
    }

    // render page create category
    public function create() {
        return Inertia::render('Category/Create', [
            'title' => 'Add New Category',
        ]);
    }

    // save new category
    public function addCategory(Request $request) {
        $input = $request->all();

        // setup slug
        if (empty($input['categorySlug'])) {
            $input['categorySlug'] = Str::slug($input['categoryName']);
        } else {
            $input['categorySlug'] = Str::slug($input['categorySlug']);
        }

        // validate request
        $validator = Validator::make($input, [
            'categoryName' => 'required|unique:categories,name',
            'categorySlug' => 'required|unique:categories,slug',
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // save category
        $category = new Category();
        $category->name = $input['categoryName'];
        $category->slug = $input['categorySlug'];
        $category->created_by = auth()->user()->id;
        $category->created_at = now();
        $category->updated_at = now();
        $category->save();

        return redirect()->back()->with('success', 'Category has been added');
    }

    // render page edit category
    public function edit($id) {
        $category = Category::find($id);

        return Inertia::render('Category/Edit', [
            'title'     => 'Edit Category',
            'category'  => $category,
        ]);
    }

    // update category
    public function updateCategory(Request $request, $id) {
        $input = $request->all();

        // setup slug
        if (empty($input['categorySlug'])) {
            $input['categorySlug'] = Str::slug($input['categoryName']);
        } else {
            $input['categorySlug'] = Str::slug($input['categorySlug']);
        }

        // validate request
        $validator = Validator::make($input, [
            'categoryName' => 'required|unique:categories,name,' . $id,
            'categorySlug' => 'required|unique:categories,slug,' . $id,
        ]);

        // send error to flash session
        if ($validator->fails()) {
            // get first error message
            $error = $validator->errors()->first();

            return redirect()->back()->with('error', $error);
        }

        // update category
        $category = Category::find($id);
        $category->name = $input['categoryName'];
        $category->slug = $input['categorySlug'];
        $category->updated_at = now();
        $category->save();

        return redirect()->route('admin/category/edit', ['id' => $id])->with('success', 'Category has been updated');
    }

    // delete category
    public function delete($id) {
        if (empty($id)) {
            return redirect()->back()->with('error', 'Category not found');
        }

        $category = Category::find($id);
        $category->delete();

        return redirect()->route('admin/category')->with('success', 'Category has been deleted');
    }

    // delete selected categories
    public function deleteSelected($ids) {
        if (empty($ids)) {
            return redirect()->back()->with('error', 'Categories not found');
        }

        $ids = explode(',', $ids);

        Category::whereIn('id', $ids)->delete();

        return redirect()->route('admin/category')->with('success', 'Categories has been deleted');
    }
}
