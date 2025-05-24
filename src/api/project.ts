// src/api/project.ts
import api from "./index";
import {
  Project,
  ProjectListResponse,
  Step1Request,
  Step1Response,
  Step2Request
} from "../types/project";

export const projectApi = {
  // 프로젝트 목록 조회 (새로운 API로 수정)
  getProjects: (page = 1, pageSize = 10) =>
    api.get<ProjectListResponse>(`/monitoring/projects/?page=${page}&page_size=${pageSize}`),

  // 프로젝트 삭제
  deleteProject: (id: string) => api.delete(`/projects/${id}`),

  createLogProjectStep1: (data: Step1Request) =>
    api.post<Step1Response>("/monitoring/log-project/step1", data),

  createLogProjectStep2: (data: Step2Request) => api.post("/monitoring/log-project/step2", data),

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
