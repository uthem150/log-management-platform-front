// src/types/project.ts

export type ProjectStatus = "INITIATED" | "IN_PROGRESS" | "READY" | "FAILED";
export type PlatformEnum = "windows" | "linux";
export type OperatorEnum = "EQUALS" | "NOT_EQUALS";

// Dashboard 타입
export interface Dashboard {
  id: string;
  uid: string | null;
  title: string;
  folder_uid: string;
  url: string | null;
  panels: undefined[];
  tags: string[];
  data_sources: string[];
}

export interface PublicDashboard {
  id: string;
  uid: string;
  public_url: string;
  project_id: string;
  dashboard_id: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  project_type: string;
  status: ProjectStatus;
  service_account_id: string | null;
  description: string | null;
  user_folder_id: string | null;
  dashboard: Dashboard | null;
  public_dashboard: PublicDashboard | null;
}

export interface ProjectListData {
  items: Project[];
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_previous: boolean;
  has_next: boolean;
}

export interface ProjectListResponse {
  data: ProjectListData;
  message: string;
}

export interface SingleProjectResponse {
  data: Project;
  message: string;
}

// Step1, Step2 관련 타입들
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

export interface Step1ResponseData {
  project_id: string;
  set_up_script_url: string;
}

export interface Step1Response {
  data: Step1ResponseData;
  message: string;
}

export interface Step2Request {
  project_id: string;
}
