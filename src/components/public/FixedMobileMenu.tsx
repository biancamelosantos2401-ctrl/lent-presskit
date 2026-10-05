import { ArrowUpRight, MessageCircle } from 'lucide-react';

type Props = {
  whatsappUrl?: string | null;
  whatsappLabel?: string | null;
};

/**
 * Barra de acesso rápido fixada no rodapé em telas pequenas.
 *
 * Fica fora de `.site-header` de propósito: o cabeçalho usa `backdrop-filter`,
 * que cria bloco de contenção e faria `position: fixed` valer contra ele em vez
 * da viewport.
 */
export function FixedMobileMenu({ whatsappUrl, whatsappLabel }: Props) {
  const items = [['#home', 'HOME'], ['#agenda', 'AGENDA'], ['#eventos', 'EVENTOS'], ['#sets', 'SETS'], ['#fotos', 'FOTOS'], ['#sobre', 'SOBRE'], ['#materiais', 'MATERIAIS'], ['#contato', 'CONTATO']];
  return (
    <div className="mobile-dock">
      {whatsappUrl ? (
        <a className="mobile-dock-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} />
          {whatsappLabel || 'Falar no WhatsApp'}
          <ArrowUpRight size={15} />
        </a>
      ) : null}
      <nav className="mobile-menu" aria-label="Navegação mobile">
        {items.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
      </nav>
    </div>
  );
}
