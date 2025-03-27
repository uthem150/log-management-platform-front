// src/components/common/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  background: ${props => (props.active ? colors.primary : "transparent")};
  color: ${props => (props.active ? colors.white : colors.text)};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: ${props => (props.active ? colors.primary : colors.lightGray)};
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton active={i18n.language === "ko"} onClick={() => changeLanguage("ko")}>
        한국어
      </LanguageButton>
      <LanguageButton active={i18n.language === "en"} onClick={() => changeLanguage("en")}>
        English
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
