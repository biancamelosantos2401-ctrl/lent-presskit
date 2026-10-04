import { ExternalLink } from 'lucide-react';

function widgetUrl(source: string) {
  if (source.includes('w.soundcloud.com/player/')) {
    const url = new URL(source);
    url.searchParams.set('auto_play', 'true');
    url.searchParams.set('color', '#39d353');
    url.searchParams.set('hide_related', 'true');
    url.searchParams.set('show_comments', 'false');
    url.searchParams.set('show_reposts', 'false');
    url.searchParams.set('show_teaser', 'false');
    url.searchParams.set('visual', 'false');
    return url.toString();
  }

  const params = new URLSearchParams({
    url: source,
    color: '#39d353',
    auto_play: 'true',
    hide_related: 'true',
    show_comments: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
    visual: 'false',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function SoundCloudPreview({ source, title }: { source: string; title: string }) {
  return (
    <div className="soundcloud-preview">
      <iframe
        title={`Prévia SoundCloud: ${title}`}
        src={widgetUrl(source)}
        allow="autoplay"
        loading="eager"
      />
      <a href={source} target="_blank" rel="noopener noreferrer">
        Abrir no SoundCloud <ExternalLink size={13} />
      </a>
    </div>
  );
}
