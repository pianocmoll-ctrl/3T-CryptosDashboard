'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingDown, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import { calculateSellScore } from '@/lib/scoring';
import { fetchRealtimePrice } from '@/lib/prices';
import { AnalysisResult, ScoringFactors } from '@/types';
import { AnalysisSkeleton } from './SkeletonLoaders';

interface SellAnalysisProps {
    ticker: string;
    setTicker: (ticker: string) => void;
}

export default function SellAnalysis({ ticker, setTicker }: SellAnalysisProps) {
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

    const fetchAnalysis = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockFactors: ScoringFactors = {
            rsi: 78, // Overbought
            macd: 'bearish' as const,
            fearGreedIndex: 85, // Extreme Greed
        };

        const priceData = await fetchRealtimePrice(ticker);

        const result = calculateSellScore(mockFactors);

        if (priceData) {
            result.currentPrice = priceData.price;
            result.change24h = priceData.change24h;
        }

        setAnalysis(result);
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            await fetchAnalysis();
        };
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-100/50 dark:bg-slate-800/50 p-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                className="pl-10 h-12 bg-white dark:bg-slate-900 border-none shadow-sm text-lg rounded-xl focus-visible:ring-red-500"
                                placeholder="Enter coin ticker for exit strategy"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                            />
                        </div>
                        <Button onClick={fetchAnalysis} className="h-12 px-8 rounded-xl font-semibold gap-2 bg-slate-900 hover:bg-black transition-all active:scale-95">
                            Run Sell Analysis <TrendingDown className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {loading ? (
                <AnalysisSkeleton />
            ) : analysis && (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 font-bold text-sm uppercase tracking-wider`}>
                            <AlertCircle className="h-4 w-4" /> Not a good time to sell
                        </div>
                        <div className="text-xs text-slate-400 font-medium">Last updated: Just now</div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
                            <CardHeader className="p-8 pb-0">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-xl">{ticker.includes('BTC') ? 'Bitcoin' : ticker} ({ticker}) Overview</CardTitle>
                                    {analysis.currentPrice && (
                                        <div className="flex gap-6 border-l border-slate-200 dark:border-slate-800 pl-6">
                                            <div className="flex flex-col items-end">
                                                <span className="text-3xl font-bold">${analysis.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">USD Price</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-3xl font-bold">€{(analysis.currentPrice * 0.85).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">EUR Price</span>
                                            </div>
                                            {analysis.change24h !== undefined && (
                                                <div className="flex flex-col bg-slate-50 dark:bg-slate-800/50 px-3 py-1 rounded-xl justify-center">
                                                    <div className={`text-sm font-bold ${analysis.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {analysis.change24h >= 0 ? '+' : ''}{analysis.change24h.toFixed(2)}%
                                                    </div>
                                                    <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">24h</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative h-32 w-32">
                                        <svg className="h-32 w-32 -rotate-90">
                                            <circle cx="64" cy="64" r="58" className="stroke-slate-200 dark:stroke-slate-700 fill-none" strokeWidth="8" />
                                            <circle
                                                cx="64" cy="64" r="58"
                                                className="stroke-red-500 fill-none transition-all duration-1000 ease-out"
                                                strokeWidth="8"
                                                strokeDasharray={364}
                                                strokeDashoffset={364 - (analysis.score / 100) * 364}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold">{analysis.score}%</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        <h3 className="font-bold text-lg">Sell Conviction Score</h3>
                                        <p className="text-slate-500 text-sm">
                                            Based on 14 technical indicators, current momentum suggests holding. Significant support levels are holding strong.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                            RSI (14) <span className="text-slate-900 dark:text-slate-100">42.5 (Neutral)</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden">
                                            <div className="h-full bg-blue-500/20" style={{ width: '30%' }}></div>
                                            <div className="h-full bg-blue-500" style={{ width: '12.5%' }}></div>
                                            <div className="flex-1"></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold">
                                            <span>Oversold</span>
                                            <span>Neutral</span>
                                            <span>Overbought</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                            MACD Histogram <span className="text-green-500">Bullish Crossover</span>
                                        </div>
                                        <div className="flex items-end gap-1 h-8">
                                            {[2, 4, 3, 5, 2, 4, 6, 8, 7, 9].map((h, i) => (
                                                <div key={i} className={`flex-1 rounded-sm ${i < 4 ? 'bg-red-200' : 'bg-green-500'}`} style={{ height: `${h * 10}%` }}></div>
                                            ))}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Momentum Building</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="border-none shadow-xl bg-white dark:bg-slate-900">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-lg">Exit Signal Checklist</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 space-y-4">
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold">Price above 200 SMA</div>
                                            <div className="text-[11px] text-slate-500">Trend is still long-term bullish.</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 opacity-40">
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold">RSI Divergence</div>
                                            <div className="text-[11px] text-slate-500">No bearish divergence confirmed yet.</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 opacity-40">
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold">Volume Climax</div>
                                            <div className="text-[11px] text-slate-500">No exhaustive selling volume detected.</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold">Profit Target Not Met</div>
                                            <div className="text-[11px] text-slate-500">Next major Fibonacci level at $72.4k.</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none bg-primary text-white shadow-xl overflow-hidden relative group cursor-pointer active:scale-98 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                    <Activity className="h-24 w-24" />
                                </div>
                                <CardHeader className="p-6 relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 bg-white/20 rounded-lg"><TrendingDown className="h-4 w-4" /></div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">Exit strategy active</span>
                                    </div>
                                    <CardTitle className="text-lg">AI Recommendation</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 relative z-10">
                                    <p className="text-sm text-blue-100 leading-relaxed italic border-l-2 border-white/30 pl-4 mb-6">
                                        &quot;Current data indicates the asset is consolidating before a potential breakout. Short-term selling may lead to missing a larger move. Set a trailing stop-loss at $61,500 instead.&quot;
                                    </p>
                                    <Button className="w-full bg-white text-primary hover:bg-slate-100 font-bold rounded-xl h-12">Set Trailing Stop</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
