// src/pages/EditProject/CreateProject.tsx
import { useEffect, useState } from "react";
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
  CompactWarningBox,
  Container,
  DragHandle,
  ErrorMessage,
  ExampleBlock,
  ExampleCaption,
  ExampleCode,
  ExampleContent,
  ExampleItem,
  ExampleLabel,
  ExampleLine,
  ExampleRow,
  ExampleTitle,
  FieldContainer,
  FieldInputContainer,
  FieldLabel,
  FieldRow,
  FieldSelect,
  FilterCondition,
  GptAssistButton,
  HelperText,
  HighlightCode,
  InfoBox,
  InfoText,
  InfoTitle,
  Input,
  LogSampleContainer,
  LogTypeButton,
  LogTypeSelector,
  OperatorSelect,
  RadioInput,
  RadioOption,
  RemoveButton,
  SectionSubtitle,
  SectionTitle,
  Select,
  SolutionSteps,
  SolutionText,
  SolutionTitle,
  Step,
  StepIndicator,
  StepNumber,
  TextArea,
  Title,
  ValueInput,
  WarningContent,
  WarningText
} from "./CreateProject.style";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import DownloadGuide from "../../components/project/DownloadGuide";
import GrafanaSuccess from "../../components/project/GrafanaSuccess";

// dnd-kit import
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Accordion from "../../components/common/Accordion/Accordion";
import { projectApi } from "../../api/project";
import {
  FilterConditionWithId,
  OperatorEnum,
  PlatformEnum,
  Step1Request
} from "../../types/project";
import PlatformSelector from "../../components/project/PlatformSelector";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

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

// 기본 필드 상수 정의
const DEFAULT_FIELDS = ["timestamp", "level", "msg_detail"];

// SortableField 컴포넌트
function SortableField({
  field,
  logType,
  onFieldChange,
  onRemoveField
}: {
  field: { id: string; name: string; path: string };
  logType: "json" | "plainText" | "csv" | "xml";
  onFieldChange: (id: string, key: "name" | "path", value: string) => void;
  onRemoveField: (id: string) => void;
}) {
  // attributes: 키보드 접근성(aria-*) 속성 등, 필수 HTML 속성들.
  // listeners: 마우스·터치 이벤트 핸들러들(onMouseDown, onTouchStart 등).
  // setNodeRef: 아이템의 실제 DOM 노드에 ref를 연결해, dnd‑kit이 위치를 추적할 수 있도록 함.
  // transform, transition: 드래그 중 계산된 이동 좌표와 애니메이션 타이밍.
  // isDragging: 현재 이 아이템이 드래그 중인지 여부(Boolean).
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : undefined,
    backgroundColor: isDragging ? "rgba(67,97,238,0.05)" : undefined
  };

  // 기본 필드인지 체크
  const isDefaultField = DEFAULT_FIELDS.includes(field.name);

  return (
    // setNodeRef로 이 컨테이너를 dnd‑kit이 제어하는 노드로 등록
    <FieldContainer ref={setNodeRef} style={style}>
      {/* 이 요소만 잡고 드래그할 수 있게 함 */}
      <DragHandle {...attributes} {...listeners}>
        ☰
      </DragHandle>

      <FieldRow>
        <FieldLabel>필드 이름</FieldLabel>
        <FieldInputContainer>
          <input
            type="text"
            value={field.name}
            onChange={e => onFieldChange(field.id, "name", e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #e9ecef",
              borderRadius: "4px"
            }}
            placeholder="timestamp, level, msg_detail 등"
            // 기본 필드인 경우 수정 불가
            disabled={isDefaultField}
          />
        </FieldInputContainer>

        {/* 기본 필드가 아닌 경우에만 삭제 버튼 표시 */}
        {!isDefaultField ? (
          <RemoveButton type="button" onClick={() => onRemoveField(field.id)}>
            삭제
          </RemoveButton>
        ) : (
          <div style={{ width: "70px", textAlign: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "#888" }}>기본 필드</span>
          </div>
        )}
      </FieldRow>

      {/* JSON 타입일 때만 경로 입력 필드 표시 */}
      {logType === "json" && (
        <FieldRow>
          <FieldLabel>JSON 경로</FieldLabel>
          <FieldInputContainer>
            <input
              type="text"
              value={field.path}
              onChange={e => onFieldChange(field.id, "path", e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e9ecef",
                borderRadius: "4px"
              }}
              placeholder="data.timestamp"
            />
          </FieldInputContainer>
        </FieldRow>
      )}
    </FieldContainer>
  );
}

const CreateProject = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading } = useProjectStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [logType, setLogType] = useState<LogType>("json");
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "timestamp", path: "data.timestamp" },
    { id: "2", name: "level", path: "data.level" },
    { id: "3", name: "msg_detail", path: "data.msg_detail" }
  ]);
  const [filterConditions, setFilterConditions] = useState<FilterConditionWithId[]>([]);
  const [logSample, setLogSample] = useState("");

  // 멀티라인 관련 상태
  const [multilineEnabled, setMultilineEnabled] = useState<boolean>(true);
  const [multilinePattern, setMultilinePattern] = useState<string>("^[0-9]{4}-[0-9]{2}-[0-9]{2}");

  const [processingStep, setProcessingStep] = useState<
    "form" | "generating" | "download" | "grafana-creating" | "success"
  >("form");
  const [projectId, setProjectId] = useState<string>("");

  const [platform, setPlatform] = useState<PlatformEnum>("linux");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

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
  const { isAuthenticated, token, user } = useAuthStore(); // token, user 추가

  // 인증 상태 디버깅
  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
      console.warn("No token found, redirecting to login");
      navigate("/login");
      return;
    }
  }, [isAuthenticated, token, user, navigate]);

  // 실시간으로 이름 필드 감시
  const projectName = watch("name");

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (currentStep < 4) {
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
        { id: "2", name: "level", path: "data.level" },
        { id: "3", name: "msg_detail", path: "data.msg_detail" }
      ]);
    } else if (type === "plainText") {
      setFields([
        { id: "1", name: "timestamp", path: "^\\d{4}-\\d{2}-\\d{2}" },
        { id: "2", name: "level", path: "(DEBUG|INFO|WARN|ERROR)" },
        { id: "3", name: "msg_detail", path: ".*$" }
      ]);
    } else {
      setFields([
        { id: "1", name: "timestamp", path: "" },
        { id: "2", name: "level", path: "" },
        { id: "3", name: "msg_detail", path: "" }
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
    // 삭제하려는 필드 찾기
    const fieldToRemove = fields.find(field => field.id === id);

    // 기본 필드인 경우 삭제 방지
    if (fieldToRemove && DEFAULT_FIELDS.includes(fieldToRemove.name)) {
      alert(`${fieldToRemove.name}은(는) 기본 필드이므로 삭제할 수 없습니다.`);
      return;
    }

    // 기본 필드가 아닌 경우 삭제 진행
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
    // 필드 이름 변경 시 기본 필드와 중복 체크
    if (key === "name" && DEFAULT_FIELDS.includes(value)) {
      // 이미 존재하는 기본 필드 이름인지 확인
      const isDuplicate = fields.some(field => field.name === value && field.id !== id);
      if (isDuplicate) {
        alert(`${value}은(는) 기본 필드이므로 중복해서 사용할 수 없습니다.`);
        return;
      }
    }

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
    const newCondition: FilterConditionWithId = {
      id: Date.now().toString(), // 임의 id 지정
      field: fields[0]?.name || "",
      operator: "EQUALS",
      value: ""
    };
    setFilterConditions([...filterConditions, newCondition]);
  };

  // 필터 조건 제거
  const handleRemoveFilterCondition = (id: string) => {
    setFilterConditions(filterConditions.filter(condition => condition.id !== id));
  };

  // 필터 조건 업데이트
  const handleFilterConditionChange = (
    id: string,
    key: keyof FilterConditionWithId,
    value: string
  ) => {
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

  // 드래그 종료 후 호출
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // active.id: 드래그 시작한 아이템의 ID
    // over.id: 드롭 지점(마우스를 떼는 순간) 위에 있는 아이템의 ID

    if (!over || active.id === over.id) return;

    // 1) 움직인 아이템의 이전 인덱스
    const oldIndex = fields.findIndex(f => f.id === active.id);
    // 2) 놓인 위치의 인덱스
    const newIndex = fields.findIndex(f => f.id === over.id);

    // 3) arrayMove를 통해 순서 교체
    // oldIndex 위치의 요소를 꺼내고
    // newIndex 위치에 삽입한다.
    setFields(arrayMove(fields, oldIndex, newIndex));
  };

  // 커스텀 센서 등록
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // 100ms 터치 홀드 후 활성화
        tolerance: 5 // 5px 이내 움직임 허용
      }
    })
  );

  const onSubmit = async (data: ProjectFormData) => {
    setApiError(null);

    // 필수 데이터 검증
    if (!data.collectionPath) {
      setApiError("수집 경로를 입력해주세요.");
      return;
    }

    if (!data.name) {
      setApiError("프로젝트 이름을 입력해주세요.");
      return;
    }

    if (fields.length === 0) {
      setApiError("최소 하나 이상의 필드가 필요합니다.");
      return;
    }

    setProcessingStep("generating");

    try {
      // Step1 데이터 준비 - API 스펙에 맞춰 정확히 구성
      const step1Data: Step1Request = {
        log_paths: [data.collectionPath],
        project_name: data.name,
        project_description: data.description || "",

        // 멀티라인 패턴 - plainText이고 활성화된 경우만
        multiline_pattern: logType === "plainText" && multilineEnabled ? multilinePattern : "",

        // 타임스탬프 관련 (JSON 전용)
        timestamp_field: logType === "json" ? "timestamp" : "",
        timestamp_json_path:
          logType === "json"
            ? fields.find(f => f.name === "timestamp")?.path || "data.timestamp"
            : "",

        // 로그 레벨 관련 (JSON 전용)
        log_level: logType === "json" ? "logLevel" : "",
        log_level_json_path:
          logType === "json" ? fields.find(f => f.name === "logLevel")?.path || "data.level" : "",

        // JSON 커스텀 필드 - JSON 타입일 때 기본 필드 제외한 모든 필드
        custom_json_fields:
          logType === "json"
            ? fields
                .filter(
                  field =>
                    !["timestamp", "logLevel"].includes(field.name) && field.name && field.path
                )
                .map(field => ({
                  name: field.name,
                  json_path: field.path
                }))
            : [],

        // Plain Text 커스텀 필드 - Plain Text 타입일 때 모든 필드 (기본 필드 포함)
        custom_plain_fields:
          logType === "plainText"
            ? fields
                .filter(field => field.name) // 이름이 있는 모든 필드
                .map(field => field.name)
            : [],

        // 필터 조건
        filters: filterConditions
          .filter(condition => condition.field && condition.value)
          .map(condition => ({
            field: condition.field,
            operator: condition.operator,
            value: condition.value
          })),

        // 플랫폼
        platform: platform
      };

      // 요청 데이터 로깅
      console.log("Step1 Request Data:", JSON.stringify(step1Data, null, 2));

      // Step1 API 호출
      const step1Response = await projectApi.createLogProjectStep1(step1Data);
      console.log("Step1 Response:", step1Response);

      // API 응답 구조에 맞게 수정
      const responseData = step1Response.data.data || step1Response.data;

      // 상태 업데이트
      setProjectId(responseData.project_id);
      setDownloadUrl(responseData.set_up_script_url);

      // 다운로드 안내 화면으로 이동
      setProcessingStep("download");
    } catch (error) {
      console.error("Error in Step1:", error);

      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
      } else {
        console.error("알 수 없는 에러 발생:", error);
      }

      setApiError("프로젝트 생성 중 오류가 발생했습니다.");
      setProcessingStep("form");
    }
  };

  // Grafana 대시보드 생성 함수 (Step2 호출)
  const handleCreateGrafana = async () => {
    setProcessingStep("grafana-creating");

    try {
      // Step2 API 호출
      console.log("Step2 Request project ID:", projectId);

      const step2Response = await projectApi.createLogProjectStep2({ project_id: projectId });
      console.log("Step2 Response:", step2Response);

      // 성공 화면으로 이동
      setProcessingStep("success");
    } catch (error) {
      console.error("Error in Step2:", error);
      setApiError("대시보드 생성 중 오류가 발생했습니다.");
      setProcessingStep("download");
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    setProcessingStep("form");
    setCurrentStep(4); // 확인 단계로 돌아가기
  };

  // 프로젝트 목록으로 이동 핸들러
  const handleGoToProjects = () => {
    navigate("/projects?dashboardCreating=true");
  };

  return (
    <Container>
      {processingStep === "form" && (
        <>
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
            <Step active={currentStep === 3} completed={currentStep > 3}>
              <StepNumber>3</StepNumber>
              파싱 설정
            </Step>
            <Step active={currentStep === 4} completed={currentStep > 4}>
              <StepNumber>4</StepNumber>
              확인
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

                <PlatformSelector value={platform} onChange={setPlatform} />

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
                  {logType === "plainText" &&
                    "Plain Text의 경우 정규식을 사용해 필드를 추출합니다."}
                </SectionSubtitle>
                <InfoBox>
                  <InfoTitle>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 8V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                    필드 순서 안내
                  </InfoTitle>
                  <InfoText>
                    필드는 설정한 순서대로 로그 데이터에 적용됩니다. 드래그 앤 드롭으로 필드 순서를
                    변경할 수 있습니다.
                  </InfoText>
                </InfoBox>

                <Accordion title="필드 설정" defaultOpen={true}>
                  {/* Plain Text 로그 타입일 때만 타임스탬프 경고 표시 */}
                  {logType === "plainText" && (
                    <CompactWarningBox>
                      <Accordion
                        title="⚠️ Plain Text 파싱 주의사항"
                        defaultOpen={false}
                        icon="info"
                        noMargin={true}
                      >
                        <WarningContent>
                          <WarningText>
                            공백이 포함된 타임스탬프는 별도 필드가 필요할 수 있습니다.
                          </WarningText>

                          <ExampleRow>
                            <ExampleItem type="good">
                              <ExampleLabel type="good">✓ 정상 인식</ExampleLabel>
                              <ExampleCode>2025-05-2603:00:29,872</ExampleCode>
                            </ExampleItem>

                            <ExampleItem type="bad">
                              <ExampleLabel type="bad">✗ 문제 발생</ExampleLabel>
                              <ExampleCode>2025-05-26 03:00:29,872</ExampleCode>
                            </ExampleItem>
                          </ExampleRow>

                          <SolutionText>
                            <SolutionTitle>💡 해결 방법</SolutionTitle>
                            <SolutionSteps>
                              공백 포함 시 <HighlightCode>timestamp</HighlightCode> 필드 외에
                              <HighlightCode>+timestamp</HighlightCode> 필드를 추가하여 시간 부분을
                              별도 처리하세요.
                            </SolutionSteps>
                          </SolutionText>
                        </WarningContent>
                      </Accordion>
                    </CompactWarningBox>
                  )}

                  {/* DndContext : 드래그·드롭 기능의 최상위 컨텍스트. */}
                  {/* collisionDetection={closestCenter}: 드래그 중인 아이템과 다른 아이템 간 충돌 판정을, 리스트 아이템의 중앙을 기준으로 계산하도록 설정. */}
                  {/* onDragEnd={handleDragEnd}: 드래그가 끝나고 손을 뗄 때 호출되는 콜백. */}
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    {/* SortableContext : DndContext 내부에서 “이 배열(items) 안의 요소들이 정렬 가능한 리스트”라고 알려주는 래퍼 */}
                    <SortableContext
                      items={fields.map(f => f.id)} // 드래그 가능한 각 아이템을 고유 ID 리스트로 전달
                      strategy={verticalListSortingStrategy} // 수직 리스트에 특화된 충돌 처리·애니메이션
                    >
                      {fields.map(field => (
                        <SortableField
                          key={field.id}
                          field={field}
                          logType={logType}
                          onFieldChange={handleFieldChange}
                          onRemoveField={handleRemoveField}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>

                  <AddFieldButton type="button" onClick={handleAddField}>
                    + 필드 추가
                  </AddFieldButton>
                </Accordion>

                {/* 멀티라인 처리 컴포넌트 */}
                {logType === "plainText" && (
                  <Accordion title="멀티라인 로그 처리" defaultOpen={true}>
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
                            이 정규식 패턴과 일치하는 줄이 나타나면 새로운 로그가 시작됩니다. <br />
                            위 예시는 '2023-01-01'과 같은 날짜로 시작하는 패턴입니다.
                          </HelperText>

                          <ExampleBlock>
                            <ExampleTitle>예시 로그와 처리 방식:</ExampleTitle>
                            <ExampleContent>
                              <ExampleLine
                                highlight
                              >{`2025-04-18 12:13:05.000 ERROR [PaymentService]`}</ExampleLine>
                              <ExampleLine indent>{`    at PaymentService.java:120`}</ExampleLine>
                              <ExampleLine
                                indent
                              >{`    at TransactionHandler.java:55`}</ExampleLine>
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
                  </Accordion>
                )}

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

                <Accordion title="필터링 조건 (선택)" defaultOpen={true}>
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
                              e.target.value as OperatorEnum // 타입 캐스팅
                            )
                          }
                        >
                          <option value="EQUALS">equals</option>
                          <option value="NOT_EQUALS">not equals</option>
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
                </Accordion>

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

            {/* 4단계: 확인 */}
            {currentStep === 4 && (
              <Card>
                <SectionTitle>설정 확인</SectionTitle>
                <SectionSubtitle>입력하신 정보를 확인하고 프로젝트를 생성합니다.</SectionSubtitle>

                <Accordion title="기본 정보" defaultOpen={true} icon="info">
                  <FieldContainer>
                    <FieldRow>
                      <FieldLabel>프로젝트 이름</FieldLabel>
                      <div>{getValues("name")}</div>
                    </FieldRow>
                    {getValues("description") && (
                      <FieldRow>
                        <FieldLabel>설명</FieldLabel>
                        <div style={{ whiteSpace: "pre-wrap" }}>{getValues("description")}</div>
                      </FieldRow>
                    )}
                  </FieldContainer>
                </Accordion>

                <Accordion title="수집 설정" defaultOpen={true} icon="settings">
                  <FieldContainer>
                    <FieldRow>
                      <FieldLabel>수집 경로</FieldLabel>
                      <div>{getValues("collectionPath")}</div>
                    </FieldRow>
                    <FieldRow>
                      <FieldLabel>로그 형식</FieldLabel>
                      <div>
                        {logType === "json" && "JSON"}
                        {logType === "plainText" && "Plain Text"}
                        {logType === "csv" && "CSV"}
                        {logType === "xml" && "XML"}
                      </div>
                    </FieldRow>
                    <FieldRow>
                      <FieldLabel>설치 플랫폼</FieldLabel>
                      <div>{platform}</div>
                    </FieldRow>
                  </FieldContainer>
                </Accordion>

                <Accordion title="파싱 설정" defaultOpen={true} icon="fields">
                  <FieldContainer>
                    <SectionSubtitle>설정된 필드</SectionSubtitle>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        style={{
                          padding: "0.5rem 0",
                          borderBottom: index < fields.length - 1 ? "1px dashed #eee" : "none"
                        }}
                      >
                        {index + 1}. {field.name}
                        {logType === "json" && field.path && ` (${field.path})`}
                      </div>
                    ))}
                  </FieldContainer>

                  {logType === "plainText" && multilineEnabled && (
                    <>
                      <SectionSubtitle style={{ marginTop: "1rem" }}>멀티라인 설정</SectionSubtitle>
                      <FieldContainer>
                        <div>멀티라인 처리 사용</div>
                        <div style={{ marginTop: "0.5rem" }}>
                          <strong>새 로그 시작 패턴:</strong> {multilinePattern}
                        </div>
                      </FieldContainer>
                    </>
                  )}

                  {filterConditions.length > 0 && (
                    <>
                      <SectionSubtitle style={{ marginTop: "1rem" }}>필터링 조건</SectionSubtitle>
                      <FieldContainer>
                        {filterConditions.map((condition, index) => (
                          <div key={condition.id} style={{ marginBottom: "0.5rem" }}>
                            {index + 1}. {condition.field}{" "}
                            {condition.operator === "EQUALS" ? "=" : "!="} {condition.value}
                          </div>
                        ))}
                      </FieldContainer>
                    </>
                  )}
                </Accordion>

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
        </>
      )}

      {processingStep === "generating" && (
        <LoadingSpinner
          title="설정 파일 생성 중..."
          description="프로젝트 설정에 맞는 로그 수집 파일을 생성하고 있습니다. 잠시만 기다려주세요."
        />
      )}

      {processingStep === "download" && (
        <DownloadGuide
          projectId={projectId}
          downloadUrl={downloadUrl}
          projectName={getValues("name") || ""}
          platform={platform}
          onNext={handleCreateGrafana}
          onCancel={handleCancel}
        />
      )}

      {processingStep === "grafana-creating" && (
        <LoadingSpinner
          title="Grafana 대시보드 생성 중..."
          description="로그 시각화를 위한 Grafana 대시보드를 생성하고 있습니다. 잠시만 기다려주세요."
        />
      )}

      {processingStep === "success" && (
        <GrafanaSuccess projectName={getValues("name") || ""} onGoToProjects={handleGoToProjects} />
      )}

      {apiError && processingStep !== "form" && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <ErrorMessage>{apiError}</ErrorMessage>
          <Button variant="secondary" onClick={handleCancel}>
            돌아가기
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CreateProject;
