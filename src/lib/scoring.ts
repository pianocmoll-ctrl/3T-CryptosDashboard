import { ScoringFactors, AnalysisResult } from '@/types';

export const calculateBuyScore = (factors: ScoringFactors): AnalysisResult => {
    let score = 0;

    // RSI Scoring (30%)
    if (factors.rsi < 30) score += 30;
    else if (factors.rsi >= 45 && factors.rsi <= 55) score += 0;
    else if (factors.rsi > 70) score -= 30;

    // MACD Scoring (30%)
    if (factors.macd === 'bullish') score += 30;
    else if (factors.macd === 'bearish') score -= 30;

    // Fear & Greed Scoring (20%) - Assuming score is already normalized to 100
    // Extreme Fear (<25) +20pts, Extreme Greed (>75) -20pts
    if (factors.fearGreedIndex < 25) score += 20;
    else if (factors.fearGreedIndex > 75) score -= 20;

    // Normalize and scale to 0-100 (Total potential range from -50 to 80 based on logic, let's map it)
    // Logic: Max is 80 (30+30+20), Min is -50 (-30-20, assuming MACD neutral or bearish)
    // Let's adjust to make it 0-100 for display
    const finalScore = Math.max(0, Math.min(100, ((score + 50) / 130) * 100));

    let status: AnalysisResult['status'] = 'Better to Wait';
    let color = 'text-yellow-500';
    let recommendation = 'Technical indicators are mixed. It might be better to wait for a clearer trend.';

    if (finalScore > 70) {
        status = 'Perfect Time To Buy';
        color = 'text-green-500';
        recommendation = 'Strong confluence across multiple indicators suggests a high-probability entry point.';
    } else if (finalScore < 30) {
        status = 'Not a Good Time';
        color = 'text-red-500';
        recommendation = 'Strong bearish signals detected. Risk level is currently high.';
    }

    return { score: Math.round(finalScore), status, color, recommendation };
};

export const calculateSellScore = (factors: ScoringFactors): AnalysisResult => {
    // Invert logic for sell analysis
    const res = calculateBuyScore(factors);
    const invertedScore = 100 - res.score;

    let status: AnalysisResult['status'] = 'Better to Wait';
    let color = 'text-yellow-500';
    let recommendation = 'Current conditions do not show a strong exit signal.';

    if (invertedScore > 70) {
        status = 'Not a Good Time'; // For sell, "Perfect Time To Buy" is actually bearish for the asset, but let's keep types consistent. 
        // Actually, SellAnalysis should probably have its own status types if they differ, 
        // but the user asked for "Perfect Time To Buy" for BuyAnalysis.
        // Let's re-read the request: 'add for the Buy Analysis "Perfect Time" add here "Perfect Time To Buy"'
        // So I'll keep SellAnalysis as it was or use 'Not a Good Time' if it's overbought.
        status = 'Not a Good Time';
        color = 'text-green-500'; // Green because it's a good time to SELL
        recommendation = 'Indicators show overbought conditions and bearish crossovers. Good time to take profits.';
    }
    else if (invertedScore < 30) {
        status = 'Not a Good Time';
        color = 'text-red-500';
        recommendation = 'Asset is showing strong bullish momentum. Selling now might be premature.';
    }

    return { score: Math.round(invertedScore), status, color, recommendation };
};
