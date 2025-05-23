// src/types/project.ts

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  dashboardId?: string; // Grafana 대시보드 ID
  dashboardUrl?: string; // Grafana 대시보드 URL
  status: ProjectStatus;
}

export type ProjectStatus = "active" | "inactive" | "configuring";

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface ProjectListResponse {
  projects: Project[];
  totalCount: number;
}

export interface ProjectResponse {
  project: Project;
}

export type PlatformEnum = "windows" | "linux";
export type OperatorEnum = "EQUALS" | "NOT_EQUALS";

export interface JsonFieldMapping {
  name: string;
  json_path: string;
}

export interface FilterCondition {
  field: string;
  operator: OperatorEnum;
  value: string;
}

// id가 필요한 UI 관리용 별도 인터페이스 추가
export interface FilterConditionWithId extends FilterCondition {
  id: string;
}

export interface Step1Request {
  log_paths: string[];
  project_name: string;
  project_description: string;
  multiline_pattern: string;
  timestamp_field: string;
  timestamp_json_path: string;
  log_level: string;
  log_level_json_path: string;
  custom_json_fields: JsonFieldMapping[];
  custom_plain_fields: string[];
  filters: FilterCondition[];
  platform: PlatformEnum;
}

export interface Step1Response {
  project_id: string;
  set_up_script_url: string;
}

export interface Step2Request {
  project_id: string;
}
