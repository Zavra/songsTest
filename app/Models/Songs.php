<?php namespace App\Models;

use App;
use DB;
use Settings;
use Carbon;
use Helpers;

//если использовать "\Eloquent" вместо "Model" то работает автокомплит всех методов
class Songs extends \Eloquent {

    protected $table = 'songs';
    protected $fillable = ['name', 'artist'];

}