export type PoliticalWing = 'links' | 'mitte' | 'rechts';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Hotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  description: string;
  historicalDetail: string;
}

export interface Caricature {
  id: string;
  title: string;
  year: string;
  source: string;
  description: string;
  guidingQuestion: string;
  hotspots: Hotspot[];
}

export interface HistoricalQuote {
  id: string;
  author: string;
  role: string;
  year: string;
  text: string;
  source: string;
  task: string;
}

export interface DecisionChoice {
  text: string;
  consequence: string;
  historicalContext: string;
  points: number;
}

export interface DecisionStep {
  id: string;
  situation: string;
  date: string;
  location: string;
  choices: DecisionChoice[];
}

export interface Station {
  id: number;
  slug: string;
  period: string;
  title: string;
  subtitle: string;
  keyQuestion: string;
  color: string;
  summary: string;
  contentParagraphs: {
    heading: string;
    text: string;
    highlight?: string;
  }[];
  quotes: HistoricalQuote[];
  caricature?: Caricature;
  quiz: QuizQuestion[];
  badgeId: string;
  miniGameType: 'caricature' | 'paulskirche' | 'barricade' | 'poetry' | 'constitution' | 'quiz';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAtStation: number;
}

export interface SolutionItem {
  page: number;
  topic: string;
  taskNumber: string;
  taskQuestion: string;
  sampleSolution: string;
  didacticTip: string;
  competency: string;
}

export interface UserProgress {
  completedStations: number[];
  unlockedBadges: string[];
  xp: number;
  quizScores: Record<string, number>;
  activeStationId: number;
}
