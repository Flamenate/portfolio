import type { Server } from '@/lib/concord/types'

export const teia: Server = {
  id: 'teia',
  name: 'TEIA',
  icon: '/media/concord/teia.webp',
  roles: [
    { id: 'server-owner', name: 'Server Owner', color: '#f1c40f' },
    { id: 'board', name: 'Board', color: '#e74c3c' },
    { id: 'admin', name: 'Admin', color: '#e67e22' },
    { id: 'moderator', name: 'Moderator', color: '#3498db' },
    { id: 'event-team', name: 'Event Team', color: '#9b59b6' },
    { id: 'artist', name: 'Artist', color: '#1abc9c' },
    { id: 'karaoke-star', name: 'Karaoke Star', color: '#ff6b9d' },
    { id: 'member', name: 'Member', color: '#95a5a6' },
    { id: 'bots', name: 'Bots', color: '#5865f2' },
  ],
  members: [
    { userId: 'flamenate', roleIds: ['server-owner', 'board', 'event-team'] },
    { userId: 'kaiser', roleIds: ['board', 'event-team'] },
    { userId: 'exkuma', roleIds: ['admin'] },
    { userId: 'veldora', roleIds: ['member'] },
    { userId: 'leila', roleIds: ['event-team'] },
    { userId: 'amir', roleIds: ['moderator'] },
    { userId: 'l.lawliet', roleIds: ['karaoke-star'] },
    { userId: 'kawaii', roleIds: ['event-team', 'karaoke-star'] },
    { userId: 'bushmaster', roleIds: ['event-team'] },
    { userId: 'mako8481', roleIds: ['event-team'] },
    { userId: 'liza', roleIds: ['artist'] },
    { userId: 'sugarplum', roleIds: ['artist'] },
    { userId: 'nezukoChan', roleIds: ['artist'] },
    { userId: 'reya', roleIds: ['moderator, karaoke-star'] },
    { userId: 'senpaiNoticeMe', roleIds: ['karaoke-star'] },
    { userId: 'kingdynamight', roleIds: ['member'] },
    { userId: 'hunYan', roleIds: ['bots'] },
    { userId: 'ennissay', roleIds: ['member'] },
    { userId: 'meliodasGuy11', roleIds: ['member'] },
    { userId: 'zoroLost', roleIds: ['member'] },
    { userId: 'gojo_satoru99', roleIds: ['member'] },
    { userId: 'itachi.uchiha', roleIds: ['member'] },
    { userId: 'mee6', roleIds: ['bots'] },
    { userId: 'counter', roleIds: ['bots'] },
    { userId: 'mudae', roleIds: ['bots'] },
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
          topic: 'Read before posting.',
          messages: [
            {
              id: 'rules-1',
              authorId: 'flamenate',
              date: new Date('2017-09-09T21:00:00'),
              content:
                "Welcome to TEIA — Twensa Eli Ihebou Anime 🇹🇳\nThe Facebook group has been home to Tunisian anime fans since 2011, and this server is our new place to hang out live. A few rules so it stays fun for everyone:\n\n1. Be respectful. No insults, no harassment, no hate speech. Arguing about best girl is fine, attacking people is not.\n2. No NSFW content, anywhere. This is an all-ages community.\n3. Spoilers need a warning, and nothing at all in the first 48 hours after an episode airs.\n4. Keep channels on topic: art in art-room, games in gaming, bot spam in bot-commands.\n5. No piracy links. Talk about where to watch, don't post the links.\n6. No ads or self-promo without asking the staff first.\n7. Derja, English, French, Arabic, all welcome. Just keep it readable for others.\n8. Staff decisions are final. If something bothers you, DM a moderator instead of arguing in public.\n\nHave fun and welcome home ✨",
              reactions: [
                { emoji: '✅', count: 48 },
                { emoji: '❤️', count: 12 },
              ],
            },
            {
              id: 'rules-2',
              authorId: 'flamenate',
              date: new Date('2020-04-02T19:30:00'),
              content:
                "Rules update (April 2020) — we are a lot more people now, so a few additions:\n\n9. Voice channels: during watchalongs and karaoke, the host runs the show. Stay muted unless it's your turn.\n10. Counting: one number per message, and never two in a row by the same person.\n11. Mudae and other bot commands only in bot-commands.\n12. Event registrations go through the official forms only, never through DMs.\n\nThanks for keeping TEIA the chillest place on Tunisian internet 🙏",
              reactions: [{ emoji: '👍', count: 31 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'reception',
          name: '🛎️・reception',
          topic: 'Say hi to the newcomers 👋',
          messages: [
            {
              id: 'reception-1',
              authorId: 'mee6',
              date: new Date('2017-09-12T18:41:00'),
              content:
                'Hey Kawaii, welcome to TEIA! 🎉 You are member #23. Read the rules and introduce yourself in main-chat.',
            },
            {
              id: 'reception-2',
              authorId: 'flamenate',
              date: new Date('2017-09-12T18:44:00'),
              content:
                "Welcome Kawaii! Grab a seat, we're still decorating the place 😄",
              reactions: [{ emoji: '👋', count: 2 }],
            },
            {
              id: 'reception-3',
              authorId: 'kawaii',
              date: new Date('2017-09-12T18:46:00'),
              content:
                'hiii ✨ came straight from the facebook group, this is so cute already',
            },
            {
              id: 'reception-4',
              authorId: 'mee6',
              date: new Date('2020-04-03T22:17:00'),
              content:
                'Hey Mako, welcome to TEIA! 🎉 You are member #1,612. Read the rules and introduce yourself in main-chat.',
            },
            {
              id: 'reception-5',
              authorId: 'leila',
              date: new Date('2020-04-03T22:20:00'),
              content:
                'Welcome Mako! Watchalong is every Friday at 21:00 and karaoke on Saturdays, check announcements 🍿',
            },
            {
              id: 'reception-6',
              authorId: 'mako8481',
              date: new Date('2020-04-03T22:23:00'),
              content:
                'thank you!! a friend sent me the link, quarantine is way less boring already',
            },
            {
              id: 'reception-7',
              authorId: 'mee6',
              date: new Date('2021-02-14T16:05:00'),
              content:
                'Hey Gojo, welcome to TEIA! 🎉 You are member #2,876. Read the rules and introduce yourself in main-chat.',
            },
            {
              id: 'reception-8',
              authorId: 'gojo_satoru99',
              date: new Date('2021-02-14T16:07:00'),
              content:
                'yo. throughout heaven and earth, I alone am the new guy',
              reactions: [{ emoji: '😂', count: 9 }],
            },
            {
              id: 'reception-9',
              authorId: 'kingdynamight',
              date: new Date('2021-02-14T16:09:00'),
              content: 'oh no. another Gojo. that makes four',
            },
            {
              id: 'reception-10',
              authorId: 'mee6',
              date: new Date('2022-11-05T20:32:00'),
              content:
                'Hey Senpai, welcome to TEIA! 🎉 You are member #4,310. Read the rules and introduce yourself in main-chat.',
            },
            {
              id: 'reception-11',
              authorId: 'reya',
              date: new Date('2022-11-05T20:36:00'),
              content:
                "Welcome Senpai! If you sing, karaoke is Saturday night on Karaoke Stage. If you don't sing, come anyway, we need an audience 🎤",
            },
            {
              id: 'reception-12',
              authorId: 'mee6',
              date: new Date('2026-11-21T14:12:00'),
              content:
                'Hey Itachi, welcome to TEIA! 🎉 You are member #6,108. Read the rules and introduce yourself in main-chat.',
            },
            {
              id: 'reception-13',
              authorId: 'leila',
              date: new Date('2026-11-21T14:15:00'),
              content:
                'Welcome Itachi! Good timing, check the latest announcement, The Casino is coming in December 🎰',
            },
            {
              id: 'reception-14',
              authorId: 'itachi.uchiha',
              date: new Date('2026-11-21T14:19:00'),
              content:
                'thanks. joining right before the event was all part of my plan',
              reactions: [{ emoji: '😂', count: 5, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'announcements',
          name: '📢・announcements',
          topic: 'Official TEIA news.',
          messages: [
            {
              id: 'announcements-1',
              authorId: 'flamenate',
              date: new Date('2017-09-10T20:00:00'),
              content:
                'TEIA finally has a Discord server! 🎉\n\nThe Facebook group has been around since 2011, and it was about time we had a place to chat live, watch anime together and play games without 300 comments under one post. Invite your friends from the group, read the rules, and say hi in main-chat.\n\nVoice channels are open, first watchalong this weekend. More to come.',
              reactions: [
                { emoji: '🎉', count: 34 },
                { emoji: '❤️', count: 21 },
              ],
            },
            {
              id: 'announcements-2',
              authorId: 'kaiser',
              date: new Date('2019-06-22T19:00:00'),
              content:
                'We just passed 1,000 members on Discord 🥳\n\nThank you all. To celebrate: special Saturday watchalong (Your Name, by popular demand), a karaoke night after it, and new roles. Artists and karaoke regulars, DM the staff to get your role.',
              reactions: [
                { emoji: '🥳', count: 57 },
                { emoji: '🎤', count: 14 },
              ],
            },
            {
              id: 'announcements-3',
              authorId: 'flamenate',
              date: new Date('2020-03-16T21:00:00'),
              content:
                "Stay home, stay safe 🏠\n\nWith everything closed, TEIA moves online full time. Starting this week:\n- Watchalong every Friday at 21:00 in Watchalong Theater\n- Karaoke night every Saturday at 22:00 on Karaoke Stage\n- Gaming nights on Gaming 1 and Gaming 2 whenever you want\n\nTake care of your families, wash your hands, and watch anime. We'll get through this together.",
              reactions: [
                { emoji: '❤️', count: 88, me: true },
                { emoji: '🙏', count: 40 },
              ],
            },
            {
              id: 'announcements-4',
              authorId: 'flamenate',
              date: new Date('2020-08-10T20:00:00'),
              content:
                "GOLDEN EXPERIENCE ✨\n\nOur first big online event, organized together with our friends from Japano-Sfaxian Culture! Two days of anime from your own room:\n- Cosplay contest (photo submissions)\n- Drawing contest\n- Anime quiz\n- Karaoke battle\n- Gaming tournaments\n\nAll the details and registration forms are in events. Cafés are closed, but the community isn't 💛",
              reactions: [
                { emoji: '✨', count: 112 },
                { emoji: '🔥', count: 64 },
              ],
            },
            {
              id: 'announcements-5',
              authorId: 'flamenate',
              date: new Date('2021-03-08T20:00:00'),
              content:
                'CYCON 🌐\n\nAfter Golden Experience, we teamed up with Japano-Sfaxian Culture again, and this time all the major Tunisian anime associations are joining in. One online convention, the whole community together.\n\nPanels, cosplay, drawing, quizzes, karaoke and tournaments, hosted across all the partner servers. Schedule and registration in events. See you there!',
              reactions: [
                { emoji: '🌐', count: 97 },
                { emoji: '❤️', count: 71 },
              ],
            },
            {
              id: 'announcements-6',
              authorId: 'flamenate',
              date: new Date('2021-11-20T18:00:00'),
              content:
                "TEIA is 10 years old 🎂\n\nWhat started in 2011 as a small Facebook group for Tunisians who love anime is now the biggest anime community in the country. Thank you to everyone who posted, organized, sang, drew, cosplayed, or just showed up to a watchalong at 2 a.m.\n\nHere's to the next 10 years.",
              reactions: [
                { emoji: '🎂', count: 143 },
                { emoji: '❤️', count: 96 },
              ],
            },
            {
              id: 'announcements-7',
              authorId: 'flamenate',
              date: new Date('2026-11-20T20:00:00'),
              content:
                'Something is coming in December... 🎰\n\nTEIA presents: THE CASINO\nVirtual chips, blackjack and roulette tables run by our own bot, and anime-themed prizes for the luckiest players. 100% free, no real money, just vibes and bragging rights.\n\nDate, rules and prize list very soon. Start practicing your poker face.',
              reactions: [
                { emoji: '🎰', count: 86 },
                { emoji: '🔥', count: 41 },
                { emoji: '👀', count: 33 },
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
          topic: 'Anime, manga and everything in between.',
          messages: [
            {
              id: 'main-chat-1',
              authorId: 'amir',
              date: new Date('2017-10-14T22:10:00'),
              content:
                "is anyone else watching The Ancient Magus' Bride or is it just me",
            },
            {
              id: 'main-chat-2',
              authorId: 'kawaii',
              date: new Date('2017-10-14T22:13:00'),
              content: 'me!! Chise deserves the world',
            },
            {
              id: 'main-chat-3',
              authorId: 'flamenate',
              date: new Date('2017-10-14T22:15:00'),
              content:
                'Made in Abyss broke me this summer, I need something calmer. Adding it to the list',
            },
            {
              id: 'main-chat-4',
              authorId: 'bushmaster',
              date: new Date('2019-08-11T00:41:00'),
              content: 'EPISODE 19. HINOKAMI KAGURA. I am not okay',
              reactions: [{ emoji: '🔥', count: 23, me: true }],
            },
            {
              id: 'main-chat-5',
              authorId: 'exkuma',
              date: new Date('2019-08-11T00:44:00'),
              content: "ufotable's budget should be illegal",
            },
            {
              id: 'main-chat-6',
              authorId: 'kaiser',
              date: new Date('2020-05-04T15:22:00'),
              content:
                'quarantine day 50: caught up on One Piece all the way to Wano. 900+ episodes. ask me anything',
            },
            {
              id: 'main-chat-7',
              authorId: 'zoroLost',
              date: new Date('2020-05-04T15:26:00'),
              content:
                'I tried to get to Wano too but ended up in Dressrosa again',
              reactions: [{ emoji: '😂', count: 17 }],
            },
            {
              id: 'main-chat-8',
              authorId: 'gojo_satoru99',
              date: new Date('2021-03-28T23:58:00'),
              content:
                "JJK ep 24 is out and I'm already in withdrawal. movie when",
            },
            {
              id: 'main-chat-9',
              authorId: 'meliodasGuy11',
              date: new Date('2021-03-29T00:03:00'),
              content:
                'meanwhile AoT final season out here destroying everyone every Sunday',
            },
            {
              id: 'main-chat-10',
              authorId: 'sugarplum',
              date: new Date('2022-10-19T18:30:00'),
              content:
                'me explaining shipping to my little cousin after Chainsaw Man ep 2',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_ships.webp',
                  alt: 'Ships meme',
                },
              ],
              reactions: [{ emoji: '💀', count: 26, me: true }],
            },
            {
              id: 'main-chat-11',
              authorId: 'veldora',
              date: new Date('2022-10-19T18:37:00'),
              content:
                'KICK BACK has been on repeat for a week. Kenshi Yonezu cooked',
            },
            {
              id: 'main-chat-12',
              authorId: 'hunYan',
              date: new Date('2023-10-27T21:05:00'),
              content:
                "Frieren is so quiet and so good. a 1000-year-old elf learning to care about people, I wasn't ready",
              reactions: [{ emoji: '🥹', count: 14 }],
            },
            {
              id: 'main-chat-13',
              authorId: 'l.lawliet',
              date: new Date('2024-01-14T13:40:00'),
              content:
                'Solo Leveling anime finally. the manhwa readers in here are about to become unbearable',
            },
            {
              id: 'main-chat-14',
              authorId: 'ennissay',
              date: new Date('2024-01-14T13:44:00'),
              content: 'we were unbearable before, now we have proof 😌',
            },
            {
              id: 'main-chat-15',
              authorId: 'kingdynamight',
              date: new Date('2026-11-21T19:02:00'),
              content:
                "yo who's joining The Casino?? I'm going all in on the first roulette spin",
            },
            {
              id: 'main-chat-16',
              authorId: 'hunYan',
              date: new Date('2026-11-21T19:05:00'),
              content:
                'gambling arc. Kakegurui watchalong before the event when 👀',
              reactions: [{ emoji: '🎰', count: 8 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'art-room',
          name: '🎨・art-room',
          topic: 'Fanart, WIPs and art contests.',
          messages: [
            {
              id: 'art-room-1',
              authorId: 'liza',
              date: new Date('2018-03-02T17:20:00'),
              content:
                'first time posting here 🙈 a quick Mikasa pencil sketch, be gentle please',
              reactions: [{ emoji: '😍', count: 11, me: true }],
            },
            {
              id: 'art-room-2',
              authorId: 'flamenate',
              date: new Date('2018-03-02T17:31:00'),
              content:
                'Gentle? This is great, the scarf shading is clean. Post more!',
            },
            {
              id: 'art-room-3',
              authorId: 'reya',
              date: new Date('2018-03-02T17:39:00'),
              content:
                'I keep zooming in on the scarf. it looks soft enough to wear, Mikasa would approve',
            },
            {
              id: 'art-room-4',
              authorId: 'liza',
              date: new Date('2020-05-11T16:00:00'),
              content:
                'quarantine art challenge day 12: Nezuko in watercolor. the bamboo took me longer than the whole face',
              reactions: [{ emoji: '🎋', count: 19 }],
            },
            {
              id: 'art-room-5',
              authorId: 'nezukoChan',
              date: new Date('2020-05-11T16:08:00'),
              content:
                "MY GIRL 😭 can I use it as my profile pic?? I'll credit you",
            },
            {
              id: 'art-room-6',
              authorId: 'liza',
              date: new Date('2020-05-11T16:10:00'),
              content: 'of course 💕',
            },
            {
              id: 'art-room-7',
              authorId: 'sugarplum',
              date: new Date('2020-08-25T23:12:00'),
              content:
                'Golden Experience drawing contest entry: done. Giorno with golden butterflies everywhere, had to match the event name',
              reactions: [{ emoji: '✨', count: 27, me: true }],
            },
            {
              id: 'art-room-8',
              authorId: 'reya',
              date: new Date('2020-08-25T23:20:00'),
              content:
                'golden butterflies everywhere is the correct way to enter a contest called Golden Experience. karaoke battle wants this as the poster',
            },
            {
              id: 'art-room-9',
              authorId: 'nezukoChan',
              date: new Date('2022-11-12T20:45:00'),
              content:
                'Power and Meowy digital fanart, Chainsaw Man brainrot has fully taken over',
              reactions: [{ emoji: '🐱', count: 15 }],
            },
            {
              id: 'art-room-10',
              authorId: 'reya',
              date: new Date('2022-11-12T20:53:00'),
              content:
                "Meowy's face. I would hang this above my desk immediately, Power can come too",
            },
            {
              id: 'art-room-11',
              authorId: 'liza',
              date: new Date('2023-11-03T18:22:00'),
              content:
                "Frieren and Fern under the meteor shower, 3 weeks of work. I think it's my favorite piece so far",
              reactions: [
                { emoji: '🥹', count: 22 },
                { emoji: '❤️', count: 18, me: true },
              ],
            },
            {
              id: 'art-room-12',
              authorId: 'kawaii',
              date: new Date('2023-11-03T18:30:00'),
              content:
                'Liza this needs to be printed and framed. I would buy it right now',
            },
            {
              id: 'art-room-13',
              authorId: 'reya',
              date: new Date('2023-11-03T18:38:00'),
              content:
                'we sang Yuusha last week and the whole voice chat went quiet. this meteor shower is that exact feeling, Liza',
            },
            {
              id: 'art-room-14',
              authorId: 'liza',
              date: new Date('2026-11-21T22:40:00'),
              content:
                "started the artwork for The Casino prizes: chibi anime characters as casino dealers 🎰 first sketch is Kakegurui's Yumeko, obviously",
              reactions: [{ emoji: '🃏', count: 12, me: true }],
            },
            {
              id: 'art-room-15',
              authorId: 'reya',
              date: new Date('2026-11-21T22:49:00'),
              content:
                'chibi Yumeko with that dealer smile is going to ruin people. the eyes are already dangerous and I mean that as a compliment',
            },
          ],
        },
        {
          type: 'text',
          id: 'karaoke',
          name: '🎤・karaoke',
          topic: 'Setlists and requests for karaoke nights.',
          messages: [
            {
              id: 'karaoke-1',
              authorId: 'reya',
              date: new Date('2018-12-15T21:30:00'),
              content:
                "small karaoke tonight on voice? I've been practicing Unravel for a week and I need to suffer in public",
            },
            {
              id: 'karaoke-2',
              authorId: 'reya',
              date: new Date('2020-04-04T20:00:00'),
              content:
                'Karaoke night TONIGHT at 22:00 on Karaoke Stage 🎤\nSetlist so far:\n1. Gurenge\n2. Unravel\n3. Blue Bird\n4. Silhouette\n5. Again\nDrop your requests below!',
              reactions: [{ emoji: '🎤', count: 24, me: true }],
            },
            {
              id: 'karaoke-3',
              authorId: 'kawaii',
              date: new Date('2020-04-04T20:04:00'),
              content:
                'dibs on Silhouette, I will hit every note this time (I will not)',
            },
            {
              id: 'karaoke-4',
              authorId: 'bushmaster',
              date: new Date('2020-04-04T20:09:00'),
              content:
                "someone has to do Cha-La Head-Cha-La. it's tradition. I'll do it",
              reactions: [{ emoji: '🐉', count: 11 }],
            },
            {
              id: 'karaoke-5',
              authorId: 'reya',
              date: new Date('2020-04-05T01:15:00'),
              content:
                'final count: Gurenge was sung 4 times. 4. I love this server',
              reactions: [{ emoji: '😂', count: 19 }],
            },
            {
              id: 'karaoke-6',
              authorId: 'gojo_satoru99',
              date: new Date('2021-03-13T21:48:00'),
              content:
                "request: Kaikai Kitan. I'll do the fast part, someone else takes the chorus",
            },
            {
              id: 'karaoke-7',
              authorId: 'senpaiNoticeMe',
              date: new Date('2022-11-26T22:50:00'),
              content:
                'KICK BACK is impossible. I tried, I failed, I need water',
            },
            {
              id: 'karaoke-8',
              authorId: 'reya',
              date: new Date('2023-04-22T22:10:00'),
              content:
                'Idol by YOASOBI is officially banned from karaoke until someone can actually keep up with the rap part 😭',
              reactions: [{ emoji: '⭐', count: 16, me: true }],
            },
            {
              id: 'karaoke-9',
              authorId: 'senpaiNoticeMe',
              date: new Date('2023-04-22T22:14:00'),
              content: "challenge accepted. next week. I'm training",
            },
            {
              id: 'karaoke-10',
              authorId: 'kawaii',
              date: new Date('2023-10-28T23:20:00'),
              content:
                'Yuusha from Frieren tonight was so pretty, everyone went quiet in voice',
            },
            {
              id: 'karaoke-11',
              authorId: 'reya',
              date: new Date('2026-11-14T19:00:00'),
              content:
                "karaoke is back this Saturday after a long break! 22:00, Karaoke Stage. old classics only, let's go back to 2020 energy",
              reactions: [{ emoji: '🎤', count: 21 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'gaming',
          name: '🎮・gaming',
          topic: 'Find teammates and flex your ranks.',
          messages: [
            {
              id: 'gaming-1',
              authorId: 'kingdynamight',
              date: new Date('2018-02-17T21:30:00'),
              content:
                "LoL 5v5 customs tonight? need 3 more, I'm mid, don't argue",
            },
            {
              id: 'gaming-2',
              authorId: 'amir',
              date: new Date('2018-02-17T21:36:00'),
              content: "I'll jungle. if we lose it's still your fault",
            },
            {
              id: 'gaming-3',
              authorId: 'exkuma',
              date: new Date('2020-06-06T22:15:00'),
              content:
                'got into Valorant, anyone want to learn it together? I have no idea what a Sova arrow does yet',
            },
            {
              id: 'gaming-4',
              authorId: 'meliodasGuy11',
              date: new Date('2020-09-20T23:05:00'),
              content:
                'Among Us lobby on Gaming 2, 10 slots, the impostor is definitely Mako again',
              reactions: [{ emoji: '🔪', count: 9 }],
            },
            {
              id: 'gaming-5',
              authorId: 'mako8481',
              date: new Date('2020-09-20T23:07:00'),
              content: 'I was in electrical doing tasks. I swear',
            },
            {
              id: 'gaming-6',
              authorId: 'exkuma',
              date: new Date('2020-10-12T02:10:00'),
              content: 'two weeks into Genshin and I already need this button',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_grind.webp',
                  alt: "The one button I won't push: Grind Off",
                },
              ],
              reactions: [{ emoji: '😭', count: 18, me: true }],
            },
            {
              id: 'gaming-7',
              authorId: 'hunYan',
              date: new Date('2020-10-12T02:14:00'),
              content:
                "adventure rank 35, no sleep, no regrets. who needs Zhongli? I'm saving primogems",
            },
            {
              id: 'gaming-8',
              authorId: 'bushmaster',
              date: new Date('2021-07-03T22:40:00'),
              content:
                'Gaming 1 for Rocket League? Flame says he\'s "just casual" but I don\'t believe him',
            },
            {
              id: 'gaming-9',
              authorId: 'flamenate',
              date: new Date('2024-08-17T01:22:00'),
              content:
                "okay I admit it, I'm not casual. Grand Champion finally 🚗",
              attachments: [
                {
                  src: '/media/pictures/screenshots/screenshot_rocket_league_gc_first_time.webp',
                  alt: 'Rocket League scoreboard with a Grand Champion rank',
                },
              ],
              reactions: [
                { emoji: '🏆', count: 31 },
                { emoji: '🚗', count: 12 },
              ],
            },
            {
              id: 'gaming-10',
              authorId: 'bushmaster',
              date: new Date('2024-08-17T01:25:00'),
              content: 'CASUAL he said. I knew it',
              reactions: [{ emoji: '😂', count: 14 }],
            },
            {
              id: 'gaming-11',
              authorId: 'kingdynamight',
              date: new Date('2026-11-21T16:30:00'),
              content:
                'this channel has been dead since Thursday. everyone moved to Vice City huh',
            },
            {
              id: 'gaming-12',
              authorId: 'bushmaster',
              date: new Date('2026-11-21T16:34:00'),
              content:
                'GTA 6 online with the TEIA crew this weekend, Gaming 1, bring snacks',
              reactions: [{ emoji: '🌴', count: 10, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'watchalong',
          name: '🍿・watchalong',
          topic: 'What we watch together on Fridays.',
          messages: [
            {
              id: 'watchalong-1',
              authorId: 'kaiser',
              date: new Date('2018-04-07T20:15:00'),
              content:
                "Saturday movie night: Your Name at 21:30, still haven't seen it? no excuses",
            },
            {
              id: 'watchalong-2',
              authorId: 'kaiser',
              date: new Date('2020-03-20T18:00:00'),
              content:
                'First quarantine watchalong tonight 🍿 Demon Slayer from episode 1, 21:00 in Watchalong Theater. We go 4 episodes every Friday until we catch up',
              reactions: [{ emoji: '🍿', count: 37, me: true }],
            },
            {
              id: 'watchalong-3',
              authorId: 'nezukoChan',
              date: new Date('2020-03-20T18:04:00'),
              content: 'finally my people',
            },
            {
              id: 'watchalong-4',
              authorId: 'zoroLost',
              date: new Date('2020-03-20T21:12:00'),
              content: 'which voice channel is it again',
            },
            {
              id: 'watchalong-5',
              authorId: 'leila',
              date: new Date('2020-03-20T21:13:00'),
              content: 'the one literally called Watchalong Theater, Zoro',
              reactions: [{ emoji: '😂', count: 13 }],
            },
            {
              id: 'watchalong-6',
              authorId: 'kaiser',
              date: new Date('2020-12-11T19:30:00'),
              content:
                'Tonight: Weathering With You, then a vote for what we start in January. Candidates: Jujutsu Kaisen, Re:Zero S2, or a Ghibli marathon',
            },
            {
              id: 'watchalong-7',
              authorId: 'gojo_satoru99',
              date: new Date('2021-02-19T21:05:00'),
              content: 'JJK won the vote and I had nothing to do with it 😇',
            },
            {
              id: 'watchalong-8',
              authorId: 'flamenate',
              date: new Date('2022-05-13T20:58:00'),
              content: 'me every Friday at 20:58 before starting the stream',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_screenshare.webp',
                  alt: 'Okay let me just share my screen meme',
                },
              ],
              reactions: [{ emoji: '😂', count: 29 }],
            },
            {
              id: 'watchalong-9',
              authorId: 'sugarplum',
              date: new Date('2022-05-13T21:02:00'),
              content:
                "we can see it Flame. it's Spy x Family. we're ready. Anya is ready",
            },
            {
              id: 'watchalong-10',
              authorId: 'hunYan',
              date: new Date('2023-11-10T21:40:00'),
              content:
                'the Frieren watchalong chat was so wholesome tonight. 40 people in voice crying over flowers',
              reactions: [{ emoji: '💐', count: 17 }],
            },
            {
              id: 'watchalong-11',
              authorId: 'kaiser',
              date: new Date('2026-11-21T20:10:00'),
              content:
                'by popular request: Kakegurui warm-up watchalong before The Casino, Friday 27 at 21:00. gambling arc starts now',
              reactions: [{ emoji: '🎲', count: 15, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'events',
          name: '🎉・events',
          topic: 'TEIA events and partner events.',
          messages: [
            {
              id: 'events-1',
              authorId: 'kaiser',
              date: new Date('2018-05-02T18:00:00'),
              content:
                'TEIA meetup in Tunis this Sunday afternoon 🌳 picnic at the Belvédère park, bring snacks, cards, and cosplay if you want. Everyone welcome',
              reactions: [{ emoji: '🙌', count: 22 }],
            },
            {
              id: 'events-2',
              authorId: 'kaiser',
              date: new Date('2019-12-02T19:20:00'),
              content:
                "Sento Kaishi 4: Rise of the Phoenix is happening in Sfax this month, organized by Japano-Sfaxian Culture. Greed Island theme! Who's making the trip?",
            },
            {
              id: 'events-3',
              authorId: 'flamenate',
              date: new Date('2019-12-02T19:26:00'),
              content:
                "I'll be there. A Greed Island event is the most Hunter x Hunter thing I've ever heard of",
              reactions: [{ emoji: '🃏', count: 8 }],
            },
            {
              id: 'events-4',
              authorId: 'flamenate',
              date: new Date('2020-08-12T20:00:00'),
              content:
                'GOLDEN EXPERIENCE ✨ TEIA x Japano-Sfaxian Culture\n\nRegistration is open for all competitions:\n- Cosplay (send 3 photos, any character)\n- Drawing (theme: "gold")\n- Anime quiz (live, on Event Stage)\n- Karaoke battle (live, on Karaoke Stage)\n- Valorant and LoL tournaments\n\nForms are pinned in this channel. Submissions close August 25. Prizes for every category!',
              reactions: [
                { emoji: '✨', count: 54 },
                { emoji: '🔥', count: 30 },
              ],
            },
            {
              id: 'events-5',
              authorId: 'kawaii',
              date: new Date('2020-08-12T20:07:00'),
              content: "karaoke battle?? I'm already warming up my voice",
            },
            {
              id: 'events-6',
              authorId: 'kaiser',
              date: new Date('2020-08-30T23:30:00'),
              content:
                'Golden Experience is over and it was AMAZING. Over 400 participants, a cosplay gallery that broke our Discord, and a quiz final that went to sudden death. Winners will be contacted for prizes. Thank you JSC, thank you everyone 💛',
              reactions: [{ emoji: '💛', count: 61, me: true }],
            },
            {
              id: 'events-7',
              authorId: 'flamenate',
              date: new Date('2021-03-10T19:00:00'),
              content:
                "CYCON 🌐 the online convention of Tunisian anime associations\n\nOrganized with Japano-Sfaxian Culture, and this time all the major associations are on board. What's inside:\n- Panels and talks from every association\n- Cosplay and drawing contests\n- A national anime quiz\n- Karaoke and gaming tournaments\n\nRegistration forms are pinned. One community, one convention.",
              reactions: [
                { emoji: '🌐', count: 48 },
                { emoji: '🤝', count: 35 },
              ],
            },
            {
              id: 'events-8',
              authorId: 'liza',
              date: new Date('2021-03-10T19:11:00'),
              content:
                'all the associations together? this is history being made fr',
            },
            {
              id: 'events-9',
              authorId: 'flamenate',
              date: new Date('2021-04-05T00:40:00'),
              content:
                "Cycon is a wrap. Thank you to JSC and every association that took part, to all the volunteers, and to everyone who joined from home. We'll meet in person again soon, inshallah 🤍",
              reactions: [{ emoji: '🤍', count: 57 }],
            },
            {
              id: 'events-10',
              authorId: 'bushmaster',
              date: new Date('2023-02-20T18:45:00'),
              content:
                'JSC is back with Sento Kaishi 5: Fumetsu in Sfax next month! Isekai/RPG world where you play a character. TEIA bus trip from Tunis? reply if interested',
              reactions: [{ emoji: '🚌', count: 26, me: true }],
            },
            {
              id: 'events-11',
              authorId: 'ennissay',
              date: new Date('2023-02-20T18:52:00'),
              content: "interested!! I'm bringing my adventurer cosplay",
            },
          ],
        },
        {
          type: 'text',
          id: 'counting',
          name: '🔢・counting',
          topic: "One number at a time. Don't break the chain.",
          messages: [
            {
              id: 'counting-1',
              authorId: 'hunYan',
              date: new Date('2021-06-12T21:02:00'),
              content: '4996',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-2',
              authorId: 'ennissay',
              date: new Date('2021-06-12T21:03:00'),
              content: '4997',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-3',
              authorId: 'meliodasGuy11',
              date: new Date('2021-06-12T21:05:00'),
              content: '4998',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-4',
              authorId: 'hunYan',
              date: new Date('2021-06-12T21:05:00'),
              content: '4999',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-5',
              authorId: 'kawaii',
              date: new Date('2021-06-12T21:06:00'),
              content: '5000',
              reactions: [
                { emoji: '✅', count: 1 },
                { emoji: '🎉', count: 9, me: true },
              ],
            },
            {
              id: 'counting-6',
              authorId: 'gojo_satoru99',
              date: new Date('2021-06-12T21:09:00'),
              content: '5001',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-7',
              authorId: 'zoroLost',
              date: new Date('2021-06-12T21:10:00'),
              content: '5003',
              reactions: [{ emoji: '❌', count: 1 }],
            },
            {
              id: 'counting-8',
              authorId: 'counter',
              date: new Date('2021-06-12T21:10:00'),
              content:
                'Zoro RUINED IT AT 5002!! Wrong number. The count has been reset, the next number is 1.',
            },
            {
              id: 'counting-9',
              authorId: 'ennissay',
              date: new Date('2021-06-12T21:11:00'),
              content: 'he got lost between 5001 and 5002 💀',
              reactions: [{ emoji: '💀', count: 12 }],
            },
            {
              id: 'counting-10',
              authorId: 'kingdynamight',
              date: new Date('2021-06-12T21:12:00'),
              content: '1',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-11',
              authorId: 'hunYan',
              date: new Date('2021-06-12T21:12:00'),
              content: '2',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-12',
              authorId: 'flamenate',
              date: new Date('2021-06-12T21:14:00'),
              content: '3',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-13',
              authorId: 'itachi.uchiha',
              date: new Date('2026-11-21T23:40:00'),
              content: '2847',
              reactions: [{ emoji: '✅', count: 1 }],
            },
            {
              id: 'counting-14',
              authorId: 'senpaiNoticeMe',
              date: new Date('2026-11-21T23:43:00'),
              content: '2848',
              reactions: [{ emoji: '✅', count: 1 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'bot-commands',
          name: '🤖・bot-commands',
          topic: 'Mudae, MEE6 and friends live here.',
          messages: [
            {
              id: 'bot-commands-1',
              authorId: 'mee6',
              date: new Date('2019-03-09T23:18:00'),
              content: 'GG Bushmaster, you just advanced to level 10!',
            },
            {
              id: 'bot-commands-2',
              authorId: 'kawaii',
              date: new Date('2021-01-23T22:01:00'),
              content: '$w',
            },
            {
              id: 'bot-commands-3',
              authorId: 'mudae',
              date: new Date('2021-01-23T22:01:00'),
              content:
                'Rem\nRe:Zero kara Hajimeru Isekai Seikatsu\n512 ka\nReact with any emoji to claim!',
              reactions: [{ emoji: '💖', count: 1 }],
            },
            {
              id: 'bot-commands-4',
              authorId: 'mudae',
              date: new Date('2021-01-23T22:01:00'),
              content: '💖 Kawaii and Rem are now married! 💖',
            },
            {
              id: 'bot-commands-5',
              authorId: 'gojo_satoru99',
              date: new Date('2021-01-23T22:06:00'),
              content: '$im Gojo',
            },
            {
              id: 'bot-commands-6',
              authorId: 'mudae',
              date: new Date('2021-01-23T22:06:00'),
              content:
                'Satoru Gojo\nJujutsu Kaisen\nAnimanga roulette · 1027 ka\nClaim Rank: #14\nLike Rank: #6\nBelongs to Mako',
            },
            {
              id: 'bot-commands-7',
              authorId: 'gojo_satoru99',
              date: new Date('2021-01-23T22:07:00'),
              content: 'MAKO GIVE HIM BACK',
              reactions: [{ emoji: '😂', count: 7 }],
            },
            {
              id: 'bot-commands-8',
              authorId: 'senpaiNoticeMe',
              date: new Date('2022-12-03T19:30:00'),
              content: '$m',
            },
            {
              id: 'bot-commands-9',
              authorId: 'mudae',
              date: new Date('2022-12-03T19:30:00'),
              content:
                'Kakashi Hatake\nNaruto\n348 ka\nReact with any emoji to claim!',
            },
            {
              id: 'bot-commands-10',
              authorId: 'mee6',
              date: new Date('2022-12-03T19:34:00'),
              content: 'GG Veldora, you just advanced to level 42!',
              reactions: [{ emoji: '🐉', count: 4 }],
            },
            {
              id: 'bot-commands-11',
              authorId: 'itachi.uchiha',
              date: new Date('2026-11-21T22:15:00'),
              content: '$im Itachi Uchiha',
            },
            {
              id: 'bot-commands-12',
              authorId: 'mudae',
              date: new Date('2026-11-21T22:15:00'),
              content:
                'Itachi Uchiha\nNaruto\nAnimanga roulette · 640 ka\nClaim Rank: #58\nLike Rank: #41\nBelongs to Kawaii',
            },
            {
              id: 'bot-commands-13',
              authorId: 'itachi.uchiha',
              date: new Date('2026-11-21T22:16:00'),
              content: "I've been here for one day and I'm already owned",
            },
          ],
        },
      ],
    },
    {
      id: 'voice',
      name: 'Voice',
      channels: [
        { type: 'voice', id: 'karaoke-stage', name: 'Karaoke Stage' },
        { type: 'voice', id: 'gaming-voice-1', name: 'Gaming 1' },
        { type: 'voice', id: 'gaming-voice-2', name: 'Gaming 2' },
        { type: 'voice', id: 'watchalong-theater', name: 'Watchalong Theater' },
        { type: 'voice', id: 'event-stage', name: 'Event Stage' },
      ],
    },
    {
      id: 'staff',
      name: 'Staff',
      channels: [
        {
          type: 'text',
          id: 'mods',
          name: '🛡️・mods',
          topic: 'Moderation talk.',
          messages: [
            {
              id: 'mods-1',
              authorId: 'amir',
              date: new Date('2018-09-15T20:40:00'),
              content:
                'a few spam accounts joined from the Facebook invite link tonight. I banned them and raised the verification level to medium',
            },
            {
              id: 'mods-2',
              authorId: 'flamenate',
              date: new Date('2018-09-15T20:52:00'),
              content:
                "Good call. I'll regenerate the invite link and update it in the group description",
            },
            {
              id: 'mods-3',
              authorId: 'leila',
              date: new Date('2020-04-06T11:15:00'),
              content:
                'we got almost 300 new members in two weeks. should we add a rules-accept step before people can post?',
            },
            {
              id: 'mods-4',
              authorId: 'flamenate',
              date: new Date('2020-04-06T11:30:00'),
              content:
                "Yes. MEE6 welcome in reception, react to the rules to get the Member role. I'll set it up tonight. Can you write a short pinned message explaining it?",
            },
            {
              id: 'mods-5',
              authorId: 'leila',
              date: new Date('2020-04-06T11:33:00'),
              content: 'on it 👍',
            },
            {
              id: 'mods-6',
              authorId: 'l.lawliet',
              date: new Date('2021-01-11T01:10:00'),
              content:
                'AoT final season spoilers in main-chat again an hour after the episode. Deleted and reminded people of the 48h rule. Maybe a MEE6 auto-message on Sundays?',
            },
            {
              id: 'mods-7',
              authorId: 'exkuma',
              date: new Date('2021-01-11T01:18:00'),
              content:
                'done, scheduled for every Sunday evening until the season ends',
            },
            {
              id: 'mods-8',
              authorId: 'veldora',
              date: new Date('2022-03-02T18:25:00'),
              content:
                'Mudae rolls keep leaking into main-chat. Restricted the bot to bot-commands only, the other channels are clean now',
            },
            {
              id: 'mods-9',
              authorId: 'amir',
              date: new Date('2023-09-04T21:00:00'),
              content:
                'activity dipped over the summer. do we prune inactive members?',
            },
            {
              id: 'mods-10',
              authorId: 'flamenate',
              date: new Date('2023-09-04T21:12:00'),
              content:
                "No pruning. People go quiet during exams and summer and come back for the events, that's normal. Let's just plan more watchalongs for the new season",
              reactions: [{ emoji: '👍', count: 4 }],
            },
            {
              id: 'mods-11',
              authorId: 'leila',
              date: new Date('2026-11-21T12:40:00'),
              content:
                "for The Casino: we'll need at least two mods watching the event chat during the whole thing. I'm free on the 19th",
            },
            {
              id: 'mods-12',
              authorId: 'l.lawliet',
              date: new Date('2026-11-21T12:47:00'),
              content:
                "count me in. I'll also keep an eye on anyone making alt accounts to farm chips",
              reactions: [{ emoji: '🕵️', count: 3, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'event-preparation',
          name: '📋・event-preparation',
          topic: 'Behind the scenes of TEIA events.',
          messages: [
            {
              id: 'event-preparation-1',
              authorId: 'kaiser',
              date: new Date('2020-07-18T23:05:00'),
              content:
                'call with JSC done. Golden Experience split: they handle cosplay and the quiz, we handle karaoke, drawing and the gaming tournaments. End of August, two days',
            },
            {
              id: 'event-preparation-2',
              authorId: 'flamenate',
              date: new Date('2020-07-18T23:11:00'),
              content:
                "Perfect. I'll set up the event channels, the participant role and the registration forms this week. Bushmaster, can you find tournament admins for Valorant and LoL?",
            },
            {
              id: 'event-preparation-3',
              authorId: 'bushmaster',
              date: new Date('2020-07-18T23:15:00'),
              content: 'yep, I already have 3 people in mind',
            },
            {
              id: 'event-preparation-4',
              authorId: 'kaiser',
              date: new Date('2021-02-06T22:30:00'),
              content:
                "Cycon update: every association we contacted said yes. JSC is handling the panel schedule, we're hosting the competitions and the live stage",
              reactions: [{ emoji: '🔥', count: 4, me: true }],
            },
            {
              id: 'event-preparation-5',
              authorId: 'kawaii',
              date: new Date('2021-02-06T22:36:00'),
              content:
                "I can run the karaoke battle again, I'll coordinate with the karaoke people from the other associations",
            },
            {
              id: 'event-preparation-6',
              authorId: 'kaiser',
              date: new Date('2026-11-03T21:20:00'),
              content:
                'ok Casino brainstorm 🎰 online, December, Event Stage for the live part + a temporary casino channel. what do we need?',
            },
            {
              id: 'event-preparation-7',
              authorId: 'flamenate',
              date: new Date('2026-11-03T21:28:00'),
              content:
                "Bot plan:\n- everyone starts with 1,000 virtual chips\n- blackjack and roulette tables run entirely through the bot\n- live leaderboard, top players win the prizes\n- chips are just points, no real money ever, and nothing to buy\nI'll write the bot myself",
              reactions: [{ emoji: '🤖', count: 4 }],
            },
            {
              id: 'event-preparation-8',
              authorId: 'bushmaster',
              date: new Date('2026-11-03T21:33:00'),
              content:
                'anime roulette! each number has a character. land on 13 and you get a Death Note bonus or something',
            },
            {
              id: 'event-preparation-9',
              authorId: 'kawaii',
              date: new Date('2026-11-03T21:37:00'),
              content:
                'prize ideas: a figure for first place, manga volumes, anime merch, and custom chibi art by Liza for the top 10',
            },
            {
              id: 'event-preparation-10',
              authorId: 'mako8481',
              date: new Date('2026-11-10T20:05:00'),
              content:
                "I'll beta test the bot whenever it's ready. I promise to try to break it",
            },
            {
              id: 'event-preparation-11',
              authorId: 'flamenate',
              date: new Date('2026-11-14T00:50:00'),
              content:
                'Blackjack is done and working, roulette tomorrow. Mako, test build on Tuesday',
              reactions: [{ emoji: '🃏', count: 3 }],
            },
            {
              id: 'event-preparation-12',
              authorId: 'kaiser',
              date: new Date('2026-11-16T19:45:00'),
              content:
                'date proposal: Saturday December 19, starting 20:00. after exams for most people, before the holidays',
            },
            {
              id: 'event-preparation-13',
              authorId: 'flamenate',
              date: new Date('2026-11-16T19:52:00'),
              content:
                "Works for me. I'll post the teaser in announcements this week, full rules once the bot passes testing",
              reactions: [{ emoji: '✅', count: 4 }],
            },
            {
              id: 'event-preparation-14',
              authorId: 'mako8481',
              date: new Date('2026-11-20T23:10:00'),
              content:
                'roulette test report: I lost 1,000 chips in 6 spins. the bot is working perfectly 😭',
              reactions: [{ emoji: '😂', count: 5, me: true }],
            },
          ],
        },
      ],
    },
  ],
}
