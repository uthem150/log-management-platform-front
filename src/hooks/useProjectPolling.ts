import { useState, useEffect, useRef, useCallback } from "react";
import { projectApi } from "../api/project";
import { Project, ProjectStatus } from "../types/project";

interface ProjectPollingHookReturn {
  isPolling: boolean;
  pollingProjects: Project[];
  startPolling: (projects: Project[]) => void;
  stopPolling: () => void;
  updateProjectInList: (updatedProject: Project) => void;
}

export const useProjectPolling = (
  onProjectsUpdated?: (updatedProjects: Project[]) => void
): ProjectPollingHookReturn => {
  const [isPolling, setIsPolling] = useState(false);
  const [pollingProjects, setPollingProjects] = useState<Project[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);
  const onProjectsUpdatedRef = useRef(onProjectsUpdated);

  // 콜백 ref 업데이트
  useEffect(() => {
    onProjectsUpdatedRef.current = onProjectsUpdated;
  }, [onProjectsUpdated]);

  // 개별 프로젝트 상태 확인
  const checkProjectStatus = useCallback(async (project: Project): Promise<Project> => {
    try {
      const response = await projectApi.getProject(project.id);

      // API 응답 구조: response.data.data (직접 프로젝트 객체)
      const updatedProject = response.data.data;

      if (updatedProject && updatedProject.id) {
        return updatedProject;
      }
      return project;
    } catch (error) {
      console.error(`Error checking project ${project.id}:`, error);
      return project;
    }
  }, []);

  // 폴링 중지
  const stopPolling = useCallback(() => {
    console.log("Stopping polling...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsPolling(false);
    setPollingProjects([]);
    isPollingRef.current = false;

    console.log("Polling stopped");
  }, []);

  // 모든 폴링 중인 프로젝트들의 상태 확인
  const checkAllProjects = useCallback(async () => {
    // 현재 상태에서 직접 확인
    setPollingProjects(currentProjects => {
      if (currentProjects.length === 0) {
        console.log("No projects to poll, stopping");
        stopPolling();
        return currentProjects;
      }

      console.log(`Polling ${currentProjects.length} projects...`);

      // 비동기 작업을 별도로 실행
      (async () => {
        try {
          const updatedProjects = await Promise.all(
            currentProjects.map(project => checkProjectStatus(project))
          );

          // 상태가 변경된 프로젝트가 있는지 확인
          const hasChanges = updatedProjects.some(
            (updated, index) => updated.status !== currentProjects[index].status
          );

          if (hasChanges) {
            console.log("Project status changes detected:", updatedProjects);
            setPollingProjects(updatedProjects);

            // 부모 컴포넌트에 업데이트 알림
            if (onProjectsUpdatedRef.current) {
              onProjectsUpdatedRef.current(updatedProjects);
            }
          }

          // 모든 프로젝트가 완료 상태인지 확인
          const allCompleted = updatedProjects.every(
            project => project.status === "READY" || project.status === "FAILED"
          );

          if (allCompleted) {
            console.log("All projects completed, stopping polling");
            stopPolling();
          }
        } catch (error) {
          console.error("Error in polling:", error);
        }
      })();

      return currentProjects;
    });
  }, [checkProjectStatus, stopPolling]);

  // 폴링 시작
  const startPolling = useCallback(
    (projects: Project[]) => {
      console.log("startPolling called with projects:", projects.length);
      console.log("Current polling state:", {
        isPollingRefCurrent: isPollingRef.current,
        hasInterval: !!intervalRef.current
      });

      // 이미 폴링 중이면 기존 폴링 중지
      if (isPollingRef.current || intervalRef.current) {
        console.log("Stopping existing polling before starting new one");
        stopPolling();
      }

      // 진행 중인 프로젝트만 필터링
      const inProgressProjects = projects.filter(
        project => project.status !== "READY" && project.status !== "FAILED"
      );

      if (inProgressProjects.length === 0) {
        console.log("No projects in progress, skipping polling");
        return;
      }

      console.log(`Starting new polling for ${inProgressProjects.length} projects`);

      setPollingProjects(inProgressProjects);
      setIsPolling(true);
      isPollingRef.current = true;

      // 첫 번째 체크는 조금 후에 실행 (상태 업데이트 완료 후)
      setTimeout(() => {
        checkAllProjects();
      }, 100);

      // 5초마다 상태 확인
      intervalRef.current = setInterval(() => {
        checkAllProjects();
      }, 5000);
    },
    [checkAllProjects, stopPolling]
  );

  // 프로젝트 목록에서 특정 프로젝트 업데이트
  const updateProjectInList = useCallback((updatedProject: Project) => {
    setPollingProjects(prev =>
      prev.map(project => (project.id === updatedProject.id ? updatedProject : project))
    );
  }, []);

  // 컴포넌트 언마운트 시 폴링 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isPollingRef.current = false;
    };
  }, []);

  return {
    isPolling,
    pollingProjects,
    startPolling,
    stopPolling,
    updateProjectInList
  };
};
