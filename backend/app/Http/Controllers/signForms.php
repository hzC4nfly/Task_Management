<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskGroup;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class signForms extends Controller
{
    public function signUp(Request $request)
    {
        $request->validate(
            [
                'firstname' => 'required|min:2|max:10',
                'lastname' => 'required|min:2|max:10',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6'
            ],
            [
                'firstname.required' => 'set your firstname please!',
                'firstname.min' => ' shorter than 2 characters!',
                'firstname.max' => 'greater than 10 characters!',
                'lastname.required' => 'set your lastname please!',
                'lastname.min' => 'shorter than 2 characters!',
                'lastname.max' => 'greater than 10 characters!',
                'email.required' => 'you forget to set an email!',
                'email.email' => 'check you email is not an true email!',
                'password.required' => 'set a password please!',
                'password.min' => 'Password must be at least 8 characters!',
            ]
        );

        $fullName = $request->firstname . ' ' . $request->lastname;

        $user = User::create([
            'name' => $fullName,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        $token = $user->createToken('token_auth')->plainTextToken;
        $user = Auth::user();


        return response()->json(['user' => $user, 'token' => $token, 'message' => 'Account created successfully! ✅']);

    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => 'you forget to set an email!',
            'email.email' => 'check you email is not an true email!',
            'password.required' => 'set a password please!',
        ]);
        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json([
                'email' => "this email not exist"
            ]);
        } elseif (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'password' => "check password is wrong"
            ]);
        }

        $taskGroups = TaskGroup::with('tasks')
            ->where('user_id', $user->id)
            ->get();
        $token = $user->createToken('token_auth')->plainTextToken;

        return response()->json(['user' => $user, 'taskgroups' => $taskGroups, 'token' => $token, 'message' => 'welcome to your account ✅']);
        
    }
}
