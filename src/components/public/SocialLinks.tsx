import { Cloud, Disc3, Instagram, Music2, Youtube } from 'lucide-react';

const icons = { Instagram, SoundCloud: Cloud, Spotify: Disc3, YouTube: Youtube, TikTok: Music2 };

export function SocialLinks({ links }: { links: Array<{ id: string; platform: string; url: string }> }) {
  return <div className="hero-socials" aria-label="Redes sociais">{links.map((link) => { const Icon = icons[link.platform as keyof typeof icons] ?? Music2; return <a className="social-icon" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform} key={link.id}><Icon size={19} /></a>; })}</div>;
}
