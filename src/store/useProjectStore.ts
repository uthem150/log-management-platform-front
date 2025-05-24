// src/store/useProjectStore.ts
import { create } from "zustand";
import { Project, ProjectStatus } from "../types/project";
import { projectApi } from "../api/project";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // 페이징 정보
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;

  // 프로젝트 목록 조회 (페이징 지원)
  fetchProjects: (page?: number, pageSize?: number) => Promise<void>;

  // 특정 프로젝트 조회
  fetchProject: (id: string) => Promise<void>;

  // 프로젝트 삭제
  deleteProject: (id: string) => Promise<void>;

  // 현재 프로젝트 설정
  setCurrentProject: (project: Project | null) => void;

  // 상태 초기화
  resetState: () => void;

  // 프로젝트 상태 업데이트 (폴링용)
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
}

const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  // 페이징 초기값
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
  hasPrevious: false,
  hasNext: false,

  fetchProjects: async (page = 1, pageSize = 10) => {
    set({ isLoading: true, error: null });
    try {
      console.log(`Fetching projects: page=${page}, pageSize=${pageSize}`);
      const response = await projectApi.getProjects(page, pageSize);
      console.log("Projects API Response:", response);

      // API 응답 구조: response.data.data
      const apiData = response.data.data;

      set({
        projects: apiData.items,
        totalItems: apiData.total_items,
        totalPages: apiData.total_pages,
        currentPage: apiData.current_page,
        pageSize: apiData.page_size,
        hasPrevious: apiData.has_previous,
        hasNext: apiData.has_next,
        isLoading: false
      });
    } catch (error: unknown) {
      console.error("Error fetching projects:", error);

      // 더 자세한 에러 정보 제공
      let errorMessage = "프로젝트 목록을 불러오는데 실패했습니다.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { status?: number; data?: unknown } };

        if (axiosError.response?.status === 500) {
          errorMessage = "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        } else if (axiosError.response?.status === 401) {
          errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
        } else if (axiosError.response?.status === 403) {
          errorMessage = "프로젝트 목록에 접근할 권한이 없습니다.";
        }
      }

      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectApi.getProject(id);
      console.log("Single Project API Response:", response);

      // API 응답 구조: response.data.data (직접 프로젝트 객체)
      const project = response.data.data;

      if (project && project.id) {
        set({ currentProject: project, isLoading: false });
      } else {
        set({ error: "프로젝트를 찾을 수 없습니다.", isLoading: false });
      }
    } catch (error: unknown) {
      console.error("Error fetching project:", error);

      let errorMessage = "프로젝트 상세 정보를 불러오는데 실패했습니다.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { status?: number; data?: unknown } };

        if (axiosError.response?.status === 404) {
          errorMessage = "프로젝트를 찾을 수 없습니다.";
        } else if (axiosError.response?.status === 403) {
          errorMessage = "프로젝트에 접근할 권한이 없습니다.";
        } else if (axiosError.response?.status === 500) {
          errorMessage = "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      }

      set({ error: errorMessage, isLoading: false });
    }
  },

  // 특정 프로젝트의 상태(status) 업데이트하는 함수
  // - 프로젝트 목록 중 해당 ID의 프로젝트를 찾아 status만 갱신
  // - 현재 선택된 프로젝트(currentProject)도 동일 ID면 같이 갱신
  updateProjectStatus: (projectId: string, status: ProjectStatus) => {
    set(state => ({
      // 프로젝트 목록을 순회하면서, id가 일치하는 경우에만 status 갱신
      projects: state.projects.map(
        p =>
          p.id === projectId
            ? { ...p, status } // 해당 프로젝트만 status를 새로 덮어씀
            : p // 나머지는 그대로 유지
      ),
      // 현재 선택된 프로젝트가 존재하고, 해당 ID와 일치하면 상태 갱신
      currentProject:
        state.currentProject?.id === projectId
          ? { ...state.currentProject, status } // currentProject도 갱신
          : state.currentProject // 아니라면 기존 상태 유지
    }));
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await projectApi.deleteProject(id);

      set(state => ({
        projects: state.projects.filter(p => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        isLoading: false
      }));
    } catch (error) {
      set({ error: "Failed to delete project", isLoading: false });
      console.error("Error deleting project:", error);
    }
  },

  setCurrentProject: (project: Project | null) => {
    set({ currentProject: project });
  },

  resetState: () => {
    set({
      projects: [],
      currentProject: null,
      isLoading: false,
      error: null,
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10,
      hasPrevious: false,
      hasNext: false
    });
  }
}));

export default useProjectStore;
