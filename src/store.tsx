import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { demoState } from "./demo";
import type { CRMState, Deal, Task } from "./types";

const KEY = "leadflow-crm-v1";
const CRMContext = createContext<ReturnType<typeof useCRMState> | null>(null);
const id = () => crypto.randomUUID();

function useCRMState() {
  const [state, setState] = useState<CRMState>(() => { try { return JSON.parse(localStorage.getItem(KEY) || "null") || demoState; } catch { return demoState; } });
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);

  const api = useMemo(() => ({
    updateDeal: (dealId: string, patch: Partial<Deal>, event?: string) => setState(s => ({ ...s, deals: s.deals.map(d => d.id === dealId ? { ...d, ...patch, updatedAt: new Date().toISOString(), events: event ? [...d.events, { id: id(), text: event, createdAt: new Date().toISOString() }] : d.events } : d) })),
    addDeal: (data: Pick<Deal, "title" | "clientName" | "phone" | "amount" | "pipelineId" | "stageId">) => setState(s => ({ ...s, deals: [{ ...data, id: id(), priority: "normal", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), assigneeId: s.users[0].id, tagIds: [], comments: [], custom: {}, events: [{ id: id(), text: "Сделка создана", createdAt: new Date().toISOString() }] }, ...s.deals] })),
    deleteDeal: (dealId: string) => setState(s => ({ ...s, deals: s.deals.filter(d => d.id !== dealId), tasks: s.tasks.filter(t => t.dealId !== dealId) })),
    addComment: (dealId: string, text: string) => setState(s => ({ ...s, deals: s.deals.map(d => d.id === dealId ? { ...d, comments: [...d.comments, { id: id(), text, createdAt: new Date().toISOString(), author: "Алексей" }], events: [...d.events, { id: id(), text: "Добавлен комментарий", createdAt: new Date().toISOString() }] } : d) })),
    addTask: (task: Omit<Task, "id" | "done">) => setState(s => ({ ...s, tasks: [...s.tasks, { ...task, id: id(), done: false }] })),
    toggleTask: (taskId: string) => setState(s => ({ ...s, tasks: s.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) })),
    addTag: (name: string, color: string) => setState(s => ({ ...s, tags: [...s.tags, { id: id(), name, color }] })),
    deleteTag: (tagId: string) => setState(s => ({ ...s, tags: s.tags.filter(t => t.id !== tagId), deals: s.deals.map(d => ({ ...d, tagIds: d.tagIds.filter(x => x !== tagId) })) })),
    addCustomField: (name: string, type: "text" | "number" | "date" | "checkbox" | "select", options?: string[]) => setState(s => ({ ...s, customFields: [...s.customFields, { id: id(), name, type, options }] })),
    addPipeline: (name: string) => setState(s => ({ ...s, pipelines: [...s.pipelines, { id: id(), name, stages: [{ id: id(), name: "Новый этап", color: "#3b82f6", order: 0 }] }] })),
    updateStageName: (pipelineId: string, stageId: string, name: string) => setState(s => ({ ...s, pipelines: s.pipelines.map(p => p.id === pipelineId ? { ...p, stages: p.stages.map(st => st.id === stageId ? { ...st, name } : st) } : p) })),
    addStage: (pipelineId: string) => setState(s => ({ ...s, pipelines: s.pipelines.map(p => p.id === pipelineId ? { ...p, stages: [...p.stages, { id: id(), name: "Новый этап", color: "#6366f1", order: p.stages.length }] } : p) })),
    replaceDeals: (deals: Deal[]) => setState(s => ({ ...s, deals })),
    reset: () => setState(demoState)
  }), []);
  return { state, ...api };
}

export function CRMProvider({ children }: { children: ReactNode }) { return <CRMContext.Provider value={useCRMState()}>{children}</CRMContext.Provider>; }
export function useCRM() { const v = useContext(CRMContext); if (!v) throw new Error("CRMProvider missing"); return v; }
