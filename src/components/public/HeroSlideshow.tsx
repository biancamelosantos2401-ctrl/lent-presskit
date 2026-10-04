'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroSlideshow({ images, intervalSeconds, alt }: { images: string[]; intervalSeconds: number; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = images.length ? images : ['/uploads/lent-original.jpg'];

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), intervalSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [intervalSeconds, slides.length]);

  return <div className="hero-slideshow" aria-label="Galeria de fotos do LENT">{slides.map((src, index) => <Image key={`${src}-${index}`} className={index === activeIndex ? 'hero-slide active' : 'hero-slide'} src={src} alt={index === activeIndex ? alt : ''} fill priority={index === 0} sizes="(max-width: 820px) 100vw, 70vw" />)}</div>;
}
