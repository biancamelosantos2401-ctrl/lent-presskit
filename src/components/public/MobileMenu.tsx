import { Menu } from 'lucide-react';

export function MobileMenu() {
  const items = [['#home', 'HOME'], ['#agenda', 'AGENDA'], ['#eventos', 'EVENTOS'], ['#sets', 'SETS'], ['#sobre', 'SOBRE'], ['#materiais', 'MATERIAIS'], ['#contato', 'CONTATO']];
  return <details className="mobile-menu"><summary className="mobile-menu-button" aria-label="Abrir menu"><Menu size={20} /></summary><nav className="mobile-menu-panel" aria-label="Navegação mobile">{items.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav></details>;
}
