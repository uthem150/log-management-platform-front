// src/pages/Profile/Profile.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import ProfileSummary from "../../components/profile/ProfileSummary";
import useAuthStore from "../../store/useAuthStore";
import { profileApi } from "../../api/profile";
import { User, UpdateProfileRequest } from "../../types/user";
import {
  Card,
  CardTitle,
  Container,
  ErrorMessage,
  passwordSchema,
  profileSchema,
  SuccessMessage,
  Tab,
  TabContainer,
  Title
} from "./Profile.style";
import { Form } from "react-router-dom";

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
