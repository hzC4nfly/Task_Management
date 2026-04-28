<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskGroup;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class TasksWork extends Controller
{
    
    public function Newtask(Request $request){
        $request->validate([
            'userId' => 'required',
            'task_group_name'=> 'required',
        ]);
        $TaskGroup = TaskGroup::where('name', $request->task_group_name)->where('user_id', $request->userId)->first();
        if($TaskGroup){
        Task::create([
            'task_group_id' =>  $TaskGroup->id,
            'title' => 'new task ' . Task::count()+1,
            'description' => '',
            'status' => 'Not Started',
        ]); 
        return response()->json(['message' => 'new task created successfully ✅']);
        }
        else{
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function updateTask(Request $request){
        $tasksToUpdate = $request->all();

        if (empty($tasksToUpdate)) {
            return response()->json(['message' => 'No tasks provided for update.'], 400);
        }



        foreach ($tasksToUpdate as $taskData) {

            if (!isset($taskData['id'])) {
                continue; 
            }
            
            // Find the existing task in the database
            $task = Task::where('id', $taskData['id'])
            ->where('task_group_id', $taskData['task_group_id'])
            ->first();

            if ($task) {
                // Update its attributes with the new data
                $task->update($taskData);
            }
        }

        return response()->json(['message' => 'Successfully updated ']);
    }

    public function delTask(Request $request){
        $deltasks = $request->all();

         if (empty($deltasks)) {
            return response()->json(['message' => 'No tasks provided for delet.'], 400);
        }



        foreach ($deltasks as $taskdata) {

            if (!isset($taskdata['id'])) {
                continue; 
            }
            
            // Find the existing task in the database
            $task = Task::where('id', $taskdata['id'])
            ->where('title', $taskdata['title'])
            ->first();

            if ($task) {
                $task->delete();
            }
        }

        return response()->json(['message' => 'Successfully delete task']);

    }

    public function NeWorkspace(Request $request){
        $request->validate([
            'name' => 'required|unique:task_groups,name|max:200'
        ],[
            'name.unique' => 'this workspace name id allready used',
        ]);
        TaskGroup::create([
            'name' => $request->name,
            'user_id' => $request->userId
        ]);
        return response()->json(['message' => 'Successfully Workspace created!']);
    }

    public function delWorkspace(Request $request){
        $workspace = TaskGroup::where('name', $request->name)->first();
        $workspace->delete();

        return response()->json(['message' => 'Successfully delete workspace']);
    }
}
