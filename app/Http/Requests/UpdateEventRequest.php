<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_name' => 'required|max:255|unique:events,event_name,' . $this->id,
            'date_time' => 'required|date',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'required|in:Upcoming,Ongoing,Completed',
            'created_by' => 'required',
        ];
    }
}
