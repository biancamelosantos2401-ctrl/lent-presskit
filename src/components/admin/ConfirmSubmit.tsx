'use client';

export function ConfirmSubmit({ children, className = 'danger-button' }: { children: React.ReactNode; className?: string }) {
  return <button className={className} type="submit" onClick={(event) => { if (!window.confirm('Confirma a exclusão deste item?')) event.preventDefault(); }}>{children}</button>;
}
