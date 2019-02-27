<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\JapanOmiya;
use App\User;
use DB;
use Illuminate\Support\Facades\Auth;

class JapanOmiyaController extends Controller
{
    public function index()
    {
        //ログインuserを特定
        //$user = Auth::user();
        //japan_omiyaテーブルからデータを取得
        $omiyas = JapanOmiya::all();
        //JSONで返す
        return response()->json($omiyas);
    }

    //omiyaの作成
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'text' => 'required|max:6000',
        ]);
        $omiyas = new JapanOmiya();
        $user = Auth::user();
        $omiyas->title = $request->title;
        $omiyas->text = $request->text;
        //TODO:ログイン認証を実装したらコメントアウト外す
        //$todo->user_id = $user->id;
        $todo->save();

        return response()->json();
    }
}
