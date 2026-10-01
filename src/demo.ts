import type { CRMState, Deal, Priority } from "./types";

const iso = (days: number, hour = 10) => { const d = new Date(); d.setDate(d.getDate() + days); d.setHours(hour, 0, 0, 0); return d.toISOString(); };
const names = ["Анна Соколова", "Иван Волков", "Диана Абдуллаева", "Максим Орлов", "Алина Ким", "Егор Лебедев", "Виктория Романова", "Артур Садыков", "Мария Попова", "Никита Смирнов", "Елена Кузнецова", "Тимур Алиев", "София Морозова", "Денис Новиков", "Полина Федорова", "Роман Егоров", "Дарья Белова", "Алексей Макаров", "Кристина Жукова", "Сергей Павлов", "Ольга Андреева", "Марат Исаев", "Лилия Зайцева", "Владислав Комаров"];
const stageIds = ["new", "no-answer", "working", "thinking", "later", "won", "lost"];
const priorities: Priority[] = ["normal", "high", "normal", "urgent", "low"];
const sources = ["Instagram", "Facebook", "Рекомендация"];

const deals: Deal[] = names.map((name, i) => ({
  id: `deal-${i + 1}`, title: i % 3 === 0 ? "Настройка рекламы" : i % 3 === 1 ? "Ведение проекта" : "Консультация",
  clientName: name, phone: `+7 700 ${String(1200000 + i * 731).replace(/(\d{3})(\d{2})(\d{2})/, "$1 $2 $3")}`,
  email: i % 4 ? `${name.split(" ")[0].toLowerCase()}@mail.kz` : undefined,
  pipelineId: i > 19 ? "repeat" : "sales", stageId: i > 19 ? ["touch", "contact-later", "back"][i % 3] : stageIds[i % stageIds.length],
  amount: 90000 + (i % 7) * 35000, priority: priorities[i % priorities.length], createdAt: iso(-i), updatedAt: iso(-(i % 5)),
  nextContact: i % 4 === 0 ? iso(-2, 14) : i % 3 === 0 ? iso(0, 16) : iso((i % 8) + 1, 11), assigneeId: i % 4 === 0 ? "user-2" : "user-1",
  tagIds: i % 5 === 0 ? ["hot", "repeat"] : i % 3 === 0 ? ["thinking"] : i % 4 === 0 ? ["expensive"] : ["hot"],
  custom: { source: sources[i % sources.length], budget: 150000 + i * 10000, brief: i % 2 === 0 },
  comments: i % 3 === 0 ? [{ id: `comment-${i}`, text: "Обсудили задачу, ждёт предложение в мессенджере.", createdAt: iso(-(i % 4)), author: "Алексей" }] : [],
  events: [{ id: `event-${i}`, text: "Сделка создана", createdAt: iso(-i) }]
}));

export const demoState: CRMState = {
  users: [{ id: "user-1", name: "Алексей Воронцов", role: "Admin", initials: "АВ" }, { id: "user-2", name: "Марина Орлова", role: "User", initials: "МО" }],
  pipelines: [
    { id: "sales", name: "Продажа услуг", stages: [
      { id: "new", name: "Новая заявка", color: "#84cc16", order: 0 }, { id: "no-answer", name: "Не дозвонился", color: "#f59e0b", order: 1 },
      { id: "working", name: "В работе", color: "#3b82f6", order: 2 }, { id: "thinking", name: "Думает", color: "#8b5cf6", order: 3 },
      { id: "later", name: "Запуск позже", color: "#06b6d4", order: 4 }, { id: "won", name: "Успешно", color: "#10b981", order: 5, won: true },
      { id: "lost", name: "Не реализовано", color: "#ef4444", order: 6, lost: true }
    ]},
    { id: "repeat", name: "Повторные касания", stages: [
      { id: "touch", name: "Повторное касание", color: "#3b82f6", order: 0 }, { id: "contact-later", name: "Связаться позже", color: "#f59e0b", order: 1 },
      { id: "back", name: "Вернулся в работу", color: "#10b981", order: 2 }
    ]}
  ],
  deals,
  tags: [{ id: "hot", name: "Горячий", color: "#ef4444" }, { id: "thinking", name: "Думает", color: "#8b5cf6" }, { id: "expensive", name: "Дорого", color: "#f59e0b" }, { id: "repeat", name: "Повторное касание", color: "#3b82f6" }],
  customFields: [{ id: "source", name: "Источник", type: "select", options: sources }, { id: "budget", name: "Бюджет на рекламу", type: "money" }, { id: "brief", name: "Бриф заполнен", type: "checkbox" }],
  tasks: deals.slice(0, 14).map((deal, i) => ({ id: `task-${i}`, dealId: deal.id, title: i % 2 ? "Позвонить клиенту" : "Отправить предложение", dueAt: iso(i < 4 ? -1 : i < 8 ? 0 : i - 6, 12 + (i % 5)), note: i % 3 ? "" : "Уточнить решение по бюджету", done: i > 11 }))
};
