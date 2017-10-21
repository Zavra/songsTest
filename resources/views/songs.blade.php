@extends('layout')
@section('content')

    <h2>Songs in "{{ $collection->name }}"
        <a href="{{ route('song_create', ['collection_id' => $collection->slug]) }}" class="btn btn-info" style="float: right;">Add new song</a>
    </h2>

    @if (session('message'))
        <div class="alert alert-success">
            {{ session('message') }}
        </div>
    @endif

    @if (sizeof($songs))
        <div class="table-responsive">
            <table class="table table-striped collections">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Artist</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($songs as $song)
                    <tr>
                        <td>{{ $song->id }}</td>
                        <td>{{ $song->name }}</td>
                        <td>{{ $song->artist }}</td>
                        <td style="white-space: nowrap">
                            <a href="{{ route('song_edit', ['id' => $song->id, 'collection_id' => $collection->slug]) }}" class="btn btn-sm btn-success">Edit</a>
                            <a href="{{ route('song_delete', ['id' => $song->id, 'collection_id' => $collection->slug]) }}" class="btn btn-sm btn-danger">Delete</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    @else
        There is no songs in this collection yet.
    @endif

@endsection