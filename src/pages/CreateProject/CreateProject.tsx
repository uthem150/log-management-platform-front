// src/pages/EditProject/CreateProject.tsx
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import Button from "../../components/common/Button";
import useProjectStore from "../../store/useProjectStore";
import {
  ActionButton,
  AddFieldButton,
  ButtonGroup,
  Card,
  Container,
  ErrorMessage,
  ExampleBlock,
  ExampleCaption,
  ExampleContent,
  ExampleLine,
  ExampleTitle,
  FieldContainer,
  FieldInputContainer,
  FieldLabel,
  FieldRow,
  FieldSelect,
  FieldSettingContainer,
  FilterCondition,
  FilterConditionsContainer,
  GptAssistButton,
  HelperText,
  Input,
  LogSampleContainer,
  LogTypeButton,
  LogTypeSelector,
  MultilineContainer,
  OperatorSelect,
  RadioInput,
  RadioOption,
  RemoveButton,
  SectionSubtitle,
  SectionTitle,
  Select,
  Step,
  StepIndicator,
  StepNumber,
  TextArea,
  Title,
  ValueInput
} from "./CreateProject.style";

// 로그 타입 정의
type LogType = "json" | "plainText" | "csv" | "xml";

// Zod 스키마 정의
const projectSchema = z.object({
  name: z
    .string()
    .min(2, "프로젝트 이름은 최소 2글자 이상이어야 합니다")
    .max(50, "프로젝트 이름은 최대 50글자까지 가능합니다"),
  description: z.string().max(500, "설명은 최대 500글자까지 가능합니다").optional(),
  collectionPath: z.string().min(1, "수집 경로를 입력해주세요")
});

type ProjectFormData = z.infer<typeof projectSchema>;

// 필드 정보 인터페이스
interface Field {
  id: string;
  name: string;
  path: string;
}

// 필터 조건 인터페이스
interface FilterCondition {
  id: string;
  field: string;
  operator: "equals" | "notEquals";
  value: string;
}

// 컴포넌트 내 상태
type MultilineType = "pattern" | "what" | "none";

const CreateProject = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createProject, isLoading } = useProjectStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [logType, setLogType] = useState<LogType>("json");
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "timestamp", path: "data.timestamp" },
    { id: "2", name: "logLevel", path: "data.level" },
    { id: "3", name: "message", path: "data.message" }
  ]);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
  const [logSample, setLogSample] = useState("");

  // 멀티라인 관련 상태
  const [multilineEnabled, setMultilineEnabled] = useState<boolean>(true);
  const [multilinePattern, setMultilinePattern] = useState<string>("^[0-9]{4}-[0-9]{2}-[0-9]{2}");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange" // 입력 시 실시간 유효성 검사
  });

  // 실시간으로 이름 필드 감시
  const projectName = watch("name");

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 로그 타입 변경
  const handleLogTypeChange = (type: LogType) => {
    setLogType(type);

    // 로그 타입에 따라 기본 필드 설정
    if (type === "json") {
      setFields([
        { id: "1", name: "timestamp", path: "data.timestamp" },
        { id: "2", name: "logLevel", path: "data.level" },
        { id: "3", name: "message", path: "data.message" }
      ]);
    } else if (type === "plainText") {
      setFields([
        { id: "1", name: "timestamp", path: "^\\d{4}-\\d{2}-\\d{2}" },
        { id: "2", name: "logLevel", path: "(DEBUG|INFO|WARN|ERROR)" },
        { id: "3", name: "message", path: ".*$" }
      ]);
    } else {
      setFields([
        { id: "1", name: "timestamp", path: "" },
        { id: "2", name: "logLevel", path: "" },
        { id: "3", name: "message", path: "" }
      ]);
    }
  };

  // 필드 추가
  const handleAddField = () => {
    const newField: Field = {
      id: Date.now().toString(),
      name: "",
      path: ""
    };
    setFields([...fields, newField]);
  };

  // 필드 제거
  const handleRemoveField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    // 관련 필터 조건도 제거
    setFilterConditions(
      filterConditions.filter(
        condition => fields.find(field => field.id === id)?.name !== condition.field
      )
    );
  };

  // 필드 업데이트
  const handleFieldChange = (id: string, key: keyof Field, value: string) => {
    setFields(fields.map(field => (field.id === id ? { ...field, [key]: value } : field)));

    // 필드 이름이 변경된 경우 필터 조건도 업데이트
    if (key === "name") {
      const oldField = fields.find(field => field.id === id);
      if (oldField) {
        setFilterConditions(
          filterConditions.map(condition =>
            condition.field === oldField.name ? { ...condition, field: value } : condition
          )
        );
      }
    }
  };

  // 필터 조건 추가
  const handleAddFilterCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: fields[0]?.name || "",
      operator: "equals",
      value: ""
    };
    setFilterConditions([...filterConditions, newCondition]);
  };

  // 필터 조건 제거
  const handleRemoveFilterCondition = (id: string) => {
    setFilterConditions(filterConditions.filter(condition => condition.id !== id));
  };

  // 필터 조건 업데이트
  const handleFilterConditionChange = (id: string, key: keyof FilterCondition, value: string) => {
    setFilterConditions(
      filterConditions.map(condition =>
        condition.id === id ? { ...condition, [key]: value } : condition
      )
    );
  };

  // GPT를 통한 정규식 생성 (이 기능은 실제로는 백엔드 API를 호출해야 함)
  const handleGptAssist = () => {
    // TODO: 실제 API 연동
    alert(
      "이 기능은 아직 구현되지 않았습니다. 실제 서비스에서는 GPT API를 통해 로그 샘플을 분석하여 정규식을 자동 생성합니다."
    );
  };

  const onSubmit = async (data: ProjectFormData) => {
    setApiError(null);

    try {
      // 프로젝트 데이터 구성
      const projectData = {
        name: data.name,
        description: data.description,
        logConfig: {
          logType,
          collectionPath: data.collectionPath,
          fields: fields.filter(field => field.name && field.path),
          filterConditions: filterConditions.filter(condition => condition.value),
          // 멀티라인 설정
          multiline:
            logType === "plainText" && multilineEnabled
              ? {
                  pattern: multilinePattern,
                  match: "pattern" // 패턴 매칭 방식
                }
              : null
        }
      };

      // API 전송용 로그
      console.log("Submitting project:", projectData);

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

      <StepIndicator>
        <Step active={currentStep === 1} completed={currentStep > 1}>
          <StepNumber>1</StepNumber>
          기본 정보
        </Step>
        <Step active={currentStep === 2} completed={currentStep > 2}>
          <StepNumber>2</StepNumber>
          수집 경로 설정
        </Step>
        <Step active={currentStep === 3} completed={false}>
          <StepNumber>3</StepNumber>
          파싱 설정
        </Step>
      </StepIndicator>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        {/* 1단계: 기본 정보 */}
        {currentStep === 1 && (
          <Card>
            <SectionTitle>기본 정보</SectionTitle>
            <SectionSubtitle>프로젝트의 기본 정보를 입력해주세요.</SectionSubtitle>

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
                onClick={() => navigate("/projects")}
                disabled={isLoading}
              >
                {t("common.cancel")}
              </Button>

              <Button onClick={handleNextStep} disabled={!projectName || !!errors.name}>
                다음
              </Button>
            </ButtonGroup>
          </Card>
        )}

        {/* 2단계: 수집 경로 설정 */}
        {currentStep === 2 && (
          <Card>
            <SectionTitle>수집 경로 설정</SectionTitle>
            <SectionSubtitle>로그 파일의 수집 경로와 형식을 설정해주세요.</SectionSubtitle>

            <FormInput
              id="collectionPath"
              label="수집 경로"
              register={register("collectionPath")}
              error={errors.collectionPath}
              placeholder="/var/log/application/*.log"
            />

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                로그 형식
              </label>
              <LogTypeSelector>
                <LogTypeButton
                  type="button"
                  selected={logType === "json"}
                  onClick={() => handleLogTypeChange("json")}
                >
                  JSON
                </LogTypeButton>
                <LogTypeButton
                  type="button"
                  selected={logType === "plainText"}
                  onClick={() => handleLogTypeChange("plainText")}
                >
                  Plain Text
                </LogTypeButton>
                <LogTypeButton
                  type="button"
                  selected={logType === "csv"}
                  onClick={() => handleLogTypeChange("csv")}
                >
                  CSV
                </LogTypeButton>
                <LogTypeButton
                  type="button"
                  selected={logType === "xml"}
                  onClick={() => handleLogTypeChange("xml")}
                >
                  XML
                </LogTypeButton>
              </LogTypeSelector>
            </div>

            <ButtonGroup>
              <Button variant="secondary" onClick={handlePrevStep}>
                이전
              </Button>

              <Button
                onClick={handleNextStep}
                disabled={!watch("collectionPath") || !!errors.collectionPath}
              >
                다음
              </Button>
            </ButtonGroup>
          </Card>
        )}

        {/* 3단계: 파싱 설정 */}
        {currentStep === 3 && (
          <Card>
            <SectionTitle>파싱 설정</SectionTitle>
            <SectionSubtitle>
              로그에서 추출할 필드를 설정해주세요.{" "}
              {logType === "plainText" && "Plain Text의 경우 정규식을 사용해 필드를 추출합니다."}
            </SectionSubtitle>

            {logType === "plainText" && (
              <LogSampleContainer>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                  로그 샘플
                </label>
                <TextArea
                  value={logSample}
                  onChange={e => setLogSample(e.target.value)}
                  placeholder="로그 샘플을 입력하면 GPT가 정규식 패턴을 제안합니다."
                />
                <GptAssistButton type="button" onClick={handleGptAssist}>
                  GPT API를 통해 정규식 생성하기
                </GptAssistButton>
              </LogSampleContainer>
            )}

            <FieldSettingContainer>
              <SectionTitle>필드 설정</SectionTitle>

              {fields.map(field => (
                <FieldContainer key={field.id}>
                  <FieldRow>
                    <FieldLabel>필드 이름</FieldLabel>
                    <FieldInputContainer>
                      <input
                        type="text"
                        value={field.name}
                        onChange={e => handleFieldChange(field.id, "name", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #e9ecef",
                          borderRadius: "4px"
                        }}
                        placeholder="timestamp, logLevel, message 등"
                      />
                    </FieldInputContainer>

                    <RemoveButton type="button" onClick={() => handleRemoveField(field.id)}>
                      삭제
                    </RemoveButton>
                  </FieldRow>

                  <FieldRow>
                    <FieldLabel>{logType === "json" ? "JSON 경로" : "정규식 패턴"}</FieldLabel>
                    <FieldInputContainer>
                      <input
                        type="text"
                        value={field.path}
                        onChange={e => handleFieldChange(field.id, "path", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #e9ecef",
                          borderRadius: "4px"
                        }}
                        placeholder={
                          logType === "json" ? "data.timestamp" : "^\\d{4}-\\d{2}-\\d{2}"
                        }
                      />
                    </FieldInputContainer>
                  </FieldRow>
                </FieldContainer>
              ))}

              <AddFieldButton type="button" onClick={handleAddField}>
                + 필드 추가
              </AddFieldButton>
            </FieldSettingContainer>

            {/* 멀티라인 처리 컴포넌트 */}
            {logType === "plainText" && (
              <MultilineContainer>
                <SectionTitle>멀티라인 로그 처리</SectionTitle>
                <SectionSubtitle>
                  여러 줄에 걸친 로그(에러 스택 트레이스 등)를 하나의 로그로 처리하기 위한
                  설정입니다.
                </SectionSubtitle>
                <FieldContainer>
                  <FieldRow>
                    <RadioOption>
                      <RadioInput
                        type="radio"
                        name="multilineEnabled"
                        value="enabled"
                        checked={multilineEnabled}
                        onChange={() => setMultilineEnabled(true)}
                      />
                      <span>멀티라인 처리 사용</span>
                    </RadioOption>

                    <RadioOption>
                      <RadioInput
                        type="radio"
                        name="multilineEnabled"
                        value="disabled"
                        checked={!multilineEnabled}
                        onChange={() => setMultilineEnabled(false)}
                      />
                      <span>멀티라인 처리 안함</span>
                    </RadioOption>
                  </FieldRow>

                  {multilineEnabled ? (
                    <>
                      <FieldRow>
                        <FieldLabel>새 로그 시작 패턴</FieldLabel>
                        <FieldInputContainer>
                          <input
                            type="text"
                            value={multilinePattern}
                            onChange={e => setMultilinePattern(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "0.75rem",
                              border: "1px solid #e9ecef",
                              borderRadius: "4px"
                            }}
                            placeholder="^[0-9]{4}-[0-9]{2}-[0-9]{2}"
                          />
                        </FieldInputContainer>
                      </FieldRow>

                      <HelperText>
                        이 정규식 패턴과 일치하는 줄이 나타나면 새로운 로그가 시작됩니다. <br />위
                        예시는 '2023-01-01'과 같은 날짜로 시작하는 패턴입니다.
                      </HelperText>

                      <ExampleBlock>
                        <ExampleTitle>예시 로그와 처리 방식:</ExampleTitle>
                        <ExampleContent>
                          <ExampleLine
                            highlight
                          >{`2025-04-18 12:13:05.000 ERROR [PaymentService]`}</ExampleLine>
                          <ExampleLine indent>{`    at PaymentService.java:120`}</ExampleLine>
                          <ExampleLine indent>{`    at TransactionHandler.java:55`}</ExampleLine>
                          <ExampleLine
                            highlight
                          >{`2025-04-18 12:14:01.000 INFO [LoginService]`}</ExampleLine>
                        </ExampleContent>
                        <ExampleCaption>
                          위와 같은 로그에서 강조된 줄에서 새 로그가 시작하고,
                          <br /> 들여쓰기된 줄은 이전 로그의 일부로 처리됩니다.
                        </ExampleCaption>
                      </ExampleBlock>
                    </>
                  ) : (
                    <HelperText>한 줄 = 하나의 로그로 처리됩니다.</HelperText>
                  )}
                </FieldContainer>
              </MultilineContainer>
            )}

            <FilterConditionsContainer>
              <SectionTitle>필터링 조건 (선택)</SectionTitle>
              <SectionSubtitle>
                특정 조건에 맞는 로그만 수집하도록 필터를 설정할 수 있습니다.
              </SectionSubtitle>

              {filterConditions.map(condition => (
                <FilterCondition key={condition.id}>
                  <FieldSelect>
                    <Select
                      value={condition.field}
                      onChange={e =>
                        handleFilterConditionChange(condition.id, "field", e.target.value)
                      }
                    >
                      {fields.map(field => (
                        <option key={field.id} value={field.name}>
                          {field.name}
                        </option>
                      ))}
                    </Select>
                  </FieldSelect>

                  <OperatorSelect>
                    <Select
                      value={condition.operator}
                      onChange={e =>
                        handleFilterConditionChange(
                          condition.id,
                          "operator",
                          e.target.value as "equals" | "notEquals"
                        )
                      }
                    >
                      <option value="equals">equals</option>
                      <option value="notEquals">not equals</option>
                    </Select>
                  </OperatorSelect>

                  <ValueInput>
                    <Input
                      type="text"
                      value={condition.value}
                      onChange={e =>
                        handleFilterConditionChange(condition.id, "value", e.target.value)
                      }
                      placeholder="필터 값"
                    />
                  </ValueInput>

                  <ActionButton>
                    <RemoveButton
                      type="button"
                      onClick={() => handleRemoveFilterCondition(condition.id)}
                    >
                      삭제
                    </RemoveButton>
                  </ActionButton>
                </FilterCondition>
              ))}
              <AddFieldButton type="button" onClick={handleAddFilterCondition}>
                + 필터 조건 추가
              </AddFieldButton>
            </FilterConditionsContainer>

            <ButtonGroup>
              <Button variant="secondary" onClick={handlePrevStep}>
                이전
              </Button>

              <SubmitButton
                text={t("projects.create")}
                loadingText={t("projects.creating")}
                isLoading={isLoading}
              />
            </ButtonGroup>
          </Card>
        )}
      </Form>
    </Container>
  );
};

export default CreateProject;
