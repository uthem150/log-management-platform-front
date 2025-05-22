// src/hooks/useDashboardPolling.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { projectApi } from "../api/project";

interface DashboardCreationStatus {
  inProgress: boolean;
  projectsInProgress: Array<{
    projectId: string;
    projectName: string;
    status: "creating" | "completed" | "failed";
  }>;
}

export const useDashboardPolling = (onDashboardCompleted?: () => void) => {
  const [dashboardStatus, setDashboardStatus] = useState<DashboardCreationStatus>({
    inProgress: false,
    projectsInProgress: []
  });
  const [toastVisible, setToastVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousInProgressCount = useRef(0);
  const isPollingRef = useRef(false);

  // 대시보드 생성 상태 확인
  const checkDashboardStatus = useCallback(async () => {
    try {
      const response = await projectApi.checkDashboardCreationStatus();
      const newStatus = response.data;

      // 이전 상태와 비교하여 완료된 프로젝트가 있는지 확인
      const currentInProgressCount = newStatus.projectsInProgress.length;
      const wasCreating = previousInProgressCount.current > 0;
      const nowCompleted = currentInProgressCount === 0 && wasCreating;

      setDashboardStatus(newStatus);
      setToastVisible(newStatus.inProgress);

      // 대시보드 생성이 완료되었을 때 콜백 실행
      if (nowCompleted && onDashboardCompleted) {
        onDashboardCompleted();
      }

      previousInProgressCount.current = currentInProgressCount;

      // 진행 중인 작업이 없으면 폴링 중지
      if (!newStatus.inProgress && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        isPollingRef.current = false;
      }
    } catch (error) {
      console.error("Failed to check dashboard status:", error);
    }
  }, [onDashboardCompleted]);

  // 폴링 시작
  const startPolling = useCallback(() => {
    // 이미 폴링 중이면 중복 시작 방지
    if (isPollingRef.current || intervalRef.current) return;

    isPollingRef.current = true;

    // 즉시 한 번 실행
    checkDashboardStatus();

    // 5초마다 상태 확인
    intervalRef.current = setInterval(checkDashboardStatus, 5000);
  }, [checkDashboardStatus]);

  // 폴링 중지
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPollingRef.current = false;
    setToastVisible(false);
  }, []);

  // Toast 닫기
  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  // 컴포넌트 언마운트 시 폴링 정리
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    dashboardStatus,
    toastVisible,
    startPolling,
    stopPolling,
    hideToast,
    checkDashboardStatus
  };
};
