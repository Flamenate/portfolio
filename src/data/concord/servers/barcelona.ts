import type { Server } from '@/lib/concord/types'

export const barcelona: Server = {
  id: 'barcelona',
  name: 'FC Barcelona',
  icon: '/media/concord/barcelona.webp',
  roles: [
    { id: 'admin', name: 'Admin', color: '#a50044' },
    { id: 'jugador', name: 'Jugador', color: '#edbb00' },
    { id: 'moderador', name: 'Moderador', color: '#3b82f6' },
    { id: 'socio', name: 'Socio', color: '#db0030' },
    { id: 'cule', name: 'Culé', color: '#5b7fd6' },
  ],
  members: [
    { userId: 'jordi1899', roleIds: ['admin'] },
    { userId: 'lamineyamal', roleIds: ['jugador'] },
    { userId: 'pedri', roleIds: ['jugador'] },
    { userId: 'raphinha11', roleIds: ['jugador'] },
    { userId: 'martaBCN', roleIds: ['moderador'] },
    { userId: 'pau_culer', roleIds: ['moderador'] },
    { userId: 'laia.fcb', roleIds: ['socio'] },
    { userId: 'sergiGarcia', roleIds: ['socio'] },
    { userId: 'nuriaVisca', roleIds: ['socio'] },
    { userId: 'alexMasia', roleIds: ['socio'] },
    { userId: 'flamenate', roleIds: ['cule'] },
    { userId: 'carlos_cule', roleIds: ['cule'] },
    { userId: 'xaviFan6', roleIds: ['cule'] },
    { userId: 'lucia.blaugrana', roleIds: ['cule'] },
    { userId: 'marcCamp', roleIds: ['cule'] },
    { userId: 'iker_ferrer', roleIds: ['cule'] },
  ],
  categories: [
    {
      id: 'uncategorized',
      name: null,
      channels: [
        {
          type: 'text',
          id: 'normas',
          name: 'normas',
          restricted: true,
          topic: 'Léelas antes de escribir.',
          messages: [
            {
              id: 'normas-1',
              authorId: 'jordi1899',
              date: new Date('2025-08-01T11:20:00'),
              content:
                'Bienvenidos al servidor culé 💙❤️\n\nUnas normas básicas para que esto funcione:\n\n1. Respeto ante todo. Se puede criticar al equipo, al entrenador o a cualquier jugador, pero sin insultos ni ataques personales. Tampoco a los aficionados rivales.\n2. Cada cosa en su canal: partidos en partidos, rumores en fichajes, el filial y el juvenil en la-masia y las tonterías en memes.\n3. Rumores con fuente. Si es un "me lo ha dicho mi primo", decidlo claramente.\n4. Nada de enlaces piratas para ver partidos. Ni en los canales ni por privado.\n5. Spam, publicidad y cadenas, fuera.\n\nQuien se salte las normas recibirá un aviso. A la tercera, expulsión.\n\nVisca el Barça!',
              reactions: [
                { emoji: '👍', count: 18, me: true },
                { emoji: '💙', count: 9 },
              ],
            },
            {
              id: 'normas-2',
              authorId: 'martaBCN',
              date: new Date('2025-08-01T11:34:00'),
              content:
                'Añado una cosa: este servidor es de culés de todas partes. Hay gente que escribe desde Túnez, Argentina, México... Si alguien no domina el castellano, paciencia y buen rollo.\n\nAquí todos somos més que un club 😉',
              reactions: [{ emoji: '❤️', count: 12, me: true }],
            },
            {
              id: 'normas-3',
              authorId: 'jordi1899',
              date: new Date('2026-08-05T10:00:00'),
              content:
                'Actualización para la nueva temporada: el canal de voz Spotify Camp Nou es para ver los partidos juntos.\n\nMicro silenciado si no estás hablando, por favor. La temporada pasada se oyó a alguien fregando platos en pleno contraataque 😅',
              reactions: [{ emoji: '😂', count: 11 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'anuncios',
          name: 'anuncios',
          restricted: true,
          topic: 'Novedades del servidor.',
          messages: [
            {
              id: 'anuncios-1',
              authorId: 'jordi1899',
              date: new Date('2025-08-12T19:00:00'),
              content:
                'Arranca la temporada 2025-26 🔵🔴\n\nVamos a montar quedadas en el canal de voz Spotify Camp Nou para todos los partidos de liga y de Champions. Empezamos media hora antes con la previa: alineaciones, apuestas de mentira y nervios de verdad.\n\nSom-hi!',
              reactions: [
                { emoji: '🔥', count: 14 },
                { emoji: '💙', count: 11, me: true },
              ],
            },
            {
              id: 'anuncios-2',
              authorId: 'pau_culer',
              date: new Date('2025-11-20T18:30:00'),
              content:
                'Por fin volvemos a casa 🏟️\n\nEl equipo vuelve a jugar en el Spotify Camp Nou. Si alguno del servidor va al estadio, que suba fotos a general. Los que lo vemos desde lejos, nos juntamos en el canal de voz como siempre.',
              reactions: [
                { emoji: '🏟️', count: 21, me: true },
                { emoji: '🥹', count: 8 },
              ],
            },
            {
              id: 'anuncios-3',
              authorId: 'martaBCN',
              date: new Date('2026-08-08T12:00:00'),
              content:
                'Temporada 2026-27 ya aquí. Cambios en el servidor:\n\n- Nuevo rol Socio para los que lleváis tiempo participando y aportando.\n- El canal la-masia pasa a ser el sitio oficial para seguir al filial y al juvenil.\n- Seguimos con las quedadas de voz en cada partido.\n\nGracias por hacer de esto una pequeña penya online 💙❤️',
              reactions: [{ emoji: '💙', count: 16, me: true }],
            },
            {
              id: 'anuncios-4',
              authorId: 'jordi1899',
              date: new Date('2026-10-03T17:00:00'),
              content:
                'Noticia bonita: algunos jugadores del primer equipo se han unido al servidor con cuentas verificadas (rol Jugador).\n\nOs pido lo de siempre: respeto, nada de spam por privado y dejadles estar tranquilos como a cualquier otro culé.\n\nForça Barça!',
              reactions: [
                { emoji: '😱', count: 25 },
                { emoji: '🔥', count: 19, me: true },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'moderacion',
          name: 'moderación',
          locked: true,
          messages: [
            {
              id: 'moderacion-1',
              authorId: 'jordi1899',
              date: new Date('2025-08-01T10:45:00'),
              content:
                'Canal privado del staff. Aquí coordinamos avisos y sanciones.',
            },
          ],
        },
      ],
    },
    {
      id: 'la-grada',
      name: 'La Grada',
      channels: [
        {
          type: 'text',
          id: 'general',
          name: 'general',
          topic: 'Charla culé de todo un poco.',
          messages: [
            {
              id: 'general-1',
              authorId: 'carlos_cule',
              date: new Date('2025-08-14T21:02:00'),
              content:
                'Buenas noches culers, ¿qué tal el verano? Yo ya con mono de fútbol',
            },
            {
              id: 'general-2',
              authorId: 'lucia.blaugrana',
              date: new Date('2025-08-14T21:05:00'),
              content:
                'Con mono es poco. He visto resúmenes de pretemporada como si fueran finales 😂',
            },
            {
              id: 'general-3',
              authorId: 'flamenate',
              date: new Date('2025-08-14T21:11:00'),
              content:
                'Hola a todos! Escribo desde Túnez 🇹🇳 Culé desde pequeño. Perdonad si se me escapa algún error en castellano',
            },
            {
              id: 'general-4',
              authorId: 'martaBCN',
              date: new Date('2025-08-14T21:13:00'),
              content:
                'Bienvenido Flame!! Tu castellano está perfecto, mejor que el de mi cuñado 😂',
              reactions: [
                { emoji: '😂', count: 5 },
                { emoji: '💙', count: 3 },
              ],
            },
            {
              id: 'general-5',
              authorId: 'flamenate',
              date: new Date('2025-08-14T21:15:00'),
              content:
                'Jajaja gracias 🙏\nEn Túnez hay muchísimos culés. Los días de Clásico no cabe un alfiler en los cafés',
            },
            {
              id: 'general-6',
              authorId: 'xaviFan6',
              date: new Date('2025-09-27T10:15:00'),
              content:
                '¿Alguien sabe si hay penyas en Valencia que se junten a ver los partidos? Me acabo de mudar',
            },
            {
              id: 'general-7',
              authorId: 'nuriaVisca',
              date: new Date('2025-09-27T10:40:00'),
              content:
                'Sí, hay unas cuantas. Busca en la web de las penyas del club, salen ordenadas por ciudad. Mucha suerte con la mudanza!',
            },
            {
              id: 'general-8',
              authorId: 'iker_ferrer',
              date: new Date('2025-12-13T23:50:00'),
              content:
                'Acabo de llegar a casa del estadio. Primera vez que vuelvo al Camp Nou desde las obras y todavía tengo la piel de gallina.\n\nEl himno con todo el estadio cantando... no hay palabras',
              reactions: [
                { emoji: '🥹', count: 9, me: true },
                { emoji: '🏟️', count: 6 },
              ],
            },
            {
              id: 'general-9',
              authorId: 'jordi1899',
              date: new Date('2025-12-13T23:56:00'),
              content:
                'Qué envidia sana. Yo voy el mes que viene con mi hija, su primera vez en el estadio 🥹',
              reactions: [{ emoji: '💙', count: 7, me: true }],
            },
            {
              id: 'general-10',
              authorId: 'lucia.blaugrana',
              date: new Date('2026-01-06T13:30:00'),
              content:
                'Los Reyes me han traído la camiseta de Pedri 🎁 Soy feliz',
              reactions: [{ emoji: '😍', count: 6 }],
            },
            {
              id: 'general-11',
              authorId: 'sergiGarcia',
              date: new Date('2026-01-06T13:41:00'),
              content:
                'Gran elección. Ese hombre juega en zapatillas de estar por casa y aun así no pierde un balón',
            },
            {
              id: 'general-12',
              authorId: 'pedri',
              date: new Date('2026-10-05T18:42:00'),
              content:
                'Hola culers! Gracias por todo el cariño que nos dais siempre, se nota muchísimo en el campo. Visca el Barça! 💙❤️',
              reactions: [
                { emoji: '❤️', count: 47, me: true },
                { emoji: '🙌', count: 21 },
              ],
            },
            {
              id: 'general-13',
              authorId: 'carlos_cule',
              date: new Date('2026-10-05T18:44:00'),
              content: 'PEDRI ESTÁ AQUÍ 😭😭😭',
            },
            {
              id: 'general-14',
              authorId: 'lucia.blaugrana',
              date: new Date('2026-10-05T18:45:00'),
              content:
                'Tengo tu camiseta desde Reyes, que lo sepas 🥹 Gracias a ti por cómo juegas',
            },
            {
              id: 'general-15',
              authorId: 'flamenate',
              date: new Date('2026-10-05T18:51:00'),
              content: 'Un saludo enorme desde Túnez! Aquí te adoramos 🇹🇳💙❤️',
            },
            {
              id: 'general-16',
              authorId: 'flamenate',
              date: new Date('2026-11-21T22:10:00'),
              content:
                'Una ventaja de vivir en Túnez: casi la misma hora que en Barcelona, así que nunca me pierdo un partido por el horario 😎',
            },
            {
              id: 'general-17',
              authorId: 'lucia.blaugrana',
              date: new Date('2026-11-21T22:14:00'),
              content:
                'Pues mi primo de Australia ve los partidos con el desayuno 😂',
            },
            {
              id: 'general-18',
              authorId: 'flamenate',
              date: new Date('2026-11-21T22:15:00'),
              content: 'Respeto máximo para tu primo 🫡 Eso sí que es ser culé',
              reactions: [{ emoji: '🫡', count: 4 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'partidos',
          name: 'partidos',
          topic: 'Previas, directos y post-partido. Ojo con los spoilers.',
          messages: [
            {
              id: 'partidos-1',
              authorId: 'pau_culer',
              date: new Date('2025-09-28T20:32:00'),
              content: 'Previa en el canal de voz, quien quiera que se pase 🎙️',
            },
            {
              id: 'partidos-2',
              authorId: 'sergiGarcia',
              date: new Date('2025-09-28T21:18:00'),
              content: 'Qué manera de presionar arriba. Así sí, Hansi',
            },
            {
              id: 'partidos-3',
              authorId: 'laia.fcb',
              date: new Date('2025-09-28T21:34:00'),
              content:
                'MENUDO GOLAZO 🚀🚀\nLa ha clavado en la escuadra, el portero ni la ha visto',
              reactions: [{ emoji: '🚀', count: 10, me: true }],
            },
            {
              id: 'partidos-4',
              authorId: 'flamenate',
              date: new Date('2025-09-28T21:35:00'),
              content:
                'Qué golazo!! He gritado tanto que ha venido el vecino a preguntar si estaba bien 😂',
              reactions: [{ emoji: '😂', count: 7 }],
            },
            {
              id: 'partidos-5',
              authorId: 'alexMasia',
              date: new Date('2025-09-28T22:58:00'),
              content:
                'Partido muy serio. Y Lamine haciendo cosas que no son de este planeta, como siempre',
            },
            {
              id: 'partidos-6',
              authorId: 'nuriaVisca',
              date: new Date('2026-03-16T19:20:00'),
              content:
                'Queda nada para el Clásico. No voy a dormir en toda la semana',
            },
            {
              id: 'partidos-7',
              authorId: 'iker_ferrer',
              date: new Date('2026-03-16T19:26:00'),
              content: 'Yo ya tengo la camiseta preparada y las uñas comidas',
              reactions: [{ emoji: '💅', count: 3 }],
            },
            {
              id: 'partidos-8',
              authorId: 'flamenate',
              date: new Date('2026-03-16T19:41:00'),
              content:
                'En mi barrio ya se nota el ambiente. Mitad blaugranas, mitad madridistas... los cafés de Túnez en semana de Clásico son otro deporte 😅',
              reactions: [{ emoji: '😂', count: 6 }],
            },
            {
              id: 'partidos-9',
              authorId: 'xaviFan6',
              date: new Date('2026-04-08T20:58:00'),
              content:
                'Noche de Champions en casa. Qué ganas de oír el himno en el estadio otra vez 🎶',
            },
            {
              id: 'partidos-10',
              authorId: 'carlos_cule',
              date: new Date('2026-04-08T21:47:00'),
              content:
                'Lewandowski no perdona. Un balón en el área y dentro, como toda la vida',
              reactions: [{ emoji: '🎯', count: 9, me: true }],
            },
            {
              id: 'partidos-11',
              authorId: 'jordi1899',
              date: new Date('2026-04-08T21:48:00'),
              content: 'El olfato de gol no se compra en ninguna tienda',
            },
            {
              id: 'partidos-12',
              authorId: 'martaBCN',
              date: new Date('2026-04-08T22:55:00'),
              content:
                'Qué partidazo. Sufriendo hasta el último minuto, pero esto es el Barça: si no sufrimos, no lo disfrutamos',
              reactions: [{ emoji: '💯', count: 8 }],
            },
            {
              id: 'partidos-13',
              authorId: 'flamenate',
              date: new Date('2026-04-08T22:57:00'),
              content:
                'Me tiemblan las manos todavía. Pedri en la segunda parte ha jugado a otro deporte',
              reactions: [{ emoji: '💙', count: 8 }],
            },
            {
              id: 'partidos-14',
              authorId: 'lucia.blaugrana',
              date: new Date('2026-10-18T21:12:00'),
              content:
                'Qué bonito está el estadio por la tele. Con el ambiente de hoy se me ponen los pelos de punta',
            },
            {
              id: 'partidos-15',
              authorId: 'raphinha11',
              date: new Date('2026-10-18T23:30:00'),
              content:
                'Gracias a todos por el apoyo de siempre, família. Nos vemos en el Spotify Camp Nou! Força Barça 💙❤️',
              reactions: [
                { emoji: '❤️', count: 39, me: true },
                { emoji: '🔥', count: 17 },
              ],
            },
            {
              id: 'partidos-16',
              authorId: 'pau_culer',
              date: new Date('2026-10-18T23:32:00'),
              content: 'Gracias a ti, crack! 🫡',
            },
            {
              id: 'partidos-17',
              authorId: 'sergiGarcia',
              date: new Date('2026-11-08T21:20:00'),
              content:
                'Hansi ha tocado cosas en el descanso y el equipo es otro. Gran lectura del míster',
            },
            {
              id: 'partidos-18',
              authorId: 'marcCamp',
              date: new Date('2026-11-08T21:25:00'),
              content:
                'Lamine con el balón pegado al pie, tres rivales encima y sale como si nada 🤯',
              reactions: [{ emoji: '🤯', count: 12, me: true }],
            },
            {
              id: 'partidos-19',
              authorId: 'lamineyamal',
              date: new Date('2026-11-08T23:40:00'),
              content:
                'Gracias por el apoyo de siempre, culers. Seguimos! Visca el Barça 💙❤️',
              reactions: [
                { emoji: '❤️', count: 51, me: true },
                { emoji: '🐐', count: 23 },
              ],
            },
            {
              id: 'partidos-20',
              authorId: 'flamenate',
              date: new Date('2026-11-08T23:46:00'),
              content: 'Buena semana para ser culé 😌',
            },
          ],
        },
        {
          type: 'text',
          id: 'fichajes',
          name: 'fichajes',
          topic: 'Rumores con fuente, por favor.',
          messages: [
            {
              id: 'fichajes-1',
              authorId: 'carlos_cule',
              date: new Date('2025-08-20T12:10:00'),
              content:
                'Mi primo dice que fichamos un central antes de que cierre el mercado',
            },
            {
              id: 'fichajes-2',
              authorId: 'martaBCN',
              date: new Date('2025-08-20T12:12:00'),
              content: 'Norma 3 😂 Fuente, por favor',
            },
            {
              id: 'fichajes-3',
              authorId: 'carlos_cule',
              date: new Date('2025-08-20T12:14:00'),
              content:
                'Fuente: mi primo. Muy fiable, eh. Acertó una vez en 2019',
              reactions: [{ emoji: '😂', count: 9, me: true }],
            },
            {
              id: 'fichajes-4',
              authorId: 'sergiGarcia',
              date: new Date('2026-01-15T19:40:00'),
              content:
                'Mercado de invierno y lo de siempre: mucho rumor y poco movimiento. Con el tema del fair play yo no me hago ilusiones',
            },
            {
              id: 'fichajes-5',
              authorId: 'jordi1899',
              date: new Date('2026-01-15T19:52:00'),
              content:
                'Mejor así. Tenemos plantilla y tenemos cantera, no hace falta inventar nada',
              reactions: [{ emoji: '👍', count: 5 }],
            },
            {
              id: 'fichajes-6',
              authorId: 'alexMasia',
              date: new Date('2026-06-24T11:05:00'),
              content:
                'Cada verano igual: cien nombres en la prensa y al final el mejor fichaje sale de La Masia',
              reactions: [{ emoji: '💯', count: 10, me: true }],
            },
            {
              id: 'fichajes-7',
              authorId: 'iker_ferrer',
              date: new Date('2026-06-24T11:30:00'),
              content:
                'Yo solo quiero que pase el verano rápido. Entre rumores y bulos acabo mareado',
            },
            {
              id: 'fichajes-8',
              authorId: 'flamenate',
              date: new Date('2026-07-10T22:03:00'),
              content:
                'Consejo de alguien que lleva años sufriendo los veranos: no os creáis nada hasta que salga el vídeo de presentación 😅',
              reactions: [{ emoji: '💯', count: 12 }],
            },
            {
              id: 'fichajes-9',
              authorId: 'nuriaVisca',
              date: new Date('2026-07-10T22:09:00'),
              content:
                'Ni con el vídeo. Yo hasta que no lo vea con la camiseta en el campo, no me lo creo',
              reactions: [{ emoji: '😂', count: 6 }],
            },
            {
              id: 'fichajes-10',
              authorId: 'xaviFan6',
              date: new Date('2026-08-27T23:15:00'),
              content:
                '¿Cuánto queda para que cierre el mercado? Necesito paz mental',
            },
          ],
        },
        {
          type: 'text',
          id: 'la-masia',
          name: 'la-masia',
          topic: 'Filial, juvenil y los cracks del futuro.',
          messages: [
            {
              id: 'la-masia-1',
              authorId: 'alexMasia',
              date: new Date('2025-09-07T12:30:00'),
              content:
                'Abro canal para hablar de los chavales. El Juvenil A juega este finde, ¿alguien lo sigue?',
            },
            {
              id: 'la-masia-2',
              authorId: 'nuriaVisca',
              date: new Date('2025-09-07T12:46:00'),
              content:
                'Yo lo veo cuando puedo. Hay un par de mediocentros con pinta de primer equipo, de esos que siempre miran antes de recibir',
            },
            {
              id: 'la-masia-3',
              authorId: 'jordi1899',
              date: new Date('2025-12-03T18:20:00'),
              content:
                'Lo de Cubarsí es de otro planeta. Esa calma con el balón a su edad no es normal',
              reactions: [{ emoji: '🧊', count: 8, me: true }],
            },
            {
              id: 'la-masia-4',
              authorId: 'laia.fcb',
              date: new Date('2025-12-03T18:24:00'),
              content:
                'Y Lamine, Fermín, Balde, Casadó... media plantilla ha salido de casa. Eso no lo tiene nadie',
            },
            {
              id: 'la-masia-5',
              authorId: 'flamenate',
              date: new Date('2025-12-03T18:37:00'),
              content:
                'Es lo que más me gusta del Barça. Desde fuera se ve clarísimo: el estilo se aprende desde niño en La Masia',
              reactions: [{ emoji: '💙', count: 10 }],
            },
            {
              id: 'la-masia-6',
              authorId: 'alexMasia',
              date: new Date('2026-02-22T14:10:00'),
              content:
                'Hoy he ido a ver al filial al Johan Cruyff. Ambiente familiar, entradas baratas y fútbol del bueno. Recomendadísimo',
            },
            {
              id: 'la-masia-7',
              authorId: 'sergiGarcia',
              date: new Date('2026-02-22T14:32:00'),
              content:
                'Me apunto para la próxima. ¿Hacemos quedada del servidor?',
              reactions: [{ emoji: '🙋', count: 5, me: true }],
            },
            {
              id: 'la-masia-8',
              authorId: 'lamineyamal',
              date: new Date('2026-10-12T17:15:00'),
              content:
                'La Masia es casa. Mucho ánimo a todos los chavales que vienen pisando fuerte 💪 Visca el Barça!',
              reactions: [
                { emoji: '❤️', count: 52, me: true },
                { emoji: '🐐', count: 24 },
              ],
            },
            {
              id: 'la-masia-9',
              authorId: 'alexMasia',
              date: new Date('2026-10-12T17:17:00'),
              content:
                'Mi bio dice "La Masia no se toca" y ahora tengo pruebas 😭',
              reactions: [{ emoji: '😂', count: 9 }],
            },
            {
              id: 'la-masia-10',
              authorId: 'carlos_cule',
              date: new Date('2026-10-12T17:20:00'),
              content: 'Captura y a enmarcar 🖼️',
            },
          ],
        },
        {
          type: 'text',
          id: 'memes',
          name: 'memes',
          topic: 'Aquí se viene a reír.',
          messages: [
            {
              id: 'memes-1',
              authorId: 'laia.fcb',
              date: new Date('2025-10-04T11:05:00'),
              content: 'Raphinha cualquier fin de semana según la app 😂',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_raphinha.webp',
                  alt: 'Ficha de valoración de Raphinha: nota 9,4, dos goles, una asistencia, tarjeta amarilla y cambiado con el depósito en reserva',
                },
              ],
              reactions: [
                { emoji: '😂', count: 15, me: true },
                { emoji: '⛽', count: 9 },
                { emoji: '🔥', count: 6 },
              ],
            },
            {
              id: 'memes-2',
              authorId: 'flamenate',
              date: new Date('2025-10-04T11:07:00'),
              content:
                'Hasta con el depósito vacío saca un 9,4. Ese hombre funciona con energía solar',
              reactions: [{ emoji: '😂', count: 8 }],
            },
            {
              id: 'memes-3',
              authorId: 'pau_culer',
              date: new Date('2025-10-04T11:10:00'),
              content: 'Lo del surtidor de gasolina me ha matado ⛽😂',
            },
            {
              id: 'memes-4',
              authorId: 'iker_ferrer',
              date: new Date('2026-02-11T20:15:00'),
              content: 'No sé por qué, pero tiene todo el sentido del mundo',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_lewa.webp',
                  alt: 'Tuit que dice "This jersey is so Lewandowski" con una foto de la camiseta blaugrana',
                },
              ],
              reactions: [
                { emoji: '😂', count: 14, me: true },
                { emoji: '💀', count: 11 },
              ],
            },
            {
              id: 'memes-5',
              authorId: 'marcCamp',
              date: new Date('2026-02-11T20:17:00'),
              content: '¿Qué significa? Ni idea. ¿Estoy de acuerdo? Totalmente',
            },
            {
              id: 'memes-6',
              authorId: 'lucia.blaugrana',
              date: new Date('2026-02-11T20:20:00'),
              content:
                'Es que la camiseta tiene cara de marcar de espaldas sin mirar a portería',
              reactions: [{ emoji: '🎯', count: 7 }],
            },
            {
              id: 'memes-7',
              authorId: 'carlos_cule',
              date: new Date('2026-02-11T20:24:00'),
              content: 'Camiseta con instinto asesino. Un 9 puro',
            },
            {
              id: 'memes-8',
              authorId: 'xaviFan6',
              date: new Date('2026-11-15T18:40:00'),
              content:
                'Yo explicándole a mi novia por qué no puedo quedar el sábado por la noche:\n"Es que juega el Barça"\nElla: "¿Otra vez?"\nYo: "Siempre, cariño. Siempre."',
              reactions: [
                { emoji: '😂', count: 13 },
                { emoji: '💯', count: 6, me: true },
              ],
            },
            {
              id: 'memes-9',
              authorId: 'nuriaVisca',
              date: new Date('2026-11-15T18:52:00'),
              content: 'Lo de "siempre, cariño" me lo apunto 😂',
            },
            {
              id: 'memes-10',
              authorId: 'flamenate',
              date: new Date('2026-11-22T11:30:00'),
              content:
                'Mi madre preguntándome si estoy bien porque llevo toda la semana tarareando el himno del Barça en la cocina',
              reactions: [{ emoji: '😂', count: 5 }],
            },
          ],
        },
        { type: 'voice', id: 'spotify-camp-nou', name: 'Spotify Camp Nou' },
      ],
    },
  ],
}
