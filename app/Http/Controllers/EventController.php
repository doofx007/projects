<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $model = Event::query()
            ->where('event_name', 'like', '%' . request()->query('search') . '%')
            ->orWhere('description', 'like', '%' . request()->query('search') . '%')
            ->orWhere('location', 'like', '%' . request()->query('search') . '%')
            ->orderBy(
                request('sort_field', 'created_at'),
                request('sort_direction', 'desc')
            )
            ->paginate(5)
            ->appends(request()->query());

        return Inertia::render('Events/Index', [
            'model' => EventResource::collection($model),
            'queryParams' => request()->query(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        Event::create($request->validated());

        session()->flash('message', 'Successfully created a new event.');

        return redirect(route('events.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $event->update($request->validated());

        session()->flash('message', 'Successfully updated the event.');

        return redirect(route('events.index', $request->query()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        session()->flash('message', 'Successfully deleted the event.');

        return redirect(route('events.index'));
    }
}
