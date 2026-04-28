<?php

use App\Http\Controllers\signForms;
use App\Http\Controllers\tasksWork;
use App\Models\Task;
use App\Models\TaskGroup;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/home', function (Request $request){ 
    return response()->json([
        'user' => $request->user(),
        'task_group' => $request->user()->TaskGroup()->with('tasks')->get(),
    ]);
})->middleware('auth:sanctum');
Route::get('/home/task', function (Request $request){
    return response()->json([
        'user' => $request->user(),
        'task_group' =>  $request->user()->TaskGroup()->with('tasks')->get(),
    ]);
})->middleware('auth:sanctum');

/* Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/tasks', [TasksWork::class, 'task_groups_index']);
}); */

Route::post('/signup',[signForms::class, 'signUp']);
Route::post('/login', [signForms::class, 'login']);
Route::post('/home/task-create', [TasksWork::class, 'Newtask']);
Route::post('/home/task-updates', [TasksWork::class, 'updateTask']);
Route::post('/home/del-task', [TasksWork::class, 'delTask']);
Route::post('/home/del-Workspace', [TasksWork::class, 'delWorkspace']);
Route::post('home/task-newWorkspace', [TasksWork::class, 'NeWorkspace']);


