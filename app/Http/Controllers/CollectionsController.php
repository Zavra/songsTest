<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Collections;
use App\Library\Helpers;

class CollectionsController extends Controller {

    public function __construct(){}

    public function index()
    {
        $collections = Collections::all();
        return view('collections', compact('collections'));

    }

    public function collection($id)
    {

        $collection = Helpers::getCollectionBySlug($id);
        $songs = $collection->songs()->get();

        return view('songs', compact('collection', 'songs'));

    }

}

?>