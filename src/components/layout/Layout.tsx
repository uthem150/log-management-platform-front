// src/components/layout/Layout.tsx
// 라우팅을 위한 컴포넌트
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// Emotion styled-components로 스타일 정의
import styled from "@emotion/styled";

// 공통 테마 색상 가져오기
import { colors } from "../../styles/theme";

// 언어 전환 컴포넌트
import LanguageSwitcher from "../common/LanguageSwitcher";

// 다국어 번역 훅
import { useTranslation } from "react-i18next";
import useAuthStore from "../../store/useAuthStore";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${colors.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  width: 100%;
  position: relative;
  z-index: 10; // 다른 요소 위에 표시
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;

const NavItem = styled.li<{ active?: boolean }>`
  a {
    color: ${props => (props.active ? colors.primary : colors.text)};
    font-weight: ${props => (props.active ? 600 : 500)};
    text-decoration: none;
    position: relative;

    &:hover {
      color: ${colors.primary};
    }

    ${props =>
      props.active &&
      `
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${colors.primary};
      }
    `}
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text};
  font-weight: 500;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${colors.primary};
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: ${colors.background};
`;

const Footer = styled.footer`
  background-color: ${colors.lightGray};
  padding: 1.5rem 0;
  text-align: center;
  color: ${colors.gray};
`;

const Layout = () => {
  const { t } = useTranslation(); // i18n 다국어 텍스트 번역 함수

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  // 인증 상태 확인을 위한 콘솔 로그 추가
  console.log("Auth State:", { isAuthenticated });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 현재 활성화된 경로 확인
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Container>
      {/* 헤더: 내비게이션 메뉴와 언어 선택 */}
      <Header>
        <Nav>
          {/* 내비게이션 메뉴 리스트 */}
          <NavList>
            <NavItem active={isActive("/")}>
              <Link to="/">{t("common.home")}</Link>
            </NavItem>

            {isAuthenticated && (
              <NavItem active={isActive("/projects")}>
                <Link to="/projects">{t("common.projects")}</Link>
              </NavItem>
            )}

            <NavItem active={isActive("/about")}>
              <Link to="/about">{t("common.about")}</Link>
            </NavItem>

            {isAuthenticated ? (
              <>
                <NavItem active={isActive("/profile")}>
                  <Link to="/profile">{t("common.profile")}</Link>
                </NavItem>
                <NavItem>
                  <LogoutButton onClick={handleLogout}>{t("common.logout")}</LogoutButton>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem active={isActive("/login")}>
                  <Link to="/login">{t("common.login")}</Link>
                </NavItem>
                <NavItem active={isActive("/signup")}>
                  <Link to="/signup">{t("common.signup")}</Link>
                </NavItem>
              </>
            )}
          </NavList>

          {/* 언어 전환 컴포넌트 (예: 한국어 ↔ 영어) */}
          <LanguageSwitcher />
        </Nav>
      </Header>

      {/* 메인 콘텐츠: 현재 라우트에 해당하는 페이지가 렌더링됨 */}
      <Main>
        <Outlet /> {/* children route의 element가 여기 삽입됨 - 어디에 렌더링 될지 지정 */}
      </Main>

      {/* 푸터: 고정 메시지 */}
      <Footer>
        <p>© 2025 My App. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default Layout;
