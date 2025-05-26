// src/pages/Home/Home.style.ts
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;

  @media (max-width: 768px) {
    padding: 3rem 0.5rem;
  }
`;

export const HeroSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  span {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.gray};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FeaturesSection = styled.div`
  margin-bottom: 4rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${colors.text};
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  color: ${colors.gray};
  line-height: 1.6;
`;
