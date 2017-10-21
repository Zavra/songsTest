@extends('layout')
@section('content')

    <h2>Collections</h2>

    @if (!empty($collections))
        <div class="table-responsive">
            <table class="table table-striped collections">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                @foreach($collections as $collection)
                    <tr>
                        <td>{{ $collection->id }}</td>
                        <td>{{ $collection->name }}</td>
                        <td><a href="{{ route('collection', ['id' => $collection->slug]) }}" class="btn btn-sm btn-success">View</a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    @else
        There is no collection yet.
    @endif

@endsection