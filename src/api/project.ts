// src/api/project.ts
import api from "./index";
import {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectListResponse,
  ProjectResponse,
  Step1Request,
  Step1Response,
  Step2Request
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
    api.get<{ status: string }>(`/projects/${id}/dashboard/status`),

  // 파일 다운로드 링크 생성 (프로젝트 생성 시)
  generateDownloadLink: (data: CreateProjectRequest) =>
    api.post<{ downloadUrl: string; projectId: string }>("/projects/generate-config", data),

  // Grafana 대시보드 생성
  createGrafanaDashboard: (projectId: string) =>
    api.post<{ dashboardUrl: string; success: boolean }>(`/projects/${projectId}/grafana`),

  createLogProjectStep1: (data: Step1Request) =>
    api.post<Step1Response>("/monitoring/log-project/step1", data),

  createLogProjectStep2: (data: Step2Request) => api.post("/monitoring/log-project/step2", data),

  // 파일 다운로드 상태 확인
  checkDownloadStatus: (projectId: string) =>
    api.get<{ downloaded: boolean; timestamp?: string }>(`/projects/${projectId}/download-status`),

  // 대시보드 생성 상태 확인 (polling용)
  checkDashboardCreationStatus: () =>
    api.get<{
      inProgress: boolean;
      projectsInProgress: Array<{
        projectId: string;
        projectName: string;
        status: "creating" | "completed" | "failed";
      }>;
    }>("/projects/dashboard-status"),

  // 특정 프로젝트의 대시보드 생성 상태 확인
  checkProjectDashboardStatus: (projectId: string) =>
    api.get<{
      status: "creating" | "completed" | "failed";
      dashboardUrl?: string;
      error?: string;
    }>(`/projects/${projectId}/dashboard-status`)
};
