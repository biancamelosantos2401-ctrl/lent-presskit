import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || password.length < 12) {
    throw new Error('ADMIN_EMAIL e ADMIN_PASSWORD (mínimo 12 caracteres) são obrigatórios para o seed.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: 'LENT' },
    create: { email, passwordHash, name: 'LENT' },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      realName: 'João Quaresma',
      location: 'Belo Horizonte',
      country: 'Brasil',
      tagline: 'MUSIC / PARTY / CULTURE',
      heroImage: '/uploads/lent-original.jpg',
      heroImages: JSON.stringify(['/uploads/lent-original.jpg']),
      heroIntervalSeconds: 7,
      bookingUrl: '#contato',
      whatsappEnabled: true,
      whatsappPhone: '553194777633',
      whatsappMessage: 'Olá, LENT! Gostaria de falar sobre uma data.',
      whatsappButtonText: 'Falar no WhatsApp',
    },
  });

  const sectionDefaults = [
    { section: 'agenda', title: 'AGENDA', subtitle: 'PRÓXIMOS COMPROMISSOS', cta: 'VER AGENDA COMPLETA →' },
    { section: 'events', title: 'ÚLTIMOS EVENTOS', subtitle: 'REGISTROS RECENTES', cta: 'VER TODOS OS EVENTOS →' },
    { section: 'sets', title: 'SETS', subtitle: 'ÚLTIMOS LANÇAMENTOS', cta: 'VER TODOS OS SETS →' },
  ];

  for (const section of sectionDefaults) {
    await prisma.sectionSettings.upsert({ where: { section: section.section }, update: {}, create: section });
  }

  const socialDefaults = [
    { platform: 'Instagram', url: 'https://instagram.com/lent', position: 0 },
    { platform: 'SoundCloud', url: 'https://soundcloud.com/lent', position: 1 },
    { platform: 'Spotify', url: 'https://open.spotify.com/artist/lent', position: 2 },
    { platform: 'YouTube', url: 'https://youtube.com/@lent', position: 3 },
    { platform: 'TikTok', url: 'https://tiktok.com/@lent', position: 4 },
  ];

  for (const social of socialDefaults) {
    await prisma.socialLink.upsert({ where: { platform: social.platform }, update: {}, create: social });
  }

  if ((await prisma.agendaItem.count()) === 0) {
    await prisma.agendaItem.createMany({
      data: [
        { eventDate: new Date('2026-10-24T22:00:00-03:00'), title: 'LOST IN', venue: 'Local 299', city: 'Belo Horizonte', state: 'MG', country: 'Brasil', status: 'CONFIRMADO', position: 0 },
        { eventDate: new Date('2026-11-08T22:00:00-03:00'), title: 'UNDERGROUND', venue: 'Club XYZ', city: 'São Paulo', state: 'SP', country: 'Brasil', status: 'CONFIRMADO', position: 1 },
        { eventDate: new Date('2026-11-21T22:00:00-03:00'), title: 'TECH SESSION', venue: 'Warehouse', city: 'Rio de Janeiro', state: 'RJ', country: 'Brasil', status: 'A CONFIRMAR', position: 2 },
      ],
    });
  }

  if ((await prisma.recentEvent.count()) === 0) {
    const event = await prisma.recentEvent.create({
      data: {
        title: 'LOST IN',
        subtitle: 'REGISTROS RECENTES',
        description: 'Uma noite de música, presença e conexão na pista.',
        eventDate: new Date('2024-09-12T22:00:00-03:00'),
        city: 'Belo Horizonte',
        state: 'MG',
        coverImage: '/uploads/lent-original.jpg',
        position: 0,
      },
    });
    await prisma.recentEventImage.createMany({
      data: [
        { eventId: event.id, imageUrl: '/uploads/lent-original.jpg', position: 0 },
        { eventId: event.id, imageUrl: '/uploads/lent-original.jpg', position: 1 },
        { eventId: event.id, imageUrl: '/uploads/lent-original.jpg', position: 2 },
      ],
    });
  }

  if ((await prisma.setItem.count()) === 0) {
    await prisma.setItem.createMany({
      data: [
        { title: 'Lost in Set', subtitle: 'MIX SESSION', genre: 'Tech House', duration: '1:12:34', platform: 'SoundCloud', coverImage: '/uploads/lent-original.jpg', externalUrl: 'https://soundcloud.com/lent', position: 0 },
        { title: 'Warm Up', subtitle: 'MIX SESSION', genre: 'House', duration: '58:20', platform: 'Mixcloud', coverImage: '/uploads/lent-original.jpg', externalUrl: 'https://mixcloud.com/lent', position: 1 },
        { title: 'Private Set', subtitle: 'MIX SESSION', genre: 'Techno', duration: '1:05:12', platform: 'YouTube', coverImage: '/uploads/lent-original.jpg', externalUrl: 'https://youtube.com/@lent', position: 2 },
      ],
    });
  }

  await prisma.aboutSection.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: 'SOBRE',
      body: 'João Quaresma, conhecido artisticamente como LENT, é um DJ e produtor baseado em Belo Horizonte, com uma sonoridade que transita entre o house, techno e influências underground. Sua energia nas pistas e curadoria musical criam experiências únicas, conectando pessoas através da música.',
      imageUrl: '/uploads/lent-original.jpg',
    },
  });

  if ((await prisma.aboutStat.count()) === 0) {
    await prisma.aboutStat.createMany({
      data: [
        { value: '10+', label: 'ANOS', position: 0 },
        { value: '150+', label: 'EVENTOS', position: 1 },
        { value: '20+', label: 'CIDADES', position: 2 },
      ],
    });
  }
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
