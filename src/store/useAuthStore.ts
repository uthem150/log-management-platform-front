// src/store/useAuthStore.ts
import { create } from "zustand";

// Zustand persist 미들웨어: 상태를 localStorage 등에 자동 저장
import { persist } from "zustand/middleware";

// 사용자 정보 담는 인터페이스 정의
interface User {
  id: string;
  email: string;
  name: string;
}

// 인증 상태 관리하는 인터페이스 정의
interface AuthState {
  user: User | null; // 현재 로그인한 사용자 정보 (없으면 null)
  token: string | null; // 인증 토큰 (없으면 null)
  isAuthenticated: boolean; // 로그인 여부

  // 로그인 함수: 사용자 정보와 토큰을 받아 상태 업데이트
  login: (user: User, token: string) => void;

  // 로그아웃 함수: 사용자 정보, 토큰 초기화
  logout: () => void;
}

// Zustand로 인증 상태 store 생성
const useAuthStore = create<AuthState>()(
  // persist 미들웨어 적용하여 상태 localStorage에 자동 저장
  persist(
    // 상태(set) 정의하는 함수
    set => ({
      user: null, // 초기 사용자 정보 없음
      token: null, // 초기 토큰 없음
      isAuthenticated: false, // 초기 로그인 상태: false

      // 로그인 함수
      login: (user, token) =>
        set({
          user, // 전달된 사용자 정보 저장
          token, // 전달된 토큰 저장
          isAuthenticated: true // 로그인 상태 true로 변경
        }),

      // 로그아웃 함수
      logout: () =>
        set({
          user: null, // 사용자 정보 초기화
          token: null, // 토큰 초기화
          isAuthenticated: false // 로그인 상태 false로 변경
        })
    }),

    // persist 옵션 설정
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      // (브라우저에서 localStorage.getItem("auth-storage")로 확인 가능)

      // 페이지 로드 시 localStorage에서 상태 자동으로 불러오는 것 건너뛰지 않도록 false
      skipHydration: false
    }
  )
);

export default useAuthStore;
