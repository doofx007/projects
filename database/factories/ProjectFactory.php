<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'name' => $this->faker->unique()->sentence(3), // Generates a random 3-word title
            'description' => $this->faker->paragraph, // Generates a random paragraph for description
            'created_by' => User::factory(), // Creates a new user and assigns the ID
        ];
    }
}
