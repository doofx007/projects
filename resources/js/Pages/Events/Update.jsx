import InputError from "@/Components/InputError";
import LabelEx from "@/Components/LabelEx";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

const Update = ({ model, onDialogConfig }) => {
    const { auth } = usePage().props;

    // Initialize form with default data or model values
    const { data, setData, patch, processing, reset, errors } = useForm({
        event_name: model?.event_name ?? "",
        description: model?.description ?? "",
        location: model?.location ?? "",
        priority: model?.priority ?? "",
        status: model?.status ?? "",
        date_time: model?.date_time ?? "",
        created_by: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("events.update", { event: model.id }), {
            onSuccess: () => {
                reset();
                onDialogConfig({ open: false, process: "", data: null });
                window.location.reload();
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="grid gap-4 pt-3 mb-7">
                <div>
                    <LabelEx htmlFor="event_name" required>
                        Event Name
                    </LabelEx>
                    <Input
                        value={data.event_name}
                        onChange={(e) => setData("event_name", e.target.value)}
                        type="text"
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.event_name} className="mt-2" />
                </div>

                <div>
                    <LabelEx htmlFor="description">Description</LabelEx>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                    <LabelEx htmlFor="location" required>
                        Location
                    </LabelEx>
                    <Input
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                        type="text"
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.location} className="mt-2" />
                </div>

                <div>
                    <LabelEx htmlFor="priority" required>
                        Priority
                    </LabelEx>
                    <select
                        value={data.priority}
                        onChange={(e) => setData("priority", e.target.value)}
                        className="block w-full mt-1"
                    >
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <InputError message={errors.priority} className="mt-2" />
                </div>

                <div>
                    <LabelEx htmlFor="status" required>
                        Status
                    </LabelEx>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="block w-full mt-1"
                    >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div>
                    <LabelEx htmlFor="date_time" required>
                        Date & Time
                    </LabelEx>
                    <Input
                        value={data.date_time}
                        onChange={(e) => setData("date_time", e.target.value)}
                        type="datetime-local"
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.date_time} className="mt-2" />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                {processing ? (
                    <Button disabled className="w-40 rounded-full">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                    </Button>
                ) : (
                    <Button type="submit" className="w-40 bg-blue-600 rounded-full hover:bg-blue-500">
                        Save
                    </Button>
                )}

                <Button
                    variant="secondary"
                    onClick={() =>
                        onDialogConfig({ open: false, process: "", data: null })
                    }
                    className="w-40 rounded-full"
                >
                    Close
                </Button>
            </div>
        </form>
    );
};

export default Update;
