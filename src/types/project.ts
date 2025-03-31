// src/types/project.ts

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  dashboardId?: string; // Grafana 대시보드 ID
  dashboardUrl?: string; // Grafana 대시보드 URL
  status: ProjectStatus;
}

export type ProjectStatus = "active" | "inactive" | "configuring";

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface ProjectListResponse {
  projects: Project[];
  totalCount: number;
}

export interface ProjectResponse {
  project: Project;
}
