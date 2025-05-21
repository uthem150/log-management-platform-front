// src/pages/About/About.style.ts
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

// 히어로 섹션
export const Hero = styled.section`
  padding: 4rem 0;
  text-align: center;
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  span {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${colors.gray};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// 구분선
export const GradientDivider = styled.div`
  height: 4px;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.accent});
  margin: 2rem auto;
  width: 90%;
  border-radius: 2px;
`;

// 섹션 제목
export const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${colors.text};
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${colors.primary};
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

// 특징 섹션
export const FeaturesSection = styled.section`
  padding: 4rem 0;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
`;

export const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(67, 97, 238, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${colors.primary};
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${colors.text};
`;

export const FeatureDescription = styled.p`
  color: ${colors.gray};
  line-height: 1.6;
`;

// 기술 스택 섹션
export const TechStackSection = styled.section`
  padding: 4rem 0;
  background-color: rgba(67, 97, 238, 0.03);
  border-radius: 16px;
  margin: 2rem 0;
`;

export const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 150px;
`;

export const TechLogo = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const TechName = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${colors.text};
`;

// 팀 멤버 섹션
export const TeamSection = styled.section`
  padding: 4rem 0;
`;

export const TeamGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

export const TeamMember = styled.div`
  background-color: white;
  width: 40%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

export const MemberImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 4px solid rgba(67, 97, 238, 0.2);
`;

export const MemberName = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${colors.text};
`;

export const MemberRole = styled.p`
  color: ${colors.primary};
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const MemberBio = styled.p`
  color: ${colors.gray};
  font-size: 0.95rem;
  line-height: 1.6;
`;

// 연락처 섹션
export const ContactSection = styled.section`
  padding: 4rem 0;
  text-align: center;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: 100px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  color: ${colors.text};
  font-weight: 500;

  svg {
    color: ${colors.primary};
  }
`;
