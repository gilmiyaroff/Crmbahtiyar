import { X } from "lucide-react";
import type { ReactNode } from "react";
export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) { return <div className="modal-wrap" role="dialog" aria-modal="true"><button className="modal-backdrop" onClick={onClose} aria-label="Закрыть"/><div className="modal"><div className="modal-head"><h2>{title}</h2><button className="icon" onClick={onClose}><X /></button></div>{children}</div></div>; }
