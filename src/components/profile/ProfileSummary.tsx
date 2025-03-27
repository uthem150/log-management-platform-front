// src/components/profile/ProfileSummary.tsx
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";
import { User } from "../../types/user";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.primary};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${colors.text};
`;

const Email = styled.p`
  color: ${colors.gray};
  margin-bottom: 0.5rem;
`;

const Bio = styled.p`
  color: ${colors.text};
  line-height: 1.5;
`;

interface ProfileSummaryProps {
  user: User;
}

const ProfileSummary = ({ user }: ProfileSummaryProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <Avatar>
        {user.avatar ? <img src={user.avatar} alt={user.name} /> : getInitials(user.name)}
      </Avatar>
      <Info>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        {user.bio && <Bio>{user.bio}</Bio>}
      </Info>
    </Container>
  );
};

export default ProfileSummary;
