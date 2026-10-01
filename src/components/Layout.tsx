import { BarChart3, BriefcaseBusiness, CheckSquare, LayoutDashboard, Menu, Moon, Search, Settings, Sun, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { View } from "../types";

const nav = [{ id: "dashboard", label: "Дашборд", icon: LayoutDashboard }, { id: "deals", label: "Сделки", icon: BriefcaseBusiness }, { id: "tasks", label: "Задачи", icon: CheckSquare }, { id: "analytics", label: "Аналитика", icon: BarChart3 }, { id: "settings", label: "Настройки", icon: Settings }] as const;

export function Layout({ view, setView, query, setQuery, dark, setDark, children, onLogout }: { view: View; setView: (v: View) => void; query: string; setQuery: (v: string) => void; dark: boolean; setDark: (v: boolean) => void; children: ReactNode; onLogout: () => void }) {
  const [mobile, setMobile] = useState(false);
  return <div className={dark ? "app dark" : "app"}>
    <aside className={mobile ? "sidebar open" : "sidebar"}>
      <div className="brand"><span className="brandmark">L</span><span>Leadflow</span><button className="icon mobile-close" onClick={() => setMobile(false)}><X /></button></div>
      <nav>{nav.map(n => <button key={n.id} className={view === n.id ? "nav active" : "nav"} onClick={() => { setView(n.id); setMobile(false); }}><n.icon />{n.label}</button>)}</nav>
      <div className="user"><span className="avatar">АВ</span><span><strong>Алексей</strong><small>Администратор</small></span><button className="logout" onClick={onLogout}>Выйти</button></div>
    </aside>
    {mobile && <button className="scrim" aria-label="Закрыть меню" onClick={() => setMobile(false)} />}
    <main className="main">
      <header className="topbar"><button className="icon menu" onClick={() => setMobile(true)}><Menu /></button><div className="search"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Поиск по имени, телефону, email…" /></div><button className="icon" aria-label="Переключить тему" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button><span className="avatar top-avatar">АВ</span></header>
      <div className="content">{children}</div>
    </main>
  </div>;
}
