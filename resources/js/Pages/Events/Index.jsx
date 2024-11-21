import { useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PaginationEx from "@/Components/PaginationEx";
import Create from "./Create";
import Update from "./Update";
import Show from "./Show";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import { Separator } from "@/shadcn/ui/separator";
import { useToast } from "@/shadcn/hooks/use-toast";

export default function Index({ auth, model }) {
    const resourceName = "event";
    const { toast } = useToast();
    const { flash } = usePage().props;
    const [events, setEvents] = useState(model.data);
    const [dialogConfig, setDialogConfig] = useState({ open: false, process: "", data: null });

    useEffect(() => {
        if (flash?.message) {
            toast({ description: flash.message });
        }
    }, [flash]);

    const onDialogConfig = (config) => {
        if (!config) {
            setDialogConfig({ open: false, process: "", data: null });
        } else {
            setDialogConfig(config);
        }
    };

    const handleSoftDelete = (id) => {
        setEvents(events.filter((event) => event.id !== id));
        router.delete(route(`${resourceName}.destroy`, id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-2xl font-semibold">Events</h2>}>
            <Head title="Events" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                        <div className="p-6">
                            <div className="flex justify-end mb-6">
                                <Create resourceName={resourceName} />
                            </div>
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="font-semibold text-gray-700 bg-gray-200">
                                    <tr>
                                        <th className="p-3 border-b">Event Name</th>
                                        <th className="p-3 border-b">Date & Time</th>
                                        <th className="p-3 border-b">Priority</th>
                                        <th className="p-3 border-b">Status</th>
                                        <th className="p-3 border-b">Location</th>
                                        <th className="p-3 border-b">Created By</th>
                                        <th className="p-3 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{event.event_name}</td>
                                            <td className="p-3 border-b">
                                                {dayjs(event.date_time).format("MMMM D, YYYY h:mm A")}
                                            </td>
                                            <td className="p-3 border-b">{event.priority}</td>
                                            <td className="p-3 border-b">{event.status}</td>
                                            <td className="p-3 border-b">{event.location || "N/A"}</td>
                                            <td className="p-3 border-b">{event.created_by.name}</td>
                                            <td className="p-3 space-x-2 text-center border-b">
                                                <button onClick={() => setDialogConfig({ open: true, process: "view", data: event })}>
                                                    <Eye className="text-blue-500 transition-transform hover:scale-110" title="View" />
                                                </button>
                                                <button onClick={() => setDialogConfig({ open: true, process: "update", data: event })}>
                                                    <Pencil className="text-green-500 transition-transform hover:scale-110" title="Edit" />
                                                </button>
                                                <button onClick={() => handleSoftDelete(event.id)}>
                                                    <Trash2 className="text-red-500 transition-transform hover:scale-110" title="Delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <PaginationEx links={model.links} meta={model.meta} />
                        </div>
                    </div>
                </div>
                <Dialog open={dialogConfig.open} onOpenChange={onDialogConfig}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {dialogConfig.process === "view"
                                    ? "Event Details"
                                    : dialogConfig.process === "update"
                                    ? "Update Event"
                                    : ""}
                            </DialogTitle>
                        </DialogHeader>
                        <Separator className="mb-4" />
                        {dialogConfig.process === "view" ? (
                            <Show model={dialogConfig.data} onDialogConfig={onDialogConfig} />
                        ) : (
                            <Update model={dialogConfig.data} onDialogConfig={onDialogConfig} />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
