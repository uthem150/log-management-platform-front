// src/components/layout/Layout.tsx

// 라우팅을 위한 컴포넌트
import { Outlet, Link, useNavigate } from "react-router-dom";

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
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;

const NavItem = styled.li`
  a {
    color: ${colors.text};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: ${colors.primary};
    }
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      {/* 헤더: 내비게이션 메뉴와 언어 선택 */}
      <Header>
        <Nav>
          {/* 내비게이션 메뉴 리스트 */}
          <NavList>
            <NavItem>
              <Link to="/">{t("common.home")}</Link>
            </NavItem>
            <NavItem>
              <Link to="/about">{t("common.about")}</Link>
            </NavItem>

            {isAuthenticated ? (
              <>
                <NavItem>
                  <Link to="/profile">Profile</Link>
                </NavItem>
                <NavItem>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: colors.text,
                      fontWeight: 500,
                      cursor: "pointer"
                    }}
                  >
                    {t("common.logout")}
                  </button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link to="/login">{t("common.login")}</Link>
                </NavItem>
                <NavItem>
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
