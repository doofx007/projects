import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { titleCase } from "@/lib/util";
import LabelEx from "@/Components/LabelEx";
import InputError from "@/Components/InputError";
import { Button } from "@/shadcn/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { Label } from "@/shadcn/ui/label";

const Create = ({ resourceName }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        event_name: "",
        date_time: "",
        description: "",
        location: "",
        priority: "Low",
        status: "Upcoming",
        created_by: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("events.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);

                window.location.reload();
            },
        });

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-10 bg-blue-600 rounded-full hover:bg-blue-500">
                    Add {titleCase(resourceName)}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Add {titleCase(resourceName)}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 pt-3 mb-7">
                        <div>
                            <LabelEx htmlFor="event_name" required>
                                Event Name
                            </LabelEx>
                            <Input
                                value={data.event_name}
                                onChange={(e) => setData("event_name", e.target.value)}
                                type="text"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.event_name} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="date_time" required>
                                Event Date & Time
                            </Label>
                            <Input
                                type="datetime-local"
                                value={data.date_time}
                                onChange={(e) => setData("date_time", e.target.value)}
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                            <InputError message={errors.date_time} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                value={data.location}
                                onChange={(e) => setData("location", e.target.value)}
                                type="text"
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div>
                            <Label htmlFor="priority" required>
                                Priority
                            </Label>
                            <select
                                value={data.priority}
                                onChange={(e) => setData("priority", e.target.value)}
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <InputError message={errors.priority} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="status" required>
                                Status
                            </Label>
                            <select
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="mt-1 block w-full py-[0.5rem] px-[.75rem] border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                            >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>

                    <DialogFooter>
                        {processing ? (
                            <Button disabled className="w-40 rounded-full">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-40 bg-blue-600 rounded-full hover:bg-blue-500">
                                Save
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Create;
