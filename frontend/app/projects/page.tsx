"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ProjectButton from "@/components/ProjectButton";
import "swiper/css";
import "swiper/css/navigation";

const ProjectImageSchema = z.object({
    image_url: z.string(),
    alt_text: z.string(),
    sort_order: z.number().optional(),
}).passthrough().optional();

const ProjectSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    started_at_jalali: z.string(),
    ended_at_jalali: z.string().nullable().optional(),
    employer: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    images: z.array(ProjectImageSchema).default([]), // ← DEFAULT EMPTY ARRAY!
}).passthrough();

const PaginatedResponseSchema = z.object({
    data: z.array(ProjectSchema),
    total: z.number(),
    page: z.number(),
    per_page: z.number(),
    total_pages: z.number(),
}).passthrough();

type Project = z.infer<typeof ProjectSchema>;
type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;

// Final fetch function
async function fetchProjects(page: number = 1): Promise<PaginatedResponse> {
    const res = await fetch(`/api/projects?page=${page}&per_page=10`, {
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status}`);
    }

    const json = await res.json();
    const result = PaginatedResponseSchema.safeParse(json);

    if (!result.success) {
        console.error("Validation failed but continuing:", result.error.issues);
        // Fallback: just return raw data if validation fails
        return json as PaginatedResponse;
    }

    return result.data;
}

const navbar_input = {
    "logo": "/images/favicon.ico",
    "about": {
        "title": "درباره ما",
        "menu_items": [
            {
                "title": "در یک نگاه",
                "description": "",
                "url": "#"
            },
            {
                "title": "",
                "description": "تاریخچه",
                "url": "#"
            },
            {
                "title": "استراتژی",
                "description": "",
                "url": "#"
            },
            {
                "title": "مدیریت",
                "description": "",
                "url": "#"
            }
        ],
        "url": ""
    },
    "activities": {
        "title": "فعالیت ها",
        "menu_items": [
            {
                "title": "طراحی و اجرا",
                "description": "اجرای پروژه‌های ساختمانی از صفر تا صد.",
                "url": "#"
            },
            {
                "title": "پروژه های پیش فروش",
                "description": "پیش فروش پروژه های در حال ساخت گروه ساختمانی لژ.",
                "url": "#"
            },
            {
                "title": "پروژه های فعال",
                "description": "پرتو جی شید با فعالیت در زمینه های ابنیه و تاسیسات در حال ادامه فعالیت های خود می باشد.",
                "url": "#"
            },
            {
                "title": "مشارکت در ساخت",
                "description": "گروه ساختمانی لژ",
                "url": "#"
            }
        ],
        "url": ""
    },
    "projects": {
        "title": "پروژه ها",
        "menu_items": [],
        "url": ""
    },
    "lodge": {
        "title": "کروه ساختمانی لژ",
        "menu_items": [],
        "url": ""
    },
    "contact": {
        "title": "تماس با ما",
        "menu_items": [],
        "url": ""
    }
};

const footer_input = {
    "title": "شرکت پرتو جی شید (سهامی خاص)",
    "contact": {
        "title": "تماس با ما",
        "address": "خیابان چهارباغ بالا شریعتی شرقی رو به روی بانک آینده ساختمان الماس طبقه ۳ واحد ۱۲",
        "cellphone": "09013682870",
        "phone": "03136286668",
        "email": "pjs.civil@gmail.com",
        "instagram": "https://www.instagram.com/pjs.civil",
        "whatsapp": "/images/whatsapp.avif",
        "telegram": "https://t.me/Pjs_co"
    }
};

export default function ProjectList() {
    const [page, setPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["projects", page],
        queryFn: () => fetchProjects(page),
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const projects = data?.data ?? [];
    const totalPages = data?.total_pages ?? 1;

    return (
        <div className="container mx-auto pt-12 px-0" dir="rtl">
            <Navbar input={navbar_input} />
            <div className="flex justify-center items-center gap-1">
                <div className="h-1 w-24 bg-[#5E55FF] rounded-full"></div>
                <h1 className="irsans_bold text-4xl text-center py-16">پروژه ها</h1>
                <div className="h-1 w-24 bg-[#5E55FF] rounded-full"></div>
            </div>
            {/* Loading */}
            {isLoading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="flex gap-6">
                                    <Skeleton className="w-40 h-40 rounded-lg" />
                                    <div className="space-y-4 flex-1">
                                        <Skeleton className="h-8 w-4/5" />
                                        <Skeleton className="h-5 w-1/2" />
                                        <Skeleton className="h-5 w-1/3" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="text-center py-16 text-red-600">
                    <p className="text-xl mb-4">
                        خطا هنگام بارگیری پروژه ها: {(error as Error)?.message}
                    </p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            )}

            {/* Projects Grid */}
            {projects.length > 0 && (
                <>
                    <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-center px-6 md:px-12 mb-12">
                        <div className="w-full md:w-2/3 py-0">
                            <Card
                                key={projects[0].id}
                                className="overflow-hidden transition-all p-0 h-120 border-0"
                                style={{ direction: 'rtl' }}>
                                <CardContent className="p-0 m-0 h-full" style={{ direction: 'rtl' }}>
                                    <div className="flex flex-col md:flex-row h-full w-full p-0">
                                        <div className="relative h-1/2 md:h-auto md:w-1/2 p-0">
                                            {projects[0].images[0] ? (
                                                <Image
                                                    src={`/${projects[0].images[0].image_url}`}
                                                    alt={projects[0].images[0].alt_text || projects[0].full_name}
                                                    fill
                                                    className="object-cover h-full"
                                                />
                                            ) : (
                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                                    بدون تصویر
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 space-y-3 flex-1 flex items-start flex-col justify-center text-right h-full">
                                            <h3 className="irsans_bold text-lg m:text-xl max-w-85 line-clamp-2">
                                                {projects[0].full_name}
                                            </h3>
                                            <div className="text-sm md:text-lg text-muted-foreground irsans_med">
                                                <div>
                                                    شروع: {projects[0].started_at_jalali}
                                                </div>
                                                <div>
                                                    پایان: {projects[0].ended_at_jalali || "در حال اجرا"}
                                                </div>
                                            </div>
                                            {projects[0].employer && (
                                                <p className="text-sm md:text-lg irsans_med">
                                                    کارفرما: {projects[0].employer}
                                                </p>
                                            )}
                                            <ProjectButton href="" onClick={() => setSelectedProject(projects[0])} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-full md:w-1/3 py-0">
                            <Card
                                key={projects[1].id}
                                className="overflow-hidden transition-all p-0 h-120 border-0"
                                style={{ direction: 'rtl' }}>
                                <CardContent className="p-0 m-0 h-full" style={{ direction: 'rtl' }}>
                                    <div className="flex flex-col h-full w-full p-0">
                                        <div className="relative h-1/2 p-0">
                                            {projects[1].images[0] ? (
                                                <Image
                                                    src={`/${projects[1].images[0]!.image_url}`}
                                                    alt={projects[1].images[0]!.alt_text || projects[0].full_name}
                                                    fill
                                                    className="object-cover h-full"
                                                />
                                            ) : (
                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                                    بدون تصویر
                                                </div>
                                            )}
                                        </div>

                                        <div className="px-6 gap-2 flex items-start flex-col justify-center text-right h-1/2">
                                            <h3 className="irsans_bold text-lg md:text-xl max-w-85 line-clamp-2">
                                                {projects[1].full_name}
                                            </h3>
                                            <div className="text-sm md:text-[16px] text-muted-foreground irsans_med">
                                                <div>
                                                    شروع: {projects[1].started_at_jalali}
                                                </div>
                                                <div>
                                                    پایان: {projects[1].ended_at_jalali || "در حال اجرا"}
                                                </div>
                                            </div>
                                            {projects[0].employer && (
                                                <p className="text-sm md:text-[16px] irsans_med">
                                                    کارفرما: {projects[1].employer}
                                                </p>
                                            )}
                                            <ProjectButton href="" onClick={() => setSelectedProject(projects[1])} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row-reverse gap-8 justify-center items-center px-6 md:px-12 mb-12">
                        <div className="w-full md:w-2/3 py-0">
                            <Card
                                key={projects[2].id}
                                className="overflow-hidden transition-all p-0 h-120 border-0"
                                style={{ direction: 'rtl' }}>
                                <CardContent className="p-0 m-0 h-full" style={{ direction: 'rtl' }}>
                                    <div className="flex flex-col md:flex-row h-full w-full p-0">
                                        <div className="relative h-1/2 md:h-auto md:w-1/2 p-0">
                                            {projects[2].images[0] ? (
                                                <Image
                                                    src={`/${projects[2].images[0].image_url}`}
                                                    alt={projects[2].images[0].alt_text || projects[0].full_name}
                                                    fill
                                                    className="object-cover h-full"
                                                />
                                            ) : (
                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                                    بدون تصویر
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 space-y-3 flex-1 flex items-start flex-col justify-center text-right h-full">
                                            <h3 className="irsans_bold text-lg md:text-xl max-w-85 line-clamp-2">
                                                {projects[2].full_name}
                                            </h3>
                                            <div className="text-sm md:text-lg text-muted-foreground irsans_med">
                                                <div>
                                                    شروع: {projects[2].started_at_jalali}
                                                </div>
                                                <div>
                                                    پایان: {projects[2].ended_at_jalali || "در حال اجرا"}
                                                </div>
                                            </div>
                                            {projects[2].employer && (
                                                <p className="text-sm md:text-lg irsans_med">
                                                    کارفرما: {projects[2].employer}
                                                </p>
                                            )}
                                            <ProjectButton href="" onClick={() => setSelectedProject(projects[2])} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-full md:w-1/3 py-0">
                            <Card
                                key={projects[3].id}
                                className="overflow-hidden transition-all p-0 h-120 border-0"
                                style={{ direction: 'rtl' }}>
                                <CardContent className="p-0 m-0 h-full" style={{ direction: 'rtl' }}>
                                    <div className="flex flex-col h-full w-full p-0">
                                        <div className="relative h-1/2 p-0">
                                            {projects[3].images[0] ? (
                                                <Image
                                                    src={`/${projects[3].images[0]!.image_url}`}
                                                    alt={projects[3].images[0]!.alt_text || projects[3].full_name}
                                                    fill
                                                    className="object-cover h-full"
                                                />
                                            ) : (
                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                                    بدون تصویر
                                                </div>
                                            )}
                                        </div>

                                        <div className="px-6 gap-2 flex items-start flex-col justify-center text-right h-1/2">
                                            <h3 className="irsans_bold text-lg md:text-xl max-w-85 line-clamp-2">
                                                {projects[3].full_name}
                                            </h3>
                                            <div className="text-sm md:text-[16px] text-muted-foreground irsans_med">
                                                <div>
                                                    شروع: {projects[3].started_at_jalali}
                                                </div>
                                                <div>
                                                    پایان: {projects[3].ended_at_jalali || "در حال اجرا"}
                                                </div>
                                            </div>
                                            {projects[0].employer && (
                                                <p className="text-sm md:text-[16px] irsans_med">
                                                    کارفرما: {projects[3].employer}
                                                </p>
                                            )}
                                            <ProjectButton href="" onClick={() => setSelectedProject(projects[3])} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-3 px-6 w-full md:px-12">
                        {projects.slice(4).map((project) => {
                            const firstImage = project.images?.[0];

                            return (
                                <Card
                                    key={project.id}
                                    className="w-full h-full p-0 m-0 overflow-hidden transition-all border-0">
                                    <CardContent className="p-0 h-full">
                                        <div className="flex flex-col md:flex-row h-full w-full">
                                            <div className="relative h-60 md:h-auto md:w-1/2 p-0">
                                                {firstImage ? (
                                                    <Image
                                                        src={`/${firstImage.image_url}`}
                                                        alt={firstImage.alt_text || project.full_name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                                        بدون تصویر
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6 space-y-3 flex-1 flex flex-col justify-center items-start">
                                                <h3 className="irsans_bold text-lg line-clamp-2">
                                                    {project.full_name}
                                                </h3>
                                                <div className="text-sm text-muted-foreground irsans_med">
                                                    <div>
                                                        تاریخ شروع: {project.started_at_jalali}
                                                    </div>
                                                    <div>
                                                        تاریخ پایان: {project.ended_at_jalali || "در حال اجرا"}
                                                    </div>
                                                </div>
                                                {project.employer && (
                                                    <p className="text-sm font-medium">
                                                        کارفرما: {project.employer}
                                                    </p>
                                                )}
                                                <ProjectButton href="" onClick={() => setSelectedProject(project)} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-6 pt-16 pb-8 irsans_med">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                قبلی
                            </Button>
                            <span className="text-lg">
                                صفحه <strong>{page}</strong> از <strong>{totalPages}</strong>
                            </span>
                            <Button
                                variant="outline"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                بعدی
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Project Detail Dialog */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="z-120 border-gray-400 bg-white max-w-6xl max-h-[80vh] overflow-y-auto p-8 text-right flex flex-col justify-center items-center" style={{ direction: 'rtl' }}>
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="irsans_bold text-xl max-w-85 line-clamp-2 text-center">
                                    {selectedProject.full_name}
                                </DialogTitle>
                            </DialogHeader>

                            {selectedProject.images?.length ? (
                                <div className="relative w-full h-96 my-4 rounded-xl overflow-hidden bg-black">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        loop={selectedProject.images.length > 1}
                                        className="h-full w-full"
                                    >
                                        {(selectedProject.images || [])
                                            .filter((img): img is NonNullable<typeof img> & { image_url: string } =>
                                                !!img && typeof img.image_url === "string"
                                            )
                                            .map((img, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={`/${img.image_url}`}
                                                            alt={img.alt_text ?? selectedProject.full_name}
                                                            fill
                                                            className="object-contain"
                                                            priority
                                                            unoptimized
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                            ) : (
                                <div className="h-96 bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-lg">
                                    تصویری موجود نیست
                                </div>
                            )}

                            {/* Details */}
                            <div className="space-y-4 text-lg leading-relaxed text-center">
                                <div className="text-sm md:text-lg text-muted-foreground irsans_med">
                                    <div>
                                        تاریخ شروع: {projects[0].started_at_jalali}
                                    </div>
                                    <div>
                                        تاریخ پایان: {projects[0].ended_at_jalali || "در حال اجرا"}
                                    </div>
                                </div>
                                {selectedProject.employer && (
                                    <div className="text-center">
                                        <strong>کارفرما:</strong> {selectedProject.employer}
                                    </div>
                                )}
                                {selectedProject.description && selectedProject.description.trim() && (
                                    <div className="text-center">
                                        <strong>توضیحات:</strong>
                                        <p className="mt-3 text-base leading-7 text-muted-foreground whitespace-pre-wrap">
                                            {selectedProject.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
            <Footer input={footer_input} />
        </div>
    );
}