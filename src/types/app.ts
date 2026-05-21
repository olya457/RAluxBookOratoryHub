export type CategoryId = 'temple' | 'wisdom' | 'commands';

export type MainTab = 'prompter' | 'workshop' | 'history' | 'tips' | 'quiz' | 'shop';

export type TextItem = {
  id: string;
  categoryId: CategoryId;
  title: string;
  body: string;
  price?: number;
  custom?: boolean;
};

export type Category = {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  tone: 'orange' | 'gold' | 'red';
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
};

export type TipCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tips: Tip[];
};

export type Tip = {
  id: string;
  title: string;
  body: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
};

export type CustomText = TextItem & {
  custom: true;
};

export type StoredAppState = {
  onboardingDone: boolean;
  customTexts: CustomText[];
  favouriteStoryIds: string[];
  sacredBooks: number;
  purchasedTextIds: string[];
};
