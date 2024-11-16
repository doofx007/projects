
import PaginationEx from "@/Components/PaginationEx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Create from "./Create";
import Update from "./Update";
import Show from "./Show";
import dayjs from "dayjs";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
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
    const resourceName = "project";
    const { toast } = useToast();
    const { flash } = usePage().props;
    const [projects, setProjects] = useState(model.data);
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
        setProjects(projects.filter((project) => project.id !== id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-2xl font-semibold">Projects</h2>}>
            <Head title="Projects" />
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
                                        <th className="p-3 border-b">Name</th>
                                        <th className="p-3 border-b">Description</th>
                                        <th className="p-3 border-b">Created By</th>
                                        <th className="p-3 border-b">Date Created</th>
                                        <th className="p-3 text-center border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{project.name}</td>
                                            <td className="p-3 border-b">{project.description}</td>
                                            <td className="p-3 border-b">{project.createdBy.name}</td>
                                            <td className="p-3 border-b">{dayjs(project.createdAt).format("MMMM D, YYYY")}</td>
                                            <td className="p-3 space-x-2 text-center border-b">
                                                <button onClick={() => setDialogConfig({ open: true, process: "view", data: project })}>
                                                    <Eye className="text-blue-500 transition-transform hover:scale-110" title="View" />
                                                </button>
                                                <button onClick={() => setDialogConfig({ open: true, process: "update", data: project })}>
                                                    <Pencil className="text-green-500 transition-transform hover:scale-110" title="Edit" />
                                                </button>
                                                <button onClick={() => handleSoftDelete(project.id)}>
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
                            <DialogTitle>{dialogConfig.process === "view" ? "View Project" : "Update Project"}</DialogTitle>
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
