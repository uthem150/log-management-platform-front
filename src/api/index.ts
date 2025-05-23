// src/api/index.ts
import axios from "axios";

// 환경 변수에서 API_BASE_URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    // 토큰이 있으면 요청 헤더에 추가
    const token = localStorage.getItem("token");
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      token: token ? `${token.substring(0, 20)}...` : null
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });

    // 오류 처리 (예: 401 에러 시 로그아웃 로직)
    if (error.response && error.response.status === 401) {
      // 인증 오류 처리
      localStorage.removeItem("token");
      // 로그인 페이지로 리다이렉트 로직 추가 가능
    }
    return Promise.reject(error);
  }
);

export default api;
