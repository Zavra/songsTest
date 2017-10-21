<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collections;
use App\Models\Songs;
use App\Library\Helpers;


class ApiController extends Controller {

   public function latestSongs() {

       $songs = Songs::orderBy('id', 'desc')->take(15)->get();

       return response()->json(['error' => 0, 'songs' => $songs]);

   }

}

?>