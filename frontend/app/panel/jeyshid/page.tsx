"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, DehydratedState } from "@tanstack/react-query";
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchSiteConfig } from './server';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Cookies from "js-cookie";
import api from "@/lib/api";

// ====================== TYPES ======================
type ProjectRef = {
    name: string;
    projectUrl: string;
    imageUrl: string;
};

type ProjectsSection = {
    row1: ProjectRef[];
    row2: ProjectRef[];
};

type SiteConfig = {
    title?: string;

    navbar: {
        logo?: string;
        about: {
            title?: string;
            menu_items: { title: string; description: string; url: string }[];
            url?: string;
        };
        activities: {
            title?: string;
            menu_items: { title: string; description: string; url: string }[];
            url?: string;
        };
        projects: { title?: string; menu_items: any[]; url?: string };
        lodge: { title?: string; menu_items: any[]; url?: string };
        contact: { title?: string; menu_items: any[]; url?: string };
    };

    about: {
        title?: string;
        description?: string;
        subitle?: string[];
        image?: string;
    };

    projects: ProjectsSection; // already defined

    stats: {
        title?: string;
        stats: { name: string; number: number; url: string }[];
    };

    services: {
        id: number;
        title: string;
        videoUrl: string;
        initialGrow: number;
        finalGrow: number;
    }[];

    lodge: {
        title?: string;
        description?: string;
        lodge_logo?: string;
    };

    lodge_projects: { name: string; image: string }[];

    licenses: {
        title?: string;
        certificates: { id: string; title: string; logo: string }[];
    };

    footer: {
        title?: string;
        contact: {
            title?: string;
            address?: string;
            cellphone?: string;
            phone?: string;
            email?: string;
            instagram?: string;
            whatsapp?: string;
            telegram?: string;
        };
    };
};

// ====================== ROLE CHECK ======================
function useUserRole(): string | null {
    const token = Cookies.get("jeyshid");
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role || null;
    } catch {
        return null;
    }
}

// ====================== HELPER COMPONENTS ======================
// InlineEdit for strings (with multiline support)
function InlineEdit({
    value,
    onSave,
    multiline = false,
}: {
    value: string;
    onSave: (newValue: string) => void;
    multiline?: boolean;
}) {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleBlur = () => {
        if (tempValue !== value) {
            onSave(tempValue);
        }
        setEditing(false);
    };

    if (!editing) {
        return (
            <div
                onClick={() => setEditing(true)}
                className="cursor-pointer hover:bg-gray-100 px-3 py-2 -mx-3 rounded-lg"
            >
                {multiline ? <pre className="whitespace-pre-wrap irsans_med">{value || "(خالی)"}</pre> : value || "(خالی)"}
            </div>
        );
    }

    return multiline ? (
        <textarea
            autoFocus
            className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
        />
    ) : (
        <input
            autoFocus
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
        />
    );
}

// StringArrayEditor for string arrays (e.g., about.subitle)
function StringArrayEditor({
    items,
    onChange,
    label,
}: {
    items: string[];
    onChange: (newItems: string[]) => void;
    label: string;
}) {
    const [input, setInput] = useState("");

    const add = () => {
        if (input.trim()) {
            onChange([...items, input.trim()]);
            setInput("");
        }
    };

    const remove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="block font-medium text-gray-700">{label}</label>
            <div className="flex gap-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && add()}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="متن جدید اضافه کنید..."
                />
                <button onClick={add} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    افزودن
                </button>
            </div>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span>{item}</span>
                        <button onClick={() => remove(index)} className="text-red-600 hover:text-red-800">
                            حذف
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ImageInput for single image fields
function ImageInput({
    value,
    onChange,
    label,
    width,
}: {
    value?: string;
    onChange: (newUrl: string) => void;
    label: string;
    width?: number;
}) {
    const [input, setInput] = useState(value || "");

    const save = () => {
        if (input !== value) {
            onChange(input);
        }
    };


    return (
        <div className="space-y-4">
            <label className="block font-medium text-gray-700">{label}</label>
            <div className="flex gap-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder="/images/example.avif"
                />
                <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    ذخیره
                </button>
            </div>
            {value && (
                <div className="bg-white inline-flex">
                    <Image src={value.startsWith("/") ? value : `/${value}`} alt="تصویر" width={width ?? 400} height={width ? width/2 : 200} className="rounded-lg object-cover" />
                </div>
            )}
        </div>
    );
}

// ObjectArrayEditor for arrays of objects (e.g., stats.stats, services, lodge_projects, licenses.certificates)
function ObjectArrayEditor<T extends Record<string, any>>({
    items,
    onChange,
    label,
    fields,
}: {
    items: T[];
    onChange: (newItems: T[]) => void;
    label: string;
    fields: (keyof T)[]; // fields to edit, e.g., ['name', 'number', 'url']
}) {
    const add = () => {
        const newItem = fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {} as T);
        onChange([...items, newItem]);
    };

    const update = (index: number, field: keyof T, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const remove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="block font-medium text-gray-700">{label}</label>
            <button onClick={add} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                افزودن مورد جدید
            </button>
            <ul className="space-y-6">
                {items.map((item, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                        {fields.map((field) => (
                            <div key={field as string}>
                                <label className="block text-sm font-medium text-gray-600 capitalize">{field as string}</label>
                                <InlineEdit
                                    value={item[field] ?? ""}
                                    onSave={(v) => update(index, field, v)}
                                />
                            </div>
                        ))}
                        <button onClick={() => remove(index)} className="text-red-600 hover:text-red-800 mt-2">
                            حذف این مورد
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// MenuItemsEditor for navbar submenus
function MenuItemsEditor({
    items,
    onChange,
    label,
}: {
    items: { title: string; description: string; url: string }[];
    onChange: (newItems: { title: string; description: string; url: string }[]) => void;
    label: string;
}) {
    return (
        <ObjectArrayEditor
            items={items}
            onChange={onChange}
            label={label}
            fields={['title', 'description', 'url']}
        />
    );
}

// ====================== SORTABLE PROJECT ITEM ======================
function SortableProjectItem({
    project,
    onRemove,
}: {
    project: ProjectRef;
    onRemove: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: project.projectUrl + project.imageUrl,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center gap-6 bg-white p-5 rounded-xl shadow-md border mb-4 cursor-move"
        >
            <Image src={project.imageUrl.slice(1).startsWith("/") ? project.imageUrl.slice(1) : `/${project.imageUrl.slice(1)}`} alt={project.name} width={140} height={100} className="object-cover rounded-lg" />
            <div className="flex-1">
                <div className="font-semibold text-lg">{project.name}</div>
                <div className="text-sm text-gray-600">{project.projectUrl}</div>
            </div>
            <button onClick={onRemove} className="text-red-600 hover:text-red-800 font-medium">
                حذف
            </button>
        </div>
    );
}

// ====================== PROJECT SELECTOR MODAL ======================
function ProjectSelector({
    onSelect,
    onClose,
}: {
    onSelect: (project: ProjectRef) => void;
    onClose: () => void;
}) {
    const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
        queryKey: ["admin-visible-projects"],
        queryFn: async () => {
            const { data } = await api.get("/projects");
            return data.data || data;
        },
    });

    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const projects: any[] = projectsResponse || [];
    const selectedProject = projects.find((p) => p.id === selectedProjectId);


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 text-right irsans_med">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold">افزودن پروژه</h2>
                    <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-8">
                        <label className="block text-lg font-medium mb-3">انتخاب پروژه</label>
                        {projectsLoading ? (
                            <p>در حال بارگذاری...</p>
                        ) : (
                            <select
                                className="w-full px-4 py-3 border rounded-lg text-right irsans_med"
                                style={{ direction: 'rtl' }}
                                value={selectedProjectId || ""}
                                onChange={(e) =>
                                    setSelectedProjectId(e.target.value ? Number(e.target.value) : null)
                                }
                            >
                                <option value="">-- انتخاب کنید --</option>
                                {projects
                                    .filter((p: any) => p.is_visible !== false)
                                    .map((p: any) => (
                                        <option key={p.id} value={p.id}>
                                            {p.full_name} ({p.slug})
                                        </option>
                                    ))}
                            </select>
                        )}
                    </div>

                    {selectedProject && selectedProject.images?.length > 0 && (
                        <div className="irsans_med text-right" style={{ direction: 'rtl' }}>
                            <label className="block text-lg font-medium mb-4">انتخاب تصویر</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {selectedProject.images.map((img: any) => {
                                    const imageSrc = img.image_url.startsWith("/")
                                        ? img.image_url
                                        : `/${img.image_url}`;

                                    console.log(imageSrc);



                                    return (
                                        <button
                                            key={img.id}
                                            onClick={() =>
                                                onSelect({
                                                    name: selectedProject.full_name,
                                                    projectUrl: `projects/${selectedProject.slug}`,
                                                    imageUrl: imageSrc,
                                                })
                                            }
                                            className="group relative overflow-hidden rounded-lg border-2 border-dashed hover:border-blue-500 transition"
                                        >
                                            <Image
                                                src={imageSrc}
                                                alt=""
                                                width={300}
                                                height={200}
                                                className="w-full h-48 object-cover z-0 group-hover:scale-105 transition"
                                            />
                                            <div className="absolute inset-0 hover:bg-blue-600/30 z-10 bg-opacity-30 group-hover:bg-opacity-30 flex items-center justify-center">
                                                <span className="text-white font-medium opacity-0 group-hover:opacity-100">
                                                    انتخاب
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50">
                    <button onClick={onClose} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    );
}

// ====================== MAIN COMPONENT ======================
export default function AdminSiteConfigPage() {
    const [roleChecked, setRoleChecked] = useState(false);
    const role = useUserRole();

    const queryClient = useQueryClient();

    const {
        data: config,
        isLoading,
        isError,
        error,
    } = useQuery<SiteConfig>({
        queryKey: ["site-config"],
        queryFn: async () => {
            const { data } = await api.get<SiteConfig>("/site");
            return data;
        },
    });

    const mutation = useMutation({
        mutationFn: (update: Partial<SiteConfig>) => api.put("/site", update),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site-config"] }),
    });

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const [showSelector, setShowSelector] = useState<"row1" | "row2" | null>(null);

    useEffect(() => {
        setRoleChecked(true);
    }, []);

    // 1. Hydration-safe role check
    if (!roleChecked) return <div className="text-right irsans_bold p-8" style={{ direction: 'rtl' }}>در حال بررسی دسترسی...</div>;

    // 2. Not admin
    if (role !== "admin") {
        return (
            <div className="flex items-center justify-center min-h-screen text-center irsans_bold" style={{ direction: 'rtl' }}>
                <h1 className="text-4xl text-red-600">دسترسی ممنوع</h1>
                <p className="mt-4 text-xl">شما مجوز دسترسی به پنل مدیریت را ندارید.</p>
            </div>
        );
    }

    // 3. Loading / Error / No config
    if (isLoading) return <div className="p-8 text-lg text-right irsans_bold" style={{ direction: 'rtl' }}>در حال بارگذاری...</div>;

    if (isError) return <div className="p-8 text-red-600 text-right irsans_bold" style={{ direction: 'rtl' }}>خطا: {(error as any)?.message}</div>;

    if (!config || !config.projects) {
        return <div className="p-8 text-orange-600 text-right irsans_bold" style={{ direction: 'rtl' }}>داده‌های سایت ناقص یا خالی است.</div>;
    }

    // 4. NOW 100% SAFE — config exists and has projects
    const handleDragEnd = (event: DragEndEvent, row: "row1" | "row2") => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const rowData = config.projects[row];
        const oldIndex = rowData.findIndex(p => p.projectUrl + p.imageUrl === active.id);
        const newIndex = rowData.findIndex(p => p.projectUrl + p.imageUrl === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newRow = arrayMove(rowData, oldIndex, newIndex);
        mutation.mutate({ projects: { ...config.projects, [row]: newRow } });
    };

    const handleRemove = (row: "row1" | "row2", index: number) => {
        const newRow = config.projects[row].filter((_, i) => i !== index);
        mutation.mutate({ projects: { ...config.projects, [row]: newRow } });
    };

    const handleAdd = (project: ProjectRef) => {
        if (!showSelector) return;
        mutation.mutate({
            projects: { ...config.projects, [showSelector]: [...config.projects[showSelector], project] },
        });
        setShowSelector(null);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl mb-10 text-right irsans_med" style={{ direction: 'rtl' }}>ویرایش صفحه جی شید</h1>

            {/* Navbar Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">منو</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">لوگو</h3>
                        <ImageInput value={config.navbar.logo} width={70} onChange={(v) => mutation.mutate({ navbar: { ...config.navbar, logo: v } })} label="" />
                    </div>

                    {/* About Menu */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">بخش درباره ما</h3>
                        <InlineEdit value={config.navbar.about.title ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, about: { ...config.navbar.about, title: v } } })} />
                        <MenuItemsEditor items={config.navbar.about.menu_items || []} onChange={(items) => mutation.mutate({ navbar: { ...config.navbar, about: { ...config.navbar.about, menu_items: items } } })} label="" />
                        <InlineEdit value={config.navbar.about.url ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, about: { ...config.navbar.about, url: v } } })} />
                    </div>

                    {/* Activities Menu */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">بخش فعالیت‌ها</h3>
                        <InlineEdit value={config.navbar.activities.title ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, activities: { ...config.navbar.activities, title: v } } })} />
                        <MenuItemsEditor items={config.navbar.activities.menu_items || []} onChange={(items) => mutation.mutate({ navbar: { ...config.navbar, activities: { ...config.navbar.activities, menu_items: items } } })} label="" />
                        <InlineEdit value={config.navbar.activities.url ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, activities: { ...config.navbar.activities, url: v } } })} />
                    </div>

                    {/* Projects Menu */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">بخش پروژه‌ها</h3>
                        <InlineEdit value={config.navbar.projects.title ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, projects: { ...config.navbar.projects, title: v } } })} />
                        <InlineEdit value={config.navbar.projects.url ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, projects: { ...config.navbar.projects, url: v } } })} />
                    </div>

                    {/* Lodge Menu */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">بخش لژ</h3>
                        <InlineEdit value={config.navbar.lodge.title ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, lodge: { ...config.navbar.lodge, title: v } } })} />
                        <InlineEdit value={config.navbar.lodge.url ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, lodge: { ...config.navbar.lodge, url: v } } })} />
                    </div>

                    {/* Contact Menu */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">بخش تماس</h3>
                        <InlineEdit value={config.navbar.contact.title ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, contact: { ...config.navbar.contact, title: v } } })} />
                        <InlineEdit value={config.navbar.contact.url ?? ""} onSave={(v) => mutation.mutate({ navbar: { ...config.navbar, contact: { ...config.navbar.contact, url: v } } })} />
                    </div>
                </div>
            </section>

            {/* Title */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl irsans_med mb-4">عنوان سایت</h2>
                <InlineEdit
                    value={config.title ?? ""}
                    onSave={(v) => mutation.mutate({ title: v.trim() === "" ? undefined : v })}
                />
            </section>

            {/* Projects */}
            <section className="space-y-12 mb-12">
                <h2 className="text-2xl irsans_med mb-8 text-right">پروژه‌های صفحه اصلی</h2>

                {/* Row 1 */}
                <div className="bg-white p-8 rounded-xl irsans_med shadow text-right" style={{ direction: 'rtl' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-medium">ردیف اول</h3>
                        <button
                            onClick={() => setShowSelector("row1")}
                            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            + افزودن پروژه
                        </button>
                    </div>

                    {config.projects.row1.length === 0 ? (
                        <p className="text-gray-500 italic text-right irsans_bold" style={{ direction: 'rtl' }}>هیچ پروژه‌ای در ردیف اول وجود ندارد.</p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) => handleDragEnd(e, "row1")}
                        >
                            <SortableContext
                                items={config.projects.row1.map((p) => p.projectUrl + p.imageUrl)}
                                strategy={verticalListSortingStrategy}
                            >
                                {config.projects.row1.map((project, index) => (
                                    <SortableProjectItem
                                        key={`${project.projectUrl}-${project.imageUrl}-${index}`}
                                        project={project}
                                        onRemove={() => handleRemove("row1", index)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>

                {/* Row 2 */}
                <div className="bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-medium">ردیف دوم</h3>
                        <button
                            onClick={() => setShowSelector("row2")}
                            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            + افزودن پروژه
                        </button>
                    </div>

                    {config.projects.row2.length === 0 ? (
                        <p className="text-gray-500 italic">هیچ پروژه‌ای در ردیف دوم وجود ندارد.</p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) => handleDragEnd(e, "row2")}
                        >
                            <SortableContext
                                items={config.projects.row2.map((p) => p.projectUrl + p.imageUrl)}
                                strategy={verticalListSortingStrategy}
                            >
                                {config.projects.row2.map((project, index) => (
                                    <SortableProjectItem
                                        key={`${project.projectUrl}-${project.imageUrl}-${index}`}
                                        project={project}
                                        onRemove={() => handleRemove("row2", index)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </section>

            {/* About Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">بخش درباره ما</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">عنوان</h3>
                        <InlineEdit value={config.about.title ?? ""} onSave={(v) => mutation.mutate({ about: { ...config.about, title: v } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">توضیحات</h3>
                        <InlineEdit value={config.about.description ?? ""} onSave={(v) => mutation.mutate({ about: { ...config.about, description: v } })} multiline />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">زیرعنوان‌ها</h3>
                        <StringArrayEditor
                            items={config.about.subitle || []}
                            onChange={(items) => mutation.mutate({ about: { ...config.about, subitle: items } })}
                            label=""
                        />
                    </div>

                    <div>
                        <ImageInput
                            value={config.about.image}
                            onChange={(url) => mutation.mutate({ about: { ...config.about, image: url } })}
                            label=""
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">بخش آمار</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">عنوان</h3>
                        <InlineEdit value={config.stats.title ?? ""} onSave={(v) => mutation.mutate({ stats: { ...config.stats, title: v } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">آمارها</h3>
                        <ObjectArrayEditor
                            items={config.stats.stats || []}
                            onChange={(newStats) => mutation.mutate({ stats: { ...config.stats, stats: newStats } })}
                            label=""
                            fields={['name', 'number', 'url']}
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">بخش خدمات</h2>

                <ObjectArrayEditor
                    items={config.services || []}
                    onChange={(newServices) => mutation.mutate({ services: newServices })}
                    label=""
                    fields={['title', 'videoUrl', 'initialGrow', 'finalGrow']}
                />
            </section>

            {/* Lodge Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">بخش گروه ساختمانی لژ</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">عنوان</h3>
                        <InlineEdit value={config.lodge.title ?? ""} onSave={(v) => mutation.mutate({ lodge: { ...config.lodge, title: v } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">توضیحات</h3>
                        <InlineEdit value={config.lodge.description ?? ""} onSave={(v) => mutation.mutate({ lodge: { ...config.lodge, description: v } })} multiline />
                    </div>

                    <div>
                        <ImageInput
                            value={config.lodge.lodge_logo}
                            onChange={(url) => mutation.mutate({ lodge: { ...config.lodge, lodge_logo: url } })}
                            label=""
                        />
                    </div>
                </div>
            </section>

            {/* Lodge Projects Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">پروژه‌های لژ</h2>

                <ObjectArrayEditor
                    items={config.lodge_projects || []}
                    onChange={(newProjects) => mutation.mutate({ lodge_projects: newProjects })}
                    label=""
                    fields={['name', 'image']}
                />
            </section>

            {/* Licenses Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">بخش گواهینامه‌ها</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">عنوان</h3>
                        <InlineEdit value={config.licenses.title ?? ""} onSave={(v) => mutation.mutate({ licenses: { ...config.licenses, title: v } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">گواهینامه‌ها</h3>
                        <ObjectArrayEditor
                            items={config.licenses.certificates || []}
                            onChange={(newCerts) => mutation.mutate({ licenses: { ...config.licenses, certificates: newCerts } })}
                            label=""
                            fields={['title', 'logo']}
                        />
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <section className="mb-12 bg-white p-8 rounded-xl shadow text-right irsans_med" style={{ direction: 'rtl' }}>
                <h2 className="text-2xl font-semibold mb-6">بخش فوتر</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">عنوان فوتر</h3>
                        <InlineEdit value={config.footer.title ?? ""} onSave={(v) => mutation.mutate({ footer: { ...config.footer, title: v } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">عنوان تماس</h3>
                        <InlineEdit value={config.footer.contact.title ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, title: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">آدرس</h3>
                        <InlineEdit value={config.footer.contact.address ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, address: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">موبایل</h3>
                        <InlineEdit value={config.footer.contact.cellphone ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, cellphone: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">تلفن</h3>
                        <InlineEdit value={config.footer.contact.phone ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, phone: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">ایمیل</h3>
                        <InlineEdit value={config.footer.contact.email ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, email: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">اینستاگرام</h3>
                        <InlineEdit value={config.footer.contact.instagram ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, instagram: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">واتساپ</h3>
                        <InlineEdit value={config.footer.contact.whatsapp ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, whatsapp: v } } })} />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">تلگرام</h3>
                        <InlineEdit value={config.footer.contact.telegram ?? ""} onSave={(v) => mutation.mutate({ footer: { contact: { ...config.footer.contact, telegram: v } } })} />
                    </div>
                </div>
            </section>

            {showSelector && <ProjectSelector onSelect={handleAdd} onClose={() => setShowSelector(null)} />}
        </div>
    );
}