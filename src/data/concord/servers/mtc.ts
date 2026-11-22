import type { Server } from '@/lib/concord/types'

export const mtc: Server = {
  id: 'mtc',
  name: 'MTC ENIS',
  icon: '/media/concord/mtc.webp',
  roles: [
    { id: 'president', name: 'President', color: '#e11d48' },
    { id: 'board', name: 'Board', color: '#f59e0b' },
    { id: 'alumni', name: 'Alumni', color: '#a855f7' },
    { id: 'mobile-web', name: 'Mobile & Web Dev', color: '#22c55e' },
    { id: 'ai-data', name: 'AI & Data', color: '#3b82f6' },
    { id: 'cloud-devops', name: 'Cloud & DevOps', color: '#06b6d4' },
    { id: 'member', name: 'Member', color: '#94a3b8' },
  ],
  members: [
    { userId: 'flamenate', roleIds: ['alumni', 'mobile-web'] },
    { userId: 'bilelz', roleIds: ['president', 'cloud-devops'] },
    { userId: 'maram_tn', roleIds: ['board', 'member'] },
    { userId: 'chaima.js', roleIds: ['board', 'mobile-web'] },
    { userId: 'oumayma_ai', roleIds: ['board', 'ai-data'] },
    { userId: 'nadhem', roleIds: ['alumni', 'ai-data'] },
    { userId: 'rouaa', roleIds: ['alumni', 'cloud-devops'] },
    { userId: 'dhia.dev', roleIds: ['cloud-devops', 'member'] },
    { userId: 'firas404', roleIds: ['mobile-web', 'member'] },
    { userId: 'skandar22', roleIds: ['mobile-web', 'member'] },
    { userId: 'eyaaa', roleIds: ['mobile-web', 'member'] },
    { userId: '0mohamed', roleIds: ['ai-data', 'member'] },
    { userId: 'abirLO', roleIds: ['ai-data', 'member'] },
  ],
  categories: [
    {
      id: 'uncategorized',
      name: null,
      channels: [
        {
          type: 'text',
          id: 'rules',
          name: '📜・rules',
          restricted: true,
          topic: 'Read before posting.',
          messages: [
            {
              id: 'rules-1',
              authorId: 'nadhem',
              date: new Date('2024-09-14T10:00:00'),
              content:
                'Welcome to the Microsoft Tech Club ENIS server 💙\n\n1. Be respectful. No insults, no harassment, no spam.\n2. English, French or Derja are all fine, just keep it readable for everyone.\n3. Use the right channel: questions about a formation go in 🎓・formations, project talk in 🚀・ongoing-projects.\n4. No piracy, no cracked software, no sharing exam answers.\n5. Ask before DMing people for help, and try searching first.\n6. Have fun and build things.\n\nBreaking the rules = a warning, then a kick. Simple.',
              reactions: [{ emoji: '✅', count: 21, me: true }],
            },
            {
              id: 'rules-2',
              authorId: 'bilelz',
              date: new Date('2025-09-20T11:30:00'),
              content:
                'Small update for the 2025–26 season:\n\n7. Club projects live in the MTC GitHub organization. Ask a board member for access, and never push secrets or API keys (yes, even "just for testing").\n8. Formation recordings are for members only, please don\'t repost them publicly.\n\nEverything else stays the same. Welcome back everyone 🚀',
              reactions: [{ emoji: '✅', count: 17 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'welcome',
          name: '👋・welcome',
          topic: 'Say hi and tell us what you want to build.',
          messages: [
            {
              id: 'welcome-1',
              authorId: 'nadhem',
              date: new Date('2024-09-14T10:05:00'),
              content:
                'Welcome to MTC ENIS! 👋\nIntroduce yourself here: name, filière, year, and one thing you want to learn this year. No pressure, "I don\'t know yet" is a valid answer.',
            },
            {
              id: 'welcome-2',
              authorId: 'skandar22',
              date: new Date('2024-10-03T19:12:00'),
              content:
                'Salut ! Skandar, 1ère année GI. Je veux apprendre le dev web sérieusement cette année, pas juste copier des tutos 😅',
              reactions: [{ emoji: '👋', count: 4 }],
            },
            {
              id: 'welcome-3',
              authorId: '0mohamed',
              date: new Date('2024-10-03T21:40:00'),
              content:
                'Mohamed, GI1 too. Interested in AI and data, I did a bit of Python in prépa. Happy to be here',
              reactions: [{ emoji: '👋', count: 3 }],
            },
            {
              id: 'welcome-4',
              authorId: 'eyaaa',
              date: new Date('2024-11-12T18:20:00'),
              content:
                'Hi everyone! Eya, GI1. I want to build mobile apps, I tried Flutter alone this summer and got lost in setState 🙃',
              reactions: [{ emoji: '👋', count: 5, me: true }],
            },
            {
              id: 'welcome-5',
              authorId: 'flamenate',
              date: new Date('2024-11-12T18:31:00'),
              content:
                "Welcome Eya! You're in the right place, the Mobile & Web Dev track starts next week. Bring your Flutter project, we'll untangle the setState together 😄",
              reactions: [{ emoji: '❤️', count: 2 }],
            },
            {
              id: 'welcome-6',
              authorId: 'firas404',
              date: new Date('2024-11-20T22:05:00'),
              content:
                'Firas, GI2. Backend mostly, Node and a bit of .NET. Bio not found, personality still loading...',
              reactions: [{ emoji: '😂', count: 3, me: true }],
            },
            {
              id: 'welcome-7',
              authorId: 'dhia.dev',
              date: new Date('2025-09-30T20:10:00'),
              content:
                "Dhia, GI2. Cloud & DevOps person, I break Docker containers for fun. Ravi d'être là",
              reactions: [{ emoji: '🐳', count: 4 }],
            },
            {
              id: 'welcome-8',
              authorId: 'abirLO',
              date: new Date('2025-10-08T17:45:00'),
              content:
                "Bonsoir ! Abir, GI1. I'm curious about data science and ML, j'ai entendu parler du club à la journée d'intégration.",
              reactions: [{ emoji: '👋', count: 6 }],
            },
            {
              id: 'welcome-9',
              authorId: 'bilelz',
              date: new Date('2025-10-08T18:02:00'),
              content:
                'Welcome Abir 💙 The AI & Data track starts this Saturday, check 🧭・onboarding',
            },
            {
              id: 'welcome-10',
              authorId: 'chaima.js',
              date: new Date('2026-09-28T19:00:00'),
              content:
                "New season, new faces 👀 If you joined this week, drop an intro here, we don't bite (except Firas before his coffee)",
              reactions: [
                { emoji: '😂', count: 5 },
                { emoji: '☕', count: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'community',
      name: 'Community',
      channels: [
        {
          type: 'text',
          id: 'main-chat',
          name: '💬・main-chat',
          topic: 'General chat. Be nice.',
          messages: [
            {
              id: 'main-1',
              authorId: 'rouaa',
              date: new Date('2024-09-16T13:10:00'),
              content:
                "Est-ce que quelqu'un sait si la salle de conférence est libre jeudi aprèm ? On voudrait faire la réunion d'ouverture là-bas",
            },
            {
              id: 'main-2',
              authorId: 'nadhem',
              date: new Date('2024-09-16T13:25:00'),
              content:
                "Normalement oui, je passe à l'administration demain matin pour confirmer",
            },
            {
              id: 'main-3',
              authorId: 'skandar22',
              date: new Date('2024-10-15T23:48:00'),
              content:
                'who else is installing WSL at midnight instead of doing the TP de C',
              reactions: [{ emoji: '🫡', count: 3 }],
            },
            {
              id: 'main-4',
              authorId: '0mohamed',
              date: new Date('2024-10-15T23:51:00'),
              content:
                'me, and Ubuntu has been downloading for 40 minutes. wifi du foyer yaatik saha',
              reactions: [{ emoji: '😭', count: 4 }],
            },
            {
              id: 'main-5',
              authorId: 'firas404',
              date: new Date('2024-12-04T12:30:00'),
              content:
                'PSA: the GitHub Student Developer Pack gives you Copilot for free as a student. Apply with your university email. Thank me later',
              reactions: [{ emoji: '🔥', count: 7, me: true }],
            },
            {
              id: 'main-6',
              authorId: 'eyaaa',
              date: new Date('2024-12-04T12:41:00'),
              content: 'just applied, waiting for the verification 🤞',
            },
            {
              id: 'main-7',
              authorId: 'flamenate',
              date: new Date('2025-02-19T21:15:00'),
              content:
                "tried the emotion detection demo from Saturday's AI formation. it found an angry face... on my bed 💀",
              attachments: [
                {
                  src: '/media/pictures/screenshots/screenshot_computer_vision_first_time.webp',
                  alt: 'Emotion detection demo drawing an "Angry" box on the bed behind the person',
                },
              ],
              reactions: [
                { emoji: '😂', count: 9 },
                { emoji: '💀', count: 4 },
              ],
            },
            {
              id: 'main-8',
              authorId: 'oumayma_ai',
              date: new Date('2025-02-19T21:22:00'),
              content:
                'the model is not wrong though 😭\nen vrai that pillow looks like it has seen things',
              reactions: [{ emoji: '😂', count: 6, me: true }],
            },
            {
              id: 'main-9',
              authorId: 'nadhem',
              date: new Date('2025-02-19T21:30:00'),
              content: 'Angry Pillow is our new mascot, no debate',
              reactions: [{ emoji: '🛏️', count: 5 }],
            },
            {
              id: 'main-10',
              authorId: 'chaima.js',
              date: new Date('2025-05-26T15:02:00'),
              content:
                'exams start next week and I just started a new side project instead of revising. classic',
              reactions: [{ emoji: '💀', count: 5, me: true }],
            },
            {
              id: 'main-11',
              authorId: 'eyaaa',
              date: new Date('2025-05-26T15:10:00'),
              content:
                'same. my Flutter app now has dark mode and my Analyse notes have nothing',
            },
            {
              id: 'main-12',
              authorId: 'bilelz',
              date: new Date('2025-09-15T10:00:00'),
              content:
                'Bonne rentrée tout le monde ! The new board is warming up, programme coming soon 👀',
              reactions: [{ emoji: '💙', count: 8 }],
            },
            {
              id: 'main-13',
              authorId: 'abirLO',
              date: new Date('2025-11-05T20:33:00'),
              content:
                'question: is the Azure for Students credit enough for a small ML project or will I wake up to a bill?',
            },
            {
              id: 'main-14',
              authorId: 'dhia.dev',
              date: new Date('2025-11-05T20:41:00'),
              content:
                "Azure for Students doesn't ask for a credit card, so no surprise bill. Still, set a budget alert and delete what you don't use, the credit goes fast with GPUs 😅\nDM me if you want help setting it up",
            },
            {
              id: 'main-15',
              authorId: 'abirLO',
              date: new Date('2025-11-05T20:44:00'),
              content: 'merci !!',
            },
            {
              id: 'main-16',
              authorId: 'skandar22',
              date: new Date('2026-03-07T17:20:00'),
              content:
                "the formation room projector died mid-demo AGAIN. we did the last 30 min around Firas's laptop, 25 people squinting at one screen",
              reactions: [{ emoji: '😂', count: 5 }],
            },
            {
              id: 'main-17',
              authorId: 'firas404',
              date: new Date('2026-03-07T17:24:00'),
              content: 'my laptop has never been this popular',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_screenshare.webp',
                  alt: 'Tweet: "Okaaaay let me just share my screen... okay can you see it?"',
                },
              ],
              reactions: [{ emoji: '😂', count: 8 }],
            },
            {
              id: 'main-18',
              authorId: '0mohamed',
              date: new Date('2026-11-20T18:05:00'),
              content:
                "see you all tomorrow for the Tech Day, don't be late this time 😤",
            },
            {
              id: 'main-19',
              authorId: 'maram_tn',
              date: new Date('2026-11-20T18:09:00'),
              content: 'doors open at 9, coffee at 9:01 ☕',
              reactions: [{ emoji: '☕', count: 6 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'onboarding',
          name: '🧭・onboarding',
          topic: 'Pick a track and start here.',
          messages: [
            {
              id: 'onb-1',
              authorId: 'nadhem',
              date: new Date('2024-10-10T17:00:00'),
              content:
                'Onboarding 2024–25 🧭\nThe club is organized in three tracks:\n• Mobile & Web Dev\n• AI & Data\n• Cloud & DevOps\n\nPick one (or two if you have the time). Each track has its own formations, a mentor from the board and at least one project during the year. React with your track so we can count you:\n📱 Mobile & Web   🤖 AI & Data   ☁️ Cloud & DevOps',
              reactions: [
                { emoji: '📱', count: 14 },
                { emoji: '🤖', count: 17 },
                { emoji: '☁️', count: 9 },
              ],
            },
            {
              id: 'onb-2',
              authorId: 'rouaa',
              date: new Date('2024-10-10T17:06:00'),
              content:
                'Kickoff session: Saturday 19 October, 10h, Amphi B. Bring a laptop if you have one.',
            },
            {
              id: 'onb-3',
              authorId: 'nadhem',
              date: new Date('2024-11-04T19:30:00'),
              content:
                'Board update: Flame joins the board as responsible for the Mobile & Web Dev track. Welcome aboard 💙',
              reactions: [{ emoji: '🎉', count: 11 }],
            },
            {
              id: 'onb-4',
              authorId: 'flamenate',
              date: new Date('2024-11-04T19:52:00'),
              content:
                "Thanks! Happy to take this one.\n\nMobile & Web Dev track, plan for the year:\n1. Git & GitHub (yes, properly)\n2. HTML/CSS/JS refresher, then React\n3. Mobile with React Native and Flutter\n4. Deploying your stuff so people can actually use it\n\nEvery formation ends with a small exercise, and from February we'll split into teams for a real project. If you're in the track, reply here with your level (0 = never built a website, 3 = shipped something) so I can adapt the pace.",
              reactions: [{ emoji: '🔥', count: 12 }],
            },
            {
              id: 'onb-5',
              authorId: 'skandar22',
              date: new Date('2024-11-04T20:05:00'),
              content: '1, I did a todo app with a tutorial once',
            },
            {
              id: 'onb-6',
              authorId: 'firas404',
              date: new Date('2024-11-04T20:11:00'),
              content: '2 on the backend side, 0.5 on CSS 😅',
              reactions: [{ emoji: '😂', count: 3 }],
            },
            {
              id: 'onb-7',
              authorId: 'eyaaa',
              date: new Date('2024-11-13T09:14:00'),
              content:
                "sorry I'm late! 1 for web, maybe 1.5 for mobile? I have a half-working Flutter app",
            },
            {
              id: 'onb-8',
              authorId: 'flamenate',
              date: new Date('2024-11-13T09:40:00'),
              content:
                "Perfect, half-working is how every app starts. Send me the repo when you can, I'd like to use it as the example in the mobile formation if you're ok with that",
              reactions: [{ emoji: '❤️', count: 1 }],
            },
            {
              id: 'onb-9',
              authorId: 'eyaaa',
              date: new Date('2024-11-13T09:42:00'),
              content: 'omg yes ok, just let me clean the code first 😳',
            },
            {
              id: 'onb-10',
              authorId: 'bilelz',
              date: new Date('2025-09-27T16:00:00'),
              content:
                "Onboarding 2025–26 🧭\nNew year, new board:\n• President: Bilel\n• Mobile & Web Dev: Chaima\n• AI & Data: Oumayma\n• Events & partnerships: Maram\n• Cloud & DevOps: Bilel (yes, double job)\n\nBig thanks to last year's board, Nadhem, Rouaa and Flame, for everything they built. The formation slides and the project repos are still in the GitHub org, use them.\n\nSame tracks as before, react to join:\n📱 Mobile & Web   🤖 AI & Data   ☁️ Cloud & DevOps",
              reactions: [
                { emoji: '📱', count: 19 },
                { emoji: '🤖', count: 24 },
                { emoji: '☁️', count: 11 },
                { emoji: '💙', count: 9, me: true },
              ],
            },
            {
              id: 'onb-11',
              authorId: 'abirLO',
              date: new Date('2025-10-09T12:15:00'),
              content: 'is it too late to join the AI & Data track?',
            },
            {
              id: 'onb-12',
              authorId: 'oumayma_ai',
              date: new Date('2025-10-09T12:30:00'),
              content:
                "Never too late! First session is Saturday, Python + pandas basics. If you've never used Jupyter, install VS Code with the Python and Jupyter extensions before coming",
            },
            {
              id: 'onb-13',
              authorId: 'abirLO',
              date: new Date('2025-10-09T12:33:00'),
              content: 'done ✅',
            },
            {
              id: 'onb-14',
              authorId: 'chaima.js',
              date: new Date('2026-09-26T15:00:00'),
              content:
                'Onboarding 2026–27 🧭\nWelcome to all the new GI1s (and the GI2s who finally decided to join 😏)\n\nTracks: 📱 Mobile & Web   🤖 AI & Data   ☁️ Cloud & DevOps\nReact to pick one. Kickoff on Saturday 10 October, 10h, Amphi B. Each track has a starter repo in the GitHub org, read the README before the session.',
              reactions: [
                { emoji: '📱', count: 22 },
                { emoji: '🤖', count: 27 },
                { emoji: '☁️', count: 13 },
              ],
            },
            {
              id: 'onb-15',
              authorId: 'skandar22',
              date: new Date('2026-09-26T15:20:00'),
              content:
                'read the README before the session? who are we trying to fool',
              reactions: [{ emoji: '😂', count: 7 }],
            },
            {
              id: 'onb-16',
              authorId: 'chaima.js',
              date: new Date('2026-09-26T15:22:00'),
              content: 'one day it will happen. one day.',
            },
          ],
        },
      ],
    },
    {
      id: 'learning',
      name: 'Learning',
      channels: [
        {
          type: 'text',
          id: 'formations',
          name: '🎓・formations',
          topic: 'Announcements, slides and questions about formations.',
          messages: [
            {
              id: 'form-1',
              authorId: 'flamenate',
              date: new Date('2024-11-23T10:00:00'),
              content:
                "Formation #1: Git & GitHub 🌱\nToday 14h, Formation Room (and on voice for those at home).\nInstall Git and VS Code before coming, and create a GitHub account if you don't have one. We'll cover commits, branches, pull requests, and how to fix the merge conflict you will definitely create.",
              reactions: [{ emoji: '👍', count: 10 }],
            },
            {
              id: 'form-2',
              authorId: '0mohamed',
              date: new Date('2024-11-23T16:48:00'),
              content:
                'thanks for the session! the part with two people editing the same line was chaos but I finally get what a merge conflict is',
            },
            {
              id: 'form-3',
              authorId: 'flamenate',
              date: new Date('2024-11-23T16:55:00'),
              content:
                'That was the point 😄\nExercise for next week: fork the club exercises repo, add your name to CONTRIBUTORS.md and open a PR. I review everything on Sunday.',
              reactions: [{ emoji: '✅', count: 8 }],
            },
            {
              id: 'form-4',
              authorId: 'skandar22',
              date: new Date('2024-11-24T22:10:00'),
              content:
                'PR opened. 3 commits named "fix", "fix 2" and "final fix". I\'m not proud',
              reactions: [{ emoji: '😂', count: 6, me: true }],
            },
            {
              id: 'form-5',
              authorId: 'flamenate',
              date: new Date('2024-11-24T22:14:00'),
              content:
                "Merged. Next time we're learning git rebase -i, just for you",
              reactions: [{ emoji: '💀', count: 4 }],
            },
            {
              id: 'form-6',
              authorId: 'flamenate',
              date: new Date('2024-12-14T09:30:00'),
              content:
                "Formation #2: React from zero ⚛️\n14h, Formation Room. We'll build a small events page for the club: components, props, state, fetching data. Have Node installed please, we'll use Vite.",
              reactions: [{ emoji: '⚛️', count: 9 }],
            },
            {
              id: 'form-7',
              authorId: 'eyaaa',
              date: new Date('2024-12-14T18:02:00'),
              content:
                'useEffect ran twice and I panicked for 10 minutes before remembering StrictMode. thank you for warning us about that 😭',
              reactions: [{ emoji: '😭', count: 3 }],
            },
            {
              id: 'form-8',
              authorId: 'nadhem',
              date: new Date('2025-02-15T09:00:00'),
              content:
                'AI & Data formation: intro to computer vision with Python and OpenCV 👁️\n14h, Formation Room. Face detection and a tiny emotion classifier. Laptop with Python 3 installed, webcam recommended.',
              reactions: [{ emoji: '🤖', count: 12 }],
            },
            {
              id: 'form-9',
              authorId: 'flamenate',
              date: new Date('2025-03-08T10:15:00'),
              content:
                'Formation #3: Mobile with React Native & Flutter 📱\nSame app, two ways: first in React Native with Expo, then the same screens in Flutter so you can compare. Eya kindly lent us her Flutter app as the "before" example 😄\nInstall Expo Go on your phone, and the Flutter SDK if your laptop can handle it.',
              reactions: [
                { emoji: '📱', count: 9 },
                { emoji: '❤️', count: 3 },
              ],
            },
            {
              id: 'form-10',
              authorId: 'eyaaa',
              date: new Date('2025-03-08T19:30:00'),
              content:
                'seeing my app refactored live was humbling and also really helpful. state management finally makes sense',
              reactions: [{ emoji: '💙', count: 4, me: true }],
            },
            {
              id: 'form-11',
              authorId: 'flamenate',
              date: new Date('2025-04-19T11:00:00'),
              content:
                "Formation #4: Deploying 🚀\nYour project is useless if it only runs on localhost. Today: production builds, environment variables, deploying the frontend on Azure Static Web Apps and a small Node API, plus a quick look at Lighthouse.\nThe demo site's score after optimizing images and fonts:",
              attachments: [
                {
                  src: '/media/pictures/screenshots/screenshot_lighthouse_optimized.webp',
                  alt: 'Lighthouse scores: 94 performance, 92 accessibility, 96 best practices, 92 SEO',
                },
              ],
              reactions: [{ emoji: '🔥', count: 11 }],
            },
            {
              id: 'form-12',
              authorId: 'firas404',
              date: new Date('2025-04-19T17:40:00'),
              content:
                'my API worked locally and returned 500 in prod. turns out the .env file is not magically uploaded. lesson learned',
              reactions: [{ emoji: '😂', count: 5, me: true }],
            },
            {
              id: 'form-13',
              authorId: 'flamenate',
              date: new Date('2025-04-19T17:44:00'),
              content:
                'Everyone learns that one exactly once. Slides and the recording are in the track folder 📁',
            },
            {
              id: 'form-14',
              authorId: 'dhia.dev',
              date: new Date('2025-11-15T09:00:00'),
              content:
                "Cloud & DevOps formation: Docker + GitHub Actions 🐳\n14h, Formation Room. We'll containerize a small API and set up a CI pipeline that runs the tests on every PR. Install Docker Desktop (or Docker in WSL) before coming please, the wifi won't survive 30 downloads at once.",
              reactions: [{ emoji: '🐳', count: 10 }],
            },
            {
              id: 'form-15',
              authorId: 'abirLO',
              date: new Date('2025-11-15T18:20:00'),
              content:
                'green checkmark on my first pipeline ✅ never been this happy about a tick',
              reactions: [{ emoji: '🎉', count: 6 }],
            },
            {
              id: 'form-16',
              authorId: 'chaima.js',
              date: new Date('2026-03-07T09:30:00'),
              content:
                "Mobile & Web formation: Next.js with GitHub Copilot 🤖\n14h, Formation Room. We'll build a small app with Copilot in VS Code and talk about when to trust its suggestions (and when not to). Laptop + GitHub Student Pack activated.",
              reactions: [{ emoji: '🔥', count: 13 }],
            },
            {
              id: 'form-17',
              authorId: '0mohamed',
              date: new Date('2026-03-07T17:35:00'),
              content:
                'copilot wrote half my component and I spent the other half understanding it. fair trade',
              reactions: [{ emoji: '😂', count: 4 }],
            },
            {
              id: 'form-18',
              authorId: 'oumayma_ai',
              date: new Date('2026-10-24T09:00:00'),
              content:
                "AI & Data formation: RAG 101, chat with your course PDFs 📚\n14h, Formation Room. Python, a notebook, and an Azure OpenAI key provided by the club for the session only. Keys get revoked tonight, don't even try 😌",
              reactions: [
                { emoji: '🤖', count: 15 },
                { emoji: '😂', count: 4 },
              ],
            },
          ],
        },
        { type: 'voice', id: 'formation-room', name: 'Formation Room' },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      channels: [
        {
          type: 'text',
          id: 'ongoing-projects',
          name: '🚀・ongoing-projects',
          topic: 'What the tracks are building.',
          messages: [
            {
              id: 'proj-1',
              authorId: 'flamenate',
              date: new Date('2025-02-03T20:00:00'),
              content:
                "Mobile & Web projects for this semester 🚀\nTwo teams:\n• Team A: the MTC events app (React Native). Event list, registration, QR code check-in at the door.\n• Team B: the new club website (React + Vite), with an archive of all the formations.\n\nI'll create the repos in the GitHub org tonight. Weekly sync every Sunday at 21h in voice. React to pick a team: 🅰️ / 🅱️",
              reactions: [
                { emoji: '🅰️', count: 6 },
                { emoji: '🅱️', count: 5 },
              ],
            },
            {
              id: 'proj-2',
              authorId: 'eyaaa',
              date: new Date('2025-02-03T20:04:00'),
              content: 'A!! I want to do the QR check-in',
            },
            {
              id: 'proj-3',
              authorId: 'skandar22',
              date: new Date('2025-02-03T20:10:00'),
              content: "B for me, I'll take the formations archive page",
            },
            {
              id: 'proj-4',
              authorId: 'firas404',
              date: new Date('2025-02-03T20:21:00'),
              content: 'I can do the API for both if you want, Node + Postgres',
            },
            {
              id: 'proj-5',
              authorId: 'flamenate',
              date: new Date('2025-02-03T20:25:00'),
              content:
                "Deal. Write the API contract in the repo wiki first so the frontends don't have to wait on you",
              reactions: [{ emoji: '👍', count: 3 }],
            },
            {
              id: 'proj-6',
              authorId: 'eyaaa',
              date: new Date('2025-03-23T22:47:00'),
              content:
                'QR check-in works on my phone!! scanned my own ticket 12 times to be sure',
              reactions: [{ emoji: '🎉', count: 9, me: true }],
            },
            {
              id: 'proj-7',
              authorId: 'flamenate',
              date: new Date('2025-03-23T22:55:00'),
              content:
                "Huge. Let's test it for real at the Tech Day door, we'll have around 150 people to scan 😅",
            },
            {
              id: 'proj-8',
              authorId: 'rouaa',
              date: new Date('2025-04-27T19:30:00'),
              content:
                "Retour Tech Day: the check-in app handled the whole queue, zero paper list. Bravo l'équipe A 👏",
              reactions: [{ emoji: '👏', count: 12, me: true }],
            },
            {
              id: 'proj-9',
              authorId: 'flamenate',
              date: new Date('2025-06-22T21:10:00'),
              content:
                'End of year wrap-up from the Mobile & Web track:\n• Events app: used at the Tech Day, repo cleaned and documented\n• Club website: live, formations archive included\n• 4 formations, around 30 people in the track\n\nThank you all, it was a really fun year. The repos stay in the org, and whoever takes the track next year will find everything in the READMEs. Good luck for the exams 💙',
              reactions: [
                { emoji: '💙', count: 16 },
                { emoji: '🫡', count: 7 },
              ],
            },
            {
              id: 'proj-10',
              authorId: 'eyaaa',
              date: new Date('2025-06-22T21:18:00'),
              content:
                'thank you for everything, I learned more here than in a whole semester 🥹',
              reactions: [{ emoji: '❤️', count: 6, me: true }],
            },
            {
              id: 'proj-11',
              authorId: 'chaima.js',
              date: new Date('2025-10-20T21:00:00'),
              content:
                "Mobile & Web project 2025–26: we're taking last year's events app and adding push notifications + an admin dashboard. Eya, you know the QR part best, want to co-lead?",
            },
            {
              id: 'proj-12',
              authorId: 'eyaaa',
              date: new Date('2025-10-20T21:07:00'),
              content:
                'YES. finally a chance to rewrite the code I wrote at 2am',
              reactions: [{ emoji: '😂', count: 4 }],
            },
            {
              id: 'proj-13',
              authorId: 'bilelz',
              date: new Date('2026-03-20T19:00:00'),
              content:
                'MTC Hackathon 2026 🏁\n48h, 17 to 19 April, theme: tech for the campus. Teams of 3 to 4, mixed tracks strongly encouraged. Post your team name and members here before the 10th.',
              reactions: [{ emoji: '🔥', count: 14 }],
            },
            {
              id: 'proj-14',
              authorId: '0mohamed',
              date: new Date('2026-03-20T19:20:00'),
              content:
                'Team "Angry Pillow": me, Abir, Skandar and Dhia. AI + mobile + cloud, every track covered',
              reactions: [
                { emoji: '😂', count: 8 },
                { emoji: '🛏️', count: 3 },
              ],
            },
            {
              id: 'proj-15',
              authorId: 'skandar22',
              date: new Date('2026-04-18T03:12:00'),
              content:
                "hour 17. the backend works. the frontend works. they don't work together",
              attachments: [
                {
                  src: '/media/pictures/memes/meme_grind.webp',
                  alt: 'Meme: a "Grind off" button, captioned "The one button I won\'t push"',
                },
              ],
              reactions: [{ emoji: '💀', count: 6 }],
            },
            {
              id: 'proj-16',
              authorId: 'dhia.dev',
              date: new Date('2026-04-18T03:20:00'),
              content: "CORS. it's always CORS. pushing a fix",
              reactions: [{ emoji: '🙏', count: 3 }],
            },
            {
              id: 'proj-17',
              authorId: 'bilelz',
              date: new Date('2026-04-19T18:30:00'),
              content:
                'Hackathon results 🏆\n1st: Angry Pillow, study room occupancy tracker (camera counting + mobile app)\n2nd: NullPointers, lost & found app for the campus\n3rd: Byte Me, timetable assistant bot on Teams\n\nThanks to all 11 teams, and to the mentors who stayed up with you. Winners, start polishing, Imagine Cup is waiting 👀',
              reactions: [
                { emoji: '🏆', count: 14 },
                { emoji: '🎉', count: 10 },
              ],
            },
            {
              id: 'proj-18',
              authorId: 'abirLO',
              date: new Date('2026-04-19T18:41:00'),
              content: "we're still in shock 😭 merci à tous",
              reactions: [{ emoji: '❤️', count: 9 }],
            },
          ],
        },
      ],
    },
    {
      id: 'board-room',
      name: 'Board',
      channels: [
        {
          type: 'text',
          id: 'event-preparation',
          name: '📋・event-preparation',
          locked: true,
          messages: [
            {
              id: 'prep-1',
              authorId: 'maram_tn',
              date: new Date('2026-11-10T20:00:00'),
              content:
                'Board only. The Tech Day checklist, speaker list and budget are in the shared drive.',
            },
          ],
        },
      ],
    },
    {
      id: 'conference',
      name: 'Conference',
      channels: [
        {
          type: 'text',
          id: 'conference-chat',
          name: '🎙️・conference-chat',
          topic: 'Everything about the MTC Tech Day.',
          messages: [
            {
              id: 'conf-1',
              authorId: 'rouaa',
              date: new Date('2025-04-01T18:00:00'),
              content:
                'MTC Tech Day 2025 🎙️\nSaturday 26 April, Amphi A, ENIS.\nTalks on cloud, AI and web, a panel with alumni working in the industry, and a mini job fair. Free for ENIS students. Registration through the new events app, made by our own members 😉',
              reactions: [{ emoji: '🔥', count: 15, me: true }],
            },
            {
              id: 'conf-2',
              authorId: 'flamenate',
              date: new Date('2025-04-01T18:12:00'),
              content:
                "Mobile & Web track: we need 6 volunteers for check-in and 2 for the live demo corner. Reply here if you're in",
            },
            {
              id: 'conf-3',
              authorId: 'eyaaa',
              date: new Date('2025-04-01T18:14:00'),
              content: 'check-in obviously 😎',
            },
            {
              id: 'conf-4',
              authorId: 'skandar22',
              date: new Date('2025-04-01T18:20:00'),
              content: 'demo corner',
            },
            {
              id: 'conf-5',
              authorId: 'nadhem',
              date: new Date('2025-04-26T08:15:00'),
              content:
                'Doors open in 45 min. Volunteers to the entrance please, badges are on the table next to the coffee',
            },
            {
              id: 'conf-6',
              authorId: '0mohamed',
              date: new Date('2025-04-26T13:05:00'),
              content:
                'the careers panel was so good, especially the part about internships abroad. will the slides be shared?',
            },
            {
              id: 'conf-7',
              authorId: 'rouaa',
              date: new Date('2025-04-26T13:20:00'),
              content: "Yes, we'll post them once the speakers approve 👍",
            },
            {
              id: 'conf-8',
              authorId: 'flamenate',
              date: new Date('2025-04-26T21:40:00'),
              content:
                'Thank you to everyone who came, and to the volunteers who stood at the door all morning. Around 150 check-ins with the app and not a single crash. Proud of this one 💙',
              reactions: [
                { emoji: '💙', count: 13 },
                { emoji: '👏', count: 6 },
              ],
            },
            {
              id: 'conf-9',
              authorId: 'maram_tn',
              date: new Date('2026-10-26T18:00:00'),
              content:
                'MTC Tech Day 2026 🎙️\nSaturday 21 November, Amphi A.\nThis year: AI agents, cloud-native apps, a hands-on GitHub Copilot workshop, and a panel with MTC alumni. Registration is open in the events app, 200 places only.',
              reactions: [
                { emoji: '🔥', count: 19 },
                { emoji: '🎙️', count: 7 },
              ],
            },
            {
              id: 'conf-10',
              authorId: 'abirLO',
              date: new Date('2026-10-26T18:14:00'),
              content: 'is the workshop ok for beginners too?',
            },
            {
              id: 'conf-11',
              authorId: 'maram_tn',
              date: new Date('2026-10-26T18:20:00'),
              content: "Yes! Bring a laptop and a GitHub account, that's all",
            },
            {
              id: 'conf-12',
              authorId: '0mohamed',
              date: new Date('2026-11-21T10:42:00'),
              content: 'Amphi A is FULL. people are sitting on the stairs 😳',
              reactions: [{ emoji: '🔥', count: 9 }],
            },
            {
              id: 'conf-13',
              authorId: 'firas404',
              date: new Date('2026-11-21T15:30:00'),
              content:
                'the agents talk was the best one imo. went home with 4 project ideas and 0 time',
              reactions: [{ emoji: '😂', count: 5 }],
            },
            {
              id: 'conf-14',
              authorId: 'bilelz',
              date: new Date('2026-11-21T22:10:00'),
              content:
                'Thank you all for today 💙\n200 seats, way more people than that, and amazing speakers. Special thanks to the volunteers and to the alumni who came back for the panel. Photos and slides coming this week.',
              reactions: [
                { emoji: '💙', count: 18 },
                { emoji: '🙌', count: 9 },
              ],
            },
            {
              id: 'conf-15',
              authorId: 'chaima.js',
              date: new Date('2026-11-22T10:15:00'),
              content:
                'the feedback form is up in the events app. 2 minutes please, it really helps for next year 🙏',
              reactions: [{ emoji: '✅', count: 8 }],
            },
          ],
        },
        { type: 'voice', id: 'conference-room', name: 'Conference Room' },
      ],
    },
  ],
}
