import type { Server } from '@/lib/concord/types'

export const jsc: Server = {
  id: 'jsc',
  name: 'Japano-Sfaxian Culture',
  icon: '/media/concord/jsc.webp',
  roles: [
    { id: 'president', name: 'President', color: '#dc2626' },
    { id: 'staff', name: 'Staff', color: '#f59e0b' },
    { id: 'construction', name: 'Construction Team', color: '#0ea5e9' },
    { id: 'event-prep', name: 'Event Prep', color: '#22c55e' },
    { id: 'cosplayer', name: 'Cosplayer', color: '#d946ef' },
    { id: 'member', name: 'Member', color: '#94a3b8' },
  ],
  members: [
    { userId: 'flamenate', roleIds: ['president', 'staff', 'construction'] },
    { userId: 'iphylox', roleIds: ['staff'] },
    { userId: 'slimge', roleIds: ['staff', 'event-prep'] },
    { userId: 'kaiser', roleIds: ['staff'] },
    { userId: 'mohich', roleIds: ['construction'] },
    { userId: 'frikha', roleIds: ['construction'] },
    { userId: 'tatsumi', roleIds: ['construction'] },
    { userId: 'houcemge', roleIds: ['construction'] },
    { userId: 'bushmaster', roleIds: ['event-prep'] },
    { userId: '2b2a', roleIds: ['event-prep'] },
    { userId: 'aj', roleIds: ['event-prep'] },
    { userId: 'appy', roleIds: ['construction', 'cosplayer'] },
    { userId: 'maryouma', roleIds: ['event-prep', 'cosplayer'] },
    { userId: 'yoyo88', roleIds: ['member'] },
    { userId: 'daisukigo', roleIds: ['member'] },
    { userId: 'qmine', roleIds: ['member'] },
  ],
  categories: [
    {
      id: 'uncategorized',
      name: null,
      channels: [
        {
          type: 'text',
          id: 'announcements',
          name: 'announcements',
          topic: 'Official news from JSC.',
          messages: [
            {
              id: 'announcements-1',
              authorId: 'iphylox',
              date: new Date('2019-09-14T17:00:00'),
              content:
                'Welcome to the official Japano-Sfaxian Culture server! 🎌\n\nAfter years of Facebook groups and endless Messenger chats, JSC finally has a proper home. Use this place for hangout plans, anime talk, cosplay progress and everything in between.\n\nBe kind, keep it clean, and remember why we started: friends who love anime and Japanese culture. Ahla w sahla everyone!',
              reactions: [
                { emoji: '🎌', count: 34 },
                { emoji: '❤️', count: 21, me: true },
              ],
            },
            {
              id: 'announcements-2',
              authorId: 'iphylox',
              date: new Date('2019-10-20T20:00:00'),
              content:
                "🔥 It's official: Sento Kaishi 4 – Rise of the Phoenix is coming in December!\n\nAfter the Hunter Exam, it's time to step into Greed Island. Details, schedule and contests will be posted in the Sento Kaishi 4 category. Start preparing your cosplays!",
              reactions: [
                { emoji: '🔥', count: 52, me: true },
                { emoji: '🃏', count: 18 },
              ],
            },
            {
              id: 'announcements-3',
              authorId: 'slimge',
              date: new Date('2020-03-14T21:30:00'),
              content:
                "Hey everyone. Given the COVID situation, all JSC hangouts are suspended until further notice. Stay home, stay safe, and take care of your families.\n\nThe club isn't going anywhere though: the Tatami Lounge voice channel is open every Saturday night for watch parties and chill talks. See you there 🙏",
              reactions: [
                { emoji: '🙏', count: 27 },
                { emoji: '❤️', count: 19, me: true },
              ],
            },
            {
              id: 'announcements-4',
              authorId: 'iphylox',
              date: new Date('2020-08-02T19:00:00'),
              content:
                "✨ GOLDEN EXPERIENCE ✨\n\nJSC and Twensa Eli Ihebou Anime are teaming up for our first ever online event!\n\nOne full weekend of online contests: cosplay from home, karaoke, fan art, anime quizzes and a few surprises. Registrations are open until August 20 and the event runs on the TEIA Discord.\n\nIf we can't meet, we'll bring the vibes to your room 🌟",
              reactions: [
                { emoji: '✨', count: 41 },
                { emoji: '🌟', count: 15, me: true },
              ],
            },
            {
              id: 'announcements-5',
              authorId: 'iphylox',
              date: new Date('2020-09-01T20:15:00'),
              content:
                'Golden Experience is over and... wow. Thank you to everyone who sent a cosplay, sang their heart out or stayed up for the quiz finals. Huge thanks to the TEIA team for hosting with us. Results are posted on the page 🏆',
              reactions: [
                { emoji: '🏆', count: 22 },
                { emoji: '❤️', count: 18 },
              ],
            },
            {
              id: 'announcements-6',
              authorId: 'slimge',
              date: new Date('2021-03-08T18:00:00'),
              content:
                '🌐 CYCON is coming!\n\nFor the first time, all the major anime associations of Tunisia are joining forces for one big online convention, organized by JSC and Twensa Eli Ihebou Anime. Panels, cosplay showcase, karaoke battle, art contest and inter-club quizzes.\n\nApril 3–4, online. Represent JSC well, people!',
              reactions: [
                { emoji: '🌐', count: 30 },
                { emoji: '🔥', count: 26, me: true },
              ],
            },
            {
              id: 'announcements-7',
              authorId: 'iphylox',
              date: new Date('2021-12-30T21:00:00'),
              content:
                "End of year message from the staff 🎍\n\nThese two years were hard on all of us, but we made it through. Hangouts are back, the café table is ours again, and it's time for a new chapter.\n\nStarting January, Flame takes over as JSC president. Most of you know him from the hangouts and from the last Sentos. Slim and I stay around in staff to help. New year, new president, and maybe... a fifth Sento? 👀",
              reactions: [
                { emoji: '🎉', count: 48 },
                { emoji: '👀', count: 33 },
                { emoji: '🔥', count: 25 },
              ],
            },
            {
              id: 'announcements-8',
              authorId: 'flamenate',
              date: new Date('2022-01-03T19:30:00'),
              content:
                "Hey everyone 👋\n\nThank you for the trust. JSC has always been a family before being a club, and that's not changing. First priorities: bring the weekly hangouts back, rebuild the team, and start working on something big.\n\nIf you want to help with construction, preparation or cosplay, say it in the general chat. More news soon.",
              reactions: [
                { emoji: '❤️', count: 39 },
                { emoji: '🔥', count: 22 },
              ],
            },
            {
              id: 'announcements-9',
              authorId: 'flamenate',
              date: new Date('2023-05-20T21:00:00'),
              content:
                "Every beginning has its end. Today, after 10 years of giving to the community, Japano Sfaxian Culture has reached the end of its journey.\n\nJSC started as a small club bringing together friends who loved anime and Japanese culture in general. The goal was never to organize events or anything like that. Our biggest ambition was the get-togethers, the hangouts and the good vibes.\n\nLater came the idea that we should also give something back to the community, like the other clubs did. That's how Sento Kaishi was born in March 2015, one of the first events of its kind in Sfax. To our surprise, people loved it. Many were amazed by the concept, and the requests for another edition started pouring in. We answered in less than a year with Sento Kaishi Round 2 in December 2015, and were surprised again by more than double the turnout of the first event.\n\nFrom there, JSC grew little by little. We always kept the friendship and the togetherness at the heart of the club, so anyone who joined found a new family. And of course, we never held back our new ideas from the community: Challenge Day, the third Sento where we held the Hunter Exam, and the fourth Sento where we brought Greed Island to life. All of them were born from our hangouts and late-night talks. None of these events were easy, and each came with its own problems and struggles, but each also had its own atmosphere and its own flavor.\n\nThen COVID came. Everyone stayed home, and there were no more cafés, no more hangouts, nothing at all... It was a hard time for the club, but we didn't sit still. Together with Twensa Eli Ihebou Anime, we put on two online events: Golden Experience and Cycon, which all the major associations took part in. The truth is that online was never our thing. Both events were successful, but JSC's signature wasn't there, and the usual atmosphere of preparing together was missing... And so the idea of the fifth Sento Kaishi was born.\n\nCOVID was finally winding down in 2021, and we had only just started meeting up and talking again. More importantly, we were trying to come up with something that had never been done before (as usual)... Then we remembered that we had always wanted to make an event where people become characters in a world of our own making, and feel like they're living in an isekai or an RPG. Work was slow at first and we hit a lot of bumps, but soon we found ourselves one month away from the event. That's when all of JSC's forces united behind a single goal. Everyone shared the same obsession, even people who had left came back, and we all wanted this event to succeed. Closing the club after this Sento was never part of the plan, but deep down everyone knew this was the final step...\n\nAnd so we gave you Sento Kaishi V: Fumetsu, one of the most successful events the community has ever seen, if not the best. Today, the people who sacrificed and worked so hard for it have grown up, and want to move on to bigger things in life.\n\nSo, thank you JSC, and farewell.",
              reactions: [
                { emoji: '❤️', count: 143 },
                { emoji: '😢', count: 96 },
                { emoji: '🙏', count: 71 },
                { emoji: '🔥', count: 54 },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'welcome',
          name: 'welcome',
          topic: 'Say hi and introduce yourself!',
          messages: [
            {
              id: 'welcome-1',
              authorId: 'iphylox',
              date: new Date('2019-09-14T17:10:00'),
              content:
                "Welcome to JSC! 🎌\n\nIntroduce yourself here: name, favorite anime, and how you found us. Hangouts are announced in general, events in announcements. Don't be shy, everyone here was new once.",
              reactions: [{ emoji: '👋', count: 12, me: true }],
            },
            {
              id: 'welcome-2',
              authorId: 'flamenate',
              date: new Date('2019-09-14T18:02:00'),
              content:
                'Flame here. Been coming to the hangouts for a while now, Sento Kaishi Round 2 was my first JSC event. Favorite anime: Hunter x Hunter, no debate.',
              reactions: [{ emoji: '🔥', count: 6 }],
            },
            {
              id: 'welcome-3',
              authorId: 'daisukigo',
              date: new Date('2019-09-15T11:24:00'),
              content:
                "Hi! I'm Daisukigo, I study Japanese on my own (N5 soon, inshallah). Favorite anime is Mushishi. I came for the japanese-corner channel honestly 😄",
            },
            {
              id: 'welcome-4',
              authorId: 'qmine',
              date: new Date('2019-11-02T16:40:00'),
              content:
                'hey all, Qmine here. Saw the SK4 poster at the faculty and joined. Currently watching Vinland Saga week by week',
            },
            {
              id: 'welcome-5',
              authorId: 'yoyo88',
              date: new Date('2019-12-23T22:10:00'),
              content:
                "Hello!! Just came from Rise of the Phoenix and I'm still shaking. Best day of the year. Yoyo, 19, One Piece till the end 🏴‍☠️",
              reactions: [{ emoji: '❤️', count: 9, me: true }],
            },
            {
              id: 'welcome-6',
              authorId: 'aj',
              date: new Date('2020-01-11T14:05:00'),
              content:
                'AJ here, friend of Bushmaster. Mostly into shounen and fighting games. Happy to help at the next event if you need hands',
            },
            {
              id: 'welcome-7',
              authorId: 'maryouma',
              date: new Date('2022-02-19T19:30:00'),
              content:
                "Hii, I'm Maryouma ✨ I cosplay (mostly Genshin and Demon Slayer for now). I heard JSC is preparing something big so I'm here to help with costumes!",
              reactions: [{ emoji: '✨', count: 14, me: true }],
            },
            {
              id: 'welcome-8',
              authorId: 'houcemge',
              date: new Date('2022-03-05T20:48:00'),
              content:
                "Houcem, 3rd year engineering student. I can use a jigsaw and I'm not afraid of paint. Heard you need builders?",
              reactions: [{ emoji: '🛠️', count: 8, me: true }],
            },
            {
              id: 'welcome-9',
              authorId: 'flamenate',
              date: new Date('2022-03-05T21:12:00'),
              content:
                'Welcome Houcem! The construction team will love you. Come Saturday to the workshop.',
            },
          ],
        },
      ],
    },
    {
      id: 'hang-out',
      name: 'Hang Out',
      channels: [
        {
          type: 'text',
          id: 'general',
          name: 'general',
          topic: 'Hangouts, plans and everything else.',
          messages: [
            {
              id: 'general-1',
              authorId: 'slimge',
              date: new Date('2019-09-20T18:00:00'),
              content:
                'Hangout this Saturday at the usual café, 3pm. Bring your Switch if you have one, Smash tournament round 3 🎮',
            },
            {
              id: 'general-2',
              authorId: 'mohich',
              date: new Date('2019-09-20T18:04:00'),
              content: "count me in. this time I'm not losing to Kaiser's Ness",
            },
            {
              id: 'general-3',
              authorId: 'kaiser',
              date: new Date('2019-09-20T18:31:00'),
              content: 'you said the same thing last time 😌',
              reactions: [{ emoji: '😂', count: 7, me: true }],
            },
            {
              id: 'general-4',
              authorId: 'flamenate',
              date: new Date('2019-12-22T13:15:00'),
              content:
                "Still recovering from yesterday. 600 people in Greed Island, I genuinely can't believe it",
              reactions: [{ emoji: '🔥', count: 15 }],
            },
            {
              id: 'general-5',
              authorId: 'frikha',
              date: new Date('2019-12-22T13:20:00'),
              content: 'my voice is gone from the karaoke, worth it',
            },
            {
              id: 'general-6',
              authorId: 'bushmaster',
              date: new Date('2020-04-11T22:40:00'),
              content:
                "Quarantine day 27: I've rewatched all of Gintama. Send help",
              reactions: [{ emoji: '😂', count: 11, me: true }],
            },
            {
              id: 'general-7',
              authorId: 'tatsumi',
              date: new Date('2020-04-11T22:47:00'),
              content:
                'Tatami Lounge watch party tonight? Kaguya-sama marathon',
            },
            {
              id: 'general-8',
              authorId: 'qmine',
              date: new Date('2021-06-26T17:12:00'),
              content:
                'First real hangout in more than a year today. I almost cried when I saw everyone at the café 🥲',
              reactions: [
                { emoji: '🥲', count: 17 },
                { emoji: '❤️', count: 13, me: true },
              ],
            },
            {
              id: 'general-9',
              authorId: 'flamenate',
              date: new Date('2022-01-08T15:30:00'),
              content:
                'Weekly hangouts are officially back! Every Saturday 3pm, same café, same table. New faces welcome',
            },
            {
              id: 'general-10',
              authorId: '2b2a',
              date: new Date('2022-01-08T15:44:00'),
              content: "the table that's too small for us? classic",
            },
            {
              id: 'general-11',
              authorId: 'houcemge',
              date: new Date('2022-11-12T18:20:00'),
              content: 'who took the hot glue gun home from the workshop 👀',
            },
            {
              id: 'general-12',
              authorId: 'appy',
              date: new Date('2022-11-12T18:26:00'),
              content:
                "...me. I'll bring it tomorrow I swear, my armor needed it",
            },
            {
              id: 'general-13',
              authorId: 'frikha',
              date: new Date('2023-03-12T12:05:00'),
              content: 'We did it. We actually did it. Fumetsu 不滅 🔥',
              reactions: [
                { emoji: '🔥', count: 64, me: true },
                { emoji: '❤️', count: 41 },
              ],
            },
            {
              id: 'general-14',
              authorId: 'yoyo88',
              date: new Date('2023-03-12T12:11:00'),
              content:
                "I'm still in my Bard outfit. not taking it off. this is my life now",
            },
            {
              id: 'general-15',
              authorId: 'slimge',
              date: new Date('2024-03-11T20:30:00'),
              content:
                'One year ago today we were running around the venue screaming about guild points. Miss you all',
              reactions: [
                { emoji: '❤️', count: 23 },
                { emoji: '🥲', count: 15, me: true },
              ],
            },
            {
              id: 'general-16',
              authorId: 'maryouma',
              date: new Date('2024-03-11T21:02:00'),
              content:
                'I still have my Ryo coins from Fumetsu in a box on my desk 🪙',
            },
            {
              id: 'general-17',
              authorId: 'kaiser',
              date: new Date('2025-12-21T19:00:00'),
              content:
                "Six years since Greed Island. Somebody tell me SK4 wasn't six years ago",
              reactions: [{ emoji: '😭', count: 12 }],
            },
            {
              id: 'general-18',
              authorId: 'flamenate',
              date: new Date('2025-12-21T19:26:00'),
              content:
                'Six years. I still have my Book with all the spell cards in it. Gain!',
              reactions: [{ emoji: '📖', count: 9 }],
            },
            {
              id: 'general-19',
              authorId: 'daisukigo',
              date: new Date('2026-08-15T23:10:00'),
              content:
                'Passed the JLPT N2 today. Started from the japanese-corner channel back in 2019. Thank you JSC ❤️',
              reactions: [
                { emoji: '🎉', count: 21, me: true },
                { emoji: '❤️', count: 17 },
              ],
            },
            {
              id: 'general-20',
              authorId: 'iphylox',
              date: new Date('2026-08-16T10:04:00'),
              content: 'Proud of you, sensei 🙏',
            },
          ],
        },
        {
          type: 'text',
          id: 'anime-manga',
          name: 'anime-manga',
          topic:
            'Seasonal anime, manga chapters, recommendations. Warn before spoilers.',
          messages: [
            {
              id: 'anime-manga-1',
              authorId: 'qmine',
              date: new Date('2019-10-05T21:00:00'),
              content: 'Vinland Saga this week had no right to go that hard',
            },
            {
              id: 'anime-manga-2',
              authorId: 'tatsumi',
              date: new Date('2019-10-05T21:08:00'),
              content:
                'Askeladd is the best written character of the season, fight me',
            },
            {
              id: 'anime-manga-3',
              authorId: 'daisukigo',
              date: new Date('2019-10-05T21:15:00'),
              content: 'Not fighting you on that one',
            },
            {
              id: 'anime-manga-4',
              authorId: 'bushmaster',
              date: new Date('2020-10-03T23:45:00'),
              content: 'Jujutsu Kaisen just started. MAPPA cooking again',
              reactions: [{ emoji: '🔥', count: 8 }],
            },
            {
              id: 'anime-manga-5',
              authorId: 'mohich',
              date: new Date('2021-01-10T22:30:00'),
              content: 'AoT final season every week is ruining me emotionally',
            },
            {
              id: 'anime-manga-6',
              authorId: 'flamenate',
              date: new Date('2021-01-10T22:41:00'),
              content:
                "Wait until you see the last arc. I read the manga, I'm saying nothing 🤐",
              reactions: [{ emoji: '🤐', count: 7 }],
            },
            {
              id: 'anime-manga-7',
              authorId: '2b2a',
              date: new Date('2022-04-09T20:12:00'),
              content: 'Spy x Family ep1 is out, Anya is my new reason to live',
            },
            {
              id: 'anime-manga-8',
              authorId: 'maryouma',
              date: new Date('2022-04-09T20:20:00'),
              content:
                'already planning an Anya cosplay for my little cousin 👀',
              reactions: [{ emoji: '🥜', count: 6, me: true }],
            },
            {
              id: 'anime-manga-9',
              authorId: 'aj',
              date: new Date('2022-10-12T00:30:00'),
              content:
                'Chainsaw Man opening is a masterpiece. every frame a reference',
            },
            {
              id: 'anime-manga-10',
              authorId: 'iphylox',
              date: new Date('2022-10-12T08:05:00'),
              content:
                "Also Bocchi the Rock is the surprise of the season, don't sleep on it",
            },
            {
              id: 'anime-manga-11',
              authorId: 'yoyo88',
              date: new Date('2023-01-10T19:40:00'),
              content:
                'Vinland Saga season 2 already 🌾 Qmine you were right back in 2019',
            },
            {
              id: 'anime-manga-12',
              authorId: 'qmine',
              date: new Date('2023-01-10T19:52:00'),
              content: "I'm always right about Vinland Saga",
              reactions: [{ emoji: '😌', count: 6 }],
            },
            {
              id: 'anime-manga-13',
              authorId: 'kaiser',
              date: new Date('2023-04-15T22:00:00'),
              content:
                "Hell's Paradise is giving me Hunter Exam flashbacks honestly. SK3 crew, remember the survival round?",
            },
            {
              id: 'anime-manga-14',
              authorId: 'slimge',
              date: new Date('2023-04-15T22:09:00'),
              content:
                'remember? I still have nightmares about grading those answer sheets 😂',
              reactions: [{ emoji: '😂', count: 5, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'cosplay',
          name: 'cosplay',
          topic: 'WIPs, finished cosplays, tips and fabric runs.',
          messages: [
            {
              id: 'cosplay-1',
              authorId: 'appy',
              date: new Date('2019-10-26T16:30:00'),
              content:
                "SK4 cosplay WIP: Biscuit's dress is 60% done, wig arrives next week (hopefully, customs pls)",
            },
            {
              id: 'cosplay-2',
              authorId: '2b2a',
              date: new Date('2019-10-26T16:41:00'),
              content: 'Biscuit for Greed Island is such a good pick',
            },
            {
              id: 'cosplay-3',
              authorId: 'appy',
              date: new Date('2019-12-15T13:00:00'),
              content:
                "Wig arrived. 6 days before the event. I'm fine. everything is fine 🙂",
              reactions: [{ emoji: '😂', count: 9, me: true }],
            },
            {
              id: 'cosplay-4',
              authorId: 'appy',
              date: new Date('2020-09-05T18:00:00'),
              content:
                'Lesson from the Golden Experience home cosplay round: lighting is everything. Get a cheap ring light, trust me',
            },
            {
              id: 'cosplay-5',
              authorId: 'maryouma',
              date: new Date('2022-05-21T17:20:00'),
              content:
                "Fabric run to Bab Jebli tomorrow morning, who's coming? I need red satin for a haori",
            },
            {
              id: 'cosplay-6',
              authorId: 'appy',
              date: new Date('2022-05-21T17:26:00'),
              content:
                "I'm in. We need EVA foam too, the guy at the souk said he'd have the 10mm sheets",
            },
            {
              id: 'cosplay-7',
              authorId: 'maryouma',
              date: new Date('2022-12-03T21:10:00'),
              content:
                'Question for SK5: can cosplayers join a guild while in cosplay or do we have to wear the class outfits?',
            },
            {
              id: 'cosplay-8',
              authorId: 'flamenate',
              date: new Date('2022-12-03T21:24:00'),
              content:
                "Cosplay always wins. You'll get a class badge to pin on your outfit, no need to change.",
              reactions: [{ emoji: '🙌', count: 11 }],
            },
            {
              id: 'cosplay-9',
              authorId: 'appy',
              date: new Date('2023-03-05T02:14:00'),
              content:
                "5 days left. armor painted. it's 2am. why am I like this",
              reactions: [{ emoji: '😂', count: 13, me: true }],
            },
            {
              id: 'cosplay-10',
              authorId: 'maryouma',
              date: new Date('2023-03-13T18:00:00'),
              content:
                'So proud of everyone who walked the Fumetsu stage, the level was insane this year ✨ Results are in sk5-competitions',
              reactions: [{ emoji: '✨', count: 19 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'japanese-corner',
          name: 'japanese-corner',
          topic: 'Learn Japanese together. 日本語でどうぞ!',
          messages: [
            {
              id: 'japanese-corner-1',
              authorId: 'daisukigo',
              date: new Date('2019-09-16T20:00:00'),
              content:
                'Starting a small study thread here. Word of the day: 不死鳥 (fushichou) = phoenix. Fitting for SK4 🔥',
              reactions: [{ emoji: '🔥', count: 5, me: true }],
            },
            {
              id: 'japanese-corner-2',
              authorId: 'iphylox',
              date: new Date('2019-09-16T20:12:00'),
              content: 'wait so Rise of the Phoenix in Japanese would be...?',
            },
            {
              id: 'japanese-corner-3',
              authorId: 'daisukigo',
              date: new Date('2019-09-16T20:20:00'),
              content:
                'Something like 不死鳥の復活 (fushichou no fukkatsu), "revival of the phoenix". Close enough!',
            },
            {
              id: 'japanese-corner-4',
              authorId: 'qmine',
              date: new Date('2020-05-09T15:30:00'),
              content:
                'Quarantine goal: finish hiragana and katakana. Day 3 and I already mix up シ and ツ',
            },
            {
              id: 'japanese-corner-5',
              authorId: 'daisukigo',
              date: new Date('2020-05-09T15:41:00'),
              content:
                'Everyone does! The strokes of シ go more horizontal, ツ more vertical. You got this',
            },
            {
              id: 'japanese-corner-6',
              authorId: 'flamenate',
              date: new Date('2022-08-20T22:05:00'),
              content:
                'Daisukigo, need your help for SK5. We want to call it 不滅 (fumetsu). Does it sound natural as an event title?',
            },
            {
              id: 'japanese-corner-7',
              authorId: 'daisukigo',
              date: new Date('2022-08-20T22:19:00'),
              content:
                "It's perfect. 不滅 = immortal, indestructible. And after a phoenix it makes total sense, the phoenix never dies 🔥",
              reactions: [{ emoji: '🔥', count: 12, me: true }],
            },
            {
              id: 'japanese-corner-8',
              authorId: 'daisukigo',
              date: new Date('2023-01-14T19:00:00'),
              content:
                "Translated all the class names for the badges:\nWarrior: 武士 (bushi)\nMage: 魔導士 (madoushi)\nHealer: 治癒師 (chiyushi)\nRogue: 盗賊 (touzoku)\nBard: 吟遊詩人 (gin'yuu shijin)",
              reactions: [{ emoji: '🙏', count: 9, me: true }],
            },
            {
              id: 'japanese-corner-9',
              authorId: '2b2a',
              date: new Date('2023-01-14T19:08:00'),
              content:
                'Calling the Rogues 盗賊 is so much cooler than it has any right to be',
            },
            {
              id: 'japanese-corner-10',
              authorId: 'daisukigo',
              date: new Date('2024-07-09T21:00:00'),
              content:
                'Anyone still around? Took the JLPT N3 on Sunday. Results in August, fingers crossed 🤞',
              reactions: [{ emoji: '🤞', count: 8, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'memes',
          name: 'memes',
          topic: 'Quality memes only.',
          messages: [
            {
              id: 'memes-1',
              authorId: 'bushmaster',
              date: new Date('2019-11-30T23:10:00'),
              content:
                'SK4 staff explaining the Greed Island rules for the 40th time today 💀',
            },
            {
              id: 'memes-2',
              authorId: 'mohich',
              date: new Date('2020-04-20T21:00:00'),
              content: 'me deciding to rewatch Naruto until 5am in quarantine',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_think.webp',
                  alt: 'Cat meme: think twice? I do not even think once',
                },
              ],
              reactions: [{ emoji: '😂', count: 14 }],
            },
            {
              id: 'memes-3',
              authorId: 'tatsumi',
              date: new Date('2021-03-01T22:15:00'),
              content: 'anime-manga every time someone brings up pairings',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_ships.webp',
                  alt: 'Tweet meme about ships and relationships',
                },
              ],
              reactions: [{ emoji: '💀', count: 10, me: true }],
            },
            {
              id: 'memes-4',
              authorId: '2b2a',
              date: new Date('2022-01-15T20:40:00'),
              content:
                'every single online meeting we had for Golden Experience and Cycon',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_screenshare.webp',
                  alt: 'Tweet meme about sharing your screen',
                },
              ],
              reactions: [{ emoji: '😂', count: 18, me: true }],
            },
            {
              id: 'memes-5',
              authorId: 'houcemge',
              date: new Date('2023-02-18T01:30:00'),
              content: 'construction team at 1am, three weeks before Fumetsu',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_grind.webp',
                  alt: 'The one button I will not push: grind off',
                },
              ],
              reactions: [
                { emoji: '😭', count: 15 },
                { emoji: '🛠️', count: 9, me: true },
              ],
            },
            {
              id: 'memes-6',
              authorId: 'frikha',
              date: new Date('2023-02-18T01:34:00'),
              content:
                "this is literally us right now. who's still at the workshop",
            },
            {
              id: 'memes-7',
              authorId: 'aj',
              date: new Date('2023-03-20T14:00:00'),
              content:
                'me at Fumetsu while my guild leader negotiated with the other guilds',
              attachments: [
                {
                  src: '/media/pictures/memes/meme_standing.webp',
                  alt: 'How I be standing when bro is talking to someone I do not know',
                },
              ],
              reactions: [{ emoji: '😂', count: 20 }],
            },
            {
              id: 'memes-8',
              authorId: 'qmine',
              date: new Date('2023-03-20T14:12:00'),
              content: 'the Rogues had zero honor and I respect it',
            },
          ],
        },
        { type: 'voice', id: 'tatami-lounge', name: 'Tatami Lounge' },
        { type: 'voice', id: 'karaoke-box', name: 'Karaoke Box' },
      ],
    },
    {
      id: 'staff',
      name: 'Staff',
      channels: [
        {
          type: 'text',
          id: 'staff-chat',
          name: 'staff-chat',
          topic: 'Plans, problems, decisions.',
          messages: [
            {
              id: 'staff-chat-1',
              authorId: 'iphylox',
              date: new Date('2019-12-23T23:00:00'),
              content:
                'SK4 debrief: about 600 entries. Card stations got jammed around 2pm, we need more staff per station next time. Otherwise, massive success.',
            },
            {
              id: 'staff-chat-2',
              authorId: 'slimge',
              date: new Date('2019-12-23T23:12:00'),
              content:
                "Budget closed slightly positive too. First time ever 😅 I'll send the final sheet tomorrow.",
            },
            {
              id: 'staff-chat-3',
              authorId: 'kaiser',
              date: new Date('2020-06-14T21:30:00'),
              content:
                'Talked with the TEIA board. They are up for a joint online event this summer. They handle the Discord and the bots, we handle contests and judging. Thoughts?',
            },
            {
              id: 'staff-chat-4',
              authorId: 'iphylox',
              date: new Date('2020-06-14T21:45:00'),
              content: "Let's do it. We need a name though. Something JoJo? 👀",
            },
            {
              id: 'staff-chat-5',
              authorId: 'slimge',
              date: new Date('2020-06-14T21:47:00'),
              content: 'Golden Experience. Done. No discussion.',
              reactions: [{ emoji: '✨', count: 3 }],
            },
            {
              id: 'staff-chat-6',
              authorId: 'kaiser',
              date: new Date('2020-12-05T20:00:00'),
              content:
                'For Cycon: four associations confirmed so far, the others answer this week. TEIA can host on their main server again.',
            },
            {
              id: 'staff-chat-7',
              authorId: 'iphylox',
              date: new Date('2021-11-20T22:30:00'),
              content:
                "Okay, serious topic. Slim and I can't carry the presidency another year with work. I think Flame should take over. He's at every hangout and every event, people trust him, and he has ideas.",
            },
            {
              id: 'staff-chat-8',
              authorId: 'slimge',
              date: new Date('2021-11-20T22:41:00'),
              content: "100% agree. Let's talk to him Saturday.",
            },
            {
              id: 'staff-chat-9',
              authorId: 'flamenate',
              date: new Date('2022-01-03T18:00:00'),
              content:
                'Thanks for the trust guys. First staff meeting Friday 9pm in the Staff Meeting voice. Agenda: hangouts, team, and the big question: SK5 or not?',
            },
            {
              id: 'staff-chat-10',
              authorId: 'flamenate',
              date: new Date('2022-01-07T23:58:00'),
              content:
                "Decision made: SK5 is happening. Target March 2023. It's a long way, but we'll need every week of it.",
              reactions: [{ emoji: '🔥', count: 3 }],
            },
            {
              id: 'staff-chat-11',
              authorId: 'kaiser',
              date: new Date('2023-01-22T21:00:00'),
              content:
                'TEIA will share all the SK5 posts on their pages, that part is settled.',
              reactions: [{ emoji: '🙏', count: 2, me: true }],
            },
            {
              id: 'staff-chat-12',
              authorId: 'flamenate',
              date: new Date('2023-04-29T22:10:00'),
              content:
                "Guys, can we have a real talk this weekend? About the future of JSC. Not an emergency, just something I've been thinking about since Fumetsu.",
            },
            {
              id: 'staff-chat-13',
              authorId: 'iphylox',
              date: new Date('2023-04-29T22:25:00'),
              content: 'I think I know what you mean. Same here honestly.',
            },
            {
              id: 'staff-chat-14',
              authorId: 'slimge',
              date: new Date('2023-05-13T23:40:00'),
              content:
                "Agreed then. We end on Fumetsu. Better to close at the top than fade out. Flame, you write the farewell, you've earned it.",
              reactions: [{ emoji: '❤️', count: 3 }],
            },
            {
              id: 'staff-chat-15',
              authorId: 'flamenate',
              date: new Date('2023-05-13T23:52:00'),
              content: "I'll write it. Thank you for everything, all of you.",
            },
          ],
        },
        { type: 'voice', id: 'staff-meeting', name: 'Staff Meeting' },
      ],
    },
    {
      id: 'events',
      name: 'Events',
      channels: [
        {
          type: 'text',
          id: 'event-construction-team',
          name: 'event-construction-team',
          topic: 'Props, decor and builds for Sento Kaishi 5.',
          messages: [
            {
              id: 'event-construction-team-1',
              authorId: 'flamenate',
              date: new Date('2022-02-12T17:00:00'),
              content:
                'Construction team kickoff 🛠️\n\nSK5 is an isekai world, so everything has to feel like you stepped into another world: a guild hall at the entrance, a giant world map, a quest board, class banners, shop stalls. Throw your ideas here, nothing is too crazy at this stage.',
              reactions: [{ emoji: '🛠️', count: 8 }],
            },
            {
              id: 'event-construction-team-2',
              authorId: 'mohich',
              date: new Date('2022-02-12T17:20:00'),
              content:
                'A portal at the entrance. People walk through it and get "summoned". Classic isekai truck optional 🚚',
              reactions: [{ emoji: '🚚', count: 6, me: true }],
            },
            {
              id: 'event-construction-team-3',
              authorId: 'tatsumi',
              date: new Date('2022-02-12T17:24:00'),
              content: 'The truck is NOT optional',
            },
            {
              id: 'event-construction-team-4',
              authorId: 'frikha',
              date: new Date('2022-04-02T16:10:00'),
              content:
                'Portal frame prototype done: 2.4m tall, plywood and PVC pipes. It wobbles a bit, needs a wider base.',
            },
            {
              id: 'event-construction-team-5',
              authorId: 'houcemge',
              date: new Date('2022-04-02T16:30:00'),
              content:
                "I'll add sandbag weights at the feet. Also let's paint it before the LED strips go on, not after, trust me on this",
            },
            {
              id: 'event-construction-team-6',
              authorId: 'appy',
              date: new Date('2022-06-18T19:00:00'),
              content:
                'World map plan: 3m x 2m on canvas, five regions (Ember Plains, Frost Peaks, Shadow Woods, Sky Ruins and the Capital). Each region = one zone of the venue with its own quests.',
              reactions: [{ emoji: '🗺️', count: 9, me: true }],
            },
            {
              id: 'event-construction-team-7',
              authorId: 'flamenate',
              date: new Date('2022-06-18T19:15:00'),
              content:
                "Love it. The Capital goes in the main hall with the guild hall and the stage. I'll do the floor plan this week so we know which zone gets which room.",
            },
            {
              id: 'event-construction-team-8',
              authorId: 'flamenate',
              date: new Date('2022-09-24T20:00:00'),
              content:
                'Floor plan v3 is pinned on the workshop wall. Quest board = 12 slots, rotating every hour. Mohich, can you handle the board mechanism?',
            },
            {
              id: 'event-construction-team-9',
              authorId: 'mohich',
              date: new Date('2022-09-24T20:22:00'),
              content:
                'yes, hooks and laminated quest cards. easy to swap during the event',
            },
            {
              id: 'event-construction-team-10',
              authorId: 'tatsumi',
              date: new Date('2022-12-10T18:45:00'),
              content:
                'Bought 40 meters of LED strips and 12 sheets of EVA foam. Receipts are in the staff folder.',
            },
            {
              id: 'event-construction-team-11',
              authorId: 'frikha',
              date: new Date('2023-02-11T22:00:00'),
              content:
                'One month left. Status:\nportal ✅\nworld map ✅\nquest board ✅\nguild hall counter 50%\nshop stalls 0% 😬',
            },
            {
              id: 'event-construction-team-12',
              authorId: 'flamenate',
              date: new Date('2023-02-11T22:10:00'),
              content:
                'Workshop is open every night from now on. All hands. I asked the old crew to come back too.',
            },
            {
              id: 'event-construction-team-13',
              authorId: 'iphylox',
              date: new Date('2023-02-12T15:00:00'),
              content:
                "Old crew reporting in. Haven't touched a saw since SK4 but I'm here 💪",
              reactions: [
                { emoji: '💪', count: 9, me: true },
                { emoji: '❤️', count: 7 },
              ],
            },
            {
              id: 'event-construction-team-14',
              authorId: 'slimge',
              date: new Date('2023-02-12T15:06:00'),
              content:
                'Same. Put me on the shop stalls. Also Amine and Rami from the SK1 days said they are coming Friday 😄',
            },
            {
              id: 'event-construction-team-15',
              authorId: 'houcemge',
              date: new Date('2023-02-25T01:20:00'),
              content: "Shop stalls done. All five. I can't feel my hands.",
              reactions: [{ emoji: '🙌', count: 10, me: true }],
            },
            {
              id: 'event-construction-team-16',
              authorId: 'appy',
              date: new Date('2023-03-09T23:30:00'),
              content:
                'Final checklist: everything goes in the van tomorrow at 8am. Portal first, it is the biggest.',
            },
            {
              id: 'event-construction-team-17',
              authorId: 'flamenate',
              date: new Date('2023-03-10T23:59:00'),
              content:
                'Setup done. Walked through the portal myself. It feels real. Thank you construction team, whatever happens tomorrow, you built a world 🔥',
              reactions: [
                { emoji: '🔥', count: 14 },
                { emoji: '❤️', count: 12 },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'event-preparation',
          name: 'event-preparation',
          topic:
            'Sento Kaishi 5 logistics: venue, sponsors, tickets, volunteers.',
          messages: [
            {
              id: 'event-preparation-1',
              authorId: 'flamenate',
              date: new Date('2022-02-14T21:00:00'),
              content:
                'Prep team thread for SK5. Big topics: venue, sponsors, ticketing, volunteers, the game system (classes, guilds, currency) and the schedule.\n\nSlim and Bushmaster on venue and sponsors, Maryouma and 2B2A on the game system, AJ on volunteers.',
              reactions: [{ emoji: '👍', count: 6 }],
            },
            {
              id: 'event-preparation-2',
              authorId: 'bushmaster',
              date: new Date('2022-05-07T19:30:00'),
              content:
                'Venue update: the big hall is free on March weekends 2023. Capacity is fine for 600 if we use the side rooms. They want a deposit by September.',
            },
            {
              id: 'event-preparation-3',
              authorId: 'flamenate',
              date: new Date('2022-05-07T19:42:00'),
              content: "Let's lock March 11. After exams, before Ramadan.",
              reactions: [{ emoji: '✅', count: 6 }],
            },
            {
              id: 'event-preparation-4',
              authorId: '2b2a',
              date: new Date('2022-07-16T22:15:00'),
              content:
                'Game system draft:\n- On entry you draw a class: Warrior, Mage, Healer, Rogue or Bard\n- You join one of 4 guilds\n- Quests give Ryo (the in-world currency) and guild points\n- Ryo is spent at the shops for goodies and raffle tickets\n- Top guild at the end gets crowned',
              reactions: [{ emoji: '⚔️', count: 7, me: true }],
            },
            {
              id: 'event-preparation-5',
              authorId: 'maryouma',
              date: new Date('2022-07-16T22:28:00'),
              content:
                "Add a final raid at the end of the day. Everyone fights the boss together on stage, cosplayers play the boss's minions 👀",
              reactions: [{ emoji: '👀', count: 7, me: true }],
            },
            {
              id: 'event-preparation-6',
              authorId: 'slimge',
              date: new Date('2022-10-01T18:00:00'),
              content:
                'Sponsors: two manga shops and a print shop confirmed. The print shop gives us a discount on all the banners and the Ryo bills 🙏',
            },
            {
              id: 'event-preparation-7',
              authorId: 'aj',
              date: new Date('2022-11-19T20:10:00'),
              content:
                'Volunteer form is live. 47 signups in 2 days. We need about 60 total for the zones, the entrance and the stage.',
            },
            {
              id: 'event-preparation-8',
              authorId: 'flamenate',
              date: new Date('2023-01-07T21:00:00'),
              content:
                'Ticketing: pre-sale opens Monday, 450 tickets, the rest at the door. Wristbands ordered in 5 colors, one per class.',
            },
            {
              id: 'event-preparation-9',
              authorId: 'bushmaster',
              date: new Date('2023-01-18T21:30:00'),
              content: 'Pre-sale gone in 9 days. NINE.',
              reactions: [
                { emoji: '🤯', count: 12 },
                { emoji: '🔥', count: 9, me: true },
              ],
            },
            {
              id: 'event-preparation-10',
              authorId: 'aj',
              date: new Date('2023-02-20T19:00:00'),
              content:
                'Volunteer briefing Saturday 4pm at the workshop. Every volunteer gets an NPC role and gives quests in their zone.',
            },
            {
              id: 'event-preparation-11',
              authorId: '2b2a',
              date: new Date('2023-03-04T23:00:00'),
              content:
                'Printed: 600 class badges, 30k Ryo in bills, 140 quest cards. My printer died. RIP.',
              reactions: [{ emoji: '🫡', count: 8, me: true }],
            },
            {
              id: 'event-preparation-12',
              authorId: 'flamenate',
              date: new Date('2023-03-11T07:15:00'),
              content:
                "Doors at 10. Volunteers at 8. Today we make history. Let's go JSC 🔥",
              reactions: [{ emoji: '🔥', count: 22 }],
            },
          ],
        },
      ],
    },
    {
      id: 'sk4',
      name: 'Sento Kaishi 4: Rise of the Phoenix 🔥',
      channels: [
        {
          type: 'text',
          id: 'sk4-announcements',
          name: 'sk4-announcements',
          topic: 'Official Sento Kaishi 4 news.',
          messages: [
            {
              id: 'sk4-announcements-1',
              authorId: 'iphylox',
              date: new Date('2019-10-21T19:00:00'),
              content:
                "🔥 SENTO KAISHI 4: RISE OF THE PHOENIX 🔥\n\nSaturday, December 21, 2019. Sfax.\n\nThis year, you're not attending an event. You're entering Greed Island. Every participant gets their own Book. Collect cards across the venue, complete challenges, trade with other players, and try to fill your slots before the day ends.\n\nCosplay contest, karaoke contest, stands and a lot of surprises. Tickets soon!",
              reactions: [
                { emoji: '🔥', count: 61, me: true },
                { emoji: '🃏', count: 24 },
              ],
            },
            {
              id: 'sk4-announcements-2',
              authorId: 'slimge',
              date: new Date('2019-11-25T20:00:00'),
              content:
                'Tickets are on sale! Pre-sale at the usual spots and directly from staff members. Pre-sale tickets come with an exclusive card for your Book 👀',
              reactions: [{ emoji: '🎟️', count: 19, me: true }],
            },
            {
              id: 'sk4-announcements-3',
              authorId: 'iphylox',
              date: new Date('2019-12-20T22:00:00'),
              content:
                'Tomorrow. Doors open at 10am. Bring your ticket, your energy, and charge your phone. Book! ✨',
              reactions: [{ emoji: '📖', count: 27 }],
            },
            {
              id: 'sk4-announcements-4',
              authorId: 'iphylox',
              date: new Date('2019-12-22T16:00:00'),
              content:
                'Thank you. 600 of you showed up and turned Greed Island into something real. The phoenix rose 🔥\n\nPhotos are coming soon, and please leave your feedback in sk4-feedback.',
              reactions: [
                { emoji: '❤️', count: 78 },
                { emoji: '🔥', count: 52, me: true },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'sk4-schedule',
          name: 'sk4-schedule',
          topic: 'Program for December 21, 2019.',
          messages: [
            {
              id: 'sk4-schedule-1',
              authorId: 'iphylox',
              date: new Date('2019-12-15T18:00:00'),
              content:
                '📅 SK4 PROGRAM — Saturday, December 21\n\n10:00 Doors open, Book distribution\n10:30 Greed Island starts: card stations open\n12:00 Karaoke contest (qualifiers)\n13:00 Lunch break and stands\n14:00 Cosplay contest\n16:00 Karaoke final\n17:00 Card trading hour\n18:00 Results: top players and contest winners\n18:30 Closing',
              reactions: [{ emoji: '📅', count: 14 }],
            },
            {
              id: 'sk4-schedule-2',
              authorId: 'qmine',
              date: new Date('2019-12-15T18:20:00'),
              content:
                'Is the card trading hour the only time we can trade or can we trade all day?',
            },
            {
              id: 'sk4-schedule-3',
              authorId: 'slimge',
              date: new Date('2019-12-15T18:27:00'),
              content:
                'All day! The trading hour just has special NPC trades with rare cards.',
            },
            {
              id: 'sk4-schedule-4',
              authorId: 'flamenate',
              date: new Date('2019-12-15T18:40:00'),
              content:
                'Card stations closing at 17:00 is going to be pure chaos. Love it',
              reactions: [{ emoji: '😂', count: 5 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'sk4-competitions',
          name: 'sk4-competitions',
          topic: 'Cosplay and karaoke contests.',
          messages: [
            {
              id: 'sk4-competitions-1',
              authorId: 'slimge',
              date: new Date('2019-11-10T19:00:00'),
              content:
                '🎭 COSPLAY CONTEST\nRegistrations open until December 15. Solo or group, any anime, manga or game. 2 minutes max on stage. Bonus points for Hunter x Hunter characters!\n\n🎤 KARAOKE CONTEST\nRegistrations open until December 15. Qualifiers in the morning, top 6 in the final. Anime songs only, Japanese or English versions.',
              reactions: [{ emoji: '🎤', count: 16 }],
            },
            {
              id: 'sk4-competitions-2',
              authorId: 'appy',
              date: new Date('2019-11-10T19:30:00'),
              content:
                "Registered for cosplay. You'll see Biscuit like you've never seen her 💪",
            },
            {
              id: 'sk4-competitions-3',
              authorId: 'frikha',
              date: new Date('2019-11-11T12:00:00'),
              content:
                'Signed up for karaoke. Going with Departure! from the 2011 Hunter x Hunter. no regrets',
              reactions: [{ emoji: '🔥', count: 7, me: true }],
            },
            {
              id: 'sk4-competitions-4',
              authorId: 'tatsumi',
              date: new Date('2019-11-11T12:10:00'),
              content: 'bold. respect',
            },
            {
              id: 'sk4-competitions-5',
              authorId: 'slimge',
              date: new Date('2019-12-21T19:30:00'),
              content:
                '🏆 SK4 RESULTS\n\nCosplay: 1st Appy (Biscuit), 2nd the Phantom Troupe group, 3rd a solo Killua\nKaraoke: 1st Frikha (Departure!), 2nd Yoyo (We Are!), 3rd Tatsumi (Unravel)\nGreed Island: the top player filled 87 of the 100 slots!\n\nCongrats everyone 🔥',
              reactions: [
                { emoji: '🏆', count: 33 },
                { emoji: '👏', count: 25, me: true },
              ],
            },
            {
              id: 'sk4-competitions-6',
              authorId: 'appy',
              date: new Date('2019-12-21T20:02:00'),
              content: "I'M SHAKING. Thank you all 😭",
              reactions: [{ emoji: '❤️', count: 15, me: true }],
            },
          ],
        },
        {
          type: 'text',
          id: 'sk4-photos',
          name: 'sk4-photos',
          topic: 'Photos from Rise of the Phoenix.',
          messages: [
            {
              id: 'sk4-photos-1',
              authorId: 'iphylox',
              date: new Date('2019-12-24T19:00:00'),
              content:
                '📸 The official album is up on the JSC Facebook page: 300+ photos from the entrance, the card stations, both contests and the closing. Tag yourselves!',
              reactions: [{ emoji: '📸', count: 21 }],
            },
            {
              id: 'sk4-photos-2',
              authorId: 'yoyo88',
              date: new Date('2019-12-24T19:20:00'),
              content:
                'the photo of the whole crowd yelling "Book!" at the same time is going straight to my wallpaper',
              reactions: [{ emoji: '😂', count: 8, me: true }],
            },
            {
              id: 'sk4-photos-3',
              authorId: 'flamenate',
              date: new Date('2019-12-24T19:35:00'),
              content:
                "Whoever took the shot of the phoenix banner with the light behind it, that's art",
              reactions: [{ emoji: '🔥', count: 8 }],
            },
            {
              id: 'sk4-photos-4',
              authorId: 'kaiser',
              date: new Date('2019-12-24T21:00:00'),
              content:
                'The photo team was crazy this year. TEIA shared the album too',
            },
          ],
        },
        {
          type: 'text',
          id: 'sk4-feedback',
          name: 'sk4-feedback',
          topic: 'What you loved and what we should fix.',
          messages: [
            {
              id: 'sk4-feedback-1',
              authorId: 'iphylox',
              date: new Date('2019-12-22T16:05:00'),
              content:
                'Tell us everything: what you loved, what went wrong, what we should change next time. Be honest, we read all of it.',
            },
            {
              id: 'sk4-feedback-2',
              authorId: 'daisukigo',
              date: new Date('2019-12-22T17:10:00'),
              content:
                'The Book concept was genius. It felt like actually playing. Only issue: the lines at the card stations around 2pm were long.',
            },
            {
              id: 'sk4-feedback-3',
              authorId: 'qmine',
              date: new Date('2019-12-22T17:45:00'),
              content:
                'Sound during the cosplay contest was too low at the back. Otherwise 10/10.',
            },
            {
              id: 'sk4-feedback-4',
              authorId: 'flamenate',
              date: new Date('2019-12-22T18:20:00'),
              content:
                'Best Sento so far for me. The theme carried everything. Next time maybe keep the game running during the contests, a lot of us were torn between the stage and the stations',
              reactions: [{ emoji: '💯', count: 11 }],
            },
            {
              id: 'sk4-feedback-5',
              authorId: 'bushmaster',
              date: new Date('2019-12-22T19:00:00'),
              content:
                'The food stand ran out of onigiri by 1pm. Make double next time 😭',
              reactions: [{ emoji: '🍙', count: 9, me: true }],
            },
            {
              id: 'sk4-feedback-6',
              authorId: 'iphylox',
              date: new Date('2019-12-23T10:00:00'),
              content:
                'Noted, all of it. Thank you! Station lines and sound are top of the list.',
              reactions: [{ emoji: '🙏', count: 9 }],
            },
          ],
        },
      ],
    },
    {
      id: 'sk5',
      name: 'Sento Kaishi 5: Fumetsu 不滅',
      channels: [
        {
          type: 'text',
          id: 'sk5-announcements',
          name: 'sk5-announcements',
          topic: 'Official Sento Kaishi 5 news.',
          messages: [
            {
              id: 'sk5-announcements-1',
              authorId: 'flamenate',
              date: new Date('2022-10-15T19:00:00'),
              content:
                "不滅 SENTO KAISHI 5: FUMETSU 不滅\n\nThe phoenix never dies.\n\nSaturday, March 11, 2023. Sfax.\n\nThis time, you won't just visit a world. You'll be summoned into one. Pick your class, join a guild, take on quests, earn Ryo and fight for your guild's glory. For one day, you are a character in our isekai.\n\nMore details soon. Start thinking about which class you are 👀",
              reactions: [
                { emoji: '🔥', count: 88 },
                { emoji: '⚔️', count: 41 },
                { emoji: '👀', count: 35 },
              ],
            },
            {
              id: 'sk5-announcements-2',
              authorId: 'flamenate',
              date: new Date('2022-12-17T19:00:00'),
              content:
                "⚔️ THE CLASSES\n\nWarrior, Mage, Healer, Rogue, Bard.\n\nYou'll draw your class and your guild at the entrance. Each class has its own quests and abilities during the day. Yes, Bards get bonus points in the karaoke contest. No, you can't trade classes. (Okay, maybe at the black market.)",
              reactions: [
                { emoji: '⚔️', count: 30 },
                { emoji: '😂', count: 22 },
              ],
            },
            {
              id: 'sk5-announcements-3',
              authorId: 'flamenate',
              date: new Date('2023-01-09T12:00:00'),
              content:
                '🎟️ Pre-sale is OPEN. 450 tickets, the rest at the door. Pre-sale gets you 50 bonus Ryo at the start of the game.',
              reactions: [{ emoji: '🎟️', count: 40 }],
            },
            {
              id: 'sk5-announcements-4',
              authorId: 'flamenate',
              date: new Date('2023-01-18T21:00:00'),
              content:
                'Pre-sale is SOLD OUT. Thank you! The remaining tickets will be sold at the door on March 11, first come, first served.',
              reactions: [
                { emoji: '🤯', count: 36 },
                { emoji: '🔥', count: 29 },
              ],
            },
            {
              id: 'sk5-announcements-5',
              authorId: 'flamenate',
              date: new Date('2023-03-10T21:00:00'),
              content:
                'Tomorrow, the portal opens at 10:00. Bring your ticket, your energy and your best cosplay. See you in the other world 🌀',
              reactions: [
                { emoji: '🌀', count: 45 },
                { emoji: '❤️', count: 33 },
              ],
            },
            {
              id: 'sk5-announcements-6',
              authorId: 'flamenate',
              date: new Date('2023-03-12T15:00:00'),
              content:
                'Fumetsu is over.\n\nAround 600 of you got summoned yesterday, and every single one of you brought this world to life. Congratulations to the Crimson Phoenix guild for the crown 👑 and thank you to the construction team, the prep team, the volunteers, our sponsors and everyone who came back to help in the last month.\n\nPhotos in sk5-photos, feedback in sk5-feedback. 不滅.',
              reactions: [
                { emoji: '❤️', count: 120 },
                { emoji: '🔥', count: 95 },
                { emoji: '👑', count: 40 },
              ],
            },
          ],
        },
        {
          type: 'text',
          id: 'sk5-schedule',
          name: 'sk5-schedule',
          topic: 'Program for March 11, 2023.',
          messages: [
            {
              id: 'sk5-schedule-1',
              authorId: 'flamenate',
              date: new Date('2023-03-05T19:00:00'),
              content:
                '📅 FUMETSU PROGRAM — Saturday, March 11\n\n10:00 The portal opens: class and guild draw\n10:30 Quest board opens in all five regions\n12:00 Karaoke contest (Bards get bonus points)\n13:00 Lunch, shops and black market\n14:00 Cosplay contest\n15:30 Guild trials\n16:30 Final raid on the main stage\n17:30 Guild crowning and contest results\n18:00 Closing',
              reactions: [{ emoji: '📅', count: 15 }],
            },
            {
              id: 'sk5-schedule-2',
              authorId: 'yoyo88',
              date: new Date('2023-03-05T19:14:00'),
              content: 'black market??? 👀',
            },
            {
              id: 'sk5-schedule-3',
              authorId: '2b2a',
              date: new Date('2023-03-05T19:20:00'),
              content: "You'll find it. Or it'll find you.",
              reactions: [{ emoji: '😈', count: 9, me: true }],
            },
            {
              id: 'sk5-schedule-4',
              authorId: 'qmine',
              date: new Date('2023-03-05T19:31:00'),
              content: 'Do quests stay open during the contests?',
            },
            {
              id: 'sk5-schedule-5',
              authorId: 'flamenate',
              date: new Date('2023-03-05T19:40:00'),
              content:
                'Yes, the quest board never closes until the raid. We learned from SK4 😄',
              reactions: [{ emoji: '🙌', count: 8 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'sk5-competitions',
          name: 'sk5-competitions',
          topic: 'Cosplay, karaoke and the guild ranking.',
          messages: [
            {
              id: 'sk5-competitions-1',
              authorId: 'maryouma',
              date: new Date('2023-01-28T18:00:00'),
              content:
                '🎭 COSPLAY CONTEST\nRegistrations open until March 5. Solo or group. Fantasy, isekai and RPG cosplays get a bonus! 2 minutes on stage, props allowed (no real blades please).\n\n🎤 KARAOKE CONTEST\nRegistrations open until March 5. Qualifiers in the morning, top 6 in the final. Bards get bonus points.',
              reactions: [{ emoji: '🎭', count: 21, me: true }],
            },
            {
              id: 'sk5-competitions-2',
              authorId: 'frikha',
              date: new Date('2023-01-28T18:30:00'),
              content:
                "Defending my SK4 karaoke title. Tatsumi, I'm taking Unravel this time 😈",
            },
            {
              id: 'sk5-competitions-3',
              authorId: 'tatsumi',
              date: new Date('2023-01-28T18:41:00'),
              content: "you wouldn't dare",
              reactions: [{ emoji: '😂', count: 12, me: true }],
            },
            {
              id: 'sk5-competitions-4',
              authorId: 'appy',
              date: new Date('2023-02-04T13:00:00'),
              content:
                'Registered: Tensura group cosplay with 3 friends. The Rimuru slime costume is going to be... interesting',
            },
            {
              id: 'sk5-competitions-5',
              authorId: 'maryouma',
              date: new Date('2023-03-11T19:30:00'),
              content:
                '🏆 FUMETSU RESULTS\n\nCosplay: 1st Appy & co (Tensura group), 2nd a solo Emilia (Re:Zero), 3rd Aqua from Konosuba\nKaraoke: 1st Tatsumi (Unravel, revenge served), 2nd Frikha, 3rd a Bard from the Azure Dragon guild\nGuild ranking: 1st Crimson Phoenix, 2nd Shadow Fox, 3rd Azure Dragon, 4th Iron Tortoise\n\nCongratulations to all adventurers ⚔️',
              reactions: [
                { emoji: '🏆', count: 47 },
                { emoji: '👏', count: 31, me: true },
              ],
            },
            {
              id: 'sk5-competitions-6',
              authorId: 'frikha',
              date: new Date('2023-03-11T19:45:00'),
              content: 'fair. Unravel belongs to Tatsumi. I accept my fate 😂',
              reactions: [{ emoji: '😂', count: 18 }],
            },
          ],
        },
        {
          type: 'text',
          id: 'sk5-photos',
          name: 'sk5-photos',
          topic: 'Photos from Fumetsu.',
          messages: [
            {
              id: 'sk5-photos-1',
              authorId: 'flamenate',
              date: new Date('2023-03-14T20:00:00'),
              content:
                '📸 The Fumetsu album is up on the page: 500+ photos. The portal, the regions, the raid, the crowning. Thank you to the photo team for running around all day.',
              reactions: [{ emoji: '📸', count: 34 }],
            },
            {
              id: 'sk5-photos-2',
              authorId: 'maryouma',
              date: new Date('2023-03-14T20:20:00'),
              content:
                "The raid photo with everyone raising their class badges at the same time... I'm not crying, you're crying",
              reactions: [{ emoji: '🥲', count: 16, me: true }],
            },
            {
              id: 'sk5-photos-3',
              authorId: 'houcemge',
              date: new Date('2023-03-14T20:41:00'),
              content:
                'Someone got the portal at sunset with the LED strips on. Construction team, we did that 🛠️',
              reactions: [{ emoji: '🛠️', count: 12, me: true }],
            },
            {
              id: 'sk5-photos-4',
              authorId: 'yoyo88',
              date: new Date('2023-03-15T09:00:00'),
              content:
                "I'm in 14 photos and in all of them I'm holding Ryo bills. capitalism wins",
            },
            {
              id: 'sk5-photos-5',
              authorId: 'iphylox',
              date: new Date('2023-03-15T11:30:00'),
              content:
                'Compare it with the SK4 album, look how much the crowd grew up with us. Wild.',
            },
          ],
        },
        {
          type: 'text',
          id: 'sk5-feedback',
          name: 'sk5-feedback',
          topic: 'How was your adventure?',
          messages: [
            {
              id: 'sk5-feedback-1',
              authorId: 'flamenate',
              date: new Date('2023-03-12T15:05:00'),
              content:
                'How was your adventure? Tell us everything, the good and the bad. This is how we got here.',
            },
            {
              id: 'sk5-feedback-2',
              authorId: 'daisukigo',
              date: new Date('2023-03-12T16:20:00'),
              content:
                "I've been to every Sento since SK3 and this was the best one. The NPC volunteers staying in character all day was incredible.",
              reactions: [{ emoji: '❤️', count: 14, me: true }],
            },
            {
              id: 'sk5-feedback-3',
              authorId: 'qmine',
              date: new Date('2023-03-12T17:02:00'),
              content:
                'The quest board never closing = huge improvement. Only thing: the Frost Peaks room was super hot lol',
              reactions: [{ emoji: '😂', count: 9 }],
            },
            {
              id: 'sk5-feedback-4',
              authorId: 'aj',
              date: new Date('2023-03-12T18:30:00'),
              content:
                'Volunteer side: 62 NPCs, zero no-shows. You people are legends.',
              reactions: [{ emoji: '❤️', count: 19, me: true }],
            },
            {
              id: 'sk5-feedback-5',
              authorId: 'bushmaster',
              date: new Date('2023-03-12T21:10:00'),
              content:
                'The black market was the best idea of the whole event. People were trading Ryo like stocks',
            },
            {
              id: 'sk5-feedback-6',
              authorId: 'yoyo88',
              date: new Date('2023-03-13T10:00:00'),
              content: 'Please never stop doing these.',
              reactions: [{ emoji: '🥲', count: 22 }],
            },
            {
              id: 'sk5-feedback-7',
              authorId: 'flamenate',
              date: new Date('2023-03-13T22:00:00'),
              content: 'Thank you all. Reading every single message ❤️',
              reactions: [{ emoji: '❤️', count: 26 }],
            },
          ],
        },
      ],
    },
  ],
}
