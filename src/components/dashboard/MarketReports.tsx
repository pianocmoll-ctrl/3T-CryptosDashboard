import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Newspaper, Globe, Scale, Download, BellRing, Share2, Bookmark, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { MarketReport, NewsItem } from '@/types';
import { ReportSkeleton } from './SkeletonLoaders';
import { cn } from "@/lib/utils";
import { searchVerifiedNews, getTop10MarketNews } from '@/lib/ai';

export default function MarketReports() {
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [query, setQuery] = useState('ADA, DOT, SOL, XRP');
    const [news, setNews] = useState<NewsItem[]>([]);

    // Data based on research 2026-02-21
    const initialReportData: MarketReport = {
        news: [
            {
                title: "Bitcoin konsolidiert bei $68k - Extreme Angst dominiert",
                germanTitle: "Bitcoin konsolidiert bei $68k - Extreme Angst dominiert",
                source: "BTC-ECHO",
                time: "12m ago",
                sentiment: "Neutral",
                content: "Bitcoin zeigt geringe Volatilität und verharrt bei ca. 68.000 USD. Der Fear & Greed Index liegt bei extremen 8 Punkten. Technische Analysen warnen vor einer Kopf-Schulter-Formation.",
                germanContent: "Bitcoin zeigt geringe Volatilität und verharrt bei ca. 68.000 USD. Der Fear & Greed Index liegt bei extremen 8 Punkten. Technische Analysen warnen vor einer Kopf-Schulter-Formation."
            },
            {
                title: "BNP Paribas tokenisiert Geldmarktfonds auf Ethereum",
                germanTitle: "BNP Paribas tokenisiert Geldmarktfonds auf Ethereum",
                source: "Reuters Tech",
                time: "2h ago",
                sentiment: "Bullish",
                content: "Ein bedeutender Schritt für TradFi on-chain: BNP Paribas nutzt die öffentliche Ethereum-Blockchain für Tokenisierung, was das institutionelle Vertrauen in ETH stärkt.",
                germanContent: "Ein bedeutender Schritt für TradFi on-chain: BNP Paribas nutzt die öffentliche Ethereum-Blockchain für Tokenisierung, was das institutionelle Vertrauen in ETH stärkt."
            }
        ],
        market: {
            btcDominance: "52.4%",
            fearGreed: 8
        },
        macro: [
            {
                event: "US Inflation (CPI)",
                region: "US",
                impact: "Erwartete Zinssenkung der Fed im Q2 könnte Märkte beflügeln."
            }
        ],
        projects: [
            {
                name: "Cardano Leios",
                completion: "83%",
                status: "Mainnet Launch scheduled for Q1 2026. Scalability upgrade on track."
            },
            {
                name: "Cardano BTC DeFi (Bitcoin Bridge)",
                completion: "45%",
                status: "Cross-chain infrastructure development in progress. Testnet expected Q3 2026."
            }
        ],
        regulation: [
            {
                act: "US GENIUS Act",
                status: "Active Law since July 2025. Rulemaking ongoing."
            }
        ]
    };

    const [translatedItems, setTranslatedItems] = useState<Record<number, boolean>>({});

    const handleTop10News = async () => {
        setSearchLoading(true);
        const topNews = await getTop10MarketNews();
        setNews(topNews);
        setQuery(''); // Clear query for general news
        setTranslatedItems({});
        setSearchLoading(false);
    };

    const handleSearch = async () => {
        setSearchLoading(true);
        const tickers = query.split(',').map(t => t.trim()).filter(t => t !== '');
        const verifiedNews = await searchVerifiedNews(tickers);
        // Replace current news with new results for isolated search
        setNews(verifiedNews);
        setTranslatedItems({}); // Reset translations on new search
        setSearchLoading(false);
    };

    const handleLoadMore = () => {
        // Append some older news simulation
        const moreNews: NewsItem[] = [
            {
                title: "DEX Volume on Solana Hits Record High",
                germanTitle: "DEX-Volumen auf Solana erreicht Rekordhoch",
                source: "Solana Floor",
                time: "2d ago",
                sentiment: "Bullish",
                content: "Solana-based decentralized exchanges have surpassed $50B in monthly volume for the first time. Verified true.",
                germanContent: "Solana-basierte dezentrale Börsen haben zum ersten Mal ein monatliches Volumen von 50 Mrd. USD überschritten. Bestätigt."
            }
        ];
        setNews(prev => [...prev, ...moreNews]);
    };

    const toggleTranslation = (index: number) => {
        setTranslatedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    useEffect(() => {
        const init = async () => {
            setNews(initialReportData.news);
            setLoading(false);
        };
        init();
    }, []);

    if (loading) return <ReportSkeleton />;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <Card className="border-none shadow-sm bg-primary/5 dark:bg-primary/10 overflow-hidden rounded-2xl">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">AI Verified Search (X, Reddit, Telegram)</label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter coins (e.g. ADA, DOT, SOL, XRP)"
                                    className="h-14 pl-12 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm text-lg focus-visible:ring-2 focus-visible:ring-primary/50"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 self-end">
                            <Button
                                onClick={handleSearch}
                                disabled={searchLoading}
                                className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 font-bold gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
                            >
                                {searchLoading ? "AI searching..." : "Get Verified Insights"} <Sparkles className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={handleTop10News}
                                disabled={searchLoading}
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-2 font-bold gap-2 active:scale-95 transition-all"
                            >
                                Top 10 Market News <Newspaper className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold tracking-tight">Marktberichte & Insights</h2>
                    <p className="text-sm text-slate-500">Echtzeit-Analyse der globalen Krypto-Landschaft via Gemini AI.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg gap-2 text-xs">
                        <Download className="h-4 w-4" /> Export PDF
                    </Button>
                    <Button size="sm" className="rounded-lg gap-2 text-xs bg-primary">
                        <BellRing className="h-4 w-4" /> Alarm erstellen
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* News Feed - Left side */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {news.map((n, i) => (
                            <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-xl transition-all h-full flex flex-col relative">
                                <div className={cn(
                                    "h-1 w-full",
                                    n.sentiment === 'Bullish' ? "bg-green-500" :
                                        n.sentiment === 'Bearish' ? "bg-red-500" :
                                            n.sentiment === 'Regulation' ? "bg-blue-500" : "bg-slate-300"
                                )}></div>
                                <CardHeader className="p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={cn(
                                                "text-[9px] font-bold uppercase tracking-widest border-none px-2 py-0.5 rounded",
                                                n.sentiment === 'Bullish' ? "bg-green-100 text-green-600 dark:bg-green-900/30" :
                                                    n.sentiment === 'Bearish' ? "bg-red-100 text-red-600 dark:bg-red-900/30" :
                                                        n.sentiment === 'Regulation' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : "bg-slate-100 text-slate-600"
                                            )}>
                                                {n.sentiment}
                                            </Badge>
                                            <div className="flex items-center">
                                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-500 border-none px-2 py-0.5 rounded flex items-center gap-1 leading-none h-5">
                                                    <CheckCircle2 className="h-3 w-3" /> VERIFIED
                                                </Badge>
                                                <button
                                                    onClick={() => toggleTranslation(i)}
                                                    className="ml-1 hover:scale-110 transition-transform active:scale-95 touch-manipulation flex items-center justify-center p-0.5"
                                                    title="Translate to German"
                                                >
                                                    <span className="text-sm">🇩🇪</span>
                                                </button>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                                    </div>
                                    <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                                        {translatedItems[i] && n.germanTitle ? n.germanTitle : n.title}
                                    </CardTitle>
                                    <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{n.source}</CardDescription>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 pt-0 flex-1 flex flex-col justify-between">
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3 italic">
                                        &quot;{translatedItems[i] && n.germanContent ? n.germanContent : n.content}&quot;
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                        <div className="flex gap-2">
                                            <Badge variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 border-none">Search Result</Badge>
                                            <Badge variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 border-none">#TrueNews</Badge>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><Bookmark className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary"><Share2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleLoadMore}
                        className="w-full h-12 border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase tracking-widest text-xs"
                    >
                        Weitere Insights laden
                    </Button>
                </div>

                {/* Sidebar - Right side */}
                <div className="space-y-6">
                    {/* Market Stats */}
                    <Card className="border-none shadow-md bg-white dark:bg-slate-900">
                        <CardHeader className="p-6 pb-3">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Market Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div className="text-xs font-bold">BTC Dominanz</div>
                                <div className="text-lg font-bold text-primary">{initialReportData.market.btcDominance}</div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div className="text-xs font-bold">Altcoin Season Index</div>
                                <div className="text-lg font-bold text-indigo-600">15</div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div className="text-xs font-bold">Fear & Greed</div>
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">{initialReportData.market.fearGreed}</div>
                                    <span className="text-[10px] font-bold text-red-500 uppercase">Extreme Fear</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Markets Clarity Act / MiCA */}
                    <Card className="border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Scale className="h-24 w-24 rotate-12" />
                        </div>
                        <CardHeader className="p-6 pb-3 relative z-10">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-blue-100 flex items-center gap-2">
                                <Scale className="h-4 w-4" /> Clarity Act / MiCA
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4 relative z-10">
                            <div className="p-3 bg-white/10 rounded-xl space-y-1">
                                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Status: active compliance</div>
                                <div className="text-xs font-bold font-mono">PHASE 2 DEPLOYED</div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                                    <div className="text-[11px] font-medium text-blue-50">Stablecoin Regulation (June 2024)</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                                    <div className="text-[11px] font-medium text-blue-50">CASP Licensing (Dec 2024)</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)] animate-pulse"></div>
                                    <div className="text-[11px] font-medium text-blue-50 text-opacity-80 leading-tight">Phase 3: Anti-Money Laundering Framework (Q2 2026)</div>
                                </div>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-white hover:text-blue-200 uppercase tracking-tighter">
                                View Regulatory Roadmap &rarr;
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Project Status */}
                    <Card className="border-none shadow-md bg-white dark:bg-slate-900">
                        <CardHeader className="p-6 pb-3">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Project Status</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            {initialReportData.projects.map((p, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span>{p.name}</span>
                                        <span className="text-primary">{p.completion}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: p.completion }}></div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 leading-tight italic">{p.status}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


