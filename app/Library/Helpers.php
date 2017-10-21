<?php namespace App\Library;


use App\Models\Collections;

//личные вспомогательные ф-ции
class Helpers {

    public static function getCollectionBySlug($slug) {

        $collection = Collections::where('slug', $slug)->first();

        if (empty($collection)) {
            abort(404);
        }

        return $collection;

    }

}