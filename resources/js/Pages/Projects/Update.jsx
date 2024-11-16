import InputError from "@/Components/InputError";
import LabelEx from "@/Components/LabelEx";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

const Update = ({ model, onDialogConfig, params }) => {
    const { auth } = usePage().props;

    // Check if model is defined; otherwise, show loading indicator
    if (!model) {
        return <p>Loading...</p>;
    }

    const { data, setData, patch, processing, reset, errors } = useForm({
        name: model.name ?? "",
        description: model.description ?? "",
        created_by: auth?.user?.id ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (model && model.id) {
            patch(route("projects.update", { project: model.id, ...params }), {
                onSuccess: () => {
                    reset();
                    onDialogConfig({ open: false, process: "", data: null });
                },
            });
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="grid gap-4 pt-3 mb-7">
                <div>
                    <LabelEx htmlFor="name" required>Name</LabelEx>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="block w-full mt-1"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                {processing ? (
                    <Button disabled className="w-40 rounded-full">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...
                    </Button>
                ) : (
                    <Button type="submit" className="w-40 bg-blue-600 rounded-full hover:bg-blue-500">
                        Save
                    </Button>
                )}
                <Button
                    variant="secondary"
                    onClick={() => onDialogConfig({ open: false, process: "", data: null })}
                    className="w-40 rounded-full"
                >
                    Close
                </Button>
            </div>
        </form>
    );
};

export default Update;
