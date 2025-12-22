export interface Project {
  id: number;
  slug: string;
  full_name: string;
  description: string | null;
  started_at: string | null;
  ended_at: string | null;
  started_at_jalali: string | null;
  ended_at_jalali: string | null;
  employer: string;
  is_visible: boolean;
  display_order: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  images: Image[];
}

export interface Image {
  id: number;
  project_id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

export interface PaginatedProjects {
  data: Project[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// For updates
export interface UpdateProjectRequest {
  full_name?: string;
  description?: string;
  started_at?: string;
  ended_at?: string;
  started_at_jalali?: string;
  ended_at_jalali?: string;
  employer?: string;
  is_visible?: boolean;
  display_order?: number;
}

export interface UpdateImageRequest {
  alt_text?: string;
  sort_order?: number;
}