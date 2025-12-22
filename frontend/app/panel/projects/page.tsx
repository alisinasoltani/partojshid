'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import api from '@/lib/api';
import { Project, PaginatedProjects, UpdateProjectRequest } from '@/types/Project';
import InlineEdit from '@/components/InlineEdit';
import ImageManagementDialog from '@/components/ImageManagementDialog';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from 'lucide-react';

// Zod schema for project fields (partial for updates)
const projectSchema = z.object({
    full_name: z.string().min(3).max(255),
    description: z.string().optional(),
    started_at_jalali: z.string().optional(),
    ended_at_jalali: z.string().optional().nullable(),
    employer: z.string().max(255),
});

type ProjectForm = z.infer<typeof projectSchema>;

function SortableRow({ project, onUpdate, queryClient }: { project: Project; onUpdate: () => void; queryClient: any }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id });
    const style = { transform: CSS.Transform.toString(transform), transition };
    const form = useForm<ProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            full_name: project.full_name,
            description: project.description || '',
            started_at_jalali: project.started_at_jalali || '',
            ended_at_jalali: project.ended_at_jalali || '',
            employer: project.employer || '',
        },
    });

    const handleSave = async (name: string, value: string) => {
        try {
            const update: UpdateProjectRequest = { [name]: value };
            await api.put(`/projects/${project.id}`, update);
            toast.success(`${name} بروز شد`);
            onUpdate();
        } catch (err) {
            toast.error(`خطا در بروزرسانی ${name}`);
        }
    };

    const handleToggleVisible = async (checked: boolean) => {
        try {
            await api.put(`/projects/${project.id}`, { is_visible: checked } as UpdateProjectRequest);
            toast.success('وضعیت نمایش تغییر کرد');
            onUpdate();
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        } catch (err) {
            toast.error('خطا در تغییر وضعیت نمایش');
        }
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell>
                <div {...attributes} {...listeners} className="cursor-grab">
                    <GripVertical size={16} />
                </div>
            </TableCell>
            <TableCell>{project.id}</TableCell>
            <TableCell>
                <InlineEdit name="full_name" value={project.full_name} form={form} onSave={handleSave} />
            </TableCell>
            <TableCell>
                <InlineEdit name="description" value={project.description || '—'} form={form} onSave={handleSave} />
            </TableCell>
            <TableCell>
                <InlineEdit name="started_at_jalali" value={project.started_at_jalali || '—'} form={form} onSave={handleSave} />
            </TableCell>
            <TableCell>
                <InlineEdit name="ended_at_jalali" value={project.ended_at_jalali || '—'} form={form} onSave={handleSave} />
            </TableCell>
            <TableCell>
                <InlineEdit name="employer" value={project.employer || '—'} form={form} onSave={handleSave} />
            </TableCell>
            <TableCell>
                <Toggle
                    checked={project.is_visible}
                    onCheckedChange={handleToggleVisible}
                    className="toggle-md toggle-success"
                />
            </TableCell>
            <TableCell>{project.updated_at}</TableCell>
            <TableCell>
                <ImageManagementDialog
                    projectName={project.full_name}
                    projectId={project.id.toString()}
                    images={project.images}
                    onUpdate={onUpdate}
                />
            </TableCell>
        </TableRow>
    );
}

export default function ProjectsPanel() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery<PaginatedProjects>({
        queryKey: ['projects'],
        queryFn: async () => {
            const token = Cookies.get('jeyshid');
            if (!token) throw new Error('No token');

            const res = await fetch('http://localhost:8080/api/projects?editor=1&per_page=1000', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Failed to fetch');
            }

            return await res.json();
        },
    });

    const [projects, setProjects] = useState<Project[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        if (data?.data) {
            const sorted = [...data.data].sort((a, b) => a.display_order - b.display_order);
            setProjects(sorted);
        }
    }, [data]);

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = projects.findIndex((p) => p.id === active.id);
        const newIndex = projects.findIndex((p) => p.id === over.id);
        const newProjects = arrayMove(projects, oldIndex, newIndex);
        setProjects(newProjects);

        const prev = newIndex > 0 ? newProjects[newIndex - 1] : null;
        const next = newIndex < newProjects.length - 1 ? newProjects[newIndex + 1] : null;

        let newOrder = 100;
        if (prev && next) {
            newOrder = Math.round((prev.display_order + next.display_order) / 2);
        } else if (prev) {
            newOrder = prev.display_order + 100;
        } else if (next) {
            newOrder = next.display_order - 100;
        }

        if (newOrder < 10) newOrder = 10;

        try {
            await api.put(`/projects/${active.id}`, { display_order: newOrder } as UpdateProjectRequest);
            toast.success('ترتیب پروژه‌ها بروز شد');
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        } catch (error) {
            setProjects(data?.data || []);
            toast.error('خطا در ذخیره ترتیب جدید');
        }
    };

    if (isLoading) return <p>در حال بارگیری...</p>;

    return (
        <div className="w-full h-full p-4" style={{ direction: 'rtl' }}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <Table className='w-full h-[90vh]' style={{ direction: 'rtl' }}>
                    <TableHeader className='w-full text-right' style={{ direction: 'rtl' }}>
                        <TableRow className='w-full irsans_med text-right' style={{ direction: 'rtl' }}>
                            <TableHead className='text-right'>ترتیب</TableHead>
                            <TableHead className='text-right'>ID</TableHead>
                            <TableHead className='text-right'>نام کامل پروژه</TableHead>
                            <TableHead className='text-right'>توضیحات</TableHead>
                            <TableHead className='text-right'>شروع (جلالی)</TableHead>
                            <TableHead className='text-right'>پایان (جلالی)</TableHead>
                            <TableHead className='text-right'>کارفرما</TableHead>
                            <TableHead className='text-right'>نمایش</TableHead>
                            <TableHead className='text-right'>آخرین بروزرسانی</TableHead>
                            <TableHead className='text-right'>تصاویر</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full h-full text-right' style={{ direction: 'rtl' }}>
                        <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                            {projects.map((project) => (
                                <SortableRow
                                    key={project.id}
                                    project={project}
                                    onUpdate={() => queryClient.invalidateQueries({ queryKey: ['projects'] })}
                                    queryClient={queryClient}
                                />
                            ))}
                        </SortableContext>
                    </TableBody>
                </Table>
            </DndContext>
        </div>
    );
}