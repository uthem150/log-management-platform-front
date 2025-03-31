// src/api/project.ts
import api from "./index";
import {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectListResponse,
  ProjectResponse
} from "../types/project";

export const projectApi = {
  // 프로젝트 목록 조회
  getProjects: (page = 1, limit = 10) =>
    api.get<ProjectListResponse>(`/projects?page=${page}&limit=${limit}`),

  // 프로젝트 상세 조회
  getProject: (id: string) => api.get<ProjectResponse>(`/projects/${id}`),

  // 프로젝트 생성
  createProject: (data: CreateProjectRequest) => api.post<ProjectResponse>("/projects", data),

  // 프로젝트 업데이트
  updateProject: (id: string, data: UpdateProjectRequest) =>
    api.patch<ProjectResponse>(`/projects/${id}`, data),

  // 프로젝트 삭제
  deleteProject: (id: string) => api.delete(`/projects/${id}`),

  // 대시보드 링크 생성
  generateDashboard: (id: string) =>
    api.post<{ dashboardUrl: string }>(`/projects/${id}/dashboard`),

  // 대시보드 연결 상태 확인
  checkDashboardStatus: (id: string) =>
    api.get<{ status: string }>(`/projects/${id}/dashboard/status`)
};
