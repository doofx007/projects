
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import dayjs from "dayjs";

const Show = ({ model, onDialogConfig }) => {
    return (
        <>
            <div className="flex w-full pt-3 space-x-10 mb-7">
                <div className="w-2/3 space-y-6">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="font-medium text-gray-600 dark:text-slate-300">Name</Label>
                        <div className="text-lg font-semibold">{model.name}</div>
                    </div>
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="font-medium text-gray-600 dark:text-slate-300">Description</Label>
                        <div className="text-lg font-semibold">{model.description}</div>
                    </div>
                </div>
                <div className="w-1/3 space-y-8">
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="font-medium text-gray-600 dark:text-slate-300">Date Created</Label>
                        <div className="text-lg font-semibold">{dayjs(model.createdAt).format("MMMM D, YYYY")}</div>
                    </div>
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="font-medium text-gray-600 dark:text-slate-300">Created By</Label>
                        <div className="text-lg font-semibold">{model.createdBy.name}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    className="w-40 bg-blue-600 rounded-full shadow hover:bg-blue-500"
                    onClick={() => onDialogConfig({ open: true, process: "update", data: model })}
                >
                    Update
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onDialogConfig({ open: false })}
                    className="w-40 rounded-full shadow"
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default Show;
