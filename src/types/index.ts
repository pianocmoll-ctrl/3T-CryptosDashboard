export type MarketSentiment = 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';

export interface ScoringFactors {
  rsi: number;
  macd: 'bullish' | 'bearish' | 'neutral';
  fearGreedIndex: number;
}

export interface AnalysisResult {
  score: number;
  status: 'Perfect Time To Buy' | 'Better to Wait' | 'Not a Good Time';
  color: string;
  recommendation: string;
  currentPrice?: number;
  change24h?: number;
}

export interface Scenario {
  name: string;
  usdPrice: number;
  eurPrice: number;
  description: string;
  tag: string;
}

export interface MarketReport {
  news: NewsItem[];
  market: {
    btcDominance: string;
    fearGreed: number;
  };
  macro: MacroEvent[];
  projects: ProjectStatus[];
  regulation: RegulationStatus[];
}

export interface NewsItem {
  title: string;
  germanTitle?: string;
  source: string;
  time: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'Regulation';
  content: string;
  germanContent?: string;
}

export interface MacroEvent {
  event: string;
  region: 'US' | 'EU';
  impact: string;
}

export interface ProjectStatus {
  name: string;
  completion: string;
  status: string;
}

export interface RegulationStatus {
  act: string;
  status: string;
}
