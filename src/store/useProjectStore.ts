// src/store/useProjectStore.ts
import { create } from "zustand";
import { Project } from "../types/project";
import { projectApi } from "../api/project";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // 프로젝트 목록 조회
  fetchProjects: () => Promise<void>;

  // 특정 프로젝트 조회
  fetchProject: (id: string) => Promise<void>;

  // 프로젝트 생성
  createProject: (name: string, description?: string) => Promise<Project>;

  // 프로젝트 업데이트
  updateProject: (id: string, name?: string, description?: string) => Promise<void>;

  // 프로젝트 삭제
  deleteProject: (id: string) => Promise<void>;

  // 현재 프로젝트 설정
  setCurrentProject: (project: Project | null) => void;

  // 상태 초기화
  resetState: () => void;
}

const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectApi.getProjects();
      set({ projects: response.data.projects, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch projects", isLoading: false });
      console.error("Error fetching projects:", error);
    }
  },

  fetchProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectApi.getProject(id);
      set({ currentProject: response.data.project, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch project details", isLoading: false });
      console.error("Error fetching project:", error);
    }
  },

  createProject: async (name: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectApi.createProject({ name, description });
      const newProject = response.data.project;

      set(state => ({
        projects: [...state.projects, newProject],
        isLoading: false
      }));

      return newProject;
    } catch (error) {
      set({ error: "Failed to create project", isLoading: false });
      console.error("Error creating project:", error);
      throw error;
    }
  },

  updateProject: async (id: string, name?: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectApi.updateProject(id, { name, description });
      const updatedProject = response.data.project;

      set(state => ({
        projects: state.projects.map(p => (p.id === id ? updatedProject : p)),
        currentProject: state.currentProject?.id === id ? updatedProject : state.currentProject,
        isLoading: false
      }));
    } catch (error) {
      set({ error: "Failed to update project", isLoading: false });
      console.error("Error updating project:", error);
    }
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
    set({ projects: [], currentProject: null, isLoading: false, error: null });
  }
}));

export default useProjectStore;
