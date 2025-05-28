// src/components/layout/Layout.tsx
// 라우팅을 위한 컴포넌트
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// Emotion styled-components로 스타일 정의
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

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
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
  text-decoration: none;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (min-width: 769px) {
    display: none; /* 데스크톱에서는 로고 숨김 */
  }
`;

const DesktopNav = styled.div`
  display: contents; /* 자식 요소들이 Nav의 직접 자식처럼 동작 */

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li<{ active?: boolean }>`
  a,
  button {
    color: ${props => (props.active ? colors.primary : colors.text)};
    font-weight: ${props => (props.active ? 600 : 500)};
    font-size: 1.1rem;
    text-decoration: none;
    position: relative;
    padding: 0;
    transition: all 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    outline: none;

    &:hover {
      color: ${colors.primary};
    }

    &:focus {
      outline: none;
    }

    &:active {
      transform: translateY(1px);
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

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  position: relative;

  /* 모바일 터치 관련 스타일 완전 제거 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* 모든 아웃라인과 포커스 제거 */
  outline: 0;
  outline: none;
  border: 0;

  /* 클릭/터치 시 배경색 변화 방지 */
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus,
  &:active,
  &:focus-visible,
  &:focus-within {
    outline: none !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  /* 모바일에서 추가 터치 스타일 제거 */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      background-color: transparent;
    }

    &:active {
      background-color: transparent !important;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #4a5568;
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.3s ease-in-out;

    &:nth-of-type(1) {
      top: ${props => (props.isOpen ? "8px" : "0px")};
      transform: ${props => (props.isOpen ? "rotate(135deg)" : "rotate(0deg)")};
    }

    &:nth-of-type(2) {
      top: 8px;
      opacity: ${props => (props.isOpen ? "0" : "1")};
      left: ${props => (props.isOpen ? "-60px" : "0px")};
    }

    &:nth-of-type(3) {
      top: ${props => (props.isOpen ? "8px" : "16px")};
      transform: ${props => (props.isOpen ? "rotate(-135deg)" : "rotate(0deg)")};
    }
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${colors.white};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 16px 16px;
  transform: ${props => (props.isOpen ? "translateY(0)" : "translateY(-10px)")};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 90;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.5rem 0;
`;

const MobileNavItem = styled.li<{ active?: boolean }>`
  a,
  button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem;
    color: ${props => (props.active ? colors.primary : "#4a5568")};
    font-weight: ${props => (props.active ? 600 : 500)};
    font-size: 1rem;
    text-decoration: none;
    background: ${props => (props.active ? "rgba(59, 130, 246, 0.08)" : "transparent")};
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    transition: all 0.2s ease;
    outline: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: ${colors.primary};
    }

    &:focus {
      outline: none;
      background-color: rgba(0, 0, 0, 0.04);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.08);
      transform: scale(0.98);
    }
  }
`;

const MobileLanguageSwitcher = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 80;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: ${colors.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Footer = styled.footer`
  background-color: ${colors.lightGray};
  padding: 1.5rem 0;
  text-align: center;
  color: ${colors.gray};
  font-size: 0.9rem;
`;

const Layout = () => {
  const { t } = useTranslation(); // i18n 다국어 텍스트 번역 함수

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 인증 상태 확인을 위한 콘솔 로그 추가
  console.log("Auth State:", { isAuthenticated });

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  // 현재 활성화된 경로 확인
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // 모바일 메뉴 토글
  const toggleMobileMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 즉시 포커스 제거
    const target = e.currentTarget as HTMLButtonElement;
    target.blur();

    setIsMobileMenuOpen(!isMobileMenuOpen);

    // 모바일에서 추가 처리
    if ("ontouchstart" in window) {
      // 터치 디바이스에서 강제로 active 상태 제거
      target.style.backgroundColor = "transparent";

      // 다음 프레임에서 포커스 완전 제거
      requestAnimationFrame(() => {
        target.blur();
        if (document.activeElement === target) {
          (document.activeElement as HTMLElement).blur();
        }
      });
    }
  };

  // 메뉴 아이템 클릭 시 모바일 메뉴 닫기
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // 화면 크기 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 오버레이 클릭 시 메뉴 닫기
  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Container>
      {/* 헤더: 내비게이션 메뉴와 언어 선택 */}
      <Header>
        <Nav>
          {/* 로고 */}
          <Logo>
            <Link to="/" onClick={handleMenuItemClick}>
              MyApp
            </Link>
          </Logo>

          {/* 데스크톱 내비게이션 */}
          <DesktopNav>
            {/* 왼쪽: 모든 네비게이션 메뉴 */}
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
                    <button onClick={handleLogout}>{t("common.logout")}</button>
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

            {/* 오른쪽: 언어 전환 버튼 */}
            <LanguageSwitcher />
          </DesktopNav>

          {/* 모바일 햄버거 버튼 */}
          <MobileMenuButton
            onClick={toggleMobileMenu}
            onTouchEnd={toggleMobileMenu}
            onMouseDown={e => {
              e.preventDefault();
              // 모바일에서 즉시 배경색 제거
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "transparent";
            }}
            onTouchStart={e => {
              e.preventDefault();
              // 터치 시작 시 배경색 제거
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "transparent";
            }}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </MobileMenuButton>

          {/* 모바일 드롭다운 메뉴 */}
          <MobileMenu isOpen={isMobileMenuOpen}>
            <MobileNavList>
              <MobileNavItem active={isActive("/")}>
                <Link to="/" onClick={handleMenuItemClick}>
                  {t("common.home")}
                </Link>
              </MobileNavItem>

              {isAuthenticated && (
                <MobileNavItem active={isActive("/projects")}>
                  <Link to="/projects" onClick={handleMenuItemClick}>
                    {t("common.projects")}
                  </Link>
                </MobileNavItem>
              )}

              <MobileNavItem active={isActive("/about")}>
                <Link to="/about" onClick={handleMenuItemClick}>
                  {t("common.about")}
                </Link>
              </MobileNavItem>

              {isAuthenticated ? (
                <>
                  <MobileNavItem active={isActive("/profile")}>
                    <Link to="/profile" onClick={handleMenuItemClick}>
                      {t("common.profile")}
                    </Link>
                  </MobileNavItem>
                  <MobileNavItem>
                    <button onClick={handleLogout}>{t("common.logout")}</button>
                  </MobileNavItem>
                </>
              ) : (
                <>
                  <MobileNavItem active={isActive("/login")}>
                    <Link to="/login" onClick={handleMenuItemClick}>
                      {t("common.login")}
                    </Link>
                  </MobileNavItem>
                  <MobileNavItem active={isActive("/signup")}>
                    <Link to="/signup" onClick={handleMenuItemClick}>
                      {t("common.signup")}
                    </Link>
                  </MobileNavItem>
                </>
              )}
            </MobileNavList>

            <MobileLanguageSwitcher>
              <LanguageSwitcher />
            </MobileLanguageSwitcher>
          </MobileMenu>
        </Nav>
      </Header>

      {/* 모바일 메뉴 오버레이 */}
      <Overlay isOpen={isMobileMenuOpen} onClick={handleOverlayClick} />

      {/* 메인 콘텐츠: 현재 라우트에 해당하는 페이지가 렌더링됨 */}
      <Main>
        <Outlet /> {/* children route의 element가 여기 삽입됨 - 어디에 렌더링 될지 지정 */}
      </Main>

      {/* 푸터: 고정 메시지 */}
      <Footer>
        <p>© 2025 Log Central. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default Layout;
