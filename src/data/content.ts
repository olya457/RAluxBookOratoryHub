import {Category, QuizQuestion, Story, TextItem, TipCategory} from '../types/app';

export const categories: Category[] = [
  {
    id: 'temple',
    title: 'Temple Speeches',
    subtitle: 'Sacred ceremonial speeches and divine proclamations from ancient Egypt',
    icon: '🏺',
    tone: 'orange',
  },
  {
    id: 'wisdom',
    title: 'Pharaoh Wisdom',
    subtitle: 'Ancient scrolls of wisdom, philosophy, and enlightening stories from the pharaohs',
    icon: '📜',
    tone: 'gold',
  },
  {
    id: 'commands',
    title: 'Royal Commands',
    subtitle: 'Powerful royal decrees, diplomatic speeches, and military proclamations of rulers',
    icon: '⚔️',
    tone: 'red',
  },
];

export const publicTexts: TextItem[] = [
  {
    id: 'temple-opening-prayer',
    categoryId: 'temple',
    title: 'The Voice Before the Pharaoh',
    body: `In the great hall of stone and gold, every word carried power and meaning. The priests of Egypt believed that a strong voice could guide people, calm fear, and inspire loyalty. Before speaking to the pharaoh, an orator would stand silently for a moment, control his breathing, and focus his thoughts. Only then would he begin his speech. His voice moved slowly like the waters of the Nile, steady and confident. Every pause had purpose, and every sentence was spoken clearly so that even the people standing far from the throne could understand every word.

A skilled speaker never rushed. Fast speech created confusion, while calm speech created authority. The priests trained themselves daily by repeating long ceremonial phrases and difficult combinations of sounds. They practiced in giant stone halls where echoes forced them to improve pronunciation and rhythm. To speak with confidence, you must also control your breathing, maintain a strong posture, and pronounce every word with care. A calm voice often sounds more powerful than a loud one.`,
  },
  {
    id: 'temple-echoes-sacred',
    categoryId: 'temple',
    title: 'Echoes of the Sacred Temple',
    body: `Inside the sacred temples of Egypt, the walls reflected every sound back toward the speaker. Because of this, priests learned quickly that unclear speech could not be hidden. If a word was weak or rushed, the echo exposed every mistake. Young students spent many hours practicing pronunciation while standing between giant columns of stone. They repeated sacred texts again and again until their speech sounded smooth, balanced, and controlled.

The masters of the temple taught that the mouth, tongue, and breathing must work together like one instrument. A confident speaker opened his mouth clearly while speaking and never swallowed the endings of words. During ceremonies, priests spoke slowly enough for crowds to follow every phrase without difficulty. They used pauses to create emotion and importance. Silence was never a mistake for them. Silence was part of the performance itself.`,
  },
  {
    id: 'temple-golden-ceremony',
    categoryId: 'temple',
    title: 'The Golden Ceremony',
    body: `At sunrise, the temple filled with warm golden light while priests prepared for the morning ceremony. One speaker stepped forward to address the people gathered near the sacred altar. His voice was strong but controlled, calm but impossible to ignore. He understood that true power in speech did not come from shouting. Instead, it came from confidence, rhythm, and emotional control.

Before every public speech, Egyptian orators practiced breathing exercises to strengthen their voices. They inhaled deeply through the nose and released the air slowly while speaking long sentences. This allowed them to maintain clear speech without losing strength in the middle of a phrase. When a speaker controls tempo and pronunciation, listeners remain focused from beginning to end.`,
  },
  {
    id: 'wisdom-calm-scroll',
    categoryId: 'wisdom',
    title: 'The Scroll of Calm Speech',
    body: `An old historian once discovered a damaged scroll hidden beneath the floor of an ancient Egyptian library. The scroll described how royal advisors trained their voices before speaking to the pharaoh. According to the text, a calm speaker could influence a crowd more effectively than an angry or nervous one. Because of this, young orators practiced speaking slowly while controlling their breathing and emotions.

The masters of speech taught that fear causes people to rush their words and lose clarity. To avoid this, students learned to pause naturally between important thoughts. Egyptian teachers believed that the voice should sound like flowing water, smooth, balanced, and controlled. Clear speech comes not from speed, but from patience and control.`,
  },
  {
    id: 'wisdom-royal-scribes',
    categoryId: 'wisdom',
    title: 'Wisdom of the Royal Scribes',
    body: `The royal scribes of Egypt spent years mastering the art of language. Although their main duty was writing important texts, they also trained carefully in public speaking. A scribe often needed to read royal messages aloud before nobles, soldiers, and priests. If his pronunciation was weak or unclear, the message could lose its meaning and authority.

Because of this, scribes practiced diction every morning before sunrise. They repeated long sentences slowly while maintaining strong posture and controlled breathing. Teachers instructed them to pronounce the endings of words clearly and avoid speaking too quickly. Even silence between phrases was considered important because it allowed listeners to understand and remember the message.`,
  },
  {
    id: 'wisdom-golden-chamber',
    categoryId: 'wisdom',
    title: 'The Lesson of the Golden Chamber',
    body: `Inside a golden chamber beneath the royal palace, young speakers gathered to study ancient communication techniques. Their teacher explained that words alone were not enough to move people. A true speaker also needed confidence, rhythm, and emotional control. Without these qualities, even intelligent ideas could sound weak and forgettable.

The students practiced delivering short speeches while standing tall and maintaining eye contact with the audience. Whenever someone rushed through a sentence, the teacher stopped the lesson immediately. Egyptian masters believed that rushing destroyed authority. A controlled tempo allowed listeners to absorb every idea clearly.`,
  },
  {
    id: 'commands-before-sunrise',
    categoryId: 'commands',
    title: 'The Order Before Sunrise',
    body: `Before the first light touched the pyramids, the royal commander stood before hundreds of soldiers gathered in silence. The air was cold, and every warrior waited for instructions. The commander understood that unclear speech could create confusion and fear among the army. Because of this, he spoke slowly, clearly, and with complete confidence. Every word carried authority across the camp.

The commanders of Egypt trained their voices carefully because strong communication was considered as important as strength in battle. They practiced breathing exercises each morning and repeated difficult commands until they could pronounce them without hesitation. A leader must never sound uncertain. Even during dangerous moments, the voice had to remain calm and controlled.`,
  },
  {
    id: 'commands-throne-voice',
    categoryId: 'commands',
    title: 'The Voice of the Throne',
    body: `Inside the royal palace, messengers delivered important announcements from the pharaoh to nobles and citizens across the kingdom. These royal speakers were chosen not only for intelligence but also for the clarity of their voices. Every announcement needed to sound formal, balanced, and impossible to misunderstand.

Before entering the throne hall, the speakers practiced their pronunciation repeatedly. They trained themselves to speak slowly enough for large crowds to understand every phrase. The royal messengers also learned how to use silence effectively. After important statements, they paused briefly to allow listeners to focus on the meaning of the words.`,
  },
  {
    id: 'commands-desert-guard',
    categoryId: 'commands',
    title: 'Command of the Desert Guard',
    body: `The desert guards protected trade routes that crossed the lands beyond the Nile. Their leader needed to communicate quickly and clearly because even a small misunderstanding could place the entire group in danger. During training, guards practiced speaking commands loudly while maintaining precise pronunciation and calm breathing.

The instructors taught them that panic could easily spread through the sound of a nervous voice. Because of this, leaders trained themselves to remain emotionally controlled even during stressful situations. They practiced reading military orders aloud while standing in harsh desert winds, forcing them to strengthen both diction and vocal power.`,
  },
];

export const shopTexts: TextItem[] = [
  {
    id: 'temple-sacred-words',
    categoryId: 'temple',
    title: 'Keeper of Sacred Words',
    price: 6,
    body: `The keepers of sacred texts were respected throughout ancient Egypt because they could speak with wisdom and clarity. Many people could read symbols written on papyrus, but only trained speakers could deliver those words with true emotion and authority. A royal speaker learned to control not only his voice, but also his posture, facial expressions, and gestures. Every movement supported the meaning of the speech.

During training, young students practiced reading difficult passages aloud while balancing objects on their shoulders to improve posture. Teachers corrected unclear sounds immediately and encouraged students to slow down whenever they lost clarity. Strong communication comes from balance, not from rushing.`,
  },
  {
    id: 'temple-ancient-voices',
    categoryId: 'temple',
    title: 'The Hall of Ancient Voices',
    price: 9,
    body: `Deep inside the great temple stood a chamber known as the Hall of Ancient Voices. Here, future speakers trained their diction and public speaking abilities for many years. The hall was quiet except for the sound of repeating phrases, careful breathing, and the echoes of practiced speeches. Teachers instructed students to pronounce every sound fully and never allow nervousness to weaken their voice.

The students learned that audiences trust speakers who sound calm and controlled. Even during difficult moments, the greatest Egyptian orators maintained steady breathing and confident posture. Through practice and patience, every speaker could strengthen both diction and confidence.`,
  },
  {
    id: 'wisdom-nile-voice',
    categoryId: 'wisdom',
    title: 'The Nile and the Voice',
    price: 6,
    body: `An ancient teacher once compared human speech to the Nile River. He explained that the river never moved in panic or confusion. Instead, it flowed with calm strength across the land. According to him, a speaker should develop the same quality in his voice. Fast and uncontrolled speech created tension, while calm and steady speech created trust.

To teach this lesson, students practiced reading slowly beside the riverbanks at sunrise. They focused on breathing deeply and maintaining clear pronunciation even while speaking long passages. Controlled breathing improved not only their diction but also their confidence.`,
  },
  {
    id: 'wisdom-desert-court',
    categoryId: 'wisdom',
    title: 'The Speaker of the Desert Court',
    price: 9,
    body: `In the middle of the desert stood a royal court where travelers, soldiers, and merchants gathered to hear announcements from the kingdom. The court’s main speaker was respected because he could command attention without shouting. His voice carried naturally across the open space, clear and controlled even in strong desert winds.

Before every speech, he prepared himself carefully. He practiced difficult phrases aloud, stretched his breathing with long sentences, and repeated important words until they sounded natural. He taught students that true confidence came from preparation, not from loudness.`,
  },
  {
    id: 'commands-royal-decrees',
    categoryId: 'commands',
    title: 'The Hall of Royal Decrees',
    price: 6,
    body: `Deep inside the palace stood a chamber known as the Hall of Royal Decrees. Here, official announcements from the pharaoh were read before advisors, generals, and important guests. Only the most skilled speakers were allowed to stand in this hall because every word spoken there represented the authority of the kingdom itself.

Young speakers trained for years before receiving permission to read royal commands publicly. Teachers focused heavily on pronunciation because unclear words could change the meaning of an important decree. A royal speaker needed to sound calm regardless of the situation.`,
  },
  {
    id: 'commands-warrior-speech',
    categoryId: 'commands',
    title: 'The Warrior’s Speech',
    price: 9,
    body: `Before entering battle, a respected Egyptian warrior stood before his soldiers to deliver a final speech. He did not scream or rush his words. Instead, he spoke with calm confidence, allowing every sentence to carry weight and emotion. His steady voice helped the soldiers remain focused and disciplined even in dangerous moments.

The pauses between sentences created tension and anticipation, while the controlled rhythm made the message easier to remember. By the end of the speech, the warriors felt united and confident. Through discipline and practice, the speaker transformed simple words into a source of strength and inspiration.`,
  },
];

export const stories: Story[] = [
  {
    id: 'hidden-chamber',
    title: 'The Historian and the Hidden Chamber',
    subtitle: 'A forgotten book reveals the ancient art of powerful speech.',
    body: `During an expedition near the ruins of an ancient Egyptian temple, a young historian discovered a narrow passage hidden behind a damaged stone wall. The air inside was cold and filled with dust untouched for centuries. Carrying only a lantern and a notebook, he carefully stepped deeper into the chamber. Strange symbols covered the walls, and broken statues stood silently in the darkness.

At the center of the room rested a small wooden table covered by ancient cloth. Upon it lay a large book wrapped in faded golden fabric. Inside were detailed lessons about speech, diction, breathing, confidence, and public speaking techniques used by Egyptian priests and royal messengers thousands of years ago.

The pages described how young speakers trained their voices inside giant temples where echoes revealed every mistake in pronunciation. The historian spent many nights translating the difficult texts and decided to share the forgotten art of powerful speech with the modern world.`,
  },
  {
    id: 'speaker-pharaoh',
    title: 'The Speaker of the Pharaoh',
    subtitle: 'A trembling servant becomes the royal voice of the palace.',
    body: `Long ago in ancient Egypt, a young servant dreamed of becoming the royal speaker of the pharaoh. Although he was intelligent, his voice often trembled when speaking before groups of people. The royal teachers believed he lacked confidence and refused to allow him near important ceremonies.

Determined to improve, the young man traveled to a temple famous for training great orators. There, an old priest taught him that strong speech did not come from shouting loudly. Instead, true power came from calm breathing, discipline, and control over emotions. Every morning before sunrise, the student practiced difficult phrases while standing between giant stone columns.

Months passed, and his speech slowly transformed. When he finally returned to the royal palace, he delivered a speech before the pharaoh without fear or hesitation. From that day forward, he became one of the kingdom’s most respected speakers.`,
  },
  {
    id: 'temple-echoes-story',
    title: 'The Temple of Echoes',
    subtitle: 'A nervous student learns rhythm inside the stone halls.',
    body: `Near the Nile River stood a temple known throughout Egypt as the Temple of Echoes. Young students traveled from distant cities to train their voices inside its massive stone halls. The temple earned its name because every sound spoken inside returned loudly through the chambers, exposing unclear pronunciation and rushed speech.

One student struggled greatly because he spoke too quickly whenever he became nervous. The teachers instructed him to slow his breathing and pause between important ideas. After many months of practice, he learned to control his rhythm and emotions. Eventually, his calm and balanced voice became admired throughout the temple.`,
  },
  {
    id: 'royal-messenger',
    title: 'The Royal Messenger',
    subtitle: 'Preparation keeps a royal announcement clear in the desert wind.',
    body: `The royal messenger carried important announcements across the Egyptian kingdom. His voice needed to remain strong and clear because a single misunderstanding could create confusion among soldiers, merchants, or citizens. Before every journey, he carefully practiced the speeches he would deliver before large crowds.

One summer, the messenger received orders to travel across the desert and announce a new law from the pharaoh. Despite harsh conditions, he repeated the royal announcement aloud every evening beside the campfire. When he arrived at the distant city, he stood tall, breathed deeply, and spoke slowly so every person could understand each sentence clearly.`,
  },
  {
    id: 'silent-student',
    title: 'The Silent Student',
    subtitle: 'A quiet student finds confidence through repetition and patience.',
    body: `A quiet young student once studied inside a famous Egyptian school for scribes and speakers. Unlike the other students, he rarely spoke during lessons because he feared making mistakes in front of others. Whenever teachers asked him to read aloud, his voice became weak and uncertain.

One elderly teacher noticed the boy’s fear and began training him alone inside a peaceful library chamber. Each day, the student practiced breathing exercises, pronunciation drills, and slow reading techniques from ancient scrolls. Months later, the once-silent student volunteered to speak before visiting officials. His voice became calm, clear, and steady.`,
  },
  {
    id: 'book-beneath-sand',
    title: 'The Book Beneath the Sand',
    subtitle: 'A buried stone chest protects lessons for future speakers.',
    body: `During a violent desert storm, workers restoring an abandoned Egyptian temple uncovered a small stone chest buried beneath layers of sand. Inside the chest rested an ancient book protected by carefully wrapped linen cloth. The pages contained lessons about communication, storytelling, leadership, and vocal control written by scholars who lived thousands of years earlier.

Historians were surprised by how advanced the teachings appeared. One historian dedicated years to translating the damaged pages completely. Inspired by the wisdom of the ancient teachers, he began sharing the forgotten lessons with others so modern speakers could benefit from techniques created long before the modern world existed.`,
  },
  {
    id: 'golden-hall',
    title: 'Voice of the Golden Hall',
    subtitle: 'An apprentice earns the right to speak before the pharaoh.',
    body: `Inside the palace of the pharaoh stood the Golden Hall, a massive chamber where important ceremonies and royal speeches were held. Only the kingdom’s most skilled speakers were allowed to address the crowd there because every sound traveled clearly across the room.

A young apprentice dreamed of speaking inside the hall one day, but his teachers believed he lacked discipline. He practiced breathing slowly, repeating difficult phrases, and controlling pauses between sentences. Years later, he stood tall, breathed deeply, and began speaking calmly and clearly. His words echoed perfectly across the chamber.`,
  },
];

export const tipCategories: TipCategory[] = [
  {
    id: 'voice-rituals',
    title: 'Voice Rituals',
    subtitle: 'Daily exercises for diction, clarity, and vocal power from ancient priests',
    icon: '🗣️',
    tips: [
      {
        id: 'breath-control',
        title: 'Breath Control',
        body: 'Before speaking, take a slow deep breath through your nose and release it calmly. Ancient Egyptian speakers believed that controlled breathing created a stronger and steadier voice. Practice reading short sentences while maintaining calm breathing to improve vocal stability and pronunciation.',
      },
      {
        id: 'slow-words',
        title: 'Slow Words',
        body: 'Do not rush while speaking. Egyptian orators trained themselves to pronounce every word clearly and slowly before increasing speed. When practicing, focus on finishing every sound completely. Clear speech sounds more confident than fast speech.',
      },
      {
        id: 'temple-echo',
        title: 'Temple Echo',
        body: 'Read your text aloud in a quiet room and listen carefully to your own voice. Ancient priests trained inside stone temples where echoes exposed unclear pronunciation. Repeat difficult words several times until they sound smooth and natural.',
      },
      {
        id: 'strong-voice',
        title: 'Strong Voice',
        body: 'Stand straight while speaking and avoid lowering your head. Good posture helps the lungs work correctly and allows the voice to sound stronger. Egyptian teachers believed that posture and voice strength were connected.',
      },
      {
        id: 'calm-pauses',
        title: 'Calm Pauses',
        body: 'Do not fear silence between sentences. Small pauses help listeners understand your message more clearly and make your speech sound more professional. Ancient speakers used pauses to create authority and emotional impact.',
      },
      {
        id: 'daily-reading',
        title: 'Daily Reading',
        body: 'Practice reading aloud every day, even for a few minutes. Egyptian scribes improved their diction through repetition and discipline. Regular training helps the tongue, breathing, and voice work together more naturally.',
      },
    ],
  },
  {
    id: 'pharaoh-presence',
    title: 'Pharaoh Presence',
    subtitle: 'Commanding presence techniques for gaze, posture, gesture, and emotional control',
    icon: '👁️',
    tips: [
      {
        id: 'eye-contact',
        title: 'Eye Contact',
        body: 'Look forward confidently while speaking. Ancient rulers maintained strong eye contact to appear calm and powerful before large crowds. Avoid looking down too often because it can make your speech appear uncertain.',
      },
      {
        id: 'controlled-hands',
        title: 'Controlled Hands',
        body: 'Use simple and natural hand gestures while talking. Egyptian speakers moved their hands carefully to support important ideas without distracting listeners. Calm gestures create a more confident appearance.',
      },
      {
        id: 'speak-calmly',
        title: 'Speak Calmly',
        body: 'A calm voice often sounds more powerful than a loud voice. When emotions rise, slow your breathing and continue speaking steadily. Egyptian leaders trained themselves to remain emotionally controlled during important speeches.',
      },
      {
        id: 'strong-posture',
        title: 'Strong Posture',
        body: 'Keep your shoulders straight and your head raised naturally. A confident posture improves both appearance and breathing. Ancient speakers believed that the body and voice must work together as one.',
      },
      {
        id: 'confident-start',
        title: 'Confident Start',
        body: 'Begin your speech slowly and clearly. The first few sentences create the strongest impression on listeners. Egyptian orators often paused briefly before speaking to gain focus and attention.',
      },
      {
        id: 'control-emotion',
        title: 'Control Emotion',
        body: 'Do not allow nervousness to control your speech tempo. If you feel anxious, pause briefly and breathe deeply before continuing. Ancient teachers believed that emotional discipline was part of powerful communication.',
      },
    ],
  },
  {
    id: 'ancient-techniques',
    title: 'Ancient Techniques',
    subtitle: 'Memory, structure, and persuasion methods from Egypt’s wisest scribes',
    icon: '📚',
    tips: [
      {
        id: 'repeat-phrases',
        title: 'Repeat Phrases',
        body: 'Repeat difficult sentences several times aloud. Egyptian students memorized long texts through constant repetition and vocal practice. This technique improves pronunciation and speaking confidence.',
      },
      {
        id: 'divide-text',
        title: 'Divide Text',
        body: 'Break long texts into smaller sections before practicing. Ancient scribes studied speeches piece by piece to improve memory and rhythm. Smaller parts are easier to remember and pronounce clearly.',
      },
      {
        id: 'read-aloud',
        title: 'Read Aloud',
        body: 'Do not practice silently. Reading aloud trains diction, breathing, and rhythm much faster than silent reading. Egyptian orators improved their voices by constantly hearing their own speech.',
      },
      {
        id: 'pause-practice',
        title: 'Pause Practice',
        body: 'Mark small pauses inside your text while training. Pauses help control breathing and make speech easier for listeners to understand. Ancient speakers carefully planned pauses during important ceremonies.',
      },
      {
        id: 'voice-rhythm',
        title: 'Voice Rhythm',
        body: 'Try to maintain a steady rhythm while speaking. Egyptian masters compared speech to the calm movement of the Nile River. Balanced rhythm makes the voice sound smoother and more professional.',
      },
      {
        id: 'mirror-training',
        title: 'Mirror Training',
        body: 'Practice speaking while looking into a mirror. This helps improve posture, facial expressions, and confidence. Ancient speakers often trained their gestures and expressions before public ceremonies.',
      },
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What did ancient Egyptian speakers practice to improve their voice?',
    answers: ['Dancing', 'Breathing exercises', 'Painting symbols', 'Horse riding'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: 'Why did priests train inside large stone temples?',
    answers: ['To stay warm', 'To avoid crowds', 'Because echoes revealed speech mistakes', 'To protect books'],
    correctIndex: 2,
  },
  {
    id: 'q3',
    question: 'What helped Egyptian orators sound more confident?',
    answers: ['Speaking faster', 'Shouting loudly', 'Calm pauses and controlled breathing', 'Short sentences only'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    question: 'What was important during royal speeches?',
    answers: ['Bright clothing', 'Clear pronunciation', 'Singing loudly', 'Running while speaking'],
    correctIndex: 1,
  },
  {
    id: 'q5',
    question: 'What river was often compared to calm speech in Egyptian teachings?',
    answers: ['Amazon River', 'Nile River', 'Thames River', 'Danube River'],
    correctIndex: 1,
  },
  {
    id: 'q6',
    question: 'What did Egyptian teachers say about fast speech?',
    answers: ['It created authority', 'It sounded musical', 'It could create confusion', 'It improved memory'],
    correctIndex: 2,
  },
  {
    id: 'q7',
    question: 'What did scribes practice every morning?',
    answers: ['Sword fighting', 'Swimming', 'Reading and pronunciation', 'Building statues'],
    correctIndex: 2,
  },
  {
    id: 'q8',
    question: 'What helped speakers maintain strong voices during long speeches?',
    answers: ['Deep breathing', 'Loud shouting', 'Drinking cold water', 'Fast reading'],
    correctIndex: 0,
  },
  {
    id: 'q9',
    question: 'Why were pauses important in speeches?',
    answers: ['They allowed listeners to understand ideas', 'They made speeches shorter', 'They confused audiences', 'They ended conversations faster'],
    correctIndex: 0,
  },
  {
    id: 'q10',
    question: 'What quality was respected in Egyptian speakers?',
    answers: ['Anger', 'Calm confidence', 'Fast movement', 'Silence only'],
    correctIndex: 1,
  },
  {
    id: 'q11',
    question: 'What did many Egyptian speakers practice to improve posture?',
    answers: ['Balancing objects on shoulders', 'Carrying heavy stones', 'Running long distances', 'Climbing walls'],
    correctIndex: 0,
  },
  {
    id: 'q12',
    question: 'What was the duty of royal messengers?',
    answers: ['Building temples', 'Guarding treasure', 'Delivering important announcements', 'Teaching children math'],
    correctIndex: 2,
  },
  {
    id: 'q13',
    question: 'What happened if speech was unclear inside temples?',
    answers: ['Nobody noticed', 'Echoes exposed mistakes', 'Priests stopped ceremonies', 'The walls became damaged'],
    correctIndex: 1,
  },
  {
    id: 'q14',
    question: 'What did Egyptian teachers believe about posture?',
    answers: ['It only affected appearance', 'It was not important', 'It affected voice strength and breathing', 'It slowed reading speed'],
    correctIndex: 2,
  },
  {
    id: 'q15',
    question: 'Why did speakers repeat difficult phrases many times?',
    answers: ['To memorize pronunciation and rhythm', 'To finish training quickly', 'To entertain soldiers', 'To create music'],
    correctIndex: 0,
  },
  {
    id: 'q16',
    question: 'What did many young speakers fear at first?',
    answers: ['Reading books', 'Speaking before crowds', 'Walking in temples', 'Writing on papyrus'],
    correctIndex: 1,
  },
  {
    id: 'q17',
    question: 'What did Egyptian orators use to gain audience attention?',
    answers: ['Random shouting', 'Long silence before speaking', 'Throwing objects', 'Singing loudly'],
    correctIndex: 1,
  },
  {
    id: 'q18',
    question: 'What helped speakers sound trustworthy?',
    answers: ['Calm rhythm and clear speech', 'Fast talking', 'Constant movement', 'Whispering quietly'],
    correctIndex: 0,
  },
  {
    id: 'q19',
    question: 'Why did speakers train every day?',
    answers: ['To improve discipline and diction', 'To become stronger soldiers', 'To travel across Egypt', 'To decorate temples'],
    correctIndex: 0,
  },
  {
    id: 'q20',
    question: 'What was one goal of Egyptian speech training?',
    answers: ['Learning to paint', 'Improving vocal control and confidence', 'Building pyramids faster', 'Memorizing maps'],
    correctIndex: 1,
  },
];
