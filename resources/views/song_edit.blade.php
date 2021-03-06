@extends('layout')
@section('content')

    @if($song->id)
        <h2>Edit song</h2>
    @else
        <h2>Add song</h2>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <div>{{ $error }}</div>
            @endforeach
        </div>
    @endif

    <form class="add-song" action="{{ route('song_update', $song->id) }}" method="POST">
        {{ csrf_field() }}
        <input type="hidden" name="collection" value="{{ $collection->id }}">
        <div class="form-group">
            <label>Song Name</label>
            <input type="text" name="name" value="{{ $song->name }}" class="form-control"  placeholder="Song Name">
        </div>
        <div class="form-group">
            <label>Song Artist</label>
            <input type="text" name="artist" value="{{ $song->artist }}" class="form-control"  placeholder="Song Artist">
        </div>
        <button type="submit" class="btn btn-success">
            @if($song->id) Edit song @else Add song @endif
        </button>
    </form>

@endsection