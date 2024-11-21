<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            $table->string('event_name');
            $table->dateTime('date_time');
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->enum('priority', ['Low', 'Medium', 'High'])->default('Low');
            $table->enum('status', ['Upcoming', 'Ongoing', 'Completed'])->default('Upcoming');

            $table->foreignId('created_by')->constrained('users'); // Assumes users table exists.

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
