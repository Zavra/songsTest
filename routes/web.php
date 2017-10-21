<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'CollectionsController@index')->name('collections');
Route::get('songs/{collection_id}', 'CollectionsController@collection')->name('collection');

Route::get('songs/{collection_id}/song/edit/{id}', 'SongsController@edit')->name('song_edit');
Route::get('songs/{collection_id}/song/delete/{id}', 'SongsController@delete')->name('song_delete');
Route::get('songs/{collection_id}/song/create', 'SongsController@create')->name('song_create');
Route::post('song/update/{id?}', 'SongsController@update')->name('song_update');
