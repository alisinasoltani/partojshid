import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

// ProjectSelector Component
function ProjectSelector({
  onSelect,
  onClose,
}: {
  onSelect: (project: ProjectRef) => void;
  onClose: () => void;
}) {
  // Fetch visible projects
  const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
    queryKey: ["admin-visible-projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects?editor=1"); // editor=1 shows hidden ones too if needed
      // Adjust based on your actual API response structure
      // Assuming it's { data: [...], total: ..., ... }
      return data.data || data; // fallback if not paginated
    },
  });

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const projects: any[] = projectsResponse || [];

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">افزودن پروژه به ردیف</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3">انتخاب پروژه</label>
            {projectsLoading ? (
              <p>در حال بارگذاری پروژه‌ها...</p>
            ) : (
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedProjectId || ""}
                onChange={(e) => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">-- یک پروژه انتخاب کنید --</option>
                {projects
                  .filter((p) => p.is_visible !== false) // only visible or undefined (treat as visible)
                  .map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.full_name} ({project.slug})
                    </option>
                  ))}
              </select>
            )}
          </div>

          {selectedProject && selectedProject.images && selectedProject.images.length > 0 && (
            <div>
              <label className="block text-lg font-medium mb-4">انتخاب تصویر</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selectedProject.images.map((img: any) => {
                  // IMPORTANT: Use correct image path — assuming backend returns "/images/projects/..."
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
                          imageUrl: imageSrc, // ← fixed: no "./"
                        })
                      }
                      className="group relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition"
                    >
                      <Image
                        src={imageSrc}
                        alt={img.alt_text || "Project image"}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                        <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition">
                          انتخاب
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedProject && (!selectedProject.images || selectedProject.images.length === 0) && (
            <p className="text-orange-600">این پروژه هیچ تصویری ندارد.</p>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}