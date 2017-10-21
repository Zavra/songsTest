<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collections;
use App\Models\Songs;
use App\Library\Helpers;


class SongsController extends Controller {

    public function __construct(){}

    public function create($collection_id)
    {
        $collection = Helpers::getCollectionBySlug($collection_id);
        $song = new Songs();
        return view('song_edit', compact('song', 'collection'));
    }

    public function edit($collection_id, $id)
    {
        $collection = Helpers::getCollectionBySlug($collection_id);
        $song = Songs::findOrFail($id);
        return view('song_edit', compact('song', 'collection'));
    }

    public function update(Request $request, $id='')
    {

        $validatedData = $request->validate([
            'name' => 'required'
        ]);

        $data = $request->except(['_token']);
        $collection = Collections::findOrFail($data['collection']);

        if ($id) {
            $song = Songs::findOrFail($id);
            $message = 'Song updated successfully.';

        } else {
            $song = new Songs();
            $message = 'Song created successfully.';
        }

        $song->fill($data);
        $song->save();

        if (empty($id)) {
            $collection->songs()->attach($song->id);
        }

        return redirect()->route('collection', ['id' => $collection->slug])->with('message', $message);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function delete($collection_id, $id)
    {
        $collection = Helpers::getCollectionBySlug($collection_id);
        $song = Songs::findOrFail($id);
        $song->delete();

        return redirect()->route('collection', ['id' => $collection->slug])->with('message', 'Song deleted successfully');
    }
}

?>