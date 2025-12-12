import React from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import ProjectButton from "./ProjectButton";

// --- Type Definitions ---

type ProjectPost = {
  id: string;
  title: string;
  date: string;
  href: string;
  imageUrl?: string; // Optional: only for the main post
};

/**
 * A reusable date display with icon.
 */
interface ProjectDateProps {
  date: string;
  className?: string; // Allow custom classes
}

const ProjectDate: React.FC<ProjectDateProps> = ({ date, className = "" }) => {
  return (
    // text-gray-700 for small cards, text-white for main card
    <div className={`flex flex-row items-center justify-center gap-1 text-xs ${className}`}>
      <Calendar className="flex justify-center items-center h-full" size={14} />
      <span className=" flex h-full items-center">{date}</span>
    </div>
  );
};

/**
 * A card for the small project grid.
 */
interface SmallProjectCardProps {
  project: ProjectPost;
}

const SmallProjectCard: React.FC<SmallProjectCardProps> = ({ project }) => {
  return (
    // Solid white background with border and shadow, as seen in image
    <div className="flex h-full flex-col justify-between rounded-lg border border-[#E7E7E7] bg-white p-4 shadow-md z-10">
      <div>
        {/* Date at the top right */}
        <div className="mb-4 flex justify-start">
          <ProjectDate date={project.date} className="text-gray-600" />
        </div>
        <h3 className="mb-4 text-base irsans_med text-gray-800">
          {project.title}
        </h3>
      </div>
      {/* Button at the bottom left */}
      <div className="flex justify-start">
        <ProjectButton href={project.href} />
      </div>
    </div>
  );
};

// --- Mock Data ---

const mainProject: ProjectPost = {
  id: "main",
  title: "عنوان خبر در این قسمت قرار می گیرد",
  date: "1404/08/12",
  href: "",
  // Replace with your actual image path
  imageUrl:
    "/images/DesignAndExe.avif",
};

const otherProjects: ProjectPost[] = [
  {
    id: "p1",
    title: "عنوان خبر در این قسمت قرار می گیرد",
    date: "1404/08/12",
    href: "",
  },
  {
    id: "p2",
    title: "عنوان خبر در این قسمت قرار می گیرد",
    date: "1404/08/12",
    href: "",
  },
  {
    id: "p3",
    title: "عنوان خبر در این قسمت قرار می گیرد",
    date: "1404/08/12",
    href: "",
  },
  {
    id: "p4",
    title: "عنوان خبر در این قسمت قرار می گیرد",
    date: "1404/08/12",
    href: "",
  },
];

// --- Main Component ---

const News: React.FC = () => {
  return (
    <section dir="rtl" className="w-full bg-transparent py-8 flex flex-col items-center pt-20">
      {/* Section Header */}
      <div className="mb-6 place-self-start flex flex-row items-center justify-start gap-2 md:gap-4">
        {/* The purple divider line */}
        <div className="h-1 w-24 bg-[#5E55FF] rounded-full"></div>
        <h2 className="text-2xl irsans_med text-gray-900">آخرین پروژه ها</h2>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row w-[70vw] justify-center p-4 md:p-8">
        {/* === Right Column (Main Card) === */}
        {/* This column is 55% on desktop */}
        {/* Using <div /> for background image to apply gradient/divs easily */}
        <div className="relative h-96 w-full overflow-hidden rounded-lg lg:w-[50%]">
          <Image
            src={mainProject.imageUrl!}
            alt={mainProject.title}
            fill
            objectFit="cover"
            className="z-0"
          />
          {/* This div is the blurred box at the bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col justify-between rounded-lg bg-[#1E1D26]/30 p-4 text-white backdrop-blur-md">
            {/* Top row of the box (Date) */}
            <div className="mb-10 flex justify-start">
              <ProjectDate date={mainProject.date} className="text-white" />
            </div>
            {/* Bottom row of the box (Title & Button) */}
            <div className="flex flex-col items-start justify-between gap-4">
              <h3 className="text-base md:text-lg irsans_med">{mainProject.title}</h3>
              <ProjectButton href={mainProject.href} />
            </div>
          </div>
        </div>
    
        {/* === Left Column (Small Cards) === */}
        {/* This column is 45% on desktop */}
        <div className="w-full lg:w-[50%]">
          {/* 2x2 Grid, stacks to 1 col on mobile */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 h-full sm:grid-cols-2">
            {otherProjects.map((project) => (
              <SmallProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;