import type { Server } from '@/lib/concord/types'

export const est: Server = {
  id: 'est',
  name: 'Espérance Sportive de Tunis',
  icon: '/media/concord/est.webp',
  roles: [
    { id: 'admin', name: 'Admin', color: '#c8102e' },
    { id: 'joueur', name: 'Joueur', color: '#ffd200' },
    { id: 'moderateur', name: 'Modérateur', color: '#ff7a1a' },
    { id: 'ultras', name: 'Ultras', color: '#8b0a1a' },
    { id: 'curva', name: 'Curva Sud', color: '#f2a900' },
    { id: 'supporter', name: 'Supporter', color: '#e8c872' },
  ],
  members: [
    { userId: 'seifTaraji', roleIds: ['admin', 'curva'] },
    { userId: '10xribeiro', roleIds: ['joueur'] },
    { userId: 'belaili11', roleIds: ['joueur'] },
    { userId: 'THEmastouri', roleIds: ['joueur'] },
    { userId: 'bassemEST', roleIds: ['moderateur', 'supporter'] },
    { userId: 'meriemTaraji', roleIds: ['moderateur', 'supporter'] },
    { userId: 'curvaSud_Hamza', roleIds: ['ultras', 'curva'] },
    { userId: 'oussamaUltra', roleIds: ['ultras', 'curva'] },
    { userId: 'taraji1919', roleIds: ['curva', 'supporter'] },
    { userId: 'aymen.sang.or', roleIds: ['curva', 'supporter'] },
    { userId: 'flamenate', roleIds: ['curva', 'supporter'] },
    { userId: 'walid_rades', roleIds: ['supporter'] },
    { userId: 'sarra.est', roleIds: ['supporter'] },
    { userId: 'khalil1919', roleIds: ['supporter'] },
    { userId: 'fathi.supp', roleIds: ['supporter'] },
    { userId: 'rania_ost', roleIds: ['supporter'] },
  ],
  categories: [
    {
      id: 'uncategorized',
      name: null,
      channels: [
        {
          type: 'text',
          id: 'reglement',
          name: 'règlement',
          restricted: true,
          topic: 'À lire avant de poster.',
          messages: [
            {
              id: 'reglement-1',
              authorId: 'seifTaraji',
              date: new Date('2025-08-10T14:05:00'),
              content:
                "Marhba bikom fi la maison des Taraji ❤️💛\n\nQuelques règles simples pour que le serveur reste propre :\n\n1. Respect entre supporters. On peut ne pas être d'accord sur un joueur ou un choix tactique, mais pas d'insultes ni d'attaques perso.\n2. Pas de racisme, pas de régionalisme, pas de haine envers les autres clubs ou leurs supporters. On chambre, on ne blesse pas.\n3. Les rumeurs mercato vont dans mercato, et on précise toujours la source. Rien n'est officiel tant que le club ne l'a pas annoncé.\n4. Les joueurs présents sur le serveur sont là pour partager avec nous. Pas de DM insistants, pas de critiques personnelles envers eux.\n5. Pas de revente de billets au marché noir ni de liens douteux.\n6. Pas de politique.\n\nTout manquement = avertissement, puis exclusion. Dima Taraji 🔴🟡",
              reactions: [
                { emoji: '✅', count: 41, me: true },
                { emoji: '❤️', count: 18 },
              ],
            },
            {
              id: 'reglement-2',
              authorId: 'bassemEST',
              date: new Date('2025-08-10T14:20:00'),
              content:
                'Pour toute question ou signalement, contactez un Modérateur en privé (Meriem ou moi). On répond dès que possible, même les soirs de match… enfin, après le coup de sifflet final 😅',
              reactions: [{ emoji: '😂', count: 12 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'annonces',
          name: 'annonces',
          restricted: true,
          topic: 'Infos officielles du serveur.',
          messages: [
            {
              id: 'annonces-1',
              authorId: 'seifTaraji',
              date: new Date('2025-08-12T19:00:00'),
              content:
                "Bienvenue dans la saison 2025–26 ! 🔴🟡\n\nNouvelle saison, nouveau serveur. Le but est simple : réunir les supporters de l'Espérance, que vous soyez à Tunis, dans les régions ou à l'étranger.\n\nLes salons :\n• discussion-générale pour tout ce qui touche au club\n• matchs pour vivre les rencontres en direct\n• mercato pour les rumeurs (avec sources)\n• curva-sud pour les tifos, les chants et les déplacements\n• ligue-des-champions-caf pour la campagne africaine\n\nLes soirs de match, le vocal Stade de Radès est ouvert à tous. Yalla, on y va !",
              reactions: [
                { emoji: '🔥', count: 37, me: true },
                { emoji: '🔴', count: 22 },
                { emoji: '🟡', count: 22 },
              ],
            },
            {
              id: 'annonces-2',
              authorId: 'meriemTaraji',
              date: new Date('2025-09-03T21:15:00'),
              content:
                "Rappel billetterie : achetez vos places uniquement via les canaux officiels du club. On a eu plusieurs signalements de faux billets partagés en DM. Si quelqu'un vous propose une place « garantie » à prix cassé, signalez-le directement au staff.",
              reactions: [{ emoji: '👍', count: 29 }],
            },
            {
              id: 'annonces-3',
              authorId: 'seifTaraji',
              date: new Date('2025-10-05T18:30:00'),
              content:
                "Grosse nouvelle pour le serveur 🤩\n\nQuelques joueurs de l'équipe nous ont fait l'honneur de rejoindre le serveur. Ils ont le rôle Joueur. Ils passeront de temps en temps dire un petit mot aux supporters.\n\nOn compte sur vous : respect total, pas de spam en DM, pas de critiques personnelles. C'est une chance de les avoir ici, ne la gâchons pas.",
              reactions: [
                { emoji: '❤️', count: 64, me: true },
                { emoji: '🙌', count: 31 },
              ],
            },
            {
              id: 'annonces-4',
              authorId: 'seifTaraji',
              date: new Date('2026-08-09T20:00:00'),
              content:
                "C'est reparti pour la saison 2026–27 ! 💪\n\nMerci à tous pour l'énergie de la saison passée. Le serveur a presque doublé, et l'ambiance dans le vocal les soirs de match était folle.\n\nNouveautés :\n• les inscriptions pour les tifos et les déplacements se font dans curva-sud (Hamza et Oussama gèrent)\n• les watch parties dans le vocal pour les supporters à l'étranger\n\nDima Taraji, dima fi galbna 🔴🟡",
              reactions: [
                { emoji: '🔥', count: 45, me: true },
                { emoji: '🔴', count: 27 },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'staff',
          name: 'staff',
          locked: true,
          messages: [
            {
              id: 'staff-1',
              authorId: 'seifTaraji',
              date: new Date('2025-08-10T13:30:00'),
              content: 'Salon réservé au staff du serveur.',
            },
          ],
        },
      ],
    },
    {
      id: 'tribune',
      name: 'La Tribune',
      channels: [
        {
          type: 'text',
          id: 'discussion-generale',
          name: 'discussion-générale',
          topic: "Tout ce qui touche à l'Espérance.",
          messages: [
            {
              id: 'gen-1',
              authorId: 'taraji1919',
              date: new Date('2025-08-12T19:22:00'),
              content:
                'Enfin un serveur sérieux pour les Taraji 🔥 Aslema lkol',
            },
            {
              id: 'gen-2',
              authorId: 'sarra.est',
              date: new Date('2025-08-12T19:30:00'),
              content:
                'Aslema ! Sarra de Bizerte, abonnée depuis toute petite grâce à mon père 😄',
              reactions: [{ emoji: '❤️', count: 9 }],
            },
            {
              id: 'gen-3',
              authorId: 'flamenate',
              date: new Date('2025-08-12T19:41:00'),
              content:
                'Aslema 👋 Flame, de Sfax. Oui oui, un Sfaxien Taraji, ça existe 😅\nJe descends à Radès dès que les partiels me laissent respirer',
              reactions: [
                { emoji: '😂', count: 14 },
                { emoji: '🫡', count: 6 },
              ],
            },
            {
              id: 'gen-4',
              authorId: 'khalil1919',
              date: new Date('2025-08-12T19:44:00'),
              content:
                "Un Sfaxien chez nous, mar7ba bik khouya 😂 t'inquiète on te protège",
            },
            {
              id: 'gen-5',
              authorId: 'fathi.supp',
              date: new Date('2025-09-21T11:08:00'),
              content:
                "Je suis l'Espérance depuis l'époque du vieux stade El Menzah avec mon père. Les générations changent mais le frisson est le même quand l'équipe entre sur le terrain.\nBienvenue aux jeunes, profitez, ça passe vite.",
              reactions: [
                { emoji: '❤️', count: 21, me: true },
                { emoji: '🫡', count: 8 },
              ],
            },
            {
              id: 'gen-6',
              authorId: 'belaili11',
              date: new Date('2025-10-06T16:12:00'),
              content:
                "Salam à tous ! Merci pour l'accueil et pour votre soutien chaque semaine. On se voit à Radès 💪 Dima Taraji ❤️💛",
              reactions: [
                { emoji: '❤️', count: 88, me: true },
                { emoji: '🔥', count: 47 },
                { emoji: '🐐', count: 33 },
              ],
            },
            {
              id: 'gen-7',
              authorId: 'rania_ost',
              date: new Date('2025-10-06T16:15:00'),
              content: 'NON MAIS BELAÏLI EST VRAIMENT LÀ 😭😭',
            },
            {
              id: 'gen-8',
              authorId: 'aymen.sang.or',
              date: new Date('2025-10-06T16:16:00'),
              content:
                "Ya3tik essa7a l'artiste ! Tes dribbles valent le prix du billet à eux seuls",
              reactions: [{ emoji: '💯', count: 19 }],
            },
            {
              id: 'gen-9',
              authorId: 'walid_rades',
              date: new Date('2025-12-14T13:40:00'),
              content:
                'Question sérieuse : vous préférez quel maillot cette saison ? Le domicile classique rouge et jaune ou le third ? Moi je reste fidèle aux rayures, rien ne les remplace',
            },
            {
              id: 'gen-10',
              authorId: 'meriemTaraji',
              date: new Date('2025-12-14T13:52:00'),
              content:
                "Les rayures, sans débat. Le reste c'est pour le marketing 😌",
              reactions: [{ emoji: '💯', count: 11 }],
            },
            {
              id: 'gen-11',
              authorId: 'bassemEST',
              date: new Date('2026-03-02T22:47:00'),
              content:
                'Petit rappel après la semaine dernière : on peut critiquer un match ou un choix du coach, mais les insultes envers les joueurs ne passent pas ici. Avertissements distribués, la prochaine fois ce sera des exclusions.',
              reactions: [{ emoji: '👍', count: 17, me: true }],
            },
            {
              id: 'gen-12',
              authorId: 'flamenate',
              date: new Date('2026-09-20T21:58:00'),
              content:
                "Premier match de la saison que je regarde depuis la France 🥲\nMême fuseau horaire, mais zéro ambiance. Personne dans l'appart ne comprend pourquoi je crie sur mon laptop",
              reactions: [
                { emoji: '😂', count: 23 },
                { emoji: '🫂', count: 9 },
              ],
            },
            {
              id: 'gen-13',
              authorId: 'seifTaraji',
              date: new Date('2026-09-20T22:03:00'),
              content:
                'Rejoins le vocal la prochaine fois, on est toute une diaspora là-dedans 😄',
            },
            {
              id: 'gen-14',
              authorId: 'sarra.est',
              date: new Date('2026-09-20T22:05:00'),
              content: 'Taraji on tour version Erasmus 😂',
              reactions: [{ emoji: '😂', count: 15, me: true }],
            },
            {
              id: 'gen-15',
              authorId: 'oussamaUltra',
              date: new Date('2026-11-18T23:12:00'),
              content:
                "Les jeunes du centre de formation qui commencent à avoir du temps de jeu, c'est ça qu'on veut voir. Un club comme le nôtre doit aussi former ses propres stars",
              reactions: [{ emoji: '💯', count: 13 }],
            },
            {
              id: 'gen-16',
              authorId: 'fathi.supp',
              date: new Date('2026-11-19T08:30:00'),
              content: 'Bien dit. La patience avec les jeunes, toujours.',
            },
          ],
        },
        {
          type: 'text',
          id: 'matchs',
          name: 'matchs',
          topic: 'Avant, pendant et après chaque match.',
          messages: [
            {
              id: 'matchs-1',
              authorId: 'curvaSud_Hamza',
              date: new Date('2025-08-23T18:02:00'),
              content:
                'Premier match de la saison ce soir ! Qui est à Radès ? 🔥',
            },
            {
              id: 'matchs-2',
              authorId: 'walid_rades',
              date: new Date('2025-08-23T18:10:00'),
              content:
                "Présent, porte 9 comme d'habitude. On s'est garés à 2 km 😂",
            },
            {
              id: 'matchs-3',
              authorId: 'walid_rades',
              date: new Date('2025-08-23T19:31:00'),
              content: 'Ça se remplit doucement, il fait encore jour',
              attachments: [
                {
                  src: '/media/pictures/rades/rades_no_crowd.webp',
                  alt: "Le stade de Radès en fin d'après-midi, tribunes bleues encore presque vides avant le match",
                },
              ],
              reactions: [{ emoji: '🏟️', count: 8 }],
            },
            {
              id: 'matchs-4',
              authorId: 'taraji1919',
              date: new Date('2025-08-23T21:58:00'),
              content:
                "On a souffert en première mi-temps mais la deuxième c'était une autre équipe. Bon début de saison, on continue comme ça",
              reactions: [{ emoji: '💪', count: 16, me: true }],
            },
            {
              id: 'matchs-5',
              authorId: 'rania_ost',
              date: new Date('2025-11-08T20:14:00'),
              content: "Coup d'envoi dans 15 min, le vocal est plein, venez !!",
            },
            {
              id: 'matchs-6',
              authorId: 'aymen.sang.or',
              date: new Date('2025-11-08T21:03:00'),
              content:
                'Ce pressing à la mi-temps… yezzi mel passes en arrière, on veut de la verticalité',
            },
            {
              id: 'matchs-7',
              authorId: 'khalil1919',
              date: new Date('2025-11-08T21:05:00'),
              content:
                "Patience, ils vont s'ouvrir. Belaïli commence à trouver les espaces",
            },
            {
              id: 'matchs-8',
              authorId: 'aymen.sang.or',
              date: new Date('2025-11-08T22:01:00'),
              content: "OK OK j'ai rien dit 😂😂 quelle fin de match",
              reactions: [
                { emoji: '😂', count: 21 },
                { emoji: '🔥', count: 18, me: true },
              ],
            },
            {
              id: 'matchs-9',
              authorId: '10xribeiro',
              date: new Date('2025-11-09T12:20:00'),
              content:
                "Merci pour l'ambiance hier soir, on vous entend sur le terrain, ça nous pousse énormément. À la prochaine à Radès ❤️💛",
              reactions: [
                { emoji: '❤️', count: 72, me: true },
                { emoji: '🙏', count: 28 },
              ],
            },
            {
              id: 'matchs-10',
              authorId: 'flamenate',
              date: new Date('2026-01-17T19:50:00'),
              content:
                'Sfax → Radès, 3h de route, ça valait chaque kilomètre. Regardez-moi ça 😍',
              attachments: [
                {
                  src: '/media/pictures/rades/rades_crowd.webp',
                  alt: 'Radès plein à craquer sous les projecteurs, vue depuis les tribunes pendant le match',
                },
              ],
              reactions: [
                { emoji: '🔥', count: 34 },
                { emoji: '❤️', count: 19 },
              ],
            },
            {
              id: 'matchs-11',
              authorId: 'sarra.est',
              date: new Date('2026-01-17T19:53:00'),
              content: "Mais t'es venu de Sfax juste pour ça ?? Respect 🫡",
            },
            {
              id: 'matchs-12',
              authorId: 'flamenate',
              date: new Date('2026-01-17T19:55:00'),
              content: 'Bien sûr. On ne rate pas un derby 😤',
              reactions: [{ emoji: '🫡', count: 12 }],
            },
            {
              id: 'matchs-13',
              authorId: 'curvaSud_Hamza',
              date: new Date('2026-01-17T22:24:00'),
              content:
                "Le derby c'est pas un match, c'est une semaine entière de stress. Respect aux supporters du Club Africain pour l'ambiance de leur côté aussi, mais Tunis est rouge et jaune 🔴🟡",
              attachments: [
                {
                  src: '/media/pictures/rades/rades_crowd1.webp',
                  alt: 'Vue grand angle du stade de Radès de nuit, tribunes pleines et pelouse éclairée',
                },
              ],
              reactions: [
                { emoji: '🔴', count: 26 },
                { emoji: '🟡', count: 26 },
                { emoji: '🔥', count: 19, me: true },
              ],
            },
            {
              id: 'matchs-14',
              authorId: 'bassemEST',
              date: new Date('2026-10-03T21:02:00'),
              content:
                'Mi-temps. Le milieu récupère beaucoup plus de ballons que la saison dernière, ça fait plaisir à voir',
            },
            {
              id: 'matchs-15',
              authorId: 'flamenate',
              date: new Date('2026-10-03T21:04:00'),
              content:
                'Le stream qui coupe pile au moment du corner… je vais devenir fou depuis la France 😭',
              reactions: [{ emoji: '😂', count: 17 }],
            },
            {
              id: 'matchs-16',
              authorId: 'meriemTaraji',
              date: new Date('2026-11-21T22:15:00'),
              content:
                "Match sérieux, solide derrière, pas de panique. C'est comme ça qu'on construit une saison. Bravo les gars 👏",
              reactions: [{ emoji: '👏', count: 22, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'mercato',
          name: 'mercato',
          topic:
            "Rumeurs et transferts. Source obligatoire, rien n'est officiel avant l'annonce du club.",
          messages: [
            {
              id: 'mercato-1',
              authorId: 'khalil1919',
              date: new Date('2025-08-14T10:32:00'),
              content:
                "Des rumeurs sur un attaquant africain qui arriverait avant la fin du mercato. Quelqu'un a une source fiable ?",
            },
            {
              id: 'mercato-2',
              authorId: 'bassemEST',
              date: new Date('2025-08-14T10:45:00'),
              content:
                "Pour l'instant rien de concret, juste des comptes Facebook qui se copient entre eux. On attend le communiqué du club.",
              reactions: [{ emoji: '👍', count: 9 }],
            },
            {
              id: 'mercato-3',
              authorId: 'walid_rades',
              date: new Date('2025-08-14T11:02:00'),
              content:
                "Chaque été c'est pareil, on nous annonce 15 attaquants et au final on en voit un seul 😂",
              reactions: [{ emoji: '😂', count: 18, me: true }],
            },
            {
              id: 'mercato-4',
              authorId: 'aymen.sang.or',
              date: new Date('2026-01-09T17:20:00'),
              content:
                "Mercato d'hiver : moi je veux surtout un latéral gauche. Le reste de l'effectif tient la route",
            },
            {
              id: 'mercato-5',
              authorId: 'seifTaraji',
              date: new Date('2026-01-09T17:34:00'),
              content:
                "D'accord. Et surtout garder nos cadres. La stabilité, c'est ce qui fait la différence en Afrique.",
            },
            {
              id: 'mercato-6',
              authorId: 'rania_ost',
              date: new Date('2026-06-24T14:10:00'),
              content:
                "Les rumeurs d'été ont commencé 🙃 apparemment des clubs du Golfe s'intéressent à nos joueurs. Comme chaque année",
            },
            {
              id: 'mercato-7',
              authorId: 'fathi.supp',
              date: new Date('2026-06-24T14:41:00'),
              content:
                'Si un joueur part pour un meilleur projet, on lui dit merci et bonne chance. Le club est plus grand que tout le monde.',
              reactions: [{ emoji: '🫡', count: 14 }],
            },
            {
              id: 'mercato-8',
              authorId: 'flamenate',
              date: new Date('2026-07-02T23:18:00'),
              content:
                "Moi je préfère qu'on fasse monter des jeunes du centre plutôt que trois recrues en fin de carrière. Mais bon, on verra ce que le club décide",
              reactions: [{ emoji: '💯', count: 11 }],
            },
            {
              id: 'mercato-9',
              authorId: 'taraji1919',
              date: new Date('2026-07-02T23:25:00'),
              content:
                'Les deux mon capitaine. Des jeunes ET un vrai numéro 9 😄',
            },
            {
              id: 'mercato-10',
              authorId: 'meriemTaraji',
              date: new Date('2026-07-03T09:05:00'),
              content:
                "Rappel : les captures d'écran de « sources proches du club » sans lien seront supprimées. Merci 🙏",
            },
          ],
        },
        {
          type: 'text',
          id: 'curva-sud',
          name: 'curva-sud',
          topic: 'Tifos, chants et déplacements. Fieri di essere Taraji.',
          messages: [
            {
              id: 'curva-1',
              authorId: 'curvaSud_Hamza',
              date: new Date('2025-09-10T20:30:00'),
              content:
                'Préparation du prochain tifo 🎨\nOn a besoin de bras ce week-end pour peindre les bâches. Rendez-vous au local habituel, ramenez des pinceaux et de la patience.\nDiscrétion sur le thème, rien ne sort avant le jour J 🤫',
              reactions: [
                { emoji: '🎨', count: 15 },
                { emoji: '🔥', count: 12, me: true },
              ],
            },
            {
              id: 'curva-2',
              authorId: 'oussamaUltra',
              date: new Date('2025-09-10T20:34:00'),
              content: "Je ramène la peinture jaune. Quelqu'un pour le rouge ?",
            },
            {
              id: 'curva-3',
              authorId: 'aymen.sang.or',
              date: new Date('2025-09-10T20:41:00'),
              content: "Moi, et je ramène aussi des sandwichs pour l'équipe 🥪",
              reactions: [{ emoji: '❤️', count: 9 }],
            },
            {
              id: 'curva-4',
              authorId: 'oussamaUltra',
              date: new Date('2025-10-25T22:40:00'),
              content:
                'La curva ce soir… les drapeaux, le banner, les chants pendant 90 minutes. Fieri di essere Taraji 🔴🟡',
              attachments: [
                {
                  src: '/media/pictures/rades/rades_players.webp',
                  alt: 'La Curva Sud agitant des drapeaux rouges et jaunes derrière le banner Curva Sud Tunisi, joueurs sur la pelouse',
                },
              ],
              reactions: [
                { emoji: '🔥', count: 41, me: true },
                { emoji: '🔴', count: 23 },
                { emoji: '🟡', count: 23 },
              ],
            },
            {
              id: 'curva-5',
              authorId: 'THEmastouri',
              date: new Date('2025-10-26T13:05:00'),
              content:
                'Les gars de la Curva Sud, vous êtes incroyables. Sur le terrain on sent votre énergie du début à la fin. Merci ❤️💛',
              reactions: [
                { emoji: '❤️', count: 67, me: true },
                { emoji: '🙏', count: 25 },
              ],
            },
            {
              id: 'curva-6',
              authorId: 'curvaSud_Hamza',
              date: new Date('2025-10-26T13:09:00'),
              content:
                "Ya3tik essa7a Mastouri ! C'est vous qui nous donnez envie de chanter 💪",
            },
            {
              id: 'curva-7',
              authorId: 'flamenate',
              date: new Date('2026-01-17T16:12:00'),
              content:
                'Arrivé tôt pour être bien placé. Écharpe Taraji on Tour sortie 🧣',
              attachments: [
                {
                  src: '/media/pictures/rades/rades_in_rades.webp',
                  alt: 'Un supporter tient une écharpe « Taraji on Tour » rouge et jaune dans les tribunes de Radès avant le match',
                },
              ],
              reactions: [
                { emoji: '🧣', count: 19 },
                { emoji: '🔥', count: 24 },
                { emoji: '❤️', count: 16 },
              ],
            },
            {
              id: 'curva-8',
              authorId: 'taraji1919',
              date: new Date('2026-01-17T16:20:00'),
              content:
                "Elle est trop belle cette écharpe, tu l'as trouvée où ?",
            },
            {
              id: 'curva-9',
              authorId: 'flamenate',
              date: new Date('2026-01-17T16:24:00'),
              content:
                'Un vendeur devant le stade il y a quelques saisons. Elle a fait plus de déplacements que moi 😂',
              reactions: [{ emoji: '😂', count: 10 }],
            },
            {
              id: 'curva-10',
              authorId: 'oussamaUltra',
              date: new Date('2026-04-11T19:05:00'),
              content:
                "Rappel pour le déplacement en bus : départ groupé, pas de fumigènes dans le bus, pas d'alcool, et on reste ensemble à l'arrivée. On représente le club partout où on va.",
              reactions: [{ emoji: '✅', count: 22, me: true }],
            },
            {
              id: 'curva-11',
              authorId: 'curvaSud_Hamza',
              date: new Date('2026-09-05T21:30:00'),
              content:
                'Nouveau chant pour la saison, les paroles sont dans le doc partagé. On le répète au vocal jeudi soir 🎤',
              reactions: [{ emoji: '🎤', count: 14 }],
            },
            {
              id: 'curva-12',
              authorId: 'flamenate',
              date: new Date('2026-09-05T21:44:00'),
              content:
                'Je viendrai chanter au vocal depuis la France, mes voisins vont adorer 🙃',
              reactions: [{ emoji: '😂', count: 18 }],
            },
            {
              id: 'curva-13',
              authorId: 'oussamaUltra',
              date: new Date('2026-11-14T23:02:00'),
              content:
                "Le tifo de ce soir a tenu toute la première mi-temps. Merci à tous ceux qui ont passé leurs week-ends à peindre. Ça, c'est la Curva 🔴🟡",
              reactions: [
                { emoji: '🔥', count: 38, me: true },
                { emoji: '🫡', count: 17 },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'ligue-des-champions-caf',
          name: 'ligue-des-champions-caf',
          topic: 'La campagne africaine. Dima Taraji fi Afrikia.',
          messages: [
            {
              id: 'caf-1',
              authorId: 'seifTaraji',
              date: new Date('2025-09-15T12:10:00'),
              content:
                "La campagne africaine commence ! Nouveau salon pour suivre la Ligue des Champions CAF. Les déplacements sur le continent, c'est toujours une autre histoire 🌍",
              reactions: [{ emoji: '🌍', count: 20 }],
            },
            {
              id: 'caf-2',
              authorId: 'khalil1919',
              date: new Date('2025-09-15T12:31:00'),
              content:
                "Les matchs à l'extérieur en Afrique c'est la vraie épreuve. Chaleur, terrain, voyage… il faut une équipe mentalement solide",
            },
            {
              id: 'caf-3',
              authorId: 'walid_rades',
              date: new Date('2025-10-25T19:42:00'),
              content:
                "Soirée CAF à Radès, les lumières, les drapeaux, l'hymne… y a rien de comparable",
            },
            {
              id: 'caf-4',
              authorId: 'rania_ost',
              date: new Date('2025-10-25T22:08:00'),
              content:
                "On a été patients, on a géré. En Afrique c'est comme ça que ça se joue. Bravo à toute l'équipe 👏",
              reactions: [{ emoji: '👏', count: 19, me: true }],
            },
            {
              id: 'caf-5',
              authorId: '10xribeiro',
              date: new Date('2025-10-26T11:45:00'),
              content:
                "Les soirées africaines à Radès avec vous, c'est spécial. On continue ensemble, étape par étape 🌍❤️💛",
              reactions: [
                { emoji: '❤️', count: 58, me: true },
                { emoji: '🌍', count: 21 },
              ],
            },
            {
              id: 'caf-6',
              authorId: 'aymen.sang.or',
              date: new Date('2026-02-07T23:50:00'),
              content:
                "Je regardais le match à l'extérieur dans un café à Tunis, tout le café était debout jusqu'à la dernière seconde 😮‍💨",
            },
            {
              id: 'caf-7',
              authorId: 'flamenate',
              date: new Date('2026-02-07T23:53:00'),
              content:
                'Pareil ici à Sfax, le café était à moitié Taraji à moitié CSS, ça chambrait dans tous les sens 😂',
              reactions: [{ emoji: '😂', count: 13 }],
            },
            {
              id: 'caf-8',
              authorId: 'fathi.supp',
              date: new Date('2026-02-08T09:15:00'),
              content:
                "L'Afrique, c'est notre jardin depuis des décennies. Peu importe les résultats d'une soirée, ce club a l'habitude des grands rendez-vous.",
              reactions: [{ emoji: '🫡', count: 15 }],
            },
            {
              id: 'caf-9',
              authorId: 'sarra.est',
              date: new Date('2026-09-28T18:20:00'),
              content:
                "Nouvelle campagne qui démarre 🙏 Qui organise le visionnage pour les matchs à l'extérieur ?",
            },
            {
              id: 'caf-10',
              authorId: 'meriemTaraji',
              date: new Date('2026-09-28T18:36:00'),
              content:
                "Watch party dans le vocal Stade de Radès comme d'habitude. Ceux qui sont à l'étranger, venez, vous ne serez pas seuls 😄",
              reactions: [{ emoji: '🙌', count: 16, me: true }],
            },
            {
              id: 'caf-11',
              authorId: 'oussamaUltra',
              date: new Date('2026-11-08T22:30:00'),
              content:
                "Peu importe l'adversaire, Radès doit être plein pour chaque match africain. C'est notre douzième joueur.",
              attachments: [
                {
                  src: '/media/pictures/rades/rades_crowd1.webp',
                  alt: "Le stade de Radès rempli et illuminé lors d'une soirée de Ligue des Champions CAF",
                },
              ],
              reactions: [
                { emoji: '🔥', count: 27 },
                { emoji: '🏟️', count: 12 },
              ],
            },
          ],
        },
        {
          type: 'voice',
          id: 'stade-de-rades',
          name: 'Stade de Radès',
        },
      ],
    },
  ],
}
