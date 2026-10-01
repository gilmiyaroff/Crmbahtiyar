# Leadflow CRM

Рабочий MVP простой CRM для таргетолога. Интерфейс и демо-данные на русском, все изменения сохраняются в `localStorage`. Проект можно сразу импортировать в GitHub и развернуть на Vercel, Netlify или Cloudflare Pages.

## Что работает

- демо-вход с ролями, светлая и тёмная темы;
- две настраиваемые воронки и Kanban с drag-and-drop;
- создание, редактирование и удаление сделок в боковой панели;
- приоритеты, теги, комментарии, история, следующий контакт и задачи;
- глобальный поиск и фильтр по приоритету;
- дашборд, задачи и базовая аналитика;
- CSV/XLSX импорт с дедупликацией по телефону и CSV/XLSX экспорт;
- управление воронками, этапами, тегами и пользовательскими полями;
- responsive-интерфейс и браузерное сохранение данных;
- SQL-миграция для перехода на Supabase/PostgreSQL;
- экспериментальный WebMCP action `create_crm_deal` в поддерживаемых браузерах.

## Локальный запуск

Нужен Node.js 20+.

```bash
npm install
npm run dev
```

Откройте адрес, который покажет Vite. Для production-проверки:

```bash
npm run build
npm run preview
```

## Импорт в GitHub

Создайте пустой репозиторий, затем из этой папки:

```bash
git init
git add .
git commit -m "Initial Leadflow CRM MVP"
git branch -M main
git remote add origin <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
git push -u origin main
```

## Переменные окружения

Для текущего локального прототипа переменные не нужны. `.env.example` содержит заготовки для следующего этапа с Supabase и защищённым webhook.

## Архитектура данных

Локальная версия использует типизированное состояние и `localStorage`. Production-схема лежит в `supabase/migrations/001_initial.sql`: `profiles`, `pipelines`, `pipeline_stages`, `deals`, `tags`, `deal_tags`, `custom_field_definitions`, `custom_field_values`, `tasks`, `comments`, `deal_events`.

## Сознательно оставлено на следующую версию

- реальная Supabase Auth и серверное хранение;
- RLS-политики с workspace/tenant scope;
- защищённый `POST /api/webhooks/leads`;
- файловые вложения;
- расширенный конструктор составных фильтров и mapping UI при импорте;
- полноценное управление пользователями и правами;
- внешние уведомления и интеграции.

## Production notes

Для production подключите Supabase, добавьте workspace scope в таблицы и RLS-политики, вынесите операции из browser store в repository/service слой. Для резервного копирования включите ежедневные managed backups Supabase и еженедельный логический экспорт в отдельное защищённое хранилище; регулярно проверяйте восстановление.
