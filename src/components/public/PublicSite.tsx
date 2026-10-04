import type { getPublicSiteData } from '@/lib/site-data';
import { ArrowDownToLine, ArrowUpRight, ChevronRight, MapPin, MessageCircle, Play } from 'lucide-react';
import Image from 'next/image';
import { SocialLinks } from '@/components/public/SocialLinks';
import { FixedMobileMenu } from '@/components/public/FixedMobileMenu';
import { HeroSlideshow } from '@/components/public/HeroSlideshow';
import { SoundCloudPreview } from '@/components/public/SoundCloudPreview';

type PublicData = Awaited<ReturnType<typeof getPublicSiteData>>;

function dateParts(date: Date) {
  const formatted = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date).replace('.', '');
  const [day, month] = formatted.split(' de ');
  return { day, month: (month ?? '').toUpperCase() };
}

function eventStatusClass(status: string) {
  if (status === 'CANCELADO') return 'status-pill cancelled';
  if (status === 'A CONFIRMAR') return 'status-pill pending';
  return 'status-pill';
}

function sectionFor(data: PublicData, key: string) {
  return data.sections.find((section) => section.section === key) ?? { title: key.toUpperCase(), subtitle: '', cta: 'VER MAIS →' };
}

export function PublicSite({ data }: { data: PublicData }) {
  const agendaSection = sectionFor(data, 'agenda');
  const eventsSection = sectionFor(data, 'events');
  const setsSection = sectionFor(data, 'sets');
  const event = data.events[0];

  return (
    <main className="public-shell">
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" aria-label="LENT — início"><Image className="header-logo" src="/brand/lent-logo.png" alt="LENT" width={150} height={100} priority /></a>
          <nav className="site-nav" aria-label="Navegação principal">
            <a className="active" href="#home">HOME</a><a href="#agenda">AGENDA</a><a href="#eventos">EVENTOS</a><a href="#sets">SETS</a><a href="#sobre">SOBRE</a><a href="#materiais">MATERIAIS</a><a href="#contato">CONTATO</a>
          </nav>
          <FixedMobileMenu />
        </div>
      </header>

      <div className="site-container">
        <section id="home" className="hero">
          <div className="hero-image"><HeroSlideshow images={data.settings.heroImages} intervalSeconds={data.settings.heroIntervalSeconds} alt="João Quaresma, LENT" /></div>
          <div className="hero-content">
            <div className="hero-copy">
              <Image className="hero-logo" src="/brand/lent-logo.png" alt="LENT" width={720} height={480} priority />
              <h1 className="hero-name">{data.settings.realName}</h1>
              <p className="hero-tagline">{data.settings.tagline}</p>
              <div className="hero-meta">
                <SocialLinks links={data.socials} />
                <div className="location-label"><MapPin size={16} /><span>{data.settings.location}<br />{data.settings.country}</span></div>
              </div>
              {data.settings.whatsappEnabled && data.settings.whatsappPhone ? <a className="whatsapp-button" href={`https://wa.me/${data.settings.whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent(data.settings.whatsappMessage ?? '')}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={25} />{data.settings.whatsappButtonText}<ArrowUpRight size={17} /></a> : null}
            </div>
          </div>
        </section>

        <section className="quadrants" aria-label="Conteúdo principal">
          <article id="agenda" className="content-card agenda-card">
            <div className="card-heading"><div><p className="eyebrow">{agendaSection.subtitle}</p><h2 className="card-title">{agendaSection.title}</h2></div><a href="#agenda" className="card-arrow" aria-label="Ver agenda"><ChevronRight size={19} /></a></div>
            <div className="agenda-list">
              {data.agenda.length ? data.agenda.map((item) => { const date = dateParts(item.eventDate); return <div className="agenda-row" key={item.id}><div className="agenda-date">{date.day}<span>{date.month}</span></div><div className="agenda-info"><strong>{item.title}</strong><small>{item.venue}<br />{item.city} / {item.state}</small></div><span className={eventStatusClass(item.status)}>{item.status}</span></div>; }) : <div className="empty-state">Novas datas em breve.</div>}
            </div>
            <a className="card-footer" href="#agenda">{agendaSection.cta}</a>
          </article>

          <article id="eventos" className="content-card events-card">
            <div className="card-heading"><div><p className="eyebrow">{eventsSection.subtitle}</p><h2 className="card-title">{eventsSection.title}</h2></div><a href="#eventos" className="card-arrow" aria-label="Ver eventos"><ChevronRight size={19} /></a></div>
            {event ? <><div className="event-cover"><Image src={event.coverImage} alt={event.title} fill sizes="(max-width: 820px) 100vw, 33vw" /></div><div className="event-info"><div><strong>{event.title}</strong><small>{event.city} / {event.state}</small></div><small>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(event.eventDate).replace('.', '').toUpperCase()}</small></div><div className="event-thumbs">{(event.images.length ? event.images : [{ id: 'fallback-1', imageUrl: event.coverImage }, { id: 'fallback-2', imageUrl: event.coverImage }, { id: 'fallback-3', imageUrl: event.coverImage }]).slice(0, 3).map((image) => <Image key={image.id} src={image.imageUrl} alt="Registro de evento LENT" width={160} height={90} />)}</div></> : <div className="empty-state">Registros recentes em breve.</div>}
            <a className="card-footer" href="#eventos">{eventsSection.cta}</a>
          </article>

          <article id="sets" className="content-card sets-card">
            <div className="card-heading"><div><p className="eyebrow">{setsSection.subtitle}</p><h2 className="card-title">{setsSection.title}</h2></div><a href="#sets" className="card-arrow" aria-label="Ver sets"><ChevronRight size={19} /></a></div>
            <div className="set-list">{data.sets.length ? data.sets.map((set) => { const soundCloudSource = set.platform === 'SoundCloud' ? (set.embedUrl || set.externalUrl) : null; return <div className="set-entry" key={set.id}><a className="set-row" href={soundCloudSource ? '#sets' : set.externalUrl || set.embedUrl || '#sets'} target={soundCloudSource ? undefined : set.externalUrl || set.embedUrl ? '_blank' : undefined} rel="noopener noreferrer"><div className="set-cover"><Image src={set.coverImage} alt={set.title} fill sizes="50px" /><span className="play-overlay"><Play size={18} fill="currentColor" /></span></div><div className="set-info"><strong>{set.title}</strong><small>{set.genre} · {set.duration}</small><span className="waveform" aria-hidden>{Array.from({ length: 25 }, (_, i) => <i key={i} style={{ '--h': `${5 + ((i * 17) % 12)}px` } as React.CSSProperties} />)}</span></div><span className="set-meta">{set.duration}</span></a>{soundCloudSource ? <SoundCloudPreview source={soundCloudSource} title={set.title} /> : null}</div>; }) : <div className="empty-state">Sets em breve.</div>}</div>
            <a className="card-footer" href="#sets">{setsSection.cta}</a>
          </article>
        </section>

        <section id="materiais" className="materials-section"><div className="materials-heading"><div><p className="eyebrow">DOWNLOADS OFICIAIS</p><h2>ARQUIVOS E MATERIAIS</h2></div><span className="materials-count">{data.resources.length.toString().padStart(2, '0')} ARQUIVOS</span></div>{data.resources.length ? <div className="materials-list">{data.resources.map((resource) => <a className="material-row" href={resource.media.url} download key={resource.id}><div><strong>{resource.title}</strong><small>{resource.description || resource.media.originalName}</small></div><span className="material-file">PDF <ArrowDownToLine size={17} /></span></a>)}</div> : <div className="empty-state">Materiais oficiais em breve.</div>}</section>

        {data.about.enabled ? <section id="sobre" className="about-section"><div className="about-image"><Image src={data.about.imageUrl} alt="João Quaresma, LENT" width={520} height={420} /></div><div className="about-copy"><h2>{data.about.title}</h2><p>{data.about.body}</p></div><div className="stats">{data.stats.map((stat) => <div className="stat" key={stat.id}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section> : null}
      </div>
      <footer id="contato" className="site-footer"><span><strong>LENT</strong> · JOÃO QUARESMA</span><span>BOOKING · MUSIC / PARTY / CULTURE</span></footer>
    </main>
  );
}
