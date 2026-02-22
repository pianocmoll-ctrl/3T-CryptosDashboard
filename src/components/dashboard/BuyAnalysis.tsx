'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Activity, AlertCircle, Info, Bookmark } from "lucide-react";
import { calculateBuyScore } from '@/lib/scoring';
import { fetchRealtimePrice } from '@/lib/prices';
import { AnalysisResult, ScoringFactors } from '@/types';
import { AnalysisSkeleton } from './SkeletonLoaders';

interface BuyAnalysisProps {
    ticker: string;
    setTicker: (ticker: string) => void;
}

export default function BuyAnalysis({ ticker, setTicker }: BuyAnalysisProps) {
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

    const fetchAnalysis = async () => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock factors based on 'BTC' or others
        const mockFactors: ScoringFactors = {
            rsi: ticker === 'ETH' ? 32 : 28, // Oversold for BTC
            macd: 'bullish' as const,
            fearGreedIndex: 20, // Extreme Fear
        };

        const priceData = await fetchRealtimePrice(ticker);

        const result = calculateBuyScore(mockFactors);

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
                                className="pl-10 h-12 bg-white dark:bg-slate-900 border-none shadow-sm text-lg rounded-xl focus-visible:ring-primary"
                                placeholder="Enter coin ticker (e.g. BTC, ETH)"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                onKeyDown={(e) => e.key === 'Enter' && fetchAnalysis()}
                            />
                        </div>
                        <Button onClick={fetchAnalysis} className="h-12 px-8 rounded-xl font-semibold gap-2 transition-all active:scale-95">
                            Analyze Buy Signals <TrendingUp className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {loading ? (
                <AnalysisSkeleton />
            ) : analysis && (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${analysis.color.replace('text', 'bg')}/10 ${analysis.color} font-bold text-sm uppercase tracking-wider`}>
                            <Activity className="h-4 w-4" />
                            {analysis.status}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                            <span className="flex items-center gap-1"><Info className="h-3.5 w-3.5" /> Data updated 2 minutes ago. Analysis based on 20+ indicators.</span>
                        </div>
                    </div>

                    <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                <div className="flex-shrink-0 w-full lg:w-48 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                    <div className="relative flex items-center justify-center">
                                        <svg className="h-32 w-32 -rotate-90">
                                            <circle cx="64" cy="64" r="58" className="stroke-slate-200 dark:stroke-slate-700 fill-none" strokeWidth="8" />
                                            <circle
                                                cx="64" cy="64" r="58"
                                                className={`fill-none transition-all duration-1000 ease-out`}
                                                strokeWidth="8"
                                                strokeDasharray={364}
                                                strokeDashoffset={364 - (analysis.score / 100) * 364}
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                style={{ color: analysis.color.replace('text-', '') }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold">{analysis.score}</span>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">/ 100</span>
                                        </div>
                                    </div>
                                    <span className="mt-4 font-bold text-sm tracking-tight">Buy Conviction Score</span>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold flex items-center gap-3">
                                            <div className="h-10 w-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                                {ticker.includes('BTC') ? <span className="text-orange-500 font-bold">₿</span> : <span className="text-blue-500 font-bold">Ξ</span>}
                                            </div>
                                            {ticker.includes('BTC') ? 'Bitcoin' : ticker} ({ticker})
                                            {analysis.currentPrice && (
                                                <div className="flex gap-6 ml-4 border-l border-slate-200 dark:border-slate-800 pl-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-xl font-bold">${analysis.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">USD Price</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xl font-bold">€{(analysis.currentPrice * 0.85).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">EUR Price</span>
                                                    </div>
                                                    {analysis.change24h !== undefined && (
                                                        <div className="flex flex-col bg-slate-50 dark:bg-slate-800/50 px-3 py-1 rounded-lg">
                                                            <span className={`text-sm font-bold ${analysis.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                {analysis.change24h >= 0 ? '+' : ''}{analysis.change24h.toFixed(2)}%
                                                            </span>
                                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">24h Change</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                            {analysis.recommendation} Current market conditions show a strong correlation between technical indicators and sentiment.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Card className="bg-slate-50 dark:bg-slate-800/50 border-none">
                                            <CardHeader className="p-4 pb-2">
                                                <CardDescription className="flex items-center justify-between uppercase text-[10px] font-bold tracking-widest">
                                                    MACD Analysis <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-none">BULLISH</Badge>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <div className="text-xl font-bold mb-1">Crossover</div>
                                                <p className="text-[11px] text-slate-500">Signal line crossed above MACD line on 4H chart.</p>
                                            </CardContent>
                                        </Card>

                                        <Card className="bg-slate-50 dark:bg-slate-800/50 border-none">
                                            <CardHeader className="p-4 pb-2">
                                                <CardDescription className="flex items-center justify-between uppercase text-[10px] font-bold tracking-widest">
                                                    RSI (14) <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-500 border-none">OVERSOLD</Badge>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <div className="text-xl font-bold mb-1">28.4 <span className="text-[10px] text-slate-400">/ 100</span></div>
                                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: '28.4%' }}></div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="bg-slate-50 dark:bg-slate-800/50 border-none">
                                            <CardHeader className="p-4 pb-2">
                                                <CardDescription className="flex items-center justify-between uppercase text-[10px] font-bold tracking-widest">
                                                    Fear & Greed <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-500 border-none">FEAR</Badge>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <div className="text-xl font-bold mb-1">20 <span className="text-[10px] text-slate-400">/ 100</span></div>
                                                <div className="relative w-full h-12 flex items-end justify-center pt-2">
                                                    <svg viewBox="0 0 100 50" className="w-full h-auto">
                                                        <path d="M 10 45 A 40 40 0 0 1 90 45" fill="transparent" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                                                        <path d="M 10 45 A 40 40 0 0 1 90 45" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" strokeDasharray="125.66" strokeDashoffset={125.66 - (20 / 100) * 125.66} />
                                                    </svg>
                                                    <div className="absolute bottom-0 text-[10px] font-bold">EXTREME FEAR</div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                        <Button variant="outline" className="gap-2 text-xs rounded-lg active:scale-95 transition-all">
                                            <Bookmark className="h-3.5 w-3.5" /> Save Report
                                        </Button>
                                        <Button className="gap-2 text-xs rounded-lg px-8 bg-primary hover:bg-primary/90 active:scale-95 transition-all">
                                            Trade {ticker}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none bg-white dark:bg-slate-900 shadow-sm p-4 flex gap-4 items-center">
                            <div className="h-16 w-16 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-500">
                                <TrendingUp className="h-8 w-8" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Market Analysis</div>
                                <div className="font-bold text-sm">Whale activity surges as Bitcoin nears support...</div>
                                <div className="text-[10px] text-slate-400 mt-1">45 mins ago</div>
                            </div>
                        </Card>
                        <Card className="border-none bg-white dark:bg-slate-900 shadow-sm p-4 flex gap-4 items-center">
                            <div className="h-16 w-16 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400">
                                <AlertCircle className="h-8 w-8" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Regulation</div>
                                <div className="font-bold text-sm">New crypto bill signals positive outlook for...</div>
                                <div className="text-[10px] text-slate-400 mt-1">2 hours ago</div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
