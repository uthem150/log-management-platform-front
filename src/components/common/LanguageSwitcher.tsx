// src/components/common/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CurrentLanguage = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 40px; /* 고정된 높이 설정 */
  min-width: 80px; /* 최소 너비 설정 */
  justify-content: center; /* 내용과 화살표 정렬 */

  &:hover {
    background: ${colors.secondary}; /* 또는 적절한 hover 색상 */
  }
`;

// isOpen prop에 따라 표시 여부가 결정됨
const LanguageList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  margin-top: 0.25rem;
  display: ${props => (props.isOpen ? "block" : "none")};
  z-index: 10; // 다른 요소 위에 표시
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LanguageOption = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${colors.text};
  height: 40px; /* 옵션 항목도 같은 높이 설정 */

  &:hover {
    background: ${colors.lightGray};
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // dropdownRef로 언어 선택기 DOM 요소 참조
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableLanguages = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 선택된 언어 코드로 i18n 언어 변경 및 드롭다운 메뉴 닫기
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  useEffect(() => {
    // 클릭 위치가 dropdownRef 외부인지 확인
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // 컴포넌트 마운트 시 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLanguage =
    availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0];

  return (
    <SwitcherContainer ref={dropdownRef}>
      <CurrentLanguage onClick={toggleDropdown}>
        <span>{currentLanguage.label}</span>
      </CurrentLanguage>

      <LanguageList isOpen={isOpen}>
        {availableLanguages.map(language => (
          <LanguageOption key={language.code} onClick={() => changeLanguage(language.code)}>
            {language.label}
          </LanguageOption>
        ))}
      </LanguageList>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
