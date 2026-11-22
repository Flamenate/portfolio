import type { Server } from '@/lib/concord/types'

export const enis: Server = {
  id: 'enis',
  name: 'ENIS',
  icon: '/media/concord/enis.webp',
  roles: [
    { id: 'admin', name: 'Admin', color: '#e11d48' },
    { id: 'delegue', name: 'Délégué(e)', color: '#facc15' },
    { id: 'majeurs', name: 'Majeurs de Promo', color: '#a855f7' },
    { id: 'enseignant', name: 'Enseignant', color: '#0ea5e9' },
    { id: 'gi', name: 'GI', color: '#22c55e' },
    { id: 'gc', name: 'GC', color: '#ea580c' },
    { id: 'ge', name: 'GE', color: '#6366f1' },
    { id: 'gm', name: 'GM', color: '#64748b' },
    { id: 'gmat', name: 'GMat', color: '#14b8a6' },
    { id: 'etudiant', name: 'Étudiant', color: '#94a3b8' },
  ],
  members: [
    { userId: 'Direction', roleIds: ['admin'] },
    { userId: 'skandar22', roleIds: ['admin', 'gi', 'etudiant'] },
    { userId: 'flamenate', roleIds: ['majeurs', 'gi', 'etudiant'] },
    { userId: '^zaineb', roleIds: ['delegue', 'gi', 'etudiant'] },
    { userId: '0mohamed', roleIds: ['gi', 'etudiant'] },
    { userId: 'wassim__', roleIds: ['gi', 'etudiant'] },
    { userId: 'eyaaa', roleIds: ['gi', 'etudiant'] },
    { userId: 'doooom', roleIds: ['gi', 'etudiant'] },
    { userId: 'oussema07', roleIds: ['delegue', 'gc', 'etudiant'] },
    { userId: 'farouk__', roleIds: ['gc', 'etudiant'] },
    { userId: 'ahmed', roleIds: ['gc', 'etudiant'] },
    { userId: 'hiba.ch', roleIds: ['majeurs', 'ge', 'etudiant'] },
    { userId: 'amine', roleIds: ['ge', 'etudiant'] },
    { userId: 'rayenx', roleIds: ['ge', 'etudiant'] },
    { userId: 'nour_h', roleIds: ['gm', 'etudiant'] },
    { userId: 'yassineBK', roleIds: ['gm', 'etudiant'] },
    { userId: 'abirLO', roleIds: ['delegue', 'gmat', 'etudiant'] },
    { userId: 'salmaQQ', roleIds: ['gmat', 'etudiant'] },
    { userId: 'tarekfr', roleIds: ['enseignant', 'gi'] },
    { userId: 'jmaielM', roleIds: ['enseignant', 'gi'] },
    { userId: 'sahlaMAS', roleIds: ['enseignant', 'gi'] },
    { userId: 'zalila', roleIds: ['enseignant', 'gi'] },
    { userId: 'adelMAlimi', roleIds: ['enseignant', 'gi'] },
    { userId: 'inesK', roleIds: ['enseignant', 'gi'] },
    { userId: 'mahaCyber', roleIds: ['enseignant', 'gi'] },
    { userId: 'fadouaDR', roleIds: ['enseignant', 'gi'] },
    { userId: 'mehdiABD', roleIds: ['enseignant', 'gi'] },
    { userId: 'prof.nizar', roleIds: ['enseignant', 'gc'] },
    { userId: 'samiGE', roleIds: ['enseignant', 'ge'] },
    { userId: 'walidMeca', roleIds: ['enseignant', 'gm'] },
    { userId: 'rimMat', roleIds: ['enseignant', 'gmat'] },
  ],
  categories: [
    {
      id: 'uncategorized',
      name: null,
      channels: [
        {
          type: 'text',
          id: 'rules',
          name: 'rules',
          restricted: true,
          topic: 'Read before posting.',
          messages: [
            {
              id: 'rules-1',
              authorId: 'skandar22',
              date: new Date('2024-09-10T19:30:00'),
              content:
                'Bienvenue sur le serveur ENIS 👋\n\n1. Respect avant tout. No insults, no harassment, students and teachers alike.\n2. Post in the right channel: course questions go in the department channels, general questions in help-me-out.\n3. No sharing of exam subjects during an exam. Sharing old DS and exam papers for revision is fine.\n4. No spam, no ads, no selling stuff without asking an admin first.\n5. Keep the course channels clean: questions about the course, not complaints.\n6. Pick your department role (GI, GC, GE, GM, GMat) so you see the right channels.\n7. Official announcements are only posted in announcements.\n\nAny problem? DM an admin or a délégué(e). Bon courage à tous 💪',
              reactions: [
                { emoji: '✅', count: 64, me: true },
                { emoji: '👍', count: 21 },
              ],
            },
            {
              id: 'rules-2',
              authorId: 'skandar22',
              date: new Date('2025-09-14T20:05:00'),
              content:
                "Small update for the new year: Study Room 1, Study Room 2 and Pomodoro 🍅 are open 24/7. Please mute yourself if you're not talking, and keep music out of the study rooms 🙏",
              reactions: [{ emoji: '👍', count: 27, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'announcements',
          name: 'announcements',
          restricted: true,
          topic: 'Annonces officielles de la Direction.',
          messages: [
            {
              id: 'announcements-1',
              authorId: 'Direction',
              date: new Date('2024-09-13T10:00:00'),
              content:
                "Chers étudiants,\n\nNous vous souhaitons la bienvenue pour l'année universitaire 2024-2025. Les cours démarrent le lundi 16 septembre selon les emplois du temps publiés par chaque département.\n\nNous souhaitons une excellente année à toutes et à tous.",
              reactions: [
                { emoji: '🎉', count: 48, me: true },
                { emoji: '❤️', count: 15 },
              ],
            },
            {
              id: 'announcements-2',
              authorId: 'Direction',
              date: new Date('2024-10-28T09:30:00'),
              content:
                "Le calendrier des devoirs surveillés du premier semestre est disponible auprès des départements. Merci de vérifier vos salles la veille de chaque épreuve et de vous présenter munis de votre carte d'étudiant.",
            },
            {
              id: 'announcements-3',
              authorId: 'Direction',
              date: new Date('2024-12-20T14:00:00'),
              content:
                "Les vacances d'hiver débuteront le samedi 21 décembre. Les examens de la session principale du premier semestre commenceront le lundi 6 janvier 2025.\n\nBonnes révisions et bonnes fêtes à tous.",
            },
            {
              id: 'announcements-4',
              authorId: 'Direction',
              date: new Date('2025-02-24T11:00:00'),
              content:
                "Le Forum ENIS-Entreprises aura lieu le mercredi 5 mars 2025 dans le hall principal. Plus de trente entreprises seront présentes pour proposer des stages d'été, des PFE et des premiers emplois. Pensez à préparer vos CV.",
              reactions: [
                { emoji: '🔥', count: 33, me: true },
                { emoji: '👔', count: 9 },
              ],
            },
            {
              id: 'announcements-5',
              authorId: 'Direction',
              date: new Date('2025-05-12T10:00:00'),
              content:
                'Les examens de la session principale du second semestre débuteront le lundi 26 mai 2025. Les calendriers détaillés sont affichés dans chaque département.',
            },
            {
              id: 'announcements-6',
              authorId: 'Direction',
              date: new Date('2025-06-23T15:30:00'),
              content:
                'La session de rattrapage se déroulera du 30 juin au 5 juillet 2025. Les listes des étudiants concernés sont disponibles auprès de la scolarité.',
            },
            {
              id: 'announcements-7',
              authorId: 'Direction',
              date: new Date('2025-09-12T10:00:00'),
              content:
                "Chers étudiants,\n\nBienvenue pour l'année universitaire 2025-2026. Les cours démarrent le lundi 15 septembre. Nous souhaitons la bienvenue aux nouveaux étudiants de première année.",
              reactions: [{ emoji: '🎉', count: 52, me: true }],
            },
            {
              id: 'announcements-8',
              authorId: 'Direction',
              date: new Date('2026-06-08T09:00:00'),
              content:
                "Le planning des soutenances de projets de fin d'études est disponible auprès des départements. Nous souhaitons bon courage à tous nos futurs ingénieurs.",
              reactions: [
                { emoji: '🎓', count: 61, me: true },
                { emoji: '💪', count: 17, me: true },
              ],
            },
            {
              id: 'announcements-9',
              authorId: 'Direction',
              date: new Date('2026-09-11T10:00:00'),
              content:
                "Chers étudiants,\n\nBienvenue pour l'année universitaire 2026-2027. Les cours démarrent le lundi 14 septembre 2026. Excellente rentrée à toutes et à tous.",
              reactions: [{ emoji: '🎉', count: 44 }],
            },
            {
              id: 'announcements-10',
              authorId: 'Direction',
              date: new Date('2026-11-16T11:00:00'),
              content:
                'Le calendrier des devoirs surveillés du premier semestre 2026-2027 est disponible auprès des départements. Bon courage à tous.',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-study',
      name: 'Study With Me',
      channels: [
        {
          type: 'text',
          id: 'study-with-me',
          name: 'study-with-me',
          topic: 'Find study buddies. Cameras optional, focus mandatory.',
          messages: [
            {
              id: 'study-with-me-1',
              authorId: 'doooom',
              date: new Date('2024-10-02T21:14:00'),
              content:
                "anyone in Study Room 1 tonight? I need someone to watch me so I don't open YouTube",
            },
            {
              id: 'study-with-me-2',
              authorId: 'eyaaa',
              date: new Date('2024-10-02T21:16:00'),
              content: 'joining in 10, I have a TP report to finish',
            },
            {
              id: 'study-with-me-3',
              authorId: 'doooom',
              date: new Date('2024-10-02T21:17:00'),
              content: 'W',
            },
            {
              id: 'study-with-me-4',
              authorId: '^zaineb',
              date: new Date('2024-11-10T15:02:00'),
              content:
                'Study session tomorrow 9h at the bibliothèque, 2nd floor 📚\nProgramme: algo (arbres) first, then RDM for the GC people who asked.\nBring your own exercises, we correct them together.',
              reactions: [
                { emoji: '📚', count: 9 },
                { emoji: '🙋', count: 6, me: true },
              ],
            },
            {
              id: 'study-with-me-5',
              authorId: 'farouk__',
              date: new Date('2024-11-10T15:20:00'),
              content: 'the GC people thank you 🙏 RDM is destroying us',
            },
            {
              id: 'study-with-me-6',
              authorId: '0mohamed',
              date: new Date('2024-12-29T23:48:00'),
              content:
                'Pomodoro 🍅 is full of people "studying" with cameras off and Spotify on 💀',
              reactions: [{ emoji: '😂', count: 14, me: true }],
            },
            {
              id: 'study-with-me-7',
              authorId: 'skandar22',
              date: new Date('2024-12-29T23:50:00'),
              content: "can confirm, I'm one of them",
            },
            {
              id: 'study-with-me-8',
              authorId: 'flamenate',
              date: new Date('2025-01-03T08:05:00'),
              content:
                'Starting a 50/10 pomodoro in Study Room 2 until noon, OS then réseaux. Anyone is welcome, just stay muted 🎧',
            },
            {
              id: 'study-with-me-9',
              authorId: 'wassim__',
              date: new Date('2025-01-03T08:07:00'),
              content: 'coming',
            },
            {
              id: 'study-with-me-10',
              authorId: 'eyaaa',
              date: new Date('2025-01-03T08:31:00'),
              content: 'joined, the silence is weirdly motivating',
            },
            {
              id: 'study-with-me-11',
              authorId: 'salmaQQ',
              date: new Date('2025-05-20T22:10:00'),
              content:
                'night shift crew where are you 😭 corrosion exam in 2 days',
            },
            {
              id: 'study-with-me-12',
              authorId: 'abirLO',
              date: new Date('2025-05-20T22:13:00'),
              content: 'Study Room 1, come',
            },
            {
              id: 'study-with-me-13',
              authorId: 'doooom',
              date: new Date('2025-05-20T22:16:00'),
              content: 'me at 2am tonight',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_grind.webp',
                  alt: "The one button I won't push: grind off",
                },
              ],
              reactions: [
                { emoji: '💀', count: 11, me: true },
                { emoji: '🔥', count: 4 },
              ],
            },
            {
              id: 'study-with-me-14',
              authorId: 'hiba.ch',
              date: new Date('2026-01-04T10:12:00'),
              content:
                'Library closed today?? anyone knows a calm café near Route de la Soukra with decent wifi?',
            },
            {
              id: 'study-with-me-15',
              authorId: 'yassineBK',
              date: new Date('2026-01-04T10:20:00'),
              content:
                'the one in front of the Faculté des Sciences is calm before 2pm, and the wifi actually works',
            },
            {
              id: 'study-with-me-16',
              authorId: 'rayenx',
              date: new Date('2026-10-19T20:30:00'),
              content:
                "new year, same struggle. who's in for 9h-12h sessions at the bibliothèque every morning this semester?",
            },
            {
              id: 'study-with-me-17',
              authorId: 'amine',
              date: new Date('2026-10-19T20:41:00'),
              content: 'me, starting monday',
            },
            {
              id: 'study-with-me-18',
              authorId: 'nour_h',
              date: new Date('2026-10-19T20:45:00'),
              content: "+1, I'll bring the GM people",
            },
          ],
        },
        { type: 'voice', id: 'study-room-1', name: 'Study Room 1' },
        { type: 'voice', id: 'study-room-2', name: 'Study Room 2' },
        { type: 'voice', id: 'pomodoro', name: 'Pomodoro 🍅' },
      ],
    },
    {
      id: 'cat-help',
      name: 'Help Me Out',
      channels: [
        {
          type: 'text',
          id: 'help-me-out',
          name: 'help-me-out',
          topic:
            'General questions: scolarité, emplois du temps, stages, admin stuff.',
          messages: [
            {
              id: 'help-me-out-1',
              authorId: 'wassim__',
              date: new Date('2024-09-18T11:20:00'),
              content:
                'Salut, where do we get the emploi du temps for GI2? the one on the board is the old one',
            },
            {
              id: 'help-me-out-2',
              authorId: '^zaineb',
              date: new Date('2024-09-18T11:24:00'),
              content:
                "The updated ones are on the department page, I'll also post the GI1 one in gi-général 👍",
            },
            {
              id: 'help-me-out-3',
              authorId: 'ahmed',
              date: new Date('2024-10-07T13:05:00'),
              content:
                'Does anyone know how long the attestation de présence takes? I asked at the scolarité and they said "next week" three weeks ago 😅',
            },
            {
              id: 'help-me-out-4',
              authorId: 'oussema07',
              date: new Date('2024-10-07T13:30:00'),
              content:
                'Usually 48h if you put the request in the morning. Go with your carte étudiant and ask for the receipt',
            },
            {
              id: 'help-me-out-5',
              authorId: 'rayenx',
              date: new Date('2025-01-27T17:40:00'),
              content:
                'Question: if I fail one module in the session principale, do I retake the whole UE in rattrapage or just that module?',
            },
            {
              id: 'help-me-out-6',
              authorId: 'hiba.ch',
              date: new Date('2025-01-27T17:46:00'),
              content:
                "Just the module(s) under 10 inside a UE that isn't validated. Check the règlement des examens, the part about compensation",
            },
            {
              id: 'help-me-out-7',
              authorId: 'hiba.ch',
              date: new Date('2025-01-27T17:47:00'),
              content: "and don't panic, compensation saves a lot of people",
            },
            {
              id: 'help-me-out-8',
              authorId: 'eyaaa',
              date: new Date('2025-03-04T19:22:00'),
              content:
                "who's going to the forum entreprises tomorrow? do we print our CVs in French or English?",
            },
            {
              id: 'help-me-out-9',
              authorId: 'flamenate',
              date: new Date('2025-03-04T19:25:00'),
              content:
                'French by default, but bring a couple in English too, some of the companies work with foreign clients. And keep it to one page',
            },
            {
              id: 'help-me-out-10',
              authorId: 'flamenate',
              date: new Date('2025-03-04T19:26:00'),
              content:
                'also have a link to your GitHub or your projects ready, a lot of the companies ask for it',
            },
            {
              id: 'help-me-out-11',
              authorId: 'eyaaa',
              date: new Date('2025-03-04T19:30:00'),
              content: 'noted, merci!',
              reactions: [{ emoji: '🙏', count: 1, me: true }],
            },
            {
              id: 'help-me-out-12',
              authorId: 'yassineBK',
              date: new Date('2025-06-28T09:15:00'),
              content: 'Is the rattrapage schedule out for GM?',
            },
            {
              id: 'help-me-out-13',
              authorId: 'nour_h',
              date: new Date('2025-06-28T09:40:00'),
              content:
                'Yes, on the department board since yesterday. I posted it in gm-général',
            },
            {
              id: 'help-me-out-14',
              authorId: 'abirLO',
              date: new Date('2026-02-10T14:00:00'),
              content:
                "Did anyone do their stage d'été in a research lab instead of a company? Is it accepted for GMat?",
            },
            {
              id: 'help-me-out-15',
              authorId: 'salmaQQ',
              date: new Date('2026-02-10T14:12:00'),
              content:
                'Yes, I did mine in a lab here at the ENIS. You just need the convention signed by the department like for a company',
            },
            {
              id: 'help-me-out-16',
              authorId: '0mohamed',
              date: new Date('2026-11-03T12:30:00'),
              content:
                'Anyone knows if the bibliothèque is open on saturdays this year?',
            },
            {
              id: 'help-me-out-17',
              authorId: '^zaineb',
              date: new Date('2026-11-03T12:44:00'),
              content: '8h-13h on saturdays, closed on sundays',
            },
          ],
        },
        {
          type: 'text',
          id: 'maths-help',
          name: 'maths-help',
          topic: 'Analyse, algèbre, probabilités, analyse numérique.',
          messages: [
            {
              id: 'maths-help-1',
              authorId: 'doooom',
              date: new Date('2024-10-14T22:05:00'),
              content:
                'can someone explain why Σ 1/n diverges but Σ 1/n² converges? like intuitively, not with the integral test',
            },
            {
              id: 'maths-help-2',
              authorId: 'flamenate',
              date: new Date('2024-10-14T22:11:00'),
              content:
                'Intuitively: group the terms of Σ 1/n in blocks: 1/2, then 1/3 + 1/4, then 1/5 to 1/8, and so on. Each block is ≥ 1/2 and there are infinitely many blocks, so the sum goes to infinity.\nDo the same with 1/n² and the blocks shrink like 1/2^k, so they add up to something finite.',
              reactions: [
                { emoji: '🧠', count: 5 },
                { emoji: '🙏', count: 2 },
              ],
            },
            {
              id: 'maths-help-3',
              authorId: 'doooom',
              date: new Date('2024-10-14T22:13:00'),
              content: "ok that's actually clean, thanks",
            },
            {
              id: 'maths-help-4',
              authorId: 'salmaQQ',
              date: new Date('2024-11-26T18:30:00'),
              content:
                'Proba question: for the DS do we need the proof of the central limit theorem or just how to use it?',
            },
            {
              id: 'maths-help-5',
              authorId: 'hiba.ch',
              date: new Date('2024-11-26T18:42:00'),
              content:
                "Just how to use it. Last year's DS was all application: normal approximation of a binomial + a confidence interval",
            },
            {
              id: 'maths-help-6',
              authorId: 'amine',
              date: new Date('2025-01-08T23:59:00'),
              content:
                "Analyse numérique exam tomorrow and I still don't get when Newton's method diverges 😭",
            },
            {
              id: 'maths-help-7',
              authorId: 'wassim__',
              date: new Date('2025-01-09T00:06:00'),
              content:
                "When f'(x) is close to 0 near your iterate, the tangent sends you very far away. Also when x0 is far from the root.\nDraw the curve first and pick x0 close to the root, that's what they expect",
            },
            {
              id: 'maths-help-8',
              authorId: 'amine',
              date: new Date('2025-01-09T00:08:00'),
              content: 'bless you',
            },
            {
              id: 'maths-help-9',
              authorId: 'doooom',
              date: new Date('2025-01-09T00:15:00'),
              content: 'me reading the convergence conditions at midnight',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_think.webp',
                  alt: "Think twice? I don't even think once",
                },
              ],
              reactions: [{ emoji: '😂', count: 9, me: true }],
            },
            {
              id: 'maths-help-10',
              authorId: 'oussema07',
              date: new Date('2025-11-20T16:15:00'),
              content:
                "Anyone has the corrigé of the 2023 analyse numérique exam? the one with Simpson's method",
            },
            {
              id: 'maths-help-11',
              authorId: 'ahmed',
              date: new Date('2025-11-20T16:40:00'),
              content: 'I have a photo of it, sending it in DM',
            },
            {
              id: 'maths-help-12',
              authorId: 'rayenx',
              date: new Date('2026-10-28T21:00:00'),
              content: 'Laplace transform tables allowed in the DS or not?',
            },
            {
              id: 'maths-help-13',
              authorId: 'amine',
              date: new Date('2026-10-28T21:10:00'),
              content: 'Not allowed last year, learn the 10 basic ones',
            },
            {
              id: 'maths-help-14',
              authorId: 'rayenx',
              date: new Date('2026-10-28T21:11:00'),
              content: 'pain',
            },
          ],
        },
        {
          type: 'text',
          id: 'code-help',
          name: 'code-help',
          topic: 'Stuck on a bug? Paste the error, not a photo of your screen.',
          messages: [
            {
              id: 'code-help-1',
              authorId: 'salmaQQ',
              date: new Date('2024-10-21T20:12:00'),
              content:
                "Hi, GMat here, we have a Python TP. My plot shows nothing and there's no error. I do plt.plot(x, y) and then nothing",
            },
            {
              id: 'code-help-2',
              authorId: '0mohamed',
              date: new Date('2024-10-21T20:15:00'),
              content: 'plt.show() at the end?',
            },
            {
              id: 'code-help-3',
              authorId: 'salmaQQ',
              date: new Date('2024-10-21T20:16:00'),
              content: '...thank you 🤦‍♀️',
              reactions: [{ emoji: '😂', count: 7, me: true }],
            },
            {
              id: 'code-help-4',
              authorId: 'nour_h',
              date: new Date('2024-12-02T23:30:00'),
              content:
                'Matlab: "Index exceeds the number of array elements". my loop goes from 0 to n',
            },
            {
              id: 'code-help-5',
              authorId: 'skandar22',
              date: new Date('2024-12-02T23:31:00'),
              content: 'Matlab starts at 1 😭 for i = 1:n',
            },
            {
              id: 'code-help-6',
              authorId: 'eyaaa',
              date: new Date('2025-02-17T16:44:00'),
              content:
                'Flutter question: my ListView inside a Column throws "Vertical viewport was given unbounded height". any idea?',
            },
            {
              id: 'code-help-7',
              authorId: 'flamenate',
              date: new Date('2025-02-17T16:52:00'),
              content:
                "Wrap the ListView in an Expanded (or give it a fixed height). A Column doesn't constrain its children's height, so the ListView has no idea how tall it should be.\nFor a short list, shrinkWrap: true also works, but avoid it for long lists",
            },
            {
              id: 'code-help-8',
              authorId: 'eyaaa',
              date: new Date('2025-02-17T16:55:00'),
              content: 'Expanded fixed it, thank youuu',
              reactions: [{ emoji: '🎉', count: 3 }],
            },
            {
              id: 'code-help-9',
              authorId: 'doooom',
              date: new Date('2025-04-09T01:12:00'),
              content:
                "Segmentation fault (core dumped)\n\nthat's it, that's the whole message. C, linked list, TP structures de données",
            },
            {
              id: 'code-help-10',
              authorId: 'wassim__',
              date: new Date('2025-04-09T01:20:00'),
              content:
                "you're probably doing ->next on a NULL pointer. run it with valgrind or gdb, it gives you the exact line",
            },
            {
              id: 'code-help-11',
              authorId: 'wassim__',
              date: new Date('2025-04-09T01:21:00'),
              content: 'gcc -g main.c && valgrind ./a.out',
            },
            {
              id: 'code-help-12',
              authorId: 'doooom',
              date: new Date('2025-04-09T01:34:00'),
              content:
                "it was a free() before the last access. I'm going to sleep",
              reactions: [{ emoji: '🫡', count: 4 }],
            },
            {
              id: 'code-help-13',
              authorId: 'amine',
              date: new Date('2026-10-14T18:20:00'),
              content:
                'Arduino: the serial monitor prints garbage characters, any idea?',
            },
            {
              id: 'code-help-14',
              authorId: 'hiba.ch',
              date: new Date('2026-10-14T18:24:00'),
              content:
                'baud rate mismatch, check that Serial.begin(9600) matches the monitor setting',
            },
            {
              id: 'code-help-15',
              authorId: 'amine',
              date: new Date('2026-10-14T18:25:00'),
              content: 'it was 115200 in the code 🙃 merci',
            },
          ],
        },
        { type: 'voice', id: 'help-desk', name: 'Help Desk' },
      ],
    },
    {
      id: 'cat-gi',
      name: 'Génie Informatique',
      channels: [
        {
          type: 'text',
          id: 'gi-general',
          name: 'gi-général',
          topic:
            'Département Génie Informatique : infos, emplois du temps, PFA et PFE.',
          messages: [
            {
              id: 'gi-general-1',
              authorId: 'tarekfr',
              date: new Date('2024-09-17T09:00:00'),
              content:
                'Bonjour à tous et bienvenue au département Génie Informatique. Les emplois du temps des trois niveaux sont affichés au département et disponibles sur la plateforme. Bonne rentrée.',
              reactions: [{ emoji: '👋', count: 38, me: true }],
            },
            {
              id: 'gi-general-2',
              authorId: '^zaineb',
              date: new Date('2024-09-17T09:40:00'),
              content:
                'For GI1: the emploi du temps dated 16/09 is the right one, ignore the old version on the board 👍',
            },
            {
              id: 'gi-general-3',
              authorId: 'tarekfr',
              date: new Date('2024-10-15T11:30:00'),
              content:
                'Rappel aux étudiants de 2ème année : la liste des sujets de PFA sera publiée le 25 octobre. Le choix se fera en binôme, par ordre de mérite.',
            },
            {
              id: 'gi-general-4',
              authorId: 'skandar22',
              date: new Date('2024-10-25T18:10:00'),
              content:
                'PFA subjects are out. 34 subjects for the 2ème année, choice by rank, deadline Monday',
            },
            {
              id: 'gi-general-5',
              authorId: '0mohamed',
              date: new Date('2024-10-25T18:31:00'),
              content:
                'the smart parking subject is already gone 💀 people are fast',
            },
            {
              id: 'gi-general-6',
              authorId: 'wassim__',
              date: new Date('2024-10-25T18:33:00'),
              content: "majors pick first, that's the law of nature",
              reactions: [{ emoji: '😂', count: 11 }],
            },
            {
              id: 'gi-general-7',
              authorId: 'tarekfr',
              date: new Date('2025-05-15T10:00:00'),
              content:
                'Les soutenances de PFA (2ème année) se dérouleront du 19 au 23 mai. Le planning des jurys est affiché au département.',
            },
            {
              id: 'gi-general-8',
              authorId: 'wassim__',
              date: new Date('2025-05-22T16:30:00'),
              content: 'PFA done ✅ the jury was super chill',
            },
            {
              id: 'gi-general-9',
              authorId: '0mohamed',
              date: new Date('2025-05-22T16:34:00'),
              content:
                'Same, done this morning. The demo actually worked live for once 😅',
              reactions: [{ emoji: '🎉', count: 9 }],
            },
            {
              id: 'gi-general-10',
              authorId: 'tarekfr',
              date: new Date('2025-11-03T11:00:00'),
              content:
                'Les étudiants de 3ème année sont invités à déposer leur fiche de proposition de PFE avant le 15 décembre. Les encadrants académiques seront affectés en janvier.',
            },
            {
              id: 'gi-general-11',
              authorId: 'skandar22',
              date: new Date('2026-02-02T08:45:00'),
              content:
                'First week of PFE for most of us GI3. Small tip: fill in your logbook every day from day one, rewriting 4 months of it in June is not fun',
              reactions: [
                { emoji: '💯', count: 14, me: true },
                { emoji: '🙏', count: 6 },
              ],
            },
            {
              id: 'gi-general-12',
              authorId: 'tarekfr',
              date: new Date('2026-05-11T10:00:00'),
              content:
                'Les soutenances de PFA (2ème année) se dérouleront du 18 au 22 mai. Le planning des jurys est affiché au département.',
            },
            {
              id: 'gi-general-13',
              authorId: 'flamenate',
              date: new Date('2026-05-20T16:10:00'),
              content: 'PFA done ✅ The demo actually worked live for once 😅',
              reactions: [
                { emoji: '🎉', count: 14 },
                { emoji: '🔥', count: 5 },
              ],
            },
            {
              id: 'gi-general-14',
              authorId: 'tarekfr',
              date: new Date('2026-07-03T17:00:00'),
              content:
                "Félicitations à tous les étudiants de 3ème année qui ont soutenu leur projet de fin d'études. Le département vous souhaite une excellente continuation dans votre carrière d'ingénieur.",
              reactions: [
                { emoji: '🎓', count: 41, me: true },
                { emoji: '❤️', count: 22, me: true },
              ],
            },
            {
              id: 'gi-general-15',
              authorId: 'flamenate',
              date: new Date('2026-08-25T20:00:00'),
              content:
                "Probably my last message here for a while: I'm leaving for the double degree at the ENIB in Brest next month. Thanks for two great years, GI 🙏\nGood luck to the new GI3 with the PFE, you've got this",
              reactions: [
                { emoji: '❤️', count: 37 },
                { emoji: '🇫🇷', count: 12 },
                { emoji: '🥲', count: 8 },
              ],
            },
            {
              id: 'gi-general-16',
              authorId: 'doooom',
              date: new Date('2026-08-25T20:09:00'),
              content:
                "who's going to answer the code-help questions now 😭 good luck bro, send pictures of the Breton rain",
            },
            {
              id: 'gi-general-17',
              authorId: 'tarekfr',
              date: new Date('2026-09-15T09:00:00'),
              content:
                'Bonne rentrée 2026-2027. Les emplois du temps sont disponibles sur la plateforme.',
            },
            {
              id: 'gi-general-18',
              authorId: 'eyaaa',
              date: new Date('2026-09-15T10:10:00'),
              content: 'GI3 already 😳 PFE year, here we go',
            },
            {
              id: 'gi-general-19',
              authorId: 'doooom',
              date: new Date('2026-10-26T14:20:00'),
              content:
                'Anyone knows if we can do the PFE abroad this year? asking for a friend (me)',
            },
            {
              id: 'gi-general-20',
              authorId: '^zaineb',
              date: new Date('2026-10-26T14:35:00'),
              content:
                'Yes, with a convention + an encadrant on the ENIS side. Ask at the department before December',
            },
          ],
        },
        {
          type: 'text',
          id: 'algorithmique',
          name: 'algorithmique',
          topic: 'Complexité, tri, arbres, graphes, programmation dynamique.',
          messages: [
            {
              id: 'algorithmique-1',
              authorId: 'jmaielM',
              date: new Date('2024-09-24T10:00:00'),
              content:
                'Bonjour, la série de TD n°1 (complexité et récursivité) est disponible sur la plateforme. Merci de préparer les exercices 1 à 4 pour la séance de jeudi.',
            },
            {
              id: 'algorithmique-2',
              authorId: 'doooom',
              date: new Date('2024-09-24T21:30:00'),
              content:
                'exercise 3: is T(n) = 2T(n/2) + n log n covered by the master theorem? I get a weird case',
            },
            {
              id: 'algorithmique-3',
              authorId: 'flamenate',
              date: new Date('2024-09-24T21:42:00'),
              content:
                "It's the annoying one. n log n vs n^(log2 2) = n: it's bigger, but not polynomially bigger, so the basic master theorem doesn't apply.\nWith the extended version you get Θ(n log² n). You can check it with a recursion tree too: log n levels, each one costs about n log n",
            },
            {
              id: 'algorithmique-4',
              authorId: 'doooom',
              date: new Date('2024-09-24T21:44:00'),
              content: 'Θ(n log² n)... I had n log n 😭 thanks',
              reactions: [{ emoji: '🧠', count: 4 }],
            },
            {
              id: 'algorithmique-5',
              authorId: 'jmaielM',
              date: new Date('2024-11-12T14:00:00'),
              content:
                'Le DS aura lieu le mardi 19 novembre à 8h30. Programme : complexité, algorithmes de tri, arbres binaires de recherche. Documents non autorisés.',
            },
            {
              id: 'algorithmique-6',
              authorId: 'eyaaa',
              date: new Date('2024-11-18T23:15:00'),
              content: 'is AVL in the DS or only basic BST?',
            },
            {
              id: 'algorithmique-7',
              authorId: '^zaineb',
              date: new Date('2024-11-18T23:17:00'),
              content: 'only BST, AVL comes after the DS',
            },
            {
              id: 'algorithmique-8',
              authorId: 'doooom',
              date: new Date('2024-11-19T11:10:00'),
              content:
                'that BST deletion question 💀 I deleted my soul with it',
              reactions: [{ emoji: '💀', count: 8, me: true }],
            },
            {
              id: 'algorithmique-9',
              authorId: 'jmaielM',
              date: new Date('2025-03-04T14:00:00'),
              content:
                'Le TP noté sur les graphes (parcours en largeur et en profondeur, Dijkstra) aura lieu la semaine prochaine. Implémentation en C ou en Python au choix.',
            },
            {
              id: 'algorithmique-10',
              authorId: 'doooom',
              date: new Date('2025-03-10T20:10:00'),
              content:
                'Dijkstra with a priority queue in C... do we have to code the heap ourselves?',
            },
            {
              id: 'algorithmique-11',
              authorId: '^zaineb',
              date: new Date('2025-03-10T20:20:00'),
              content:
                "yes in C. reuse the one from the TP sur les tas, it's like 40 lines",
            },
            {
              id: 'algorithmique-12',
              authorId: 'jmaielM',
              date: new Date('2025-12-08T09:00:00'),
              content:
                'Une séance de révision sur la programmation dynamique est prévue jeudi à 14h en amphi B. La présence est libre.',
            },
            {
              id: 'algorithmique-13',
              authorId: 'eyaaa',
              date: new Date('2025-12-08T17:45:00'),
              content: 'will be there 🙏 the knapsack problem still haunts me',
            },
            {
              id: 'algorithmique-14',
              authorId: 'jmaielM',
              date: new Date('2026-11-10T10:00:00'),
              content:
                'Les corrigés des séries 1 à 3 sont disponibles sur la plateforme.',
            },
          ],
        },
        {
          type: 'text',
          id: 'reseaux',
          name: 'réseaux',
          topic: 'Modèle OSI, TCP/IP, adressage, routage, TP Packet Tracer.',
          messages: [
            {
              id: 'reseaux-1',
              authorId: 'sahlaMAS',
              date: new Date('2024-10-01T09:15:00'),
              content:
                "Bonjour, les TP de réseaux se feront sur Cisco Packet Tracer. Merci de l'installer avant la séance de la semaine prochaine (lien sur la plateforme).",
            },
            {
              id: 'reseaux-2',
              authorId: 'skandar22',
              date: new Date('2024-10-01T18:50:00'),
              content:
                "Packet Tracer needs a Netacad account now, create it before the TP or you'll lose 20 minutes",
            },
            {
              id: 'reseaux-3',
              authorId: '0mohamed',
              date: new Date('2024-10-22T22:03:00'),
              content:
                'subnetting: 192.168.10.0/26, how many usable hosts per subnet? I got 64',
            },
            {
              id: 'reseaux-4',
              authorId: 'wassim__',
              date: new Date('2024-10-22T22:06:00'),
              content:
                '62. 64 addresses minus the network and broadcast addresses',
            },
            {
              id: 'reseaux-5',
              authorId: '0mohamed',
              date: new Date('2024-10-22T22:06:00'),
              content: 'ahhh right',
            },
            {
              id: 'reseaux-6',
              authorId: 'sahlaMAS',
              date: new Date('2024-11-05T11:00:00'),
              content:
                'Rappel : le compte-rendu du TP2 (VLAN et routage inter-VLAN) est à rendre avant dimanche 23h59 sur la plateforme. Format PDF uniquement.',
            },
            {
              id: 'reseaux-7',
              authorId: 'skandar22',
              date: new Date('2024-11-10T21:40:00'),
              content:
                'Packet Tracer crashed and I lost my whole topology 2 hours before the deadline. save often kids',
              reactions: [{ emoji: '😭', count: 6 }],
            },
            {
              id: 'reseaux-8',
              authorId: 'flamenate',
              date: new Date('2024-11-10T21:45:00'),
              content:
                'Ctrl+S every 5 minutes is the only protocol that really matters',
              reactions: [{ emoji: '😂', count: 10 }],
            },
            {
              id: 'reseaux-9',
              authorId: 'sahlaMAS',
              date: new Date('2025-10-07T10:30:00'),
              content:
                'Les étudiants absents au TP3 peuvent le rattraper jeudi à 14h en salle de TP réseaux.',
            },
            {
              id: 'reseaux-10',
              authorId: 'doooom',
              date: new Date('2025-10-09T13:58:00'),
              content:
                'is the rattrapage TP3 still on today? the salle is locked',
            },
            {
              id: 'reseaux-11',
              authorId: '^zaineb',
              date: new Date('2025-10-09T14:03:00'),
              content: 'Yes, it moved to the room next door today',
            },
            {
              id: 'reseaux-12',
              authorId: 'sahlaMAS',
              date: new Date('2026-10-20T09:00:00'),
              content:
                'Les énoncés de TD sur le routage dynamique (RIP, OSPF) sont disponibles sur la plateforme.',
            },
          ],
        },
        {
          type: 'text',
          id: 'systemes-embarques',
          name: 'systèmes-embarqués',
          topic: 'Microcontrôleurs, STM32, RTOS, TP sur cartes.',
          messages: [
            {
              id: 'systemes-embarques-1',
              authorId: 'zalila',
              date: new Date('2025-02-11T10:00:00'),
              content:
                "Bonjour, les TP de systèmes embarqués se feront sur des cartes STM32 Nucleo. Les cartes sont à récupérer au laboratoire contre la carte d'étudiant et à rendre à la fin du semestre.",
            },
            {
              id: 'systemes-embarques-2',
              authorId: '0mohamed',
              date: new Date('2025-02-11T19:30:00'),
              content:
                "STM32CubeIDE is 6 GB 😐 install it at home before the TP, the lab wifi won't make it",
            },
            {
              id: 'systemes-embarques-3',
              authorId: 'wassim__',
              date: new Date('2025-02-25T22:10:00'),
              content:
                "my LED blinks but way too slow. I set up the timer prescaler for 1 s and it's exactly 4 times slower",
            },
            {
              id: 'systemes-embarques-4',
              authorId: 'flamenate',
              date: new Date('2025-02-25T22:18:00'),
              content:
                "Check the clock config in CubeMX. The default HSI is 16 MHz, so if you computed the prescaler for 64 MHz you're off by exactly 4.\nTimer clock = APB clock (x2 if the APB prescaler isn't 1)",
            },
            {
              id: 'systemes-embarques-5',
              authorId: 'wassim__',
              date: new Date('2025-02-25T22:25:00'),
              content: "64 / 16 = 4. it's exactly that. legend",
              reactions: [{ emoji: '🔥', count: 5 }],
            },
            {
              id: 'systemes-embarques-6',
              authorId: 'zalila',
              date: new Date('2025-03-18T10:00:00'),
              content:
                'Le mini-projet (FreeRTOS, au moins trois tâches communiquant par files de messages) sera présenté la semaine du 21 avril. Groupes de trois au maximum.',
            },
            {
              id: 'systemes-embarques-7',
              authorId: 'skandar22',
              date: new Date('2025-04-22T16:40:00'),
              content:
                'mini projet presented ✅ our smart greenhouse survived the demo 🌱',
              reactions: [{ emoji: '🎉', count: 8, me: true }],
            },
            {
              id: 'systemes-embarques-8',
              authorId: '0mohamed',
              date: new Date('2025-04-22T16:52:00'),
              content:
                'ours had a race condition live during the demo 💀 at least we could explain where it came from',
            },
            {
              id: 'systemes-embarques-9',
              authorId: 'zalila',
              date: new Date('2025-06-10T09:00:00'),
              content:
                'Rappel : les cartes STM32 sont à rendre au laboratoire avant le 20 juin.',
            },
            {
              id: 'systemes-embarques-10',
              authorId: 'zalila',
              date: new Date('2026-02-10T09:00:00'),
              content:
                'Bonjour à la nouvelle promo, les cartes Nucleo seront distribuées lors de la première séance de TP.',
            },
            {
              id: 'systemes-embarques-11',
              authorId: 'eyaaa',
              date: new Date('2026-02-10T18:00:00'),
              content:
                'is it worth buying my own Nucleo board to practice at home? or is the lab enough',
            },
            {
              id: 'systemes-embarques-12',
              authorId: 'doooom',
              date: new Date('2026-02-10T18:09:00'),
              content:
                'lab is enough for the TPs, but if you want to do the mini projet properly having one at home helps a lot',
            },
          ],
        },
        {
          type: 'text',
          id: 'intelligence-artificielle',
          name: 'intelligence-artificielle',
          topic: 'Machine learning, deep learning, vision par ordinateur.',
          messages: [
            {
              id: 'intelligence-artificielle-1',
              authorId: 'adelMAlimi',
              date: new Date('2025-09-23T09:30:00'),
              content:
                "Bonjour, le cours d'intelligence artificielle couvrira cette année : apprentissage supervisé, réseaux de neurones, CNN et une introduction aux transformers. Les TP se feront en Python (scikit-learn, PyTorch) sur Google Colab.",
            },
            {
              id: 'intelligence-artificielle-2',
              authorId: 'eyaaa',
              date: new Date('2025-09-23T12:10:00'),
              content: 'Colab free GPU gang 🙏',
            },
            {
              id: 'intelligence-artificielle-3',
              authorId: 'doooom',
              date: new Date('2025-10-14T23:02:00'),
              content:
                'my model has 99% accuracy on train and 51% on test. am I a genius?',
            },
            {
              id: 'intelligence-artificielle-4',
              authorId: '^zaineb',
              date: new Date('2025-10-14T23:05:00'),
              content: "you're an overfitting genius",
              reactions: [{ emoji: '😂', count: 7, me: true }],
            },
            {
              id: 'intelligence-artificielle-5',
              authorId: 'flamenate',
              date: new Date('2025-10-14T23:09:00'),
              content:
                "Add dropout, augment the data, and check you're not leaking test images into train.\nAlso 51% on 2 classes is a coin flip, look at the confusion matrix before anything else",
            },
            {
              id: 'intelligence-artificielle-6',
              authorId: 'doooom',
              date: new Date('2025-10-14T23:10:00'),
              content:
                "...my test set was a subset of train with renamed files. I'm going to bed",
            },
            {
              id: 'intelligence-artificielle-7',
              authorId: 'flamenate',
              date: new Date('2025-11-04T18:22:00'),
              content:
                "Got real-time emotion detection running on my webcam for the TP. Same as my first try last year: it's still very confident my pillow is angry",
              reactions: [
                { emoji: '😂', count: 23 },
                { emoji: '💀', count: 9 },
              ],
            },
            {
              id: 'intelligence-artificielle-8',
              authorId: 'doooom',
              date: new Date('2025-11-04T18:30:00'),
              content: 'the pillow has been through a lot this semester',
            },
            {
              id: 'intelligence-artificielle-9',
              authorId: 'adelMAlimi',
              date: new Date('2025-11-05T10:00:00'),
              content:
                "Pour le TP de vision, pensez à ajuster le seuil de confiance et la taille minimale des détections. Le mini-projet sera évalué sur la démarche et l'analyse des erreurs, pas uniquement sur la précision.",
            },
            {
              id: 'intelligence-artificielle-10',
              authorId: 'adelMAlimi',
              date: new Date('2025-12-01T09:00:00'),
              content:
                'Les soutenances des mini-projets auront lieu les 16 et 17 décembre. Le planning sera publié sur la plateforme.',
            },
            {
              id: 'intelligence-artificielle-11',
              authorId: 'adelMAlimi',
              date: new Date('2026-10-06T09:30:00'),
              content:
                'Bonjour à la nouvelle promo. Les supports du cours et le premier TP (régression linéaire) sont disponibles sur la plateforme.',
            },
            {
              id: 'intelligence-artificielle-12',
              authorId: 'doooom',
              date: new Date('2026-10-06T21:00:00'),
              content:
                "advice from last year's promo: do every TP yourself, the mini-projet reuses all of them",
            },
            {
              id: 'intelligence-artificielle-13',
              authorId: 'eyaaa',
              date: new Date('2026-10-06T21:04:00'),
              content:
                "and if your webcam says your pillow is angry, that's normal. it happened to someone in our promo",
              reactions: [{ emoji: '😂', count: 7 }],
            },
          ],
        },
        {
          type: 'text',
          id: '5g-6g',
          name: '5g-6g',
          topic: 'Réseaux mobiles 5G & 6G : architecture, NR, slicing.',
          messages: [
            {
              id: '5g-6g-1',
              authorId: 'inesK',
              date: new Date('2025-10-02T10:00:00'),
              content:
                "Bonjour, le module 5G & 6G commence cette semaine. Les supports sont sur la plateforme. Références principales : les spécifications 3GPP (Releases 15 à 18) et l'ouvrage de Dahlman et al.",
            },
            {
              id: '5g-6g-2',
              authorId: 'skandar22',
              date: new Date('2025-10-02T20:15:00'),
              content: 'each 3GPP spec is like 300 pages 😶',
            },
            {
              id: '5g-6g-3',
              authorId: 'wassim__',
              date: new Date('2025-10-02T20:20:00'),
              content:
                'stick to the slides and the summaries, nobody reads the full specs',
            },
            {
              id: '5g-6g-4',
              authorId: '0mohamed',
              date: new Date('2025-10-29T22:40:00'),
              content: 'Can someone explain network slicing in one sentence',
            },
            {
              id: '5g-6g-5',
              authorId: 'wassim__',
              date: new Date('2025-10-29T22:47:00'),
              content:
                'One physical network, several virtual end-to-end networks on top of it, each tuned for one use case: eMBB for throughput, URLLC for low latency, mMTC for huge numbers of IoT devices',
            },
            {
              id: '5g-6g-6',
              authorId: '0mohamed',
              date: new Date('2025-10-29T22:48:00'),
              content: 'saved in my notes, merci',
            },
            {
              id: '5g-6g-7',
              authorId: 'inesK',
              date: new Date('2025-11-18T10:00:00'),
              content:
                "L'exposé sur les cas d'usage de la 6G se fera par groupes de quatre. Sujets au choix : communications THz, IA native, réseaux non terrestres, jumeaux numériques. Merci d'envoyer la composition de vos groupes avant vendredi.",
            },
            {
              id: '5g-6g-8',
              authorId: 'skandar22',
              date: new Date('2025-11-19T12:30:00'),
              content:
                "who's still without a group? we need one more person for the THz subject",
            },
            {
              id: '5g-6g-9',
              authorId: 'wassim__',
              date: new Date('2025-11-19T12:41:00'),
              content: 'me',
            },
            {
              id: '5g-6g-10',
              authorId: 'inesK',
              date: new Date('2026-10-08T10:00:00'),
              content:
                'Bonjour, les supports du module 5G & 6G ont été mis à jour pour cette année.',
            },
          ],
        },
        {
          type: 'text',
          id: 'cybersecurite',
          name: 'cybersécurité',
          topic: "Cryptographie, sécurité réseau, tests d'intrusion, CTF.",
          messages: [
            {
              id: 'cybersecurite-1',
              authorId: 'mahaCyber',
              date: new Date('2025-02-04T09:00:00'),
              content:
                "Bonjour, les TP de cybersécurité se feront sur des machines virtuelles Kali Linux. Merci d'installer VirtualBox et l'image Kali avant la séance.\n\nRappel important : les outils vus en TP s'utilisent uniquement sur les environnements de TP.",
            },
            {
              id: 'cybersecurite-2',
              authorId: '0mohamed',
              date: new Date('2025-02-04T21:00:00'),
              content: 'Kali image downloaded, 4 GB of pure hacker energy',
            },
            {
              id: 'cybersecurite-3',
              authorId: 'skandar22',
              date: new Date('2025-02-20T22:30:00'),
              content:
                'TP3 hash cracking: john is taking forever on the third hash, are we supposed to bruteforce it?',
            },
            {
              id: 'cybersecurite-4',
              authorId: 'wassim__',
              date: new Date('2025-02-20T22:38:00'),
              content:
                "use the rockyou wordlist, it's in /usr/share/wordlists, you have to gunzip it first",
            },
            {
              id: 'cybersecurite-5',
              authorId: 'mahaCyber',
              date: new Date('2025-03-07T10:00:00'),
              content:
                'Un CTF interne est organisé le samedi 15 mars de 9h à 17h, ouvert à tous les étudiants GI. Équipes de trois. Inscriptions auprès de la délégation.',
            },
            {
              id: 'cybersecurite-6',
              authorId: '0mohamed',
              date: new Date('2025-03-15T17:20:00'),
              content: '3rd place in the CTF 🥉 the web challenges were 🔥',
              reactions: [
                { emoji: '🔥', count: 15, me: true },
                { emoji: '🥉', count: 6 },
              ],
            },
            {
              id: 'cybersecurite-7',
              authorId: 'flamenate',
              date: new Date('2025-03-15T17:25:00'),
              content:
                'GG! the SQL injection one was clever, took us way too long to notice it was in the cookie',
            },
            {
              id: 'cybersecurite-8',
              authorId: 'mahaCyber',
              date: new Date('2025-03-17T09:00:00'),
              content:
                'Merci à tous les participants du CTF. Les write-ups des challenges seront partagés cette semaine sur la plateforme.',
            },
            {
              id: 'cybersecurite-9',
              authorId: 'mahaCyber',
              date: new Date('2026-02-03T09:00:00'),
              content:
                'Bonjour, les TP reprennent cette semaine. Kali et VirtualBox doivent être installés avant la première séance.',
            },
            {
              id: 'cybersecurite-10',
              authorId: 'eyaaa',
              date: new Date('2026-02-03T19:40:00'),
              content: 'Kali on a Mac M1 is a whole adventure, anyone did it?',
            },
            {
              id: 'cybersecurite-11',
              authorId: '^zaineb',
              date: new Date('2026-02-03T19:55:00'),
              content:
                "UTM + the ARM image works. the VirtualBox route doesn't",
            },
          ],
        },
        {
          type: 'text',
          id: 'systemes-d-exploitation',
          name: 'systèmes-d-exploitation',
          topic: 'Processus, threads, ordonnancement, mémoire, Linux.',
          messages: [
            {
              id: 'systemes-d-exploitation-1',
              authorId: 'fadouaDR',
              date: new Date('2024-09-25T09:00:00'),
              content:
                "Bonjour, les TP de systèmes d'exploitation se feront sous Linux (Ubuntu). Ceux qui n'ont pas Linux peuvent utiliser WSL ou une machine virtuelle.",
            },
            {
              id: 'systemes-d-exploitation-2',
              authorId: 'eyaaa',
              date: new Date('2024-10-16T22:50:00'),
              content:
                'fork() question: why does this print 8 times when I call fork() only 3 times?',
            },
            {
              id: 'systemes-d-exploitation-3',
              authorId: 'flamenate',
              date: new Date('2024-10-16T22:54:00'),
              content:
                'Every fork doubles the processes alive at that point: 1 → 2 → 4 → 8.\nEach process continues right after the fork that created it, so they all run the next fork too',
            },
            {
              id: 'systemes-d-exploitation-4',
              authorId: 'eyaaa',
              date: new Date('2024-10-16T22:55:00'),
              content: "OHHH so it's 2^n",
            },
            {
              id: 'systemes-d-exploitation-5',
              authorId: 'fadouaDR',
              date: new Date('2024-11-06T09:00:00'),
              content:
                'Le TP4 (synchronisation par sémaphores : producteur-consommateur) est à rendre avant le 17 novembre.',
            },
            {
              id: 'systemes-d-exploitation-6',
              authorId: 'doooom',
              date: new Date('2024-11-16T23:30:00'),
              content:
                'deadlock in my producer/consumer 🙃 both threads waiting forever',
            },
            {
              id: 'systemes-d-exploitation-7',
              authorId: 'wassim__',
              date: new Date('2024-11-16T23:41:00'),
              content:
                'check the order: sem_wait on "empty" BEFORE locking the mutex, not after',
            },
            {
              id: 'systemes-d-exploitation-8',
              authorId: 'doooom',
              date: new Date('2024-11-16T23:45:00'),
              content: 'that was it. why is concurrency like this',
            },
            {
              id: 'systemes-d-exploitation-9',
              authorId: 'fadouaDR',
              date: new Date('2025-01-04T10:00:00'),
              content:
                "L'examen portera sur l'ensemble du programme : processus, threads, ordonnancement, synchronisation et gestion de la mémoire. Bon courage à tous.",
            },
            {
              id: 'systemes-d-exploitation-10',
              authorId: '^zaineb',
              date: new Date('2025-01-05T16:00:00'),
              content:
                'anyone has a summary of the scheduling algorithms? FCFS, SJF, RR, priorités',
            },
            {
              id: 'systemes-d-exploitation-11',
              authorId: 'flamenate',
              date: new Date('2025-01-05T16:20:00'),
              content:
                "Made one for myself, it's in the class drive in the OS folder. Gantt chart examples for each one included",
              reactions: [
                { emoji: '🙏', count: 12 },
                { emoji: '❤️', count: 4 },
              ],
            },
            {
              id: 'systemes-d-exploitation-12',
              authorId: 'fadouaDR',
              date: new Date('2025-09-30T09:00:00'),
              content:
                'Bonjour à la nouvelle promo. Premier TP la semaine prochaine : commandes de base et scripts shell.',
            },
          ],
        },
        {
          type: 'text',
          id: 'dev-web',
          name: 'dev-web',
          topic: 'Génie logiciel & développement web : front, back, UML, Git.',
          messages: [
            {
              id: 'dev-web-1',
              authorId: 'mehdiABD',
              date: new Date('2024-10-03T10:00:00'),
              content:
                "Bonjour, le projet du module consiste à réaliser une application web complète (front, back et base de données) en binôme. Les technologies sont libres, mais Git est obligatoire et l'historique des commits sera évalué.",
            },
            {
              id: 'dev-web-2',
              authorId: 'eyaaa',
              date: new Date('2024-10-03T13:15:00'),
              content:
                '"l\'historique des commits sera évalué" and all my commits are called "fix" 💀',
            },
            {
              id: 'dev-web-3',
              authorId: 'doooom',
              date: new Date('2024-10-03T13:17:00'),
              content: '"fix", "fix2", "final", "final final"',
              reactions: [{ emoji: '😂', count: 13, me: true }],
            },
            {
              id: 'dev-web-4',
              authorId: '^zaineb',
              date: new Date('2024-11-14T21:30:00'),
              content:
                "React or Angular for the project? we're 2 and I only know a bit of JS",
            },
            {
              id: 'dev-web-5',
              authorId: 'flamenate',
              date: new Date('2024-11-14T21:41:00'),
              content:
                "If you only know a bit of JS, React with Vite is the gentler start, fewer concepts to learn upfront. Angular is fine too, but you'll spend the first week on modules and services.\nPick one and go, what matters most in this module is a clean architecture",
            },
            {
              id: 'dev-web-6',
              authorId: '^zaineb',
              date: new Date('2024-11-14T21:44:00'),
              content: 'React it is',
            },
            {
              id: 'dev-web-7',
              authorId: 'mehdiABD',
              date: new Date('2024-12-09T10:00:00'),
              content:
                'Les soutenances des projets web auront lieu les 19 et 20 décembre. Prévoyez une démonstration de 10 minutes et un diagramme de classes à jour.',
            },
            {
              id: 'dev-web-8',
              authorId: 'flamenate',
              date: new Date('2024-12-20T15:20:00'),
              content:
                "Ran Lighthouse on our project right before the soutenance, 90+ everywhere. I'll take it",
              reactions: [
                { emoji: '🔥', count: 18 },
                { emoji: '👀', count: 4 },
              ],
            },
            {
              id: 'dev-web-9',
              authorId: 'doooom',
              date: new Date('2024-12-20T15:24:00'),
              content: 'how is your accessibility 92, mine is 54',
            },
            {
              id: 'dev-web-10',
              authorId: 'flamenate',
              date: new Date('2024-12-20T15:26:00'),
              content:
                "alt on images, labels on inputs, enough contrast. that's most of it",
            },
            {
              id: 'dev-web-11',
              authorId: 'mehdiABD',
              date: new Date('2024-12-20T18:00:00'),
              content:
                'Merci à tous pour la qualité des projets présentés. Les notes seront publiées après délibération.',
            },
            {
              id: 'dev-web-12',
              authorId: 'eyaaa',
              date: new Date('2025-10-21T20:00:00'),
              content:
                "for this year's web project, is Next.js allowed? or does it have to be a separate front and back",
            },
            {
              id: 'dev-web-13',
              authorId: 'mehdiABD',
              date: new Date('2025-10-22T09:30:00'),
              content:
                'Oui, Next.js est accepté, à condition que la séparation des couches (présentation, logique métier, accès aux données) soit clairement visible dans votre architecture.',
            },
            {
              id: 'dev-web-14',
              authorId: 'doooom',
              date: new Date('2026-10-12T21:30:00'),
              content: "merge conflict in package-lock.json, what's the move",
            },
            {
              id: 'dev-web-15',
              authorId: '^zaineb',
              date: new Date('2026-10-12T21:36:00'),
              content:
                'take one side, delete node_modules, npm install, commit the regenerated lock file',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-gc',
      name: 'Génie Civil',
      channels: [
        {
          type: 'text',
          id: 'gc-general',
          name: 'gc-général',
          topic: 'Département Génie Civil : infos et entraide.',
          messages: [
            {
              id: 'gc-general-1',
              authorId: 'oussema07',
              date: new Date('2024-09-17T10:30:00'),
              content:
                'Salam GC 🏗️ the emplois du temps are on the department board and on the platform',
            },
            {
              id: 'gc-general-2',
              authorId: 'farouk__',
              date: new Date('2024-10-09T07:45:00'),
              content:
                'Is the visite de chantier still on today with the rain?',
            },
            {
              id: 'gc-general-3',
              authorId: 'ahmed',
              date: new Date('2024-10-09T07:52:00'),
              content:
                'yes, bring boots. the bus leaves at 8h15 in front of the administration',
            },
            {
              id: 'gc-general-4',
              authorId: 'farouk__',
              date: new Date('2025-03-12T19:00:00'),
              content:
                'stage ouvrier: anyone found a company in Sfax? I sent 10 emails, zero answers 😅',
            },
            {
              id: 'gc-general-5',
              authorId: 'oussema07',
              date: new Date('2025-03-12T19:10:00'),
              content:
                "Go in person with your CV and the demande de stage. A lot of bureaux d'études and entreprises de construction take stagiaires every summer, but nobody reads emails",
            },
            {
              id: 'gc-general-6',
              authorId: 'ahmed',
              date: new Date('2025-06-18T21:00:00'),
              content: 'results are out 🙏 RDM validated, I can finally sleep',
              reactions: [
                { emoji: '🎉', count: 9 },
                { emoji: '🥳', count: 3 },
              ],
            },
            {
              id: 'gc-general-7',
              authorId: 'farouk__',
              date: new Date('2025-09-16T12:15:00'),
              content:
                'GC3, last year 😮‍💨 anyone has the PFE subject list already?',
            },
            {
              id: 'gc-general-8',
              authorId: 'oussema07',
              date: new Date('2025-09-16T12:30:00'),
              content: 'Not yet, the department said end of October',
            },
            {
              id: 'gc-general-9',
              authorId: 'ahmed',
              date: new Date('2026-11-09T11:05:00'),
              content:
                "Robot licenses on the lab PCs expired?? can't open anything",
            },
            {
              id: 'gc-general-10',
              authorId: 'oussema07',
              date: new Date('2026-11-09T11:20:00'),
              content:
                "Reported to the department, they're renewing them this week",
            },
          ],
        },
        {
          type: 'text',
          id: 'rdm',
          name: 'rdm',
          topic: 'Efforts internes, flexion, torsion, flambement.',
          messages: [
            {
              id: 'rdm-1',
              authorId: 'prof.nizar',
              date: new Date('2024-09-30T09:00:00'),
              content:
                'Bonjour, les séries de TD de RDM sont disponibles sur la plateforme. Je vous conseille de refaire les exercices corrigés en TD avant chaque DS.',
            },
            {
              id: 'rdm-2',
              authorId: 'farouk__',
              date: new Date('2024-10-23T22:15:00'),
              content:
                'the sign convention for the bending moment is killing me. sagging positive or hogging positive??',
            },
            {
              id: 'rdm-3',
              authorId: 'ahmed',
              date: new Date('2024-10-23T22:21:00'),
              content:
                "In our course it's positive when the bottom fibre is in tension. Stick to one convention and draw the section cut every single time",
            },
            {
              id: 'rdm-4',
              authorId: 'oussema07',
              date: new Date('2024-11-21T08:10:00'),
              content: "DS RDM in 2h. we are so back. or so cooked. we'll see",
              reactions: [{ emoji: '🫡', count: 6 }],
            },
            {
              id: 'rdm-5',
              authorId: 'farouk__',
              date: new Date('2024-11-21T12:40:00'),
              content: 'we are so cooked',
              reactions: [
                { emoji: '💀', count: 12 },
                { emoji: '😂', count: 5 },
              ],
            },
            {
              id: 'rdm-6',
              authorId: 'prof.nizar',
              date: new Date('2024-12-10T09:00:00'),
              content:
                'Les copies du DS peuvent être consultées mardi de 10h à 12h au bureau du département.',
            },
            {
              id: 'rdm-7',
              authorId: 'farouk__',
              date: new Date('2025-04-14T20:30:00'),
              content:
                "Flambement: Euler formula, what's the effective length for fixed-free?",
            },
            {
              id: 'rdm-8',
              authorId: 'ahmed',
              date: new Date('2025-04-14T20:36:00'),
              content:
                '2L. fixed-fixed is 0.5L, pinned-pinned L, fixed-pinned about 0.7L',
            },
            {
              id: 'rdm-9',
              authorId: 'farouk__',
              date: new Date('2025-04-14T20:37:00'),
              content: 'saving this forever',
            },
            {
              id: 'rdm-10',
              authorId: 'prof.nizar',
              date: new Date('2026-10-21T09:00:00'),
              content:
                'Bonjour, une séance de TD supplémentaire sur la torsion est programmée jeudi à 14h.',
            },
          ],
        },
        {
          type: 'text',
          id: 'beton-arme',
          name: 'béton-armé',
          topic: 'BAEL et Eurocode 2 : poutres, poteaux, dalles.',
          messages: [
            {
              id: 'beton-arme-1',
              authorId: 'prof.nizar',
              date: new Date('2025-02-10T09:00:00'),
              content:
                "Bonjour, pour le cours de béton armé nous utiliserons le BAEL 91 révisé 99. Une introduction à l'Eurocode 2 sera faite en fin de semestre. Pensez à apporter vos abaques en TD.",
            },
            {
              id: 'beton-arme-2',
              authorId: 'oussema07',
              date: new Date('2025-02-27T21:30:00'),
              content:
                'poutre exercise: fc28 = 25 MPa, do we take fbu = 0.85 x fc28 / (θ x γb) = 14.17 MPa?',
            },
            {
              id: 'beton-arme-3',
              authorId: 'farouk__',
              date: new Date('2025-02-27T21:40:00'),
              content: 'yes, 14.17 MPa with θ = 1 and γb = 1.5',
            },
            {
              id: 'beton-arme-4',
              authorId: 'prof.nizar',
              date: new Date('2025-03-26T09:00:00'),
              content:
                "Le projet de béton armé (dimensionnement d'un bâtiment R+2) est à rendre le 30 avril : plans et note de calcul.",
            },
            {
              id: 'beton-arme-5',
              authorId: 'farouk__',
              date: new Date('2025-04-29T23:55:00'),
              content: 'note de calcul: 47 pages. plans: done. sanity: gone',
              reactions: [{ emoji: '🫠', count: 7 }],
            },
            {
              id: 'beton-arme-6',
              authorId: 'ahmed',
              date: new Date('2025-04-30T00:02:00'),
              content:
                "we're still on the poteaux 😭 see you at 7am at the printer",
            },
            {
              id: 'beton-arme-7',
              authorId: 'oussema07',
              date: new Date('2026-02-24T18:40:00'),
              content:
                "anyone has a clean Excel sheet for the ferraillage of poutres? I'll still check by hand",
            },
            {
              id: 'beton-arme-8',
              authorId: 'ahmed',
              date: new Date('2026-02-24T18:52:00'),
              content: 'sending you mine, double check the shear part',
            },
          ],
        },
        {
          type: 'text',
          id: 'topographie',
          name: 'topographie',
          topic: 'Levés, nivellement, station totale.',
          messages: [
            {
              id: 'topographie-1',
              authorId: 'prof.nizar',
              date: new Date('2024-10-08T09:00:00'),
              content:
                'Les sorties terrain de topographie se feront par groupes de cinq. Le matériel (niveau, mire, station totale) est à récupérer au magasin du département.',
            },
            {
              id: 'topographie-2',
              authorId: 'ahmed',
              date: new Date('2024-10-24T17:30:00'),
              content:
                'nivellement TP: our closure error is 12 cm on a 400 m loop 💀 is that acceptable',
            },
            {
              id: 'topographie-3',
              authorId: 'oussema07',
              date: new Date('2024-10-24T17:36:00'),
              content:
                'no 😭 the tolerance is way smaller. redo the readings around stations 3 and 4, someone probably misread the mire',
            },
            {
              id: 'topographie-4',
              authorId: 'farouk__',
              date: new Date('2024-10-24T17:50:00'),
              content: 'it was me. I read 1.42 as 1.24. sorry team',
              reactions: [{ emoji: '😂', count: 8 }],
            },
            {
              id: 'topographie-5',
              authorId: 'oussema07',
              date: new Date('2025-11-06T15:10:00'),
              content:
                "station totale TP: who has the data cable? we can't export the points",
            },
            {
              id: 'topographie-6',
              authorId: 'ahmed',
              date: new Date('2025-11-06T15:14:00'),
              content: 'in the case of the second station, the grey one',
            },
            {
              id: 'topographie-7',
              authorId: 'prof.nizar',
              date: new Date('2026-10-28T08:00:00'),
              content:
                'La sortie terrain de jeudi est reportée à la semaine prochaine en raison des conditions météo.',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-ge',
      name: 'Génie Électrique',
      channels: [
        {
          type: 'text',
          id: 'ge-general',
          name: 'ge-général',
          topic: 'Département Génie Électrique : infos et entraide.',
          messages: [
            {
              id: 'ge-general-1',
              authorId: 'hiba.ch',
              date: new Date('2024-09-17T11:00:00'),
              content:
                'Salam GE ⚡ emplois du temps updated on the department page',
            },
            {
              id: 'ge-general-2',
              authorId: 'amine',
              date: new Date('2024-12-03T19:20:00'),
              content:
                "Anyone wants to join our team for the robotics competition? we need someone who's good at power electronics",
            },
            {
              id: 'ge-general-3',
              authorId: 'rayenx',
              date: new Date('2024-12-03T19:35:00'),
              content: "I'm in, if you don't mind a beginner",
            },
            {
              id: 'ge-general-4',
              authorId: 'amine',
              date: new Date('2024-12-03T19:36:00'),
              content: "perfect, we're all beginners anyway 😂",
            },
            {
              id: 'ge-general-5',
              authorId: 'hiba.ch',
              date: new Date('2025-05-06T13:00:00'),
              content:
                "Labo d'électrotechnique is closed tomorrow for maintenance, the TP moved to Thursday",
            },
            {
              id: 'ge-general-6',
              authorId: 'rayenx',
              date: new Date('2025-09-08T18:00:00'),
              content:
                "stage d'été done at the STEG ✅ recommend it, the engineers took time to explain everything",
            },
            {
              id: 'ge-general-7',
              authorId: 'amine',
              date: new Date('2025-09-08T18:10:00'),
              content: 'nice! how did you apply?',
            },
            {
              id: 'ge-general-8',
              authorId: 'rayenx',
              date: new Date('2025-09-08T18:14:00'),
              content:
                'demande de stage at the regional office in Sfax in March, they called me back in May',
            },
            {
              id: 'ge-general-9',
              authorId: 'hiba.ch',
              date: new Date('2026-10-30T10:00:00'),
              content: 'GE3: the PFE subject list is out on the platform',
            },
          ],
        },
        {
          type: 'text',
          id: 'electronique',
          name: 'électronique',
          topic:
            'Électronique analogique et numérique : AOP, transistors, filtres.',
          messages: [
            {
              id: 'electronique-1',
              authorId: 'samiGE',
              date: new Date('2024-10-01T10:00:00'),
              content:
                "Bonjour, pour les TP d'électronique merci de venir avec la partie théorique du compte-rendu déjà préparée. Elle sera vérifiée en début de séance.",
            },
            {
              id: 'electronique-2',
              authorId: 'amine',
              date: new Date('2024-10-15T21:00:00'),
              content:
                'AOP inverseur: gain = -R2/R1, but my output is clipping at 13 V, why?',
            },
            {
              id: 'electronique-3',
              authorId: 'hiba.ch',
              date: new Date('2024-10-15T21:08:00'),
              content:
                "saturation. your supply is ±15 V so the output can't go above ~13-14 V. reduce the input amplitude",
            },
            {
              id: 'electronique-4',
              authorId: 'amine',
              date: new Date('2024-10-15T21:09:00'),
              content: 'makes sense, merci',
            },
            {
              id: 'electronique-5',
              authorId: 'rayenx',
              date: new Date('2025-01-10T17:00:00'),
              content:
                "who has the correction of last year's exam? the filtre passe-bande question",
            },
            {
              id: 'electronique-6',
              authorId: 'hiba.ch',
              date: new Date('2025-01-10T17:12:00'),
              content: 'GE drive, folder "annales"',
            },
            {
              id: 'electronique-7',
              authorId: 'samiGE',
              date: new Date('2025-11-12T10:00:00'),
              content:
                'Le TP noté sur les filtres actifs aura lieu la semaine prochaine. Révisez les diagrammes de Bode.',
            },
            {
              id: 'electronique-8',
              authorId: 'amine',
              date: new Date('2026-11-02T20:00:00'),
              content:
                'Bode tip for the new ones: find the corner frequencies first, then draw the asymptotes. saved me in the DS',
            },
          ],
        },
        {
          type: 'text',
          id: 'automatique',
          name: 'automatique',
          topic: 'Asservissement, fonctions de transfert, PID, stabilité.',
          messages: [
            {
              id: 'automatique-1',
              authorId: 'samiGE',
              date: new Date('2025-02-12T10:00:00'),
              content:
                "Bonjour, les TP d'automatique se feront sous MATLAB/Simulink. Une licence campus est disponible, la procédure d'activation est sur la plateforme.",
            },
            {
              id: 'automatique-2',
              authorId: 'hiba.ch',
              date: new Date('2025-02-19T18:30:00'),
              content:
                'Simulink tip: use one Scope with two inputs so you can compare consigne vs sortie on the same plot',
            },
            {
              id: 'automatique-3',
              authorId: 'rayenx',
              date: new Date('2025-03-11T22:00:00'),
              content:
                'Routh criterion: I get a zero in the first column, what do I do 😶',
            },
            {
              id: 'automatique-4',
              authorId: 'hiba.ch',
              date: new Date('2025-03-11T22:06:00'),
              content:
                'replace it with ε (small positive), continue the table, then look at the sign changes when ε → 0',
              reactions: [{ emoji: '🧠', count: 6 }],
            },
            {
              id: 'automatique-5',
              authorId: 'amine',
              date: new Date('2025-04-02T16:45:00'),
              content: 'PID tuning in the TP: my system oscillates forever',
            },
            {
              id: 'automatique-6',
              authorId: 'hiba.ch',
              date: new Date('2025-04-02T16:50:00'),
              content:
                'Kp too high. lower it and add a bit of Kd. Ziegler-Nichols gives you a starting point',
            },
            {
              id: 'automatique-7',
              authorId: 'samiGE',
              date: new Date('2025-05-15T09:00:00'),
              content:
                "Pour l'examen, une feuille A4 recto de formules manuscrite est autorisée.",
            },
            {
              id: 'automatique-8',
              authorId: 'rayenx',
              date: new Date('2025-05-29T12:30:00'),
              content:
                'automatique exam was fair honestly, the TD exercises were enough',
            },
          ],
        },
        {
          type: 'text',
          id: 'electrotechnique',
          name: 'électrotechnique',
          topic:
            'Machines électriques, transformateurs, électronique de puissance.',
          messages: [
            {
              id: 'electrotechnique-1',
              authorId: 'samiGE',
              date: new Date('2024-10-02T10:00:00'),
              content:
                "Rappel de sécurité : aucun montage ne doit être mis sous tension sans la vérification de l'enseignant.",
            },
            {
              id: 'electrotechnique-2',
              authorId: 'amine',
              date: new Date('2024-11-04T20:20:00'),
              content:
                'transfo TP: why do we do the no-load test and the short-circuit test separately?',
            },
            {
              id: 'electrotechnique-3',
              authorId: 'rayenx',
              date: new Date('2024-11-04T20:31:00'),
              content:
                'no-load gives you the iron losses and the magnetizing branch, short-circuit gives you the copper losses and the leakage reactance. different parts of the equivalent circuit',
            },
            {
              id: 'electrotechnique-4',
              authorId: 'amine',
              date: new Date('2024-11-04T20:32:00'),
              content: 'ok clean',
            },
            {
              id: 'electrotechnique-5',
              authorId: 'hiba.ch',
              date: new Date('2025-11-25T21:15:00'),
              content:
                "moteur asynchrone: g = (ns - n) / ns with ns = 60f / p. don't forget p is the number of PAIRS of poles",
            },
            {
              id: 'electrotechnique-6',
              authorId: 'samiGE',
              date: new Date('2025-12-01T09:00:00'),
              content:
                'Les comptes-rendus du TP machine à courant continu sont à remettre au plus tard lundi.',
            },
            {
              id: 'electrotechnique-7',
              authorId: 'rayenx',
              date: new Date('2026-10-27T19:00:00'),
              content:
                'anyone has the slides of chapter 3 (machines synchrones)? the link is broken',
            },
            {
              id: 'electrotechnique-8',
              authorId: 'hiba.ch',
              date: new Date('2026-10-27T19:20:00'),
              content: 'working copy in the GE drive',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-gm',
      name: 'Génie Mécanique',
      channels: [
        {
          type: 'text',
          id: 'gm-general',
          name: 'gm-général',
          topic: 'Département Génie Mécanique : infos et entraide.',
          messages: [
            {
              id: 'gm-general-1',
              authorId: 'nour_h',
              date: new Date('2024-09-17T11:30:00'),
              content:
                "Salam GM ⚙️ emplois du temps on the board, I'll keep this channel updated",
            },
            {
              id: 'gm-general-2',
              authorId: 'nour_h',
              date: new Date('2025-06-28T09:38:00'),
              content:
                'Rattrapage planning GM: starts Monday 30/06, mécanique des fluides on Tuesday, thermo on Thursday. Full PDF on the platform',
            },
            {
              id: 'gm-general-3',
              authorId: 'yassineBK',
              date: new Date('2025-06-28T09:50:00'),
              content: 'merci Nour 🙏',
            },
            {
              id: 'gm-general-4',
              authorId: 'yassineBK',
              date: new Date('2025-10-13T07:40:00'),
              content:
                "Atelier usinage TP: are safety shoes mandatory? I don't have any",
            },
            {
              id: 'gm-general-5',
              authorId: 'nour_h',
              date: new Date('2025-10-13T07:44:00'),
              content:
                "yes, they won't let you in without them. there are some to borrow at the atelier but the sizes are random",
            },
            {
              id: 'gm-general-6',
              authorId: 'yassineBK',
              date: new Date('2026-03-03T20:00:00'),
              content:
                'anyone interested in a SolidWorks study group for the CSWA certification?',
            },
            {
              id: 'gm-general-7',
              authorId: 'nour_h',
              date: new Date('2026-03-03T20:05:00'),
              content: 'yes!! been wanting to pass it for a year',
            },
          ],
        },
        {
          type: 'text',
          id: 'mecanique-des-fluides',
          name: 'mécanique-des-fluides',
          topic: 'Hydrostatique, Bernoulli, pertes de charge.',
          messages: [
            {
              id: 'mecanique-des-fluides-1',
              authorId: 'walidMeca',
              date: new Date('2024-10-07T09:00:00'),
              content:
                "Bonjour, les séries de TD de mécanique des fluides sont disponibles. Le DS portera sur l'hydrostatique et la cinématique des fluides.",
            },
            {
              id: 'mecanique-des-fluides-2',
              authorId: 'yassineBK',
              date: new Date('2024-11-13T21:00:00'),
              content:
                'Bernoulli between two points: do I include head losses in exercise 3 or not?',
            },
            {
              id: 'mecanique-des-fluides-3',
              authorId: 'nour_h',
              date: new Date('2024-11-13T21:05:00'),
              content:
                'exercise 3 says "fluide parfait" so no losses. when it says "fluide réel" you add the pertes de charge',
            },
            {
              id: 'mecanique-des-fluides-4',
              authorId: 'yassineBK',
              date: new Date('2024-11-13T21:06:00'),
              content: 'the word "parfait" was hiding in plain sight',
            },
            {
              id: 'mecanique-des-fluides-5',
              authorId: 'walidMeca',
              date: new Date('2025-03-10T09:00:00'),
              content:
                'Le TP sur le banc de pertes de charge est reporté à mardi prochain.',
            },
            {
              id: 'mecanique-des-fluides-6',
              authorId: 'nour_h',
              date: new Date('2025-03-18T18:20:00'),
              content:
                'for the TP report: laminar below Re ≈ 2000 in a pipe, turbulent above ≈ 4000, transitional in between',
            },
            {
              id: 'mecanique-des-fluides-7',
              authorId: 'yassineBK',
              date: new Date('2026-10-15T22:00:00'),
              content: 'Navier-Stokes chapter starting. pray for us',
              reactions: [{ emoji: '🙏', count: 5 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'cao-dao',
          name: 'cao-dao',
          topic: 'SolidWorks, mise en plan, cotation.',
          messages: [
            {
              id: 'cao-dao-1',
              authorId: 'walidMeca',
              date: new Date('2025-02-17T09:00:00'),
              content:
                "Bonjour, les TP de CAO se feront sur SolidWorks. Projet final : conception complète d'un réducteur avec mises en plan et nomenclature.",
            },
            {
              id: 'cao-dao-2',
              authorId: 'nour_h',
              date: new Date('2025-02-24T19:00:00'),
              content:
                'SolidWorks tip: fully define your sketches (black lines, not blue). saves you hours when you change a dimension later',
              reactions: [{ emoji: '💯', count: 8 }],
            },
            {
              id: 'cao-dao-3',
              authorId: 'yassineBK',
              date: new Date('2025-04-08T23:10:00'),
              content: 'my assembly explodes every time I move a part 😭',
            },
            {
              id: 'cao-dao-4',
              authorId: 'nour_h',
              date: new Date('2025-04-08T23:15:00'),
              content:
                'redundant mates. open the mates folder and look for the red / yellow ones',
            },
            {
              id: 'cao-dao-5',
              authorId: 'yassineBK',
              date: new Date('2025-04-08T23:31:00'),
              content: 'there were 14 of them. fixed',
            },
            {
              id: 'cao-dao-6',
              authorId: 'walidMeca',
              date: new Date('2025-04-14T09:00:00'),
              content:
                'Le projet de CAO est à rendre avant le 15 mai : fichiers pièces, assemblage et mises en plan au format PDF.',
            },
            {
              id: 'cao-dao-7',
              authorId: 'yassineBK',
              date: new Date('2026-09-29T18:00:00'),
              content:
                'is there a student SolidWorks license through the school for personal laptops?',
            },
            {
              id: 'cao-dao-8',
              authorId: 'nour_h',
              date: new Date('2026-09-29T18:12:00'),
              content: 'ask at the department, they had codes last year',
            },
          ],
        },
        {
          type: 'text',
          id: 'thermodynamique',
          name: 'thermodynamique',
          topic: 'Premier et second principes, cycles, machines thermiques.',
          messages: [
            {
              id: 'thermodynamique-1',
              authorId: 'walidMeca',
              date: new Date('2024-10-08T09:00:00'),
              content:
                "Pensez à apporter vos tables thermodynamiques (vapeur d'eau) pour les séances de TD.",
            },
            {
              id: 'thermodynamique-2',
              authorId: 'yassineBK',
              date: new Date('2024-12-12T22:30:00'),
              content:
                "cycle de Rankine: I get an efficiency of 85%, that's not possible right?",
            },
            {
              id: 'thermodynamique-3',
              authorId: 'nour_h',
              date: new Date('2024-12-12T22:36:00'),
              content:
                'no way 😂 check your enthalpies, you probably took h at the pump outlet instead of the turbine outlet',
            },
            {
              id: 'thermodynamique-4',
              authorId: 'yassineBK',
              date: new Date('2024-12-12T22:49:00'),
              content: 'yep. 34%. much more depressing, much more realistic',
              reactions: [{ emoji: '😂', count: 6 }],
            },
            {
              id: 'thermodynamique-5',
              authorId: 'walidMeca',
              date: new Date('2024-12-16T09:00:00'),
              content:
                "L'examen de thermodynamique portera sur les chapitres 1 à 5. Calculatrice autorisée.",
            },
            {
              id: 'thermodynamique-6',
              authorId: 'nour_h',
              date: new Date('2026-11-12T21:40:00'),
              content:
                "entropy chapter again this year, but this time I'm the one explaining it to the GM2 🫠",
            },
          ],
        },
      ],
    },
    {
      id: 'cat-gmat',
      name: 'Génie Matériaux',
      channels: [
        {
          type: 'text',
          id: 'gmat-general',
          name: 'gmat-général',
          topic: 'Département Génie des Matériaux : infos et entraide.',
          messages: [
            {
              id: 'gmat-general-1',
              authorId: 'salmaQQ',
              date: new Date('2024-09-17T12:00:00'),
              content:
                'Salam GMat 🧪 small department, big energy. emplois du temps on the board',
            },
            {
              id: 'gmat-general-2',
              authorId: 'abirLO',
              date: new Date('2024-09-17T12:10:00'),
              content:
                "if you have any problem with the schedule tell me, I'll pass it to the department",
            },
            {
              id: 'gmat-general-3',
              authorId: 'abirLO',
              date: new Date('2024-11-25T16:00:00'),
              content:
                'Visite industrielle Thursday at a céramique factory, bus at 8h in front of the administration. bring your carte étudiant',
            },
            {
              id: 'gmat-general-4',
              authorId: 'salmaQQ',
              date: new Date('2025-02-19T13:30:00'),
              content:
                'MEB training at the lab is open for GMat2, sign up at the department before Friday',
            },
            {
              id: 'gmat-general-5',
              authorId: 'abirLO',
              date: new Date('2025-02-19T13:35:00'),
              content: 'done ✅ finally getting to see grains up close',
            },
            {
              id: 'gmat-general-6',
              authorId: 'abirLO',
              date: new Date('2026-09-16T09:30:00'),
              content: 'GMat3, here we go. PFE hunting season',
            },
          ],
        },
        {
          type: 'text',
          id: 'chimie-des-materiaux',
          name: 'chimie-des-matériaux',
          topic: 'Liaisons, structures cristallines, diagrammes de phases.',
          messages: [
            {
              id: 'chimie-des-materiaux-1',
              authorId: 'rimMat',
              date: new Date('2024-10-02T09:00:00'),
              content:
                'Bonjour, les TP de chimie des matériaux nécessitent une blouse en coton et des lunettes de protection. Aucun accès au laboratoire sans équipement.',
            },
            {
              id: 'chimie-des-materiaux-2',
              authorId: 'salmaQQ',
              date: new Date('2024-11-03T20:00:00'),
              content: 'Fe-C phase diagram: which points do we need by heart?',
            },
            {
              id: 'chimie-des-materiaux-3',
              authorId: 'abirLO',
              date: new Date('2024-11-03T20:09:00'),
              content:
                'eutectoïde 0.77% C at 727°C, eutectique 4.3% C at 1147°C, max solubility in austenite 2.11%. those always come up',
            },
            {
              id: 'chimie-des-materiaux-4',
              authorId: 'salmaQQ',
              date: new Date('2024-11-03T20:10:00'),
              content: 'life saver',
            },
            {
              id: 'chimie-des-materiaux-5',
              authorId: 'rimMat',
              date: new Date('2024-11-12T09:00:00'),
              content:
                'Le DS portera sur les liaisons chimiques, les structures cristallines et les diagrammes de phases.',
            },
            {
              id: 'chimie-des-materiaux-6',
              authorId: 'abirLO',
              date: new Date('2024-11-17T22:00:00'),
              content: 'Miller indices still make no sense to me 🥲',
            },
            {
              id: 'chimie-des-materiaux-7',
              authorId: 'salmaQQ',
              date: new Date('2024-11-17T22:07:00'),
              content:
                'take the intercepts, invert them, clear the fractions. (1, ∞, ∞) → (100). draw 5 of them and it clicks',
            },
          ],
        },
        {
          type: 'text',
          id: 'polymeres-et-ceramiques',
          name: 'polymères-et-céramiques',
          topic: 'Polymères, céramiques, mise en forme, caractérisation.',
          messages: [
            {
              id: 'polymeres-et-ceramiques-1',
              authorId: 'rimMat',
              date: new Date('2025-02-18T09:00:00'),
              content:
                'Le TP de caractérisation (DSC et essais de traction sur polymères) aura lieu en salle de TP matériaux. Merci de lire le protocole avant la séance.',
            },
            {
              id: 'polymeres-et-ceramiques-2',
              authorId: 'abirLO',
              date: new Date('2025-03-05T21:00:00'),
              content: "Tg vs Tm, someone explain like I'm 5",
            },
            {
              id: 'polymeres-et-ceramiques-3',
              authorId: 'salmaQQ',
              date: new Date('2025-03-05T21:06:00'),
              content:
                'Tg: the amorphous part goes from glassy to rubbery. Tm: the crystalline part melts. fully amorphous polymers only have a Tg',
            },
            {
              id: 'polymeres-et-ceramiques-4',
              authorId: 'abirLO',
              date: new Date('2025-03-05T21:07:00'),
              content: 'ok that I can remember',
            },
            {
              id: 'polymeres-et-ceramiques-5',
              authorId: 'salmaQQ',
              date: new Date('2025-04-16T18:30:00'),
              content:
                'frittage TP took 6 hours. the furnace is slower than my motivation',
              reactions: [{ emoji: '😂', count: 5 }],
            },
            {
              id: 'polymeres-et-ceramiques-6',
              authorId: 'rimMat',
              date: new Date('2026-11-16T09:00:00'),
              content:
                'Les rapports du TP de frittage sont à remettre avant le 30 novembre.',
            },
          ],
        },
        {
          type: 'text',
          id: 'corrosion',
          name: 'corrosion',
          topic: 'Électrochimie, Pourbaix, protection contre la corrosion.',
          messages: [
            {
              id: 'corrosion-1',
              authorId: 'rimMat',
              date: new Date('2025-02-18T10:00:00'),
              content:
                'Bonjour, le module de corrosion abordera la thermodynamique électrochimique (diagrammes de Pourbaix), la cinétique de corrosion et les méthodes de protection.',
            },
            {
              id: 'corrosion-2',
              authorId: 'salmaQQ',
              date: new Date('2025-03-24T20:00:00'),
              content:
                'Pourbaix diagram for iron: any trick to remember the zones?',
            },
            {
              id: 'corrosion-3',
              authorId: 'abirLO',
              date: new Date('2025-03-24T20:08:00'),
              content:
                'bottom = immunity, acid side = corrosion, the oxide zones = passivation. draw it from memory once a day for a week',
            },
            {
              id: 'corrosion-4',
              authorId: 'salmaQQ',
              date: new Date('2025-05-21T23:20:00'),
              content:
                "exam tomorrow. protection cathodique par anode sacrificielle: zinc protects steel because it's less noble, right?",
            },
            {
              id: 'corrosion-5',
              authorId: 'abirLO',
              date: new Date('2025-05-21T23:24:00'),
              content:
                'yes, the zinc corrodes instead of the steel. go sleep 😭',
            },
            {
              id: 'corrosion-6',
              authorId: 'rimMat',
              date: new Date('2025-05-26T09:00:00'),
              content:
                "Les notes de l'examen de corrosion seront affichées cette semaine. Bon courage pour la suite des examens.",
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
          name: 'staff',
          locked: true,
          messages: [
            {
              id: 'staff-1',
              authorId: 'tarekfr',
              date: new Date('2024-09-10T09:00:00'),
              content: 'Canal réservé au personnel enseignant.',
            },
          ],
        },
        {
          type: 'text',
          id: 'administration',
          name: 'administration',
          locked: true,
          messages: [
            {
              id: 'administration-1',
              authorId: 'skandar22',
              date: new Date('2024-09-10T09:00:00'),
              content: "Canal réservé à l'administration.",
            },
          ],
        },
      ],
    },
  ],
}
