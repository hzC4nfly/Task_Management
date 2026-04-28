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
        //
        Schema::create('tasks', function(Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('task_group_id');
            $table->foreign('task_group_id')->references('id')->on('task_groups')->onDelete('cascade');
            /* $table->foreign('task_groups_id')->constrained()->onDelete('cascade'); */
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status',['Working on it','Stuck','Done','Not Started'])->default('Working on it');
            $table->date('due_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
