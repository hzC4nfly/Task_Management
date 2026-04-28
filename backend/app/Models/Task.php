<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Task extends Model
{
    //
    protected $fillable = ['task_group_id', 'title','description', 'status', 'due_date'];

    public function taskGroup(){
       return $this->belongsTo(TaskGroup::class);
    }

}
