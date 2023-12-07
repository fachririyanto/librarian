<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // drop table if exists
        Schema::dropIfExists('books');

        Schema::create('books', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories');

            $table->string('isbn');
            $table->string('title');
            $table->string('author');
            $table->string('publisher');
            $table->string('year');
            $table->string('cover')->nullable();
            $table->text('description')->nullable();
            $table->integer('stock');

            $table->unsignedBigInteger('bookcase_id');
            $table->foreign('bookcase_id')->references('id')->on('bookcases');

            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
