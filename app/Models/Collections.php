<?php namespace App\Models;

use App;
use DB;
use Settings;
use Carbon;
use Helpers;

//если использовать "\Eloquent" вместо "Model" то работает автокомплит всех методов
class Collections extends \Eloquent {

    protected $table = 'collections';
    protected $fillable = ['name'];


    public function songs() {
        return $this->belongsToMany('App\Models\Songs', 'collections_songs', 'collection_id', 'song_id');
    }

}