// src/components/project/PlatformSelector.tsx
import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";
import { PlatformEnum } from "../../types/project";

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${colors.text};
`;

const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const PlatformCard = styled.div<{ selected: boolean }>`
  padding: 1.5rem;
  border: 2px solid ${props => (props.selected ? colors.primary : colors.lightGray)};
  border-radius: 8px;
  background-color: ${props => (props.selected ? "rgba(67, 97, 238, 0.05)" : "white")};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${colors.primary};
    background-color: rgba(67, 97, 238, 0.05);
  }
`;

const PlatformIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
`;

const PlatformName = styled.div`
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.25rem;
`;

const PlatformDescription = styled.div`
  font-size: 0.85rem;
  color: ${colors.gray};
`;

interface PlatformSelectorProps {
  value: PlatformEnum;
  onChange: (platform: PlatformEnum) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ value, onChange }) => {
  const platforms = [
    {
      id: "windows" as PlatformEnum,
      name: "Windows",
      icon: "🪟",
      description: "Windows 서버 및 데스크톱"
    },
    {
      id: "linux" as PlatformEnum,
      name: "Linux",
      icon: "🐧",
      description: "Linux/Unix 서버"
    }
  ];

  return (
    <Container>
      <Label>서버 플랫폼</Label>
      <PlatformGrid>
        {platforms.map(platform => (
          <PlatformCard
            key={platform.id}
            selected={value === platform.id}
            onClick={() => onChange(platform.id)}
          >
            <PlatformIcon>{platform.icon}</PlatformIcon>
            <PlatformName>{platform.name}</PlatformName>
            <PlatformDescription>{platform.description}</PlatformDescription>
          </PlatformCard>
        ))}
      </PlatformGrid>
    </Container>
  );
};

export default PlatformSelector;
