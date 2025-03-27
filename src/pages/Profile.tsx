// src/pages/Profile.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../styles/theme";
import FormInput from "../components/common/FormInput";
import SubmitButton from "../components/common/SubmitButton";
import ProfileSummary from "../components/profile/ProfileSummary";
import useAuthStore from "../store/useAuthStore";
import { profileApi } from "../api/profile";
import { User, UpdateProfileRequest } from "../types/user";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const CardTitle = styled.h2`
  color: ${colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => (props.active ? colors.primary : "transparent")};
  color: ${props => (props.active ? colors.white : colors.text)};
  border: none;
  cursor: pointer;
  font-weight: 500;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.active ? colors.primary : colors.lightGray)};
  }
`;

const SuccessMessage = styled.p`
  color: ${colors.success};
  background-color: rgba(114, 176, 29, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  background-color: rgba(247, 37, 133, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional()
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

type TabType = "profile" | "password";

const Profile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getProfile();
        setUser(response.data);
        resetProfile({
          name: response.data.name,
          bio: response.data.bio || ""
        });
      } catch (error) {
        setErrorMessage("Failed to load profile data");
      }
    };

    fetchProfile();
  }, [resetProfile]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await profileApi.updateProfile(data as UpdateProfileRequest);
      setUser(response.data);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await profileApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      setSuccessMessage("Password changed successfully!");
      resetPassword();
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to change password. Please check your current password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>User Profile</Title>

      {user && <ProfileSummary user={user} />}

      <TabContainer>
        <Tab active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
          Profile Information
        </Tab>
        <Tab active={activeTab === "password"} onClick={() => setActiveTab("password")}>
          Change Password
        </Tab>
      </TabContainer>

      {activeTab === "profile" && (
        <Card>
          <CardTitle>Edit Profile</CardTitle>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <Form onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <FormInput
              id="name"
              label="Name"
              register={profileRegister("name")}
              error={profileErrors.name}
            />

            <FormInput
              id="bio"
              label="Bio"
              register={profileRegister("bio")}
              error={profileErrors.bio}
            />

            <SubmitButton text="Update Profile" loadingText="Updating..." isLoading={isLoading} />
          </Form>
        </Card>
      )}

      {activeTab === "password" && (
        <Card>
          <CardTitle>Change Password</CardTitle>

          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <Form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
            <FormInput
              id="currentPassword"
              label="Current Password"
              type="password"
              register={passwordRegister("currentPassword")}
              error={passwordErrors.currentPassword}
            />

            <FormInput
              id="newPassword"
              label="New Password"
              type="password"
              register={passwordRegister("newPassword")}
              error={passwordErrors.newPassword}
            />

            <FormInput
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              register={passwordRegister("confirmPassword")}
              error={passwordErrors.confirmPassword}
            />

            <SubmitButton text="Change Password" loadingText="Changing..." isLoading={isLoading} />
          </Form>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
