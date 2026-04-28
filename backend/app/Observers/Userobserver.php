<?php

namespace App\Observers;

use App\Models\TaskGroup;
use App\Models\User;

class Userobserver
{
    /**
     * Handle the User "created" event.
     */
    
    public function created(User $user): void
    {
        //
        
        TaskGroup::create([
            'name'   => 'Main workSpace',
            'user_id'=> $user->id,
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
