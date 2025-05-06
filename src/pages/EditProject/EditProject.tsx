// src/pages/EditProject/EditProject.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import Button from "../../components/common/Button";
import useProjectStore from "../../store/useProjectStore";
import {
  ButtonGroup,
  Card,
  Container,
  ErrorMessage,
  LoadingState,
  Title
} from "./EditProject.style";

// Zod 스키마 정의
const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(50, "Project name must be at most 50 characters"),
  description: z.string().max(500, "Description must be at most 500 characters").optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentProject, fetchProject, updateProject, isLoading, error } = useProjectStore();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema)
  });

  // 컴포넌트 마운트시 프로젝트 정보 조회 및 폼 초기화
  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id, fetchProject]);

  // 프로젝트 정보로 폼 초기화
  useEffect(() => {
    if (currentProject) {
      reset({
        name: currentProject.name,
        description: currentProject.description || ""
      });
    }
  }, [currentProject, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    if (!id) return;

    setApiError(null);

    try {
      // 프로젝트 업데이트 요청
      await updateProject(id, data.name, data.description);

      // 업데이트 성공 메시지
      alert(t("projects.updateSuccess"));

      // 프로젝트 상세 페이지로 이동
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Error updating project:", error);
      setApiError(t("projects.updateError"));
    }
  };

  if (isLoading && !currentProject) {
    return (
      <Container>
        <LoadingState>
          <p>{t("common.loading")}</p>
        </LoadingState>
      </Container>
    );
  }

  if (error || !currentProject) {
    return (
      <Container>
        <ErrorMessage>{error || t("projects.notFound")}</ErrorMessage>
        <Button onClick={() => navigate("/projects")}>{t("projects.backToList")}</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        {t("projects.edit")}: {currentProject.name}
      </Title>

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
            <Button
              variant="secondary"
              onClick={() => navigate(`/projects/${id}`)}
              disabled={isLoading}
            >
              {t("common.cancel")}
            </Button>

            <SubmitButton
              text={t("common.save")}
              loadingText={t("common.saving")}
              isLoading={isLoading}
            />
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProject;
