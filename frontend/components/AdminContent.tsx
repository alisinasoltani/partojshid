"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  projects: ProjectsSection;
  // You can add more fields later: about, stats, services, navbar, etc.
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

// ====================== INLINE EDIT COMPONENT ======================
type InlineEditProps = {
  value: string;
  onSave: (newValue: string) => void;
};

function InlineEdit({ value, onSave }: InlineEditProps) {
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
        className="cursor-pointer hover:bg-gray-100 px-3 py-2 -mx-3 rounded-lg inline-block"
      >
        {value || "(خالی)"}
      </div>
    );
  }

  return (
    <input
      autoFocus
      type="text"
      className="px-3 py-2 border border-gray-400 rounded-lg bg-white w-full min-w-[300px]"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && handleBlur()}
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.projectUrl + project.imageUrl });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-6 bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-4 cursor-move"
    >
      <Image
        src={project.imageUrl}
        alt={project.name}
        width={140}
        height={100}
        className="object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="font-semibold text-lg">{project.name}</div>
        <div className="text-sm text-gray-600">{project.projectUrl}</div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-600 hover:text-red-800 font-medium"
      >
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
      return data.data || data; // adjust based on your API response
    },
  });

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const projects: any[] = projectsResponse || [];
  const selectedProject = projects.find((p: any) => p.id === selectedProjectId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
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
                className="w-full px-4 py-3 border rounded-lg"
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
            <div>
              <label className="block text-lg font-medium mb-4">انتخاب تصویر</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selectedProject.images.map((img: any) => {
                  const imageSrc = img.image_url.startsWith("/")
                    ? img.image_url
                    : `/${img.image_url}`;

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
                        className="w-full h-48 object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center">
                        <span className="text-white font-bold opacity-0 group-hover:opacity-100">
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
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

// ====================== ADMIN CONTENT (SAFE) ======================
export function AdminContent({ config }: { config: SiteConfig }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updated: Partial<SiteConfig>) => api.put("/site", updated),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site-config"] }),
  });

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const [showSelector, setShowSelector] = useState<"row1" | "row2" | null>(null);

  const handleDragEnd = (event: DragEndEvent, row: "row1" | "row2") => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentRow = config.projects[row];
    const oldIndex = currentRow.findIndex((p) => p.projectUrl + p.imageUrl === (active.id as string));
    const newIndex = currentRow.findIndex((p) => p.projectUrl + p.imageUrl === (over.id as string));

    if (oldIndex === -1 || newIndex === -1) return;

    const newRow = arrayMove(currentRow, oldIndex, newIndex);

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
      <h1 className="text-3xl font-bold mb-10">ویرایش تنظیمات سایت</h1>

      <section className="mb-12 bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">عنوان سایت</h2>
        <InlineEdit
          value={config.title ?? ""}
          onSave={(v) => mutation.mutate({ title: v.trim() === "" ? undefined : v })}
        />
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-semibold mb-8">پروژه‌های صفحه اصلی</h2>

        {/* Row 1 */}
        <div className="bg-white p-8 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">ردیف اول</h3>
            <button
              onClick={() => setShowSelector("row1")}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + افزودن پروژه
            </button>
          </div>

          {config.projects.row1.length === 0 ? (
            <p className="text-gray-500">هیچ پروژه‌ای اضافه نشده</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, "row1")}>
              <SortableContext items={config.projects.row1.map((p) => p.projectUrl + p.imageUrl)} strategy={verticalListSortingStrategy}>
                {config.projects.row1.map((project, idx) => (
                  <SortableProjectItem key={project.projectUrl + project.imageUrl} project={project} onRemove={() => handleRemove("row1", idx)} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Row 2 */}
        <div className="bg-white p-8 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">ردیف دوم</h3>
            <button
              onClick={() => setShowSelector("row2")}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + افزودن پروژه
            </button>
          </div>

          {config.projects.row2.length === 0 ? (
            <p className="text-gray-500">هیچ پروژه‌ای اضافه نشده</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, "row2")}>
              <SortableContext items={config.projects.row2.map((p) => p.projectUrl + p.imageUrl)} strategy={verticalListSortingStrategy}>
                {config.projects.row2.map((project, idx) => (
                  <SortableProjectItem key={project.projectUrl + project.imageUrl} project={project} onRemove={() => handleRemove("row2", idx)} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </section>

      {showSelector && <ProjectSelector onSelect={handleAdd} onClose={() => setShowSelector(null)} />}
    </div>
  );
}

// ====================== MAIN PAGE COMPONENT ======================
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
  if (!roleChecked) return <div className="p-8">در حال بررسی دسترسی...</div>;

  // 2. Not admin
  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">دسترسی ممنوع</h1>
        <p className="mt-4 text-xl">شما مجوز دسترسی به پنل مدیریت را ندارید.</p>
      </div>
    );
  }

  // 3. Loading / Error / No config
  if (isLoading) return <div className="p-8 text-lg">در حال بارگذاری...</div>;

  if (isError) return <div className="p-8 text-red-600">خطا: {(error as any)?.message}</div>;

  if (!config || !config.projects) {
    return <div className="p-8 text-orange-600">داده‌های سایت ناقص یا خالی است.</div>;
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
      <h1 className="text-3xl font-bold mb-10">ویرایش تنظیمات سایت</h1>

      <section className="mb-12 bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">عنوان سایت</h2>
        <InlineEdit
          value={config.title ?? ""}
          onSave={(v) => mutation.mutate({ title: v.trim() === "" ? undefined : v })}
        />
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-semibold mb-8">پروژه‌های صفحه اصلی</h2>

        {/* Row 1 & Row 2 — same as before */}
        {/* ... (keep the Row 1 and Row 2 JSX exactly as in previous full version) ... */}

      </section>

      {showSelector && <ProjectSelector onSelect={handleAdd} onClose={() => setShowSelector(null)} />}
    </div>
  );
}