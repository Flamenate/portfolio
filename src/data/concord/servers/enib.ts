import type { Server } from '@/lib/concord/types'

export const enib: Server = {
  id: 'enib',
  name: 'ENIB',
  icon: '/media/concord/enib.webp',
  roles: [
    { id: 'admin', name: 'Admin', color: '#e74c3c' },
    { id: 'personnel-inp', name: 'Personnel INP', color: '#3b82f6' },
    { id: 'bureau-eleves', name: 'Bureau des Élèves', color: '#f59e0b' },
    { id: 'double-diplome', name: 'Double Diplôme', color: '#a855f7' },
    { id: 'international', name: 'International', color: '#10b981' },
    { id: 'etudiant', name: 'Étudiant', color: '#94a3b8' },
  ],
  members: [
    {
      userId: 'flamenate',
      roleIds: ['etudiant', 'double-diplome', 'international'],
    },
    {
      userId: 'thomasLeTrain',
      roleIds: ['admin', 'bureau-eleves', 'etudiant'],
    },
    { userId: 'jean-luc', roleIds: ['bureau-eleves', 'etudiant'] },
    { userId: 'mailouuuuu', roleIds: ['bureau-eleves', 'etudiant'] },
    { userId: 'miminèss', roleIds: ['bureau-eleves', 'etudiant'] },
    { userId: 'kevin_l', roleIds: ['bureau-eleves', 'etudiant'] },
    { userId: 'amadou.d', roleIds: ['bureau-eleves', 'etudiant'] },
    { userId: 'liliannnnne', roleIds: ['etudiant'] },
    { userId: 'jiji09', roleIds: ['etudiant'] },
    { userId: 'maxdu29', roleIds: ['etudiant'] },
    { userId: 'inesbzh', roleIds: ['etudiant'] },
    {
      userId: 'julioARG',
      roleIds: ['etudiant', 'double-diplome', 'international'],
    },
    {
      userId: 'mahmoud44',
      roleIds: ['etudiant', 'double-diplome', 'international'],
    },
    { userId: 'fernando', roleIds: ['etudiant', 'international'] },
    { userId: 'pablo', roleIds: ['etudiant', 'international'] },
    { userId: 'yuki.tan', roleIds: ['etudiant', 'international'] },
    { userId: 'sebchambres', roleIds: ['personnel-inp'] },
    { userId: 'kerhoas', roleIds: ['personnel-inp'] },
    { userId: 'fabHARR', roleIds: ['personnel-inp'] },
    { userId: 'lepevB', roleIds: ['personnel-inp'] },
    { userId: 'benz', roleIds: ['personnel-inp'] },
    { userId: 'bourgeot', roleIds: ['personnel-inp'] },
    { userId: 'katy', roleIds: ['personnel-inp'] },
    { userId: 'marieScol', roleIds: ['personnel-inp'] },
    { userId: 'olivierStages', roleIds: ['personnel-inp'] },
    { userId: 'nathalieFin', roleIds: ['personnel-inp'] },
    { userId: 'sophieINP', roleIds: ['personnel-inp'] },
  ],
  categories: [
    {
      id: 'uncategorized',
      name: null,
      channels: [
        {
          type: 'text',
          id: 'reglement',
          name: '📜・règlement',
          restricted: true,
          topic: 'Les règles du serveur, à lire avant tout',
          messages: [
            {
              id: 'reglement-1',
              authorId: 'thomasLeTrain',
              date: new Date('2026-09-01T09:00:00'),
              content:
                "Bienvenue sur le serveur de l'ENIB 👋\n\nQuelques règles simples pour que tout le monde s'y retrouve :\n\n1. Respect avant tout. Pas d'insultes, pas de harcèlement, pas de discrimination.\n2. Postez dans le bon salon. Les questions administratives vont dans les salons Services, le reste dans les bureaux.\n3. Pas de partage de sujets d'examens ou de corrigés non autorisés.\n4. Aucune donnée personnelle en public (numéro étudiant, adresse, titre de séjour...). Les services vous répondront par mail si besoin.\n5. Pas de spam ni de pub non validée par le BdE.\n6. Ce serveur n'est pas un canal officiel : en cas de doute, ce sont l'ENT et les mails de l'école qui font foi.\n\nTout manquement peut entraîner un mute ou un ban. Bonne année à toutes et à tous !\n— Le BdE",
              reactions: [{ emoji: '✅', count: 47, me: true }],
            },
            {
              id: 'reglement-2',
              authorId: 'sophieINP',
              date: new Date('2026-09-02T10:15:00'),
              content:
                "Petit complément : les comptes du personnel de l'INP sont identifiés par le rôle bleu. Les réponses données ici sont indicatives ; pour toute démarche officielle, merci de passer par les services concernés ou par l'ENT.",
              reactions: [{ emoji: '👍', count: 12 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'annonces',
          name: '📢・annonces',
          restricted: true,
          topic: "Annonces officielles de l'école et du BdE",
          messages: [
            {
              id: 'annonces-1',
              authorId: 'sebchambres',
              date: new Date('2026-09-01T08:30:00'),
              content:
                "Chères étudiantes, chers étudiants,\n\nAu nom de toute l'équipe de l'ENIB, je vous souhaite une excellente rentrée 2026. Une bienvenue toute particulière aux nouveaux arrivants en première année, aux admis sur titre ainsi qu'aux étudiants internationaux et en double diplôme qui nous rejoignent cette année.\n\nL'amphi de rentrée a lieu ce mardi à 10h. Le programme complet de la semaine d'intégration est disponible sur l'ENT.\n\nTrès belle année à toutes et à tous.",
              reactions: [
                { emoji: '👋', count: 64, me: true },
                { emoji: '❤️', count: 21 },
              ],
            },
            {
              id: 'annonces-2',
              authorId: 'thomasLeTrain',
              date: new Date('2026-09-03T18:12:00'),
              content:
                "Le programme de la semaine d'inté est dispo 🚂\n\nJeudi : rallye dans Brest, rendez-vous à l'arrêt de tram Liberté à 14h\nVendredi : soirée de bienvenue au foyer\nSamedi : sortie plage au Trez Hir si la météo est d'accord (spoiler : elle ne le sera pas)\n\nInscriptions au stand du BdE dans le hall !",
              reactions: [
                { emoji: '🎉', count: 38, me: true },
                { emoji: '😂', count: 15 },
              ],
            },
            {
              id: 'annonces-3',
              authorId: 'kerhoas',
              date: new Date('2026-09-14T09:05:00'),
              content:
                "Rappel : l'accès aux salles de TP en dehors des créneaux encadrés se fait uniquement avec la carte étudiante activée. Pensez à la faire activer à l'accueil si ce n'est pas déjà fait.",
              reactions: [{ emoji: '👍', count: 9 }],
            },
            {
              id: 'annonces-4',
              authorId: 'bourgeot',
              date: new Date('2026-10-05T08:40:00'),
              content:
                "Les emplois du temps du semestre ont été mis à jour sur l'ENT suite au déplacement de certains créneaux de TD. Merci de vérifier vos groupes avant lundi prochain.",
              reactions: [{ emoji: '👍', count: 14 }],
            },
            {
              id: 'annonces-5',
              authorId: 'sebchambres',
              date: new Date('2026-10-16T11:00:00'),
              content:
                'Les vacances de la Toussaint auront lieu du samedi 24 octobre au dimanche 1er novembre. Reprise des cours le lundi 2 novembre.\n\nBonnes vacances à toutes et à tous.',
              reactions: [{ emoji: '🙏', count: 27 }],
            },
            {
              id: 'annonces-6',
              authorId: 'thomasLeTrain',
              date: new Date('2026-11-04T19:30:00'),
              content:
                "✨ Le Gala de l'ENIB aura lieu le samedi 12 décembre ! ✨\n\nBilletterie ouverte vendredi midi au stand du BdE. Tenue correcte exigée, ciré jaune toléré.",
              reactions: [
                { emoji: '🎉', count: 52, me: true },
                { emoji: '😂', count: 18 },
                { emoji: '🕺', count: 11 },
              ],
            },
            {
              id: 'annonces-7',
              authorId: 'fabHARR',
              date: new Date('2026-11-17T08:45:00'),
              content:
                'Les soutenances de projets du semestre se tiendront la semaine du 14 décembre. Le planning de passage sera communiqué par les responsables de modules.',
              reactions: [{ emoji: '👍', count: 19 }],
            },
          ],
        },
      ],
    },
    {
      id: 'cat-etudier',
      name: 'Étudier ensemble',
      channels: [
        {
          type: 'text',
          id: 'etudier-ensemble',
          name: '📚・étudier-ensemble',
          topic: 'Révisions, entraide et sessions de travail en groupe',
          messages: [
            {
              id: 'etudier-ensemble-1',
              authorId: 'jiji09',
              date: new Date('2026-09-10T20:41:00'),
              content:
                "quelqu'un pour une session en Salle d'étude 1 ce soir ? j'ai un TD d'électronique qui me regarde méchamment",
            },
            {
              id: 'etudier-ensemble-2',
              authorId: 'maxdu29',
              date: new Date('2026-09-10T20:44:00'),
              content: 'chaud dans 20 min, le temps de finir mes crêpes',
            },
            {
              id: 'etudier-ensemble-3',
              authorId: 'flamenate',
              date: new Date('2026-09-10T20:47:00'),
              content:
                "je peux venir aussi ? je suis nouveau en double diplôme, j'essaie encore de m'habituer aux notations qu'on utilise ici",
            },
            {
              id: 'etudier-ensemble-4',
              authorId: 'jiji09',
              date: new Date('2026-09-10T20:48:00'),
              content:
                "carrément viens ! les notations c'est le même bazar pour tout le monde t'inquiète",
              reactions: [{ emoji: '😂', count: 3 }],
            },
            {
              id: 'etudier-ensemble-5',
              authorId: 'benz',
              date: new Date('2026-09-28T10:15:00'),
              content:
                "Pour celles et ceux qui préparent le premier contrôle, les annales des deux dernières années sont disponibles sur Moodle, dans l'espace du module. Bon courage pour vos révisions.",
              reactions: [{ emoji: '🙏', count: 24, me: true }],
            },
            {
              id: 'etudier-ensemble-6',
              authorId: 'mahmoud44',
              date: new Date('2026-10-12T22:03:00'),
              content:
                "quelqu'un a compris l'exo 3 du TD de signaux ? je trouve pas la même transformée que le corrigé",
            },
            {
              id: 'etudier-ensemble-7',
              authorId: 'flamenate',
              date: new Date('2026-10-12T22:09:00'),
              content:
                "t'as dû oublier le facteur 1/2π, j'avais la même erreur. le corrigé utilise la convention en fréquence, pas en pulsation",
            },
            {
              id: 'etudier-ensemble-8',
              authorId: 'mahmoud44',
              date: new Date('2026-10-12T22:11:00'),
              content: 'ahhh mais oui 🤦 merci frère',
            },
            {
              id: 'etudier-ensemble-9',
              authorId: 'jiji09',
              date: new Date('2026-10-19T23:48:00'),
              content: 'moi à 23h48 la veille du partiel :',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_grind.webp',
                  alt: 'Mème : le bouton « Grind off » que je ne presserai pas',
                },
              ],
              reactions: [
                { emoji: '😂', count: 17, me: true },
                { emoji: '💀', count: 6 },
              ],
            },
            {
              id: 'etudier-ensemble-10',
              authorId: 'maxdu29',
              date: new Date('2026-10-19T23:50:00'),
              content: 'le bouton est cassé chez moi aussi',
            },
            {
              id: 'etudier-ensemble-11',
              authorId: 'lepevB',
              date: new Date('2026-11-09T14:20:00'),
              content:
                'Une séance de questions-réponses est organisée jeudi à 17h30 en amphi pour les modules de mathématiques du semestre. Toutes les questions sont les bienvenues.',
              reactions: [{ emoji: '👍', count: 16 }],
            },
            {
              id: 'etudier-ensemble-12',
              authorId: 'yuki.tan',
              date: new Date('2026-11-16T19:02:00'),
              content:
                "Salle d'étude 2 ce soir à 20h ? on attaque le projet de prog",
            },
            {
              id: 'etudier-ensemble-13',
              authorId: 'flamenate',
              date: new Date('2026-11-16T19:05:00'),
              content: 'je suis là 👍',
            },
            {
              id: 'etudier-ensemble-14',
              authorId: 'liliannnnne',
              date: new Date('2026-11-16T19:30:00'),
              content: "j'arrive, je ramène des madeleines",
            },
            {
              id: 'etudier-ensemble-15',
              authorId: 'bourgeot',
              date: new Date('2026-11-20T16:00:00'),
              content:
                "Les sujets des TP notés de la semaine prochaine sont en ligne. Pensez à lire l'énoncé avant la séance, cela vous fera gagner beaucoup de temps.",
              reactions: [{ emoji: '👍', count: 11 }],
            },
          ],
        },
        { type: 'voice', id: 'salle-etude-1', name: "Salle d'étude 1" },
        { type: 'voice', id: 'salle-etude-2', name: "Salle d'étude 2" },
      ],
    },
    {
      id: 'cat-services',
      name: 'Services',
      channels: [
        {
          type: 'text',
          id: 'service-international',
          name: '🌍・service-international',
          topic: 'Questions pour le service des relations internationales',
          messages: [
            {
              id: 'service-international-1',
              authorId: 'katy',
              date: new Date('2026-09-01T10:00:00'),
              content:
                "Bonjour et bienvenue aux étudiantes et étudiants internationaux ! 🌍\n\nLe service international est ouvert du lundi au vendredi, de 9h à 12h et de 13h30 à 17h. Vous pouvez poser vos questions générales ici, nous répondons dans la journée. Pour les démarches personnelles (titre de séjour, documents), merci de nous écrire par mail ou de passer au bureau.\n\nRéunion d'accueil des internationaux : jeudi 3 septembre à 14h.",
              reactions: [{ emoji: '👋', count: 19, me: true }],
            },
            {
              id: 'service-international-2',
              authorId: 'flamenate',
              date: new Date('2026-09-02T11:24:00'),
              content:
                "Bonjour, je viens d'arriver de Tunisie pour le double diplôme avec l'ENIS. J'ai un visa long séjour étudiant (VLS-TS). Est-ce que je dois faire la validation en ligne tout de suite ou attendre la fin de l'inscription ?",
            },
            {
              id: 'service-international-3',
              authorId: 'katy',
              date: new Date('2026-09-02T11:52:00'),
              content:
                "Bonjour et bienvenue à Brest ! La validation du VLS-TS se fait en ligne sur le site de l'ANEF, dans les 3 mois suivant votre arrivée en France. Vous pouvez la faire dès maintenant : il vous faudra votre adresse en France et le paiement de la taxe en ligne. En cas de souci, passez nous voir, nous vous accompagnons.",
            },
            {
              id: 'service-international-4',
              authorId: 'flamenate',
              date: new Date('2026-09-02T11:55:00'),
              content: 'Parfait, merci beaucoup !',
            },
            {
              id: 'service-international-5',
              authorId: 'julioARG',
              date: new Date('2026-09-02T15:30:00'),
              content:
                "Hola ! Même situation pour moi mais depuis l'Argentine 🇦🇷 Pour ouvrir un compte bancaire, il faut une attestation de l'école ?",
            },
            {
              id: 'service-international-6',
              authorId: 'katy',
              date: new Date('2026-09-02T15:48:00'),
              content:
                "Bonjour ! Oui, la plupart des banques demandent une attestation d'inscription. Elle est téléchargeable sur l'ENT une fois l'inscription finalisée. En attendant, nous pouvons vous remettre une attestation provisoire au bureau.",
            },
            {
              id: 'service-international-7',
              authorId: 'fernando',
              date: new Date('2026-09-08T09:14:00'),
              content:
                'Bonjour, je suis en Erasmus pour un semestre. Le learning agreement doit être signé par qui côté ENIB ?',
            },
            {
              id: 'service-international-8',
              authorId: 'katy',
              date: new Date('2026-09-08T09:40:00'),
              content:
                "Bonjour Fernando, le coordinateur pédagogique de votre filière valide d'abord le contenu, puis le service international signe. Envoyez-nous la version à jour par mail et nous faisons le lien.",
            },
            {
              id: 'service-international-9',
              authorId: 'yuki.tan',
              date: new Date('2026-09-15T13:05:00'),
              content:
                "Bonjour, est-ce qu'il y a des cours de français langue étrangère ce semestre ?",
            },
            {
              id: 'service-international-10',
              authorId: 'katy',
              date: new Date('2026-09-15T13:30:00'),
              content:
                'Bonjour, oui ! Les cours de FLE ont lieu le mardi de 17h à 19h. Le test de positionnement a lieu mardi prochain, inscription auprès du service international.',
              reactions: [{ emoji: '🙌', count: 6 }],
            },
            {
              id: 'service-international-11',
              authorId: 'mahmoud44',
              date: new Date('2026-10-06T10:47:00'),
              content:
                "Bonjour, pour l'aide au logement de la CAF, mon VLS-TS est validé mais ils disent que le dossier est incomplet. C'est normal ?",
            },
            {
              id: 'service-international-12',
              authorId: 'katy',
              date: new Date('2026-10-06T11:20:00'),
              content:
                "Bonjour, c'est assez fréquent en début d'année. Ajoutez bien l'attestation de validation du visa en plus du visa lui-même, ainsi qu'un justificatif de domicile récent. Si le blocage persiste, passez au bureau avec vos documents et nous regarderons ensemble.",
            },
            {
              id: 'service-international-13',
              authorId: 'flamenate',
              date: new Date('2026-11-03T16:12:00'),
              content:
                "Bonjour, pour le double diplôme, est-ce que les relevés de notes sont envoyés directement à l'ENIS ou est-ce à nous de les transmettre ?",
            },
            {
              id: 'service-international-14',
              authorId: 'katy',
              date: new Date('2026-11-03T16:40:00'),
              content:
                "Bonjour, les relevés sont transmis directement par l'ENIB à l'établissement partenaire à la fin de chaque semestre. Vous pouvez bien sûr en télécharger une copie sur l'ENT pour vos propres démarches.",
              reactions: [{ emoji: '👍', count: 3, me: true }],
            },
            {
              id: 'service-international-15',
              authorId: 'katy',
              date: new Date('2026-11-18T09:00:00'),
              content:
                "Rappel : la soirée des internationaux, organisée avec le BdE, aura lieu le jeudi 26 novembre au foyer. N'hésitez pas à venir avec une spécialité de votre pays ! 🌍",
              reactions: [
                { emoji: '🎉', count: 22, me: true },
                { emoji: '❤️', count: 9 },
              ],
            },
            {
              id: 'service-international-16',
              authorId: 'julioARG',
              date: new Date('2026-11-18T09:20:00'),
              content: 'je ramène des empanadas 🇦🇷',
            },
            {
              id: 'service-international-17',
              authorId: 'flamenate',
              date: new Date('2026-11-18T09:34:00'),
              content: 'et moi des makroudh, promis 🇹🇳',
              reactions: [{ emoji: '😋', count: 6 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'service-scolarite',
          name: '🎓・service-scolarité',
          topic: 'Inscriptions, attestations, cartes étudiantes, examens',
          messages: [
            {
              id: 'service-scolarite-1',
              authorId: 'marieScol',
              date: new Date('2026-09-01T09:30:00'),
              content:
                "Bonjour à toutes et à tous, le service scolarité est ouvert de 8h30 à 12h et de 13h30 à 16h30.\n\nLes inscriptions administratives doivent être finalisées avant le 18 septembre. N'oubliez pas de déposer votre attestation CVEC sur l'ENT.",
            },
            {
              id: 'service-scolarite-2',
              authorId: 'maxdu29',
              date: new Date('2026-09-03T10:12:00'),
              content:
                "Bonjour, j'ai payé la CVEC mais j'ai perdu l'attestation 😅 on peut la retrouver où ?",
            },
            {
              id: 'service-scolarite-3',
              authorId: 'marieScol',
              date: new Date('2026-09-03T10:30:00'),
              content:
                "Bonjour, l'attestation est téléchargeable à tout moment sur le site de la CVEC, dans votre espace personnel. Il suffit ensuite de la déposer sur l'ENT.",
            },
            {
              id: 'service-scolarite-4',
              authorId: 'flamenate',
              date: new Date('2026-09-04T14:05:00'),
              content:
                "Bonjour, en tant qu'étudiant en double diplôme, est-ce que je dois aussi payer la CVEC ?",
            },
            {
              id: 'service-scolarite-5',
              authorId: 'marieScol',
              date: new Date('2026-09-04T14:30:00'),
              content:
                "Bonjour, oui : la CVEC est due par tous les étudiants inscrits en formation initiale dans un établissement français, y compris en double diplôme. Les étudiants en programme d'échange (Erasmus, conventions d'échange) en sont exonérés.",
            },
            {
              id: 'service-scolarite-6',
              authorId: 'fernando',
              date: new Date('2026-09-04T14:33:00'),
              content: 'ah donc pas moi, parfait 😄',
            },
            {
              id: 'service-scolarite-7',
              authorId: 'inesbzh',
              date: new Date('2026-09-21T08:02:00'),
              content:
                "Bonjour, ma carte étudiante n'est toujours pas arrivée, c'est normal ?",
            },
            {
              id: 'service-scolarite-8',
              authorId: 'marieScol',
              date: new Date('2026-09-21T09:10:00'),
              content:
                "Bonjour, les cartes des nouveaux inscrits sont disponibles à l'accueil de la scolarité depuis vendredi. Pensez à venir avec une pièce d'identité.",
            },
            {
              id: 'service-scolarite-9',
              authorId: 'jiji09',
              date: new Date('2026-10-08T17:40:00'),
              content:
                "Est-ce que les notes du premier contrôle seront sur l'ENT avant les vacances ?",
            },
            {
              id: 'service-scolarite-10',
              authorId: 'marieScol',
              date: new Date('2026-10-09T09:05:00'),
              content:
                "Bonjour, les notes sont publiées après validation par les enseignants responsables. Vous recevrez une notification sur l'ENT dès qu'elles seront disponibles.",
            },
            {
              id: 'service-scolarite-11',
              authorId: 'pablo',
              date: new Date('2026-11-12T11:15:00'),
              content:
                "Bonjour, j'ai besoin d'une attestation de scolarité en espagnol pour ma bourse, c'est possible ?",
            },
            {
              id: 'service-scolarite-12',
              authorId: 'marieScol',
              date: new Date('2026-11-12T11:48:00'),
              content:
                'Bonjour, nous délivrons les attestations en français et en anglais. Pour une version en espagnol, le service international pourra vous orienter vers une traduction certifiée.',
            },
            {
              id: 'service-scolarite-13',
              authorId: 'pablo',
              date: new Date('2026-11-12T11:50:00'),
              content: "d'accord, merci beaucoup !",
            },
            {
              id: 'service-scolarite-14',
              authorId: 'flamenate',
              date: new Date('2026-11-19T15:20:00'),
              content:
                'Bonjour, où peut-on trouver le calendrier des examens de fin de semestre ?',
            },
            {
              id: 'service-scolarite-15',
              authorId: 'marieScol',
              date: new Date('2026-11-19T15:45:00'),
              content:
                "Bonjour, le calendrier sera publié sur l'ENT d'ici la fin du mois de novembre. Un mail sera envoyé à toutes les promotions.",
              reactions: [{ emoji: '🙏', count: 8, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'service-stages-entreprises',
          name: '💼・service-stages-entreprises',
          topic: 'Conventions de stage, offres, forum entreprises',
          messages: [
            {
              id: 'service-stages-entreprises-1',
              authorId: 'olivierStages',
              date: new Date('2026-09-07T09:00:00'),
              content:
                'Bonjour à toutes et à tous ! Le service stages & entreprises vous accompagne dans vos recherches de stage, la signature des conventions et la préparation de vos candidatures.\n\nLes conventions se font exclusivement via la plateforme en ligne : aucune convention papier ne sera acceptée.',
            },
            {
              id: 'service-stages-entreprises-2',
              authorId: 'amadou.d',
              date: new Date('2026-09-16T12:30:00'),
              content:
                'Bonjour, ma convention est bloquée en « en attente de validation entreprise » depuis deux semaines, je fais quoi ?',
            },
            {
              id: 'service-stages-entreprises-3',
              authorId: 'olivierStages',
              date: new Date('2026-09-16T14:00:00'),
              content:
                "Bonjour, l'entreprise a normalement reçu un mail de la plateforme. Je vous conseille de relancer votre tuteur ; s'il n'a rien reçu, envoyez-moi le nom de l'entreprise par mail et je renvoie l'invitation.",
            },
            {
              id: 'service-stages-entreprises-4',
              authorId: 'mahmoud44',
              date: new Date('2026-10-01T18:22:00'),
              content:
                "Bonjour, est-ce que les étudiants internationaux ont besoin d'une autorisation de travail pour faire un stage en France ?",
            },
            {
              id: 'service-stages-entreprises-5',
              authorId: 'olivierStages',
              date: new Date('2026-10-02T09:15:00'),
              content:
                "Bonjour, non : le stage est encadré par une convention tripartite, aucune autorisation de travail n'est nécessaire tant que votre titre de séjour étudiant est valide sur toute la durée du stage. Pensez à bien vérifier les dates !",
            },
            {
              id: 'service-stages-entreprises-6',
              authorId: 'olivierStages',
              date: new Date('2026-10-05T10:00:00'),
              content:
                "📅 Le Forum Entreprises aura lieu le jeudi 15 octobre dans le hall de l'école, de 10h à 17h.\n\nUne quarantaine d'entreprises seront présentes : systèmes embarqués, défense, énergies marines, informatique, télécoms...\n\nAteliers relecture de CV mardi et mercredi midi en salle de réunion.",
              reactions: [
                { emoji: '🔥', count: 31, me: true },
                { emoji: '👍', count: 14 },
              ],
            },
            {
              id: 'service-stages-entreprises-7',
              authorId: 'julioARG',
              date: new Date('2026-10-05T10:20:00'),
              content: 'le CV doit être en français obligatoirement ?',
            },
            {
              id: 'service-stages-entreprises-8',
              authorId: 'olivierStages',
              date: new Date('2026-10-05T10:35:00'),
              content:
                "Idéalement oui, mais une version anglaise est un vrai plus pour les entreprises qui recrutent à l'international. Venez avec les deux !",
            },
            {
              id: 'service-stages-entreprises-9',
              authorId: 'flamenate',
              date: new Date('2026-10-13T12:50:00'),
              content:
                "Je suis passé à l'atelier CV ce midi, très utile. Est-ce que les étudiants en double diplôme peuvent faire un stage cet été ?",
            },
            {
              id: 'service-stages-entreprises-10',
              authorId: 'olivierStages',
              date: new Date('2026-10-13T13:30:00'),
              content:
                "Bonjour, oui, un stage d'été est possible à condition qu'il soit validé par le responsable de votre parcours. Passez me voir pour que l'on regarde votre maquette ensemble.",
            },
            {
              id: 'service-stages-entreprises-11',
              authorId: 'liliannnnne',
              date: new Date('2026-10-15T18:05:00'),
              content:
                "le forum était trop bien, j'ai décroché 3 entretiens 😭🙏",
              reactions: [{ emoji: '🎉', count: 12, me: true }],
            },
            {
              id: 'service-stages-entreprises-12',
              authorId: 'olivierStages',
              date: new Date('2026-10-16T09:00:00'),
              content:
                'Merci à toutes et à tous pour votre participation au forum ! Les offres déposées par les entreprises sont désormais disponibles sur la plateforme stages.',
            },
          ],
        },
        {
          type: 'text',
          id: 'service-financier',
          name: '💶・service-financier',
          topic: "Frais d'inscription, bourses, remboursements",
          messages: [
            {
              id: 'service-financier-1',
              authorId: 'nathalieFin',
              date: new Date('2026-09-02T09:00:00'),
              content:
                "Bonjour, le service financier traite les questions de frais d'inscription, de bourses et de remboursements. Pour toute question sur un dossier personnel, merci d'écrire par mail en indiquant votre numéro étudiant (jamais ici en public 🙂).",
            },
            {
              id: 'service-financier-2',
              authorId: 'jiji09',
              date: new Date('2026-09-10T13:12:00'),
              content:
                "Bonjour, ma bourse CROUS a été validée mais j'avais déjà payé les frais d'inscription, je peux être remboursée ?",
            },
            {
              id: 'service-financier-3',
              authorId: 'nathalieFin',
              date: new Date('2026-09-10T14:00:00'),
              content:
                "Bonjour, oui. Envoyez-nous votre notification de bourse définitive ainsi qu'un RIB, le remboursement est effectué sous 4 à 6 semaines.",
            },
            {
              id: 'service-financier-4',
              authorId: 'flamenate',
              date: new Date('2026-09-18T10:30:00'),
              content:
                "Bonjour, est-ce qu'il est possible de payer les frais d'inscription en plusieurs fois ?",
            },
            {
              id: 'service-financier-5',
              authorId: 'nathalieFin',
              date: new Date('2026-09-18T11:05:00'),
              content:
                "Bonjour, oui, un paiement en trois fois est possible. La demande se fait auprès de notre service avant la fin de l'inscription administrative.",
            },
            {
              id: 'service-financier-6',
              authorId: 'flamenate',
              date: new Date('2026-09-18T11:07:00'),
              content: 'Merci, je vous envoie un mail.',
            },
            {
              id: 'service-financier-7',
              authorId: 'maxdu29',
              date: new Date('2026-10-20T16:44:00'),
              content:
                "le versement de la bourse d'octobre est arrivé chez quelqu'un ? toujours rien chez moi",
            },
            {
              id: 'service-financier-8',
              authorId: 'inesbzh',
              date: new Date('2026-10-20T16:50:00'),
              content: 'reçu ce matin',
            },
            {
              id: 'service-financier-9',
              authorId: 'nathalieFin',
              date: new Date('2026-10-21T09:10:00'),
              content:
                "Bonjour, les versements des bourses CROUS ne dépendent pas de l'école. En cas de retard, vérifiez votre dossier sur votre espace étudiant ou contactez directement le CROUS.",
            },
            {
              id: 'service-financier-10',
              authorId: 'maxdu29',
              date: new Date('2026-10-22T08:15:00'),
              content: "c'est arrivé ce matin, fausse alerte 🙏",
            },
          ],
        },
        {
          type: 'text',
          id: 'service-administration-inp',
          name: '🏛️・service-administration-inp',
          topic: "Questions générales sur l'INP : comptes, bâtiments, logement",
          messages: [
            {
              id: 'service-administration-inp-1',
              authorId: 'sophieINP',
              date: new Date('2026-09-01T11:00:00'),
              content:
                "Bonjour à toutes et à tous ! Ce salon est dédié aux questions générales concernant l'INP : comptes informatiques, accès aux bâtiments, logement, restauration, assurances.\n\nPour les questions de scolarité, merci d'utiliser le salon dédié.",
            },
            {
              id: 'service-administration-inp-2',
              authorId: 'pablo',
              date: new Date('2026-09-03T19:22:00'),
              content:
                'Bonjour, mon compte ENT ne marche pas, le mot de passe est refusé',
            },
            {
              id: 'service-administration-inp-3',
              authorId: 'sophieINP',
              date: new Date('2026-09-04T08:45:00'),
              content:
                "Bonjour, les comptes sont activés 48h après l'inscription administrative. Si le problème persiste, vous pouvez réinitialiser votre mot de passe depuis la page d'accueil de l'ENT avec votre adresse mail personnelle.",
            },
            {
              id: 'service-administration-inp-4',
              authorId: 'flamenate',
              date: new Date('2026-09-07T09:40:00'),
              content:
                "Bonjour, j'ai une demande de logement CROUS en cours. Est-ce que l'INP peut fournir un document pour appuyer le dossier ?",
            },
            {
              id: 'service-administration-inp-5',
              authorId: 'sophieINP',
              date: new Date('2026-09-07T10:15:00'),
              content:
                "Bonjour, l'attribution des logements est gérée directement par le CROUS. Nous pouvons en revanche vous délivrer une attestation d'inscription. En attendant une place, le service international dispose d'une liste de logements temporaires sur Brest et Plouzané.",
            },
            {
              id: 'service-administration-inp-6',
              authorId: 'flamenate',
              date: new Date('2026-09-07T10:17:00'),
              content: "D'accord, merci beaucoup.",
            },
            {
              id: 'service-administration-inp-7',
              authorId: 'yuki.tan',
              date: new Date('2026-09-24T12:05:00'),
              content:
                "Bonjour, l'assurance responsabilité civile est obligatoire ?",
            },
            {
              id: 'service-administration-inp-8',
              authorId: 'sophieINP',
              date: new Date('2026-09-24T13:30:00'),
              content:
                "Bonjour, oui, une attestation de responsabilité civile est demandée à tous les étudiants pour les stages et les activités de l'école. Votre assurance habitation la couvre souvent, vérifiez votre contrat.",
            },
            {
              id: 'service-administration-inp-9',
              authorId: 'kevin_l',
              date: new Date('2026-10-14T08:30:00'),
              content:
                "le wifi du bâtiment B saute toutes les 10 minutes depuis lundi, c'est connu ?",
            },
            {
              id: 'service-administration-inp-10',
              authorId: 'sophieINP',
              date: new Date('2026-10-14T09:20:00'),
              content:
                'Bonjour, oui, une intervention est prévue jeudi. Merci pour le signalement.',
            },
            {
              id: 'service-administration-inp-11',
              authorId: 'sophieINP',
              date: new Date('2026-11-02T08:00:00'),
              content:
                "Rappel : pendant la période hivernale, les bâtiments sont ouverts de 7h30 à 20h en semaine. Le samedi, l'accès se fait uniquement sur autorisation.",
            },
          ],
        },
      ],
    },
    {
      id: 'cat-bda',
      name: 'Bureau des Arts',
      channels: [
        {
          type: 'text',
          id: 'bda-general',
          name: '🎨・bda-général',
          topic: 'Bureau des Arts : expos, ateliers, sorties culturelles',
          messages: [
            {
              id: 'bda-general-1',
              authorId: 'mailouuuuu',
              date: new Date('2026-09-04T17:00:00'),
              content:
                'Hello tout le monde 🎨 Le BdA recrute ! Musique, photo, dessin, théâtre, ou juste envie de traîner avec nous : passez au stand dans le hall jeudi midi.',
              reactions: [
                { emoji: '🎨', count: 23, me: true },
                { emoji: '❤️', count: 8 },
              ],
            },
            {
              id: 'bda-general-2',
              authorId: 'inesbzh',
              date: new Date('2026-09-04T17:12:00'),
              content: 'je ramène mes feutres et ma motivation',
            },
            {
              id: 'bda-general-3',
              authorId: 'yuki.tan',
              date: new Date('2026-09-05T10:40:00'),
              content: 'Bonjour ! Il y a un atelier dessin ou manga ? 🙂',
            },
            {
              id: 'bda-general-4',
              authorId: 'mailouuuuu',
              date: new Date('2026-09-05T10:52:00'),
              content:
                'pas encore mais si tu veux le lancer on te suit à 100% !!',
            },
            {
              id: 'bda-general-5',
              authorId: 'yuki.tan',
              date: new Date('2026-09-05T10:55:00'),
              content: "d'accord, je vais essayer 😊",
            },
            {
              id: 'bda-general-6',
              authorId: 'mailouuuuu',
              date: new Date('2026-09-25T18:30:00'),
              content:
                'Sortie au Quartz le 9 octobre pour la pièce de théâtre 🎭 15 places à tarif réduit, premier arrivé premier servi. Répondez ici 👇',
            },
            {
              id: 'bda-general-7',
              authorId: 'jiji09',
              date: new Date('2026-09-25T18:31:00'),
              content: 'moi !!',
            },
            {
              id: 'bda-general-8',
              authorId: 'flamenate',
              date: new Date('2026-09-25T18:40:00'),
              content: "je suis partant s'il reste de la place",
            },
            {
              id: 'bda-general-9',
              authorId: 'liliannnnne',
              date: new Date('2026-09-25T18:42:00'),
              content: '+1',
            },
            {
              id: 'bda-general-10',
              authorId: 'mailouuuuu',
              date: new Date('2026-09-25T18:50:00'),
              content: "c'est noté pour vous trois 🎭",
            },
            {
              id: 'bda-general-11',
              authorId: 'yuki.tan',
              date: new Date('2026-10-20T21:00:00'),
              content:
                "L'atelier manga commence mardi prochain à 18h en salle A102 ! Débutants bienvenus ✏️",
              reactions: [{ emoji: '🙌', count: 11, me: true }],
            },
            {
              id: 'bda-general-12',
              authorId: 'mailouuuuu',
              date: new Date('2026-11-13T12:00:00'),
              content:
                "On prépare la déco du Gala ! Atelier peinture tous les mercredis soir jusqu'au 9 décembre, on a besoin de bras 🖌️",
            },
            {
              id: 'bda-general-13',
              authorId: 'inesbzh',
              date: new Date('2026-11-13T12:20:00'),
              content: 'je serai là mercredi',
            },
          ],
        },
        {
          type: 'text',
          id: 'photo',
          name: '📸・photo',
          topic: "Vos photos : Brest, la rade, la vie à l'école, vos voyages",
          messages: [
            {
              id: 'photo-1',
              authorId: 'liliannnnne',
              date: new Date('2026-09-06T20:15:00'),
              content:
                'Je lance le salon photo 📸 Postez vos meilleures photos : la rade, les événements, vos voyages, tout ce que vous voulez.\n\nSortie photo au vallon du Stang-Alar dimanche si ça vous dit !',
            },
            {
              id: 'photo-2',
              authorId: 'maxdu29',
              date: new Date('2026-09-06T20:30:00'),
              content: 'prévois le ciré, ça fera de belles photos de pluie',
            },
            {
              id: 'photo-3',
              authorId: 'liliannnnne',
              date: new Date('2026-09-26T19:02:00'),
              content:
                "Les photos du rallye d'inté sont sur le drive du BdE ! J'ai mis les meilleures dans l'album « Inté 2026 »",
              reactions: [
                { emoji: '🔥', count: 27 },
                { emoji: '❤️', count: 12, me: true },
              ],
            },
            {
              id: 'photo-4',
              authorId: 'flamenate',
              date: new Date('2026-11-01T21:10:00'),
              content:
                'Petit week-end à Paris pendant les vacances. Les vitraux de Notre-Dame, ça valait le détour',
              attachments: [
                {
                  src: '/media/pictures/paris/paris_notredame_window.webp',
                  alt: 'Rosace et vitraux de Notre-Dame de Paris',
                },
              ],
              reactions: [
                { emoji: '😍', count: 18 },
                { emoji: '🔥', count: 7 },
              ],
            },
            {
              id: 'photo-5',
              authorId: 'liliannnnne',
              date: new Date('2026-11-01T21:16:00'),
              content: 'les couleurs 😍 tu shootes avec quoi ?',
            },
            {
              id: 'photo-6',
              authorId: 'flamenate',
              date: new Date('2026-11-01T21:20:00'),
              content: 'juste mon téléphone 😅',
            },
            {
              id: 'photo-7',
              authorId: 'liliannnnne',
              date: new Date('2026-11-01T21:21:00'),
              content: 'franchement respect',
            },
            {
              id: 'photo-8',
              authorId: 'jiji09',
              date: new Date('2026-11-02T08:30:00'),
              content: 'pendant ce temps à Brest il a plu toute la semaine',
            },
            {
              id: 'photo-9',
              authorId: 'liliannnnne',
              date: new Date('2026-11-15T17:45:00'),
              content:
                'Concours photo du BdA : thème « Brest sous la pluie » 🌧️ Envoyez vos photos avant le 30 novembre, les meilleures seront exposées au Gala.',
              reactions: [{ emoji: '🌧️', count: 15, me: true }],
            },
            {
              id: 'photo-10',
              authorId: 'maxdu29',
              date: new Date('2026-11-15T17:50:00'),
              content: "le thème le plus facile de l'histoire",
            },
          ],
        },
        {
          type: 'text',
          id: 'musique',
          name: '🎸・musique',
          topic: "Groupes, répét' et jam sessions",
          messages: [
            {
              id: 'musique-1',
              authorId: 'mailouuuuu',
              date: new Date('2026-09-08T19:00:00'),
              content:
                "Les créneaux de la salle de répét' sont ouverts ! Réservation sur le tableau du local BdA. Max 2h par groupe et par semaine pour que tout le monde puisse jouer 🎸",
            },
            {
              id: 'musique-2',
              authorId: 'jean-luc',
              date: new Date('2026-09-09T12:10:00'),
              content:
                "on cherche un batteur pour monter un groupe de rock, de préférence quelqu'un qui tient plus de 3 morceaux",
            },
            {
              id: 'musique-3',
              authorId: 'pablo',
              date: new Date('2026-09-09T12:40:00'),
              content: 'je joue de la batterie ! un peu rouillé mais motivé 🥁',
            },
            {
              id: 'musique-4',
              authorId: 'jean-luc',
              date: new Date('2026-09-09T12:42:00'),
              content: "parfait t'es pris",
            },
            {
              id: 'musique-5',
              authorId: 'julioARG',
              date: new Date('2026-09-30T20:00:00'),
              content:
                "jam session jeudi soir ? j'amène la guitare, on peut tenter un tango rock 😄",
            },
            {
              id: 'musique-6',
              authorId: 'fernando',
              date: new Date('2026-09-30T20:05:00'),
              content: '¡me apunto! enfin, je viens 😅',
            },
            {
              id: 'musique-7',
              authorId: 'mailouuuuu',
              date: new Date('2026-10-27T14:00:00'),
              content:
                'Scène ouverte au foyer le jeudi 19 novembre ! Inscrivez vos groupes ou vos solos ici, 15 minutes par passage.',
            },
            {
              id: 'musique-8',
              authorId: 'jean-luc',
              date: new Date('2026-10-27T14:30:00'),
              content: "on s'inscrit avec le groupe, Pablo est enfin prêt",
            },
            {
              id: 'musique-9',
              authorId: 'jiji09',
              date: new Date('2026-11-19T23:30:00'),
              content:
                "scène ouverte incroyable ce soir 😭 le solo de batterie de Pablo restera dans l'histoire",
              reactions: [
                { emoji: '🔥', count: 21, me: true },
                { emoji: '🥁', count: 9 },
              ],
            },
            {
              id: 'musique-10',
              authorId: 'pablo',
              date: new Date('2026-11-19T23:41:00'),
              content: 'gracias 🙏🥁',
            },
          ],
        },
        { type: 'voice', id: 'repet', name: "Répét'" },
      ],
    },
    {
      id: 'cat-bdc',
      name: 'Bureau de la Cafétéria',
      channels: [
        {
          type: 'text',
          id: 'bdc-general',
          name: '☕・bdc-général',
          topic: 'Bureau de la Cafétéria : infos, horaires, bénévoles',
          messages: [
            {
              id: 'bdc-general-1',
              authorId: 'miminèss',
              date: new Date('2026-09-01T12:00:00'),
              content:
                "Coucou ! La cafét' est ouverte dès aujourd'hui ☕\n\nHoraires : 7h45-16h30 en semaine. Café à 50 centimes, crêpes le jeudi (on est en Bretagne quand même).",
              reactions: [
                { emoji: '☕', count: 34, me: true },
                { emoji: '🥞', count: 12 },
              ],
            },
            {
              id: 'bdc-general-2',
              authorId: 'maxdu29',
              date: new Date('2026-09-01T12:05:00'),
              content: "crêpes le jeudi = meilleure décision de l'année",
            },
            {
              id: 'bdc-general-3',
              authorId: 'flamenate',
              date: new Date('2026-09-03T08:20:00'),
              content:
                'Petite question de nouveau : il y a du thé à la menthe à la cafét ?',
            },
            {
              id: 'bdc-general-4',
              authorId: 'miminèss',
              date: new Date('2026-09-03T08:35:00'),
              content:
                'pas encore mais je note, on a déjà eu plusieurs demandes 👀',
            },
            {
              id: 'bdc-general-5',
              authorId: 'miminèss',
              date: new Date('2026-09-22T13:10:00'),
              content:
                "On cherche des bénévoles pour tenir la cafét' le mardi matin, ça compte pour l'engagement associatif !",
            },
            {
              id: 'bdc-general-6',
              authorId: 'amadou.d',
              date: new Date('2026-09-22T13:20:00'),
              content: 'je peux le mardi 8h-10h',
            },
            {
              id: 'bdc-general-7',
              authorId: 'maxdu29',
              date: new Date('2026-10-07T10:15:00'),
              content: 'la cafét fermée pour inventaire ce matin, ambiance :',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_no_customer.webp',
                  alt: 'Mème : « Customer are not allowed »',
                },
              ],
              reactions: [{ emoji: '😂', count: 19, me: true }],
            },
            {
              id: 'bdc-general-8',
              authorId: 'miminèss',
              date: new Date('2026-10-07T10:20:00'),
              content: "c'est UNE matinée 😭 réouverture à 13h",
            },
            {
              id: 'bdc-general-9',
              authorId: 'miminèss',
              date: new Date('2026-11-05T16:00:00'),
              content:
                "✨ Le thé à la menthe est arrivé à la cafét' ✨ Merci pour vos suggestions !",
              reactions: [
                { emoji: '🍵', count: 14, me: true },
                { emoji: '❤️', count: 6 },
              ],
            },
            {
              id: 'bdc-general-10',
              authorId: 'flamenate',
              date: new Date('2026-11-05T16:10:00'),
              content: 'trop bien, merci 🙏',
            },
          ],
        },
        {
          type: 'text',
          id: 'menu-du-jour',
          name: '🥐・menu-du-jour',
          topic: "Le menu de la cafét', tous les matins",
          messages: [
            {
              id: 'menu-du-jour-1',
              authorId: 'miminèss',
              date: new Date('2026-09-07T08:00:00'),
              content:
                'Menu du lundi 🥐\n- Croissant ou pain au chocolat\n- Sandwich jambon-beurre ou thon-crudités\n- Soupe du jour : potiron\n- Dessert : far breton',
            },
            {
              id: 'menu-du-jour-2',
              authorId: 'miminèss',
              date: new Date('2026-09-10T08:00:00'),
              content:
                'Menu du jeudi 🥞\n- Crêpes beurre-sucre, chocolat ou caramel au beurre salé\n- Galette complète\n- Salade de pâtes',
              reactions: [{ emoji: '🥞', count: 22, me: true }],
            },
            {
              id: 'menu-du-jour-3',
              authorId: 'maxdu29',
              date: new Date('2026-09-10T08:12:00'),
              content:
                "le caramel au beurre salé est obligatoire, c'est la loi en Bretagne",
            },
            {
              id: 'menu-du-jour-4',
              authorId: 'miminèss',
              date: new Date('2026-10-01T08:05:00'),
              content:
                'Menu du jeudi 🍲\n- Crêpes (évidemment)\n- Croque-monsieur\n- Soupe poireaux-pommes de terre\n- Dessert : kouign-amann',
            },
            {
              id: 'menu-du-jour-5',
              authorId: 'julioARG',
              date: new Date('2026-10-01T09:30:00'),
              content: "c'est quoi le kouign-amann ?",
            },
            {
              id: 'menu-du-jour-6',
              authorId: 'maxdu29',
              date: new Date('2026-10-01T09:32:00'),
              content:
                'du beurre, du sucre et un soupçon de pâte. goûte et tu comprendras',
            },
            {
              id: 'menu-du-jour-7',
              authorId: 'miminèss',
              date: new Date('2026-11-16T08:00:00'),
              content:
                'Menu du lundi ❄️\n- Viennoiseries\n- Panini trois fromages\n- Chocolat chaud maison (enfin !)\n- Dessert : crumble aux pommes',
            },
            {
              id: 'menu-du-jour-8',
              authorId: 'jiji09',
              date: new Date('2026-11-16T08:20:00'),
              content:
                "le chocolat chaud est de retour, l'hiver peut commencer",
              reactions: [{ emoji: '☕', count: 8, me: true }],
            },
            {
              id: 'menu-du-jour-9',
              authorId: 'miminèss',
              date: new Date('2026-11-20T08:00:00'),
              content:
                'Menu du vendredi 🐟\n- Sandwich thon-crudités\n- Quiche lorraine\n- Soupe de légumes\n- Dessert : crêpes au caramel au beurre salé',
            },
          ],
        },
        {
          type: 'text',
          id: 'commandes-evenements',
          name: '🧾・commandes-événements',
          topic: 'Commandes groupées pour les événements des bureaux',
          messages: [
            {
              id: 'commandes-evenements-1',
              authorId: 'miminèss',
              date: new Date('2026-09-02T15:00:00'),
              content:
                'Ce salon sert aux commandes groupées des bureaux pour vos événements (viennoiseries, boissons, crêpes...). Merci de passer commande au moins 5 jours avant !',
            },
            {
              id: 'commandes-evenements-2',
              authorId: 'thomasLeTrain',
              date: new Date('2026-09-02T15:20:00'),
              content:
                "Commande pour la soirée d'inté de vendredi :\n- 200 crêpes\n- 20 L de jus de pomme\n- 6 packs d'eau\n- 3 pots de pâte à tartiner",
            },
            {
              id: 'commandes-evenements-3',
              authorId: 'miminèss',
              date: new Date('2026-09-02T15:35:00'),
              content: 'noté ✅ livraison au foyer vendredi 18h',
            },
            {
              id: 'commandes-evenements-4',
              authorId: 'kevin_l',
              date: new Date('2026-10-28T11:00:00'),
              content:
                'Commande pour le hackathon (21-22 novembre) : petit-déj pour 60 personnes samedi et dimanche + café à volonté svp, ça va coder toute la nuit ☕',
            },
            {
              id: 'commandes-evenements-5',
              authorId: 'miminèss',
              date: new Date('2026-10-28T11:20:00'),
              content:
                "café à volonté c'est un défi 😅 on vous prépare 3 thermos qu'on remplit dans la nuit, ça marche ?",
            },
            {
              id: 'commandes-evenements-6',
              authorId: 'kevin_l',
              date: new Date('2026-10-28T11:22:00'),
              content: 'parfait merci !!',
            },
            {
              id: 'commandes-evenements-7',
              authorId: 'mailouuuuu',
              date: new Date('2026-11-10T17:00:00'),
              content:
                "Commande pour le vernissage de l'expo photo (27 novembre) : 80 mini-crêpes, du jus et du thé svp",
            },
            {
              id: 'commandes-evenements-8',
              authorId: 'miminèss',
              date: new Date('2026-11-10T17:15:00'),
              content: 'noté ✅',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-bds',
      name: 'Bureau des Sports',
      channels: [
        {
          type: 'text',
          id: 'bds-general',
          name: '⚽・bds-général',
          topic: 'Bureau des Sports : infos, inscriptions, licences',
          messages: [
            {
              id: 'bds-general-1',
              authorId: 'jean-luc',
              date: new Date('2026-09-03T12:00:00'),
              content:
                'Salut à tous ! Le BdS est là pour vous faire bouger 💪\n\nSports proposés cette année : rugby, foot, basket, volley, badminton, escalade, voile et course à pied. Inscriptions et licence FFSU au stand du BdS toute la semaine.',
              reactions: [{ emoji: '💪', count: 29, me: true }],
            },
            {
              id: 'bds-general-2',
              authorId: 'amadou.d',
              date: new Date('2026-09-03T12:05:00'),
              content:
                "et le foot c'est le mardi soir au synthétique, venez nombreux ⚽",
            },
            {
              id: 'bds-general-3',
              authorId: 'julioARG',
              date: new Date('2026-09-03T12:30:00'),
              content: "foot argentin vs foot breton, j'ai hâte 😏",
            },
            {
              id: 'bds-general-4',
              authorId: 'maxdu29',
              date: new Date('2026-09-03T12:34:00'),
              content: 'ici on joue sous la pluie, avantage Bretagne',
            },
            {
              id: 'bds-general-5',
              authorId: 'flamenate',
              date: new Date('2026-09-04T18:00:00'),
              content:
                "Il faut un certificat médical pour s'inscrire au foot ?",
            },
            {
              id: 'bds-general-6',
              authorId: 'jean-luc',
              date: new Date('2026-09-04T18:12:00'),
              content:
                'un questionnaire de santé suffit pour la licence, sauf pour le rugby où il faut un certificat',
            },
            {
              id: 'bds-general-7',
              authorId: 'amadou.d',
              date: new Date('2026-10-09T20:00:00'),
              content:
                'Les maillots du BdS sont arrivés ! Récupération au local mardi et jeudi midi',
              reactions: [{ emoji: '🔥', count: 18 }],
            },
            {
              id: 'bds-general-8',
              authorId: 'jean-luc',
              date: new Date('2026-11-11T10:00:00'),
              content:
                "Pas d'entraînement aujourd'hui (férié), on reprend demain",
            },
            {
              id: 'bds-general-9',
              authorId: 'fernando',
              date: new Date('2026-11-11T10:30:00'),
              content: 'on va à la plage alors ? 😎',
            },
            {
              id: 'bds-general-10',
              authorId: 'maxdu29',
              date: new Date('2026-11-11T10:31:00'),
              content: 'il fait 9 degrés Fernando',
            },
            {
              id: 'bds-general-11',
              authorId: 'fernando',
              date: new Date('2026-11-11T10:32:00'),
              content: '😭',
            },
          ],
        },
        {
          type: 'text',
          id: 'entrainements',
          name: '🏃・entraînements',
          topic: 'Planning des entraînements',
          messages: [
            {
              id: 'entrainements-1',
              authorId: 'jean-luc',
              date: new Date('2026-09-07T09:00:00'),
              content:
                "Planning de la semaine 📅\n- Lundi 18h : course à pied (départ devant l'école)\n- Mardi 19h : foot (synthétique)\n- Mercredi 18h : badminton (gymnase)\n- Jeudi 18h30 : rugby\n- Vendredi 17h : escalade",
            },
            {
              id: 'entrainements-2',
              authorId: 'flamenate',
              date: new Date('2026-09-08T21:15:00'),
              content:
                "premier foot ce soir, merci pour l'accueil ! par contre le vent ici c'est autre chose",
              reactions: [{ emoji: '😂', count: 12 }],
            },
            {
              id: 'entrainements-3',
              authorId: 'amadou.d',
              date: new Date('2026-09-08T21:20:00'),
              content: "tu t'habitueras. ou pas 😂",
            },
            {
              id: 'entrainements-4',
              authorId: 'jean-luc',
              date: new Date('2026-09-24T18:10:00'),
              content:
                'Rugby annulé ce soir, terrain inondé. On se rattrape samedi.',
            },
            {
              id: 'entrainements-5',
              authorId: 'inesbzh',
              date: new Date('2026-10-12T07:45:00'),
              content:
                'course à pied ce midi vers le Stang-Alar ? je cherche des gens pour faire 8 km tranquille',
            },
            {
              id: 'entrainements-6',
              authorId: 'jiji09',
              date: new Date('2026-10-12T07:50:00'),
              content: 'je viens mais tranquille genre VRAIMENT tranquille',
            },
            {
              id: 'entrainements-7',
              authorId: 'jean-luc',
              date: new Date('2026-11-02T09:00:00'),
              content:
                'Reprise après les vacances 💪 Nouveau créneau de volley le jeudi à 12h15 au gymnase !',
            },
            {
              id: 'entrainements-8',
              authorId: 'amadou.d',
              date: new Date('2026-11-17T22:00:00'),
              content: 'grosse séance ce soir, on est prêts pour le tournoi 🔥',
              reactions: [{ emoji: '🔥', count: 9, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'tournois',
          name: '🏆・tournois',
          topic: 'Compétitions inter-écoles, tournois et résultats',
          messages: [
            {
              id: 'tournois-1',
              authorId: 'jean-luc',
              date: new Date('2026-09-15T12:00:00'),
              content:
                "Le tournoi de rentrée inter-promos a lieu le samedi 26 septembre ! Foot à 5, volley et badminton. Équipes de 5 à 8, inscriptions jusqu'à mercredi.",
            },
            {
              id: 'tournois-2',
              authorId: 'amadou.d',
              date: new Date('2026-09-15T12:30:00'),
              content:
                'équipe foot : moi, Max, Julio, Fernando et Flame. il nous manque un remplaçant',
            },
            {
              id: 'tournois-3',
              authorId: 'pablo',
              date: new Date('2026-09-15T12:45:00'),
              content: 'je suis remplaçant si besoin',
            },
            {
              id: 'tournois-4',
              authorId: 'amadou.d',
              date: new Date('2026-09-26T18:00:00'),
              content:
                'On termine 2e du tournoi de foot 🥈 défaite en finale aux tirs au but, mais quelle journée ! Merci à tous ceux qui sont venus supporter',
              reactions: [
                { emoji: '🥈', count: 24 },
                { emoji: '👏', count: 16, me: true },
              ],
            },
            {
              id: 'tournois-5',
              authorId: 'flamenate',
              date: new Date('2026-09-26T18:20:00'),
              content: 'on reviendra plus forts 💪',
            },
            {
              id: 'tournois-6',
              authorId: 'jean-luc',
              date: new Date('2026-10-05T12:00:00'),
              content:
                "L'équipe de rugby est qualifiée pour la phase régionale du championnat universitaire 🏉",
              reactions: [{ emoji: '🏉', count: 21, me: true }],
            },
            {
              id: 'tournois-7',
              authorId: 'jean-luc',
              date: new Date('2026-11-10T12:00:00'),
              content:
                'Tournoi inter-écoles brestoises le samedi 21 novembre ! On a besoin de supporters 📣',
            },
            {
              id: 'tournois-8',
              authorId: 'amadou.d',
              date: new Date('2026-11-21T19:30:00'),
              content:
                'Résultats du tournoi inter-écoles :\n⚽ Foot : 1ers 🥇\n🏐 Volley : 3es\n🏸 Badminton : 2es\n\nFiers de vous tous ! Les photos arrivent bientôt',
              reactions: [
                { emoji: '🥇', count: 37, me: true },
                { emoji: '🔥', count: 22 },
              ],
            },
            {
              id: 'tournois-9',
              authorId: 'julioARG',
              date: new Date('2026-11-21T19:35:00'),
              content: 'VAMOOOOS 🇦🇷🇫🇷',
            },
            {
              id: 'tournois-10',
              authorId: 'maxdu29',
              date: new Date('2026-11-21T19:40:00'),
              content: "Julio homme du match, c'est pas négociable",
            },
          ],
        },
        { type: 'voice', id: 'vestiaire', name: 'Vestiaire' },
      ],
    },
    {
      id: 'cat-bdi',
      name: "Bureau d'Innovation",
      channels: [
        {
          type: 'text',
          id: 'bdi-general',
          name: '💡・bdi-général',
          topic: "Bureau d'Innovation : projets, hackathons, fablab",
          messages: [
            {
              id: 'bdi-general-1',
              authorId: 'kevin_l',
              date: new Date('2026-09-05T14:00:00'),
              content:
                "Salut à tous 🛠️ Le Bureau d'Innovation, c'est des projets tech, des hackathons, de la robotique et un accès au fablab. Réunion de présentation mardi 18h en amphi B.",
              reactions: [{ emoji: '🛠️', count: 18, me: true }],
            },
            {
              id: 'bdi-general-2',
              authorId: 'flamenate',
              date: new Date('2026-09-05T14:30:00'),
              content:
                "Ça m'intéresse beaucoup ! Il y a des projets plutôt web, ou c'est surtout de l'embarqué ?",
            },
            {
              id: 'bdi-general-3',
              authorId: 'kevin_l',
              date: new Date('2026-09-05T14:35:00'),
              content:
                'un peu des deux ! cette année on a une appli pour la cafét et un robot pour la coupe de robotique. viens mardi 👌',
            },
            {
              id: 'bdi-general-4',
              authorId: 'kerhoas',
              date: new Date('2026-09-21T10:00:00'),
              content:
                "Le fablab est accessible aux membres du BdI le mardi et le jeudi de 17h à 19h, en présence d'un encadrant. Merci de respecter les consignes de sécurité affichées à l'entrée.",
              reactions: [{ emoji: '👍', count: 13 }],
            },
            {
              id: 'bdi-general-5',
              authorId: 'lepevB',
              date: new Date('2026-10-06T09:00:00'),
              content:
                "Un appel à projets étudiants est ouvert jusqu'au 30 octobre pour le financement de matériel. Les dossiers sont à déposer auprès du responsable du fablab.",
            },
            {
              id: 'bdi-general-6',
              authorId: 'mahmoud44',
              date: new Date('2026-10-06T12:15:00'),
              content: 'on dépose un dossier pour le robot ?',
            },
            {
              id: 'bdi-general-7',
              authorId: 'kevin_l',
              date: new Date('2026-10-06T12:20:00'),
              content: "évidemment, je m'en occupe ce week-end",
            },
            {
              id: 'bdi-general-8',
              authorId: 'fabHARR',
              date: new Date('2026-10-22T11:00:00'),
              content:
                "Merci aux équipes qui ont déposé un dossier pour l'appel à projets. Les résultats seront communiqués après les vacances.",
            },
            {
              id: 'bdi-general-9',
              authorId: 'kevin_l',
              date: new Date('2026-11-04T18:00:00'),
              content:
                'Notre dossier pour le robot est accepté 🎉 merci à tous ceux qui ont aidé !',
              reactions: [{ emoji: '🎉', count: 25, me: true }],
            },
            {
              id: 'bdi-general-10',
              authorId: 'bourgeot',
              date: new Date('2026-11-19T10:00:00'),
              content:
                'Bon courage à toutes les équipes qui participent au hackathon ce week-end.',
              reactions: [{ emoji: '🙏', count: 17 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'projets',
          name: '🛠️・projets',
          topic: 'Avancement des projets du BdI',
          messages: [
            {
              id: 'projets-1',
              authorId: 'kevin_l',
              date: new Date('2026-09-15T20:00:00'),
              content:
                "Projets en cours cette année :\n1. Appli de commande pour la cafét' (web)\n2. Robot pour la coupe de robotique\n3. Station météo connectée sur le toit (oui, pour confirmer qu'il pleut)\n\nDites ici sur quoi vous voulez bosser !",
            },
            {
              id: 'projets-2',
              authorId: 'flamenate',
              date: new Date('2026-09-15T20:10:00'),
              content:
                "Je peux aider sur l'appli de la cafét, j'ai déjà pas mal fait de front.",
            },
            {
              id: 'projets-3',
              authorId: 'inesbzh',
              date: new Date('2026-09-15T20:15:00'),
              content: 'station météo pour moi 🌧️',
            },
            {
              id: 'projets-4',
              authorId: 'mahmoud44',
              date: new Date('2026-09-15T20:18:00'),
              content: 'robot !',
            },
            {
              id: 'projets-5',
              authorId: 'yuki.tan',
              date: new Date('2026-09-16T09:00:00'),
              content: "je peux faire le design de l'appli si vous voulez",
            },
            {
              id: 'projets-6',
              authorId: 'kevin_l',
              date: new Date('2026-10-10T23:05:00'),
              content:
                "on galère avec la détection de visages pour la caméra du robot, quelqu'un a déjà touché à OpenCV ?",
            },
            {
              id: 'projets-7',
              authorId: 'flamenate',
              date: new Date('2026-10-10T23:15:00'),
              content:
                "un peu ! ça me rappelle mon tout premier essai de détection d'émotions. il avait trouvé un visage en colère... sur mon drap 😅",
              reactions: [
                { emoji: '😂', count: 24 },
                { emoji: '💀', count: 9 },
              ],
            },
            {
              id: 'projets-8',
              authorId: 'kevin_l',
              date: new Date('2026-10-10T23:18:00'),
              content:
                '😂😂 le drap avait clairement passé une mauvaise journée',
            },
            {
              id: 'projets-9',
              authorId: 'inesbzh',
              date: new Date('2026-10-29T16:00:00'),
              content:
                'La station météo est en ligne ! Record de la semaine : 47 mm de pluie mardi 🌧️',
              reactions: [{ emoji: '🌧️', count: 11, me: true }],
            },
            {
              id: 'projets-10',
              authorId: 'flamenate',
              date: new Date('2026-11-12T19:30:00'),
              content:
                "L'appli de la cafét avance : on peut voir le menu du jour et commander les crêpes du jeudi. Il reste le paiement à brancher.",
              reactions: [
                { emoji: '🥞', count: 14 },
                { emoji: '🔥', count: 10 },
              ],
            },
            {
              id: 'projets-11',
              authorId: 'miminèss',
              date: new Date('2026-11-12T19:45:00'),
              content: "j'ai trop hâte de plus faire la queue 😭",
            },
          ],
        },
        {
          type: 'text',
          id: 'hackathons',
          name: '🧑‍💻・hackathons',
          topic: 'Hackathons, game jams et défis',
          messages: [
            {
              id: 'hackathons-1',
              authorId: 'kevin_l',
              date: new Date('2026-10-12T18:00:00'),
              content:
                "📣 Hackathon de l'ENIB les 21 et 22 novembre !\n\n24h pour développer un projet autour du thème « la mer et le numérique » 🌊 Équipes de 3 à 5. Inscriptions ouvertes jusqu'au 13 novembre.",
              reactions: [
                { emoji: '🌊', count: 26, me: true },
                { emoji: '🔥', count: 15 },
              ],
            },
            {
              id: 'hackathons-2',
              authorId: 'flamenate',
              date: new Date('2026-10-12T18:20:00'),
              content: 'Je cherche une équipe ! plutôt front / web',
            },
            {
              id: 'hackathons-3',
              authorId: 'mahmoud44',
              date: new Date('2026-10-12T18:25:00'),
              content: 'on se met ensemble ? je fais le back',
            },
            {
              id: 'hackathons-4',
              authorId: 'yuki.tan',
              date: new Date('2026-10-12T18:30:00'),
              content: 'moi aussi ! design et un peu de front',
            },
            {
              id: 'hackathons-5',
              authorId: 'inesbzh',
              date: new Date('2026-10-12T18:40:00'),
              content:
                "si vous voulez des données météo marines, j'ai la station 👀",
            },
            {
              id: 'hackathons-6',
              authorId: 'flamenate',
              date: new Date('2026-10-12T18:42:00'),
              content: 'équipe complète alors 🔥',
            },
            {
              id: 'hackathons-7',
              authorId: 'kevin_l',
              date: new Date('2026-11-13T22:00:00'),
              content:
                'Inscriptions closes : 12 équipes, 54 participants 🎉 Rendez-vous samedi 9h dans le hall.',
            },
            {
              id: 'hackathons-8',
              authorId: 'kevin_l',
              date: new Date('2026-11-21T09:05:00'),
              content:
                "C'est parti ! Le hackathon est lancé, bon courage à tous 🚀",
            },
            {
              id: 'hackathons-9',
              authorId: 'jiji09',
              date: new Date('2026-11-22T03:12:00'),
              content:
                'il est 3h, il reste des cerveaux qui fonctionnent quelque part ?',
            },
            {
              id: 'hackathons-10',
              authorId: 'flamenate',
              date: new Date('2026-11-22T03:20:00'),
              content:
                "plus vraiment. mais la carte des marées s'affiche enfin",
              reactions: [{ emoji: '🌊', count: 6 }],
            },
            {
              id: 'hackathons-11',
              authorId: 'kevin_l',
              date: new Date('2026-11-22T08:30:00'),
              content:
                'Plus que 30 min avant le rendu ! Les pitchs commencent à 10h en amphi A ⏰',
            },
            {
              id: 'hackathons-12',
              authorId: 'kevin_l',
              date: new Date('2026-11-22T11:50:00'),
              content:
                'Merci à toutes les équipes, les délibérations sont en cours. Résultats à 14h !',
              reactions: [{ emoji: '🙏', count: 18, me: true }],
            },
          ],
        },
      ],
    },
    {
      id: 'cat-staff',
      name: 'Staff',
      channels: [
        {
          type: 'text',
          id: 'staff',
          name: '🛡️・staff',
          locked: true,
          messages: [
            {
              id: 'staff-1',
              authorId: 'sophieINP',
              date: new Date('2026-09-01T08:00:00'),
              content:
                'Salon réservé au personnel et aux administrateurs du serveur.',
            },
          ],
        },
        {
          type: 'text',
          id: 'administration',
          name: '🏛️・administration',
          locked: true,
          messages: [
            {
              id: 'administration-1',
              authorId: 'sophieINP',
              date: new Date('2026-09-01T08:05:00'),
              content: "Salon réservé à l'administration de l'INP.",
            },
          ],
        },
      ],
    },
  ],
}
