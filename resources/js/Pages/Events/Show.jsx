import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import dayjs from "dayjs";

const Show = ({ model, onDialogConfig }) => {
    return (
        <>
            <div className="flex w-full pt-3 space-x-10 mb-7">
                <div className="w-2/3 space-y-6">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Event Name</Label>
                        <div className="text-lg font-semibold">{model.event_name}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Description</Label>
                        <div className="text-lg font-semibold">{model.description}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Location</Label>
                        <div className="text-lg font-semibold">{model.location}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Priority</Label>
                        <div className="text-lg font-semibold">{model.priority}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Status</Label>
                        <div className="text-lg font-semibold">{model.status}</div>
                    </div>
                </div>

                <div className="w-1/3 space-y-8">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Date & Time</Label>
                        <div className="text-lg font-semibold">{dayjs(model.date_time).format("MMMM D, YYYY h:mm A")}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Created By</Label>
                        <div className="text-lg font-semibold">{model.created_by.name}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Created At</Label>
                        <div className="text-lg font-semibold">{dayjs(model.created_at).format("MMMM D, YYYY h:mm A")}</div>
                    </div>

                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Updated At</Label>
                        <div className="text-lg font-semibold">{dayjs(model.updated_at).format("MMMM D, YYYY h:mm A")}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    className="w-40 bg-blue-600 rounded-full hover:bg-blue-500"
                    onClick={() =>
                        onDialogConfig({
                            open: true,
                            process: "update",
                            data: model,
                        })
                    }
                >
                    Update
                </Button>

                <Button
                    variant="secondary"
                    onClick={() =>
                        onDialogConfig({
                            open: false,
                            process: "",
                            data: null,
                        })
                    }
                    className="w-40 rounded-full"
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default Show;
