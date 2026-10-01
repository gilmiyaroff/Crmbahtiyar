export type Priority = "low" | "normal" | "high" | "urgent";
export type View = "dashboard" | "deals" | "tasks" | "analytics" | "settings";
export type FieldType = "text" | "textarea" | "number" | "money" | "date" | "checkbox" | "select";

export interface Stage { id: string; name: string; color: string; order: number; won?: boolean; lost?: boolean }
export interface Pipeline { id: string; name: string; stages: Stage[] }
export interface Tag { id: string; name: string; color: string }
export interface User { id: string; name: string; role: "Admin" | "User"; initials: string }
export interface CustomField { id: string; name: string; type: FieldType; options?: string[] }
export interface Comment { id: string; text: string; createdAt: string; author: string }
export interface DealEvent { id: string; text: string; createdAt: string }
export interface Task { id: string; dealId: string; title: string; dueAt: string; note?: string; done: boolean }
export interface Deal {
  id: string; title: string; clientName: string; phone: string; email?: string;
  pipelineId: string; stageId: string; amount: number; priority: Priority;
  createdAt: string; updatedAt: string; nextContact?: string; assigneeId: string;
  tagIds: string[]; comments: Comment[]; events: DealEvent[]; custom: Record<string, string | number | boolean>;
}
export interface CRMState { pipelines: Pipeline[]; deals: Deal[]; tags: Tag[]; users: User[]; tasks: Task[]; customFields: CustomField[] }
