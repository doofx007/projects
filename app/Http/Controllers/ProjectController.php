<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()
            ->where('name', 'like', '%' . request()->query('search') . '%')
            ->orWhere('description', 'like', '%' . request()->query('search') . '%')
            ->orderBy(
                request('sort_field', 'created_at'),
                request('sort_direction', 'desc')
            )
            ->paginate(5)
            ->appends(request()->query());

        return Inertia::render('Projects/Index', [
            'model' => ProjectResource::collection($projects),
            'queryParams' => request()->query(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        Project::create($request->validated());

        session()->flash('message', 'Successfully created a new project');

        return redirect(route('projects.index'));
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        session()->flash('message', 'Successfully updated a project');

        return redirect(route('projects.index', $request->query()));
    }

    public function destroy(Project $project)
    {
        $project->delete();

        session()->flash('message', 'Project deleted successfully');
        return redirect()->route('projects.index');
    }
}

