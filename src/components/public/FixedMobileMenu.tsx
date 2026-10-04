export function FixedMobileMenu() {
  const items = [['#home', 'HOME'], ['#agenda', 'AGENDA'], ['#eventos', 'EVENTOS'], ['#sets', 'SETS'], ['#sobre', 'SOBRE'], ['#materiais', 'MATERIAIS'], ['#contato', 'CONTATO']];
  return <nav className="mobile-menu" aria-label="Navegação mobile">{items.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>;
}
