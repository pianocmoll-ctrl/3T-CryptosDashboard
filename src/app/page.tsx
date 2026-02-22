'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import BuyAnalysis from "@/components/dashboard/BuyAnalysis";
import SellAnalysis from "@/components/dashboard/SellAnalysis";
import PriceForecast from "@/components/dashboard/PriceForecast";
import MarketReports from "@/components/dashboard/MarketReports";

export default function Home() {
  const [ticker, setTicker] = useState('BTC');
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-8 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <span className="text-white font-bold text-xl">3T</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">CryptoDashboard</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('reports')}
              className="hover:text-primary transition-colors"
            >
              News
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <User className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8 px-8 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Smart Crypto Analysis</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter any cryptocurrency symbol to get real-time technical analysis and buy/sell signals.</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              <TabsList className="bg-transparent border-none p-0 flex gap-2">
                <TabsTrigger value="buy" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Buy Analysis</TabsTrigger>
                <TabsTrigger value="sell" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Sell Analysis</TabsTrigger>
                <TabsTrigger value="forecast" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Forecast</TabsTrigger>
                <TabsTrigger value="reports" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">Market Reports</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="buy" className="mt-0">
              <BuyAnalysis ticker={ticker} setTicker={setTicker} />
            </TabsContent>
            <TabsContent value="sell" className="mt-0">
              <SellAnalysis ticker={ticker} setTicker={setTicker} />
            </TabsContent>
            <TabsContent value="forecast" className="mt-0">
              <PriceForecast ticker={ticker} setTicker={setTicker} />
            </TabsContent>
            <TabsContent value="reports" className="mt-0">
              <MarketReports />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="border-t py-12 mt-12 bg-white dark:bg-slate-900/50">
        <div className="container mx-auto px-8 max-w-7xl text-center space-y-4">
          <p className="text-sm text-slate-500">© 2026 CryptoDash AI Analysis Platform. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
