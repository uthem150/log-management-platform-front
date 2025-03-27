// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 언어 파일 가져오기
import enTranslation from "./locale/en.json";
import koTranslation from "./locale/ko.json";

i18n
  // 브라우저 언어 감지
  .use(LanguageDetector)
  // React와 연결
  .use(initReactI18next)
  // i18next 초기화
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ko: {
        translation: koTranslation
      }
    },
    fallbackLng: "en", // 기본 언어
    debug: process.env.NODE_ENV === "development", // 개발 모드에서만 디버그
    interpolation: {
      escapeValue: false // React에서는 XSS 방지가 기본 제공되므로 비활성화
    }
  });

export default i18n;
