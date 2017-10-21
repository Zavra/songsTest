<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['as' => 'collections', 'uses' => 'CollectionsController@index']);
Route::get('songs/{collection_id}', ['as' => 'collection', 'uses' => 'CollectionsController@collection']);

Route::get('songs/{collection_id}/song/edit/{id}', ['as' => 'song_edit', 'uses' => 'SongsController@edit']);
Route::get('songs/{collection_id}/song/delete/{id}', ['as' => 'song_delete', 'uses' => 'SongsController@delete']);
Route::get('songs/{collection_id}/song/create', ['as' => 'song_create', 'uses' => 'SongsController@create']);
Route::post('song/update/{id?}', ['as' => 'song_update', 'uses' => 'SongsController@update']);


Route::get('/api/songs/latest', 'ApiController@latestSongs');



