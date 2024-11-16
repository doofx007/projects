<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'createdBy' => $this->createdBy,
            'createdAt' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updatedAt' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
