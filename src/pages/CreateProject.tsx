// src/pages/CreateProject.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../styles/theme";
import FormInput from "../components/common/FormInput";
import SubmitButton from "../components/common/SubmitButton";
import Button from "../components/common/Button";
import useProjectStore from "../store/useProjectStore";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${colors.text};
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(247, 37, 133, 0.1);
  border-radius: 4px;
`;

// Zod 스키마 정의
const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(50, "Project name must be at most 50 characters"),
  description: z.string().max(500, "Description must be at most 500 characters").optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

const CreateProject = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createProject, isLoading } = useProjectStore();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema)
  });

  const onSubmit = async (data: ProjectFormData) => {
    setApiError(null);

    try {
      // 프로젝트 생성 요청
      const newProject = await createProject(data.name, data.description);

      // 프로젝트 생성 성공 메시지
      alert(t("projects.createSuccess"));

      // 생성된 프로젝트 상세 페이지로 이동
      navigate(`/projects/${newProject.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      setApiError(t("projects.createError"));
    }
  };

  return (
    <Container>
      <Title>{t("projects.createNew")}</Title>

      <Card>
        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id="name"
            label={t("projects.name")}
            register={register("name")}
            error={errors.name}
            placeholder={t("projects.namePlaceholder")}
          />

          <FormInput
            id="description"
            label={t("projects.description")}
            register={register("description")}
            error={errors.description}
            placeholder={t("projects.descriptionPlaceholder")}
            multiline
            rows={4}
          />

          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate("/projects")} disabled={isLoading}>
              {t("common.cancel")}
            </Button>

            <SubmitButton
              text={t("projects.create")}
              loadingText={t("projects.creating")}
              isLoading={isLoading}
            />
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateProject;
