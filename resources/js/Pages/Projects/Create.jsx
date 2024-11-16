
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import LabelEx from "@/Components/LabelEx";
import InputError from "@/Components/InputError";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";

const Create = ({ resourceName, users }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        created_by: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-10 bg-blue-600 rounded-full shadow hover:bg-blue-500">
                    Create {resourceName}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-none shadow-lg">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create {resourceName}</DialogTitle>
                    </DialogHeader>
                    <Separator className="h-[1px] my-4 bg-slate-500" />
                    <div className="grid gap-4 pt-3 mb-7">
                        <div>
                            <LabelEx htmlFor="name" required>Name</LabelEx>
                            <Input
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                type="text"
                                placeholder="Enter project name"
                                className="block w-full mt-1"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Enter project description"
                                className="block w-full mt-1"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        {processing ? (
                            <Button disabled className="w-40 rounded-full">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-40 bg-blue-600 rounded-full shadow hover:bg-blue-500">
                                Save
                            </Button>
                        )}
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="w-40 rounded-full shadow">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Create;
