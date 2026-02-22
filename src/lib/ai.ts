import { NewsItem } from '@/types';

/**
 * Simulates a Gemini AI search across platforms like X (Twitter), Reddit, and Telegram.
 * Filters for verified/truthful news based on specified tickers.
 */
export const searchVerifiedNews = async (tickers: string[]): Promise<NewsItem[]> => {
    // Simulate network delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const allMockNews: Record<string, NewsItem[]> = {
        'ADA': [
            {
                title: "Cardano (ADA) Midnight Mainnet Progress on Track",
                germanTitle: "Cardano (ADA) Midnight Mainnet Fortschritt im Zeitplan",
                source: "IOG Verified",
                time: "1h ago",
                sentiment: "Bullish",
                content: "Confirmed by official IOG developers: The Midnight network's privacy-focused sidechain is entering the final testing phase before Q2 launch. Verified true by cross-referencing GitHub commits.",
                germanContent: "Von offiziellen IOG-Entwicklern bestätigt: Die auf Datenschutz fokussierte Sidechain des Midnight-Netzwerks geht in die letzte Testphase vor dem Launch im zweiten Quartal. Verifiziert durch Abgleich von GitHub-Commits."
            },
            {
                title: "ADA Whale Accumulation Hits 2-Year High",
                germanTitle: "ADA Whale Akkumulation erreicht 2-Jahres-Hoch",
                source: "WhaleAlert (X)",
                time: "4h ago",
                sentiment: "Bullish",
                content: "On-chain data verified: Wallets holding 1M-10M ADA have increased their positions by 3% in the last 48 hours. Social sentiment on Reddit confirms growing retail interest.",
                germanContent: "On-Chain-Daten verifiziert: Wallets, die 1 Mio. bis 10 Mio. ADA halten, haben ihre Positionen in den letzten 48 Stunden um 3 % erhöht. Das soziale Sentiment auf Reddit bestätigt das wachsende Interesse von Privatanlegern."
            }
        ],
        'DOT': [
            {
                title: "Polkadot 2.0 Coretime Auctions Successfully Initiated",
                germanTitle: "Polkadot 2.0 Coretime Auktionen erfolgreich gestartet",
                source: "Parity Technologies",
                time: "30m ago",
                sentiment: "Bullish",
                content: "Official update: The new Coretime mechanism is now live on Kusama, preparing for Polkadot mainnet integration. Verified true through technical documentation review.",
                germanContent: "Offizielles Update: Der neue Coretime-Mechanismus ist jetzt auf Kusama live und bereitet die Polkadot-Mainnet-Integration vor. Verifiziert durch Prüfung der technischen Dokumentation."
            },
            {
                title: "DOT Staking Rate Reaches New Milestone",
                germanTitle: "DOT Staking-Rate erreicht neuen Meilenstein",
                source: "PolkaProject",
                time: "6h ago",
                sentiment: "Neutral",
                content: "Staking participation has hit 54% of total supply. While positive for security, analysts on X note potential liquidity constraints in the short term.",
                germanContent: "Die Staking-Beteiligung hat 54 % des Gesamtangebots erreicht. Während dies positiv für die Sicherheit ist, merken Analysten auf X potenzielle Liquiditätsengpässe in naher Zukunft an."
            }
        ],
        'SOL': [
            {
                title: "Solana Mainnet-Beta Performance Patch Deployed",
                germanTitle: "Solana Mainnet-Beta Performance Patch bereitgestellt",
                source: "Solana Status",
                time: "2h ago",
                sentiment: "Bullish",
                content: "The v1.18 software update has been adopted by 90% of validators, successfully resolving the recent congestion issues. Network throughput is back to 2,500 TPS.",
                germanContent: "Das Software-Update v1.18 wurde von 90 % der Validatoren übernommen und behebt erfolgreich die jüngsten Überlastungsprobleme. Der Netzwerkdurchsatz liegt wieder bei 2.500 TPS."
            }
        ],
        'XRP': [
            {
                title: "Ripple RLUSD Stablecoin Receives Regulatory Nod",
                germanTitle: "Ripple RLUSD Stablecoin erhält regulatorische Zustimmung",
                source: "NYDFS Updates",
                time: "3h ago",
                sentiment: "Bullish",
                content: "Cross-referenced with New York Department of Financial Services filings: Ripple's USD stablecoin is cleared for institutional trials. Confirmed true.",
                germanContent: "Abgleich mit Unterlagen des New York Department of Financial Services: Ripples USD-Stablecoin ist für institutionelle Tests freigegeben. Bestätigt."
            }
        ],
        'MICA': [
            {
                title: "MiCA Phase 3 Implementation Strategy Finalized",
                germanTitle: "MiCA Phase 3 Implementierungsstrategie finalisiert",
                source: "ESMA Official",
                time: "5h ago",
                sentiment: "Regulation",
                content: "The European Securities and Markets Authority has released final guidelines for CASP compliance under MiCA. Implementation is mandatory by year-end.",
                germanContent: "Die Europäische Wertpapier- und Marktaufsichtsbehörde hat finale Leitlinien für die CASP-Compliance unter MiCA veröffentlicht. Die Umsetzung ist bis Jahresende obligatorisch."
            }
        ]
    };

    const results: NewsItem[] = [];

    tickers.forEach(t => {
        const upperTicker = t.trim().toUpperCase();
        if (allMockNews[upperTicker]) {
            results.push(...allMockNews[upperTicker]);
        } else {
            // Generic confirmed news for unknown tickers
            results.push({
                title: `${upperTicker} Social Sentiment verified as Neutral`,
                source: "AI Aggregate",
                time: "Just now",
                sentiment: "Neutral",
                content: `Gemini AI analysis of X and Reddit indicates steady volume for ${upperTicker} with no confirmed major news events in the last 24 hours.`
            });
        }
    });

    return results;
};

export const getTop10MarketNews = async (): Promise<NewsItem[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
        {
            title: "Bitcoin ETFs See Record $1.2B Weekly Inflow",
            germanTitle: "Bitcoin ETFs verzeichnen Rekordzufluss von 1,2 Mrd. USD pro Woche",
            source: "Financial Times",
            time: "1h ago",
            sentiment: "Bullish",
            content: "Institutional demand for Bitcoin continues to surge as BlackRock and Fidelity lead the charge. Analysts suggest this could be the catalyst for a new all-time high.",
            germanContent: "Die institutionelle Nachfrage nach Bitcoin steigt weiter an, wobei BlackRock und Fidelity die Führung übernehmen. Analysten vermuten, dass dies der Katalysator für ein neues Allzeithoch sein könnte."
        },
        {
            title: "Ethereum Dencun Upgrade Reduces L2 Fees by 90%",
            germanTitle: "Ethereum Dencun-Upgrade reduziert L2-Gebühren um 90 %",
            source: "Devcon Daily",
            time: "3h ago",
            sentiment: "Bullish",
            content: "Blob transactions are now live, significantly lowering costs for Arbitrum, Optimism, and Base users. Verified true via mainnet monitoring.",
            germanContent: "Blob-Transaktionen sind jetzt live und senken die Kosten für Benutzer von Arbitrum, Optimism und Base erheblich. Verifiziert durch Mainnet-Monitoring."
        },
        {
            title: "SEC Delays Decision on Solana Spot ETF",
            germanTitle: "SEC verschiebt Entscheidung über Solana Spot ETF",
            source: "SEC Filings",
            time: "5h ago",
            sentiment: "Neutral",
            content: "The regulator has requested additional comments on the proposed Solana ETF. Market reaction remains muted as expectations were already low.",
            germanContent: "Die Aufsichtsbehörde hat zusätzliche Kommentare zum vorgeschlagenen Solana-ETF angefordert. Die Marktreaktion bleibt verhalten, da die Erwartungen bereits niedrig waren."
        },
        {
            title: "MicroStrategy Acquires Another 12,000 BTC",
            germanTitle: "MicroStrategy erwirbt weitere 12.000 BTC",
            source: "Company Press Release",
            time: "8h ago",
            sentiment: "Bullish",
            content: "Michael Saylor's firm continues its aggressive Bitcoin acquisition strategy, now holding over 1% of the total supply. Verified via SEC Form 8-K.",
            germanContent: "Michael Saylors Unternehmen setzt seine aggressive Bitcoin-Akquisitionsstrategie fort und hält nun über 1 % des Gesamtangebots. Verifiziert über SEC Form 8-K."
        },
        {
            title: "UK Treasury Proposes Staking Regulation Framework",
            germanTitle: "UK Treasury schlägt Regulierungsrahmen für Staking vor",
            source: "Gov.uk",
            time: "10h ago",
            sentiment: "Regulation",
            content: "New proposals aim to clarify the tax and legal status of crypto staking in the UK. This moves provides much-needed clarity for institutional providers.",
            germanContent: "Neue Vorschläge zielen darauf ab, den steuerlichen und rechtlichen Status von Krypto-Staking im Vereinigten Königreich zu klären. Dies sorgt für dringend benötigte Klarheit für institutionelle Anbieter."
        },
        {
            title: "Circle Expands Native USDC Deployment to 5 New Chains",
            germanTitle: "Circle weitet native USDC-Bereitstellung auf 5 neue Chains aus",
            source: "Circle Blog",
            time: "12h ago",
            sentiment: "Bullish",
            content: "USDC stability in the DeFi ecosystem increases as bridge-less deployments go live on emerging L2 solutions. Confirmed true.",
            germanContent: "Die USDC-Stabilität im DeFi-Ökosystem nimmt zu, da Brücken-lose Bereitstellungen auf aufkommenden L2-Lösungen live gehen. Bestätigt."
        },
        {
            title: "Crypto Venture Funding Hits 18-Month High in February",
            germanTitle: "Krypto-Venture-Finanzierung erreicht im Februar 18-Monats-Hoch",
            source: "Crunchbase Crypto",
            time: "15h ago",
            sentiment: "Bullish",
            content: "Over $1.1B was invested in crypto startups this month, showing a return of risk appetite among venture capitalists. Verified data.",
            germanContent: "Über 1,1 Mrd. USD wurden diesen Monat in Krypto-Startups investiert, was auf eine Rückkehr des Risikoappetits bei Risikokapitalgebern hindeutet. Verifizierte Daten."
        },
        {
            title: "South Korea to Ban Credit Card Payments for Crypto",
            germanTitle: "Südkorea plant Verbot von Kreditkartenzahlungen für Krypto",
            source: "FSC Korea",
            time: "18h ago",
            sentiment: "Bearish",
            content: "The Financial Services Commission cites concerns over capital outflow and money laundering. Regulation expected to take effect in Q3.",
            germanContent: "Die Financial Services Commission äußert Besorgnis über Kapitalabfluss und Geldwäsche. Die Regelung wird voraussichtlich im dritten Quartal in Kraft treten."
        },
        {
            title: "Tether Net Profit Reaches $2.85B in Q4",
            germanTitle: "Tether-Nettogewinn erreicht 2,85 Mrd. USD in Q4",
            source: "BDO Attestation Report",
            time: "20h ago",
            sentiment: "Bullish",
            content: "Tether's excess reserves grow as Treasury yields boost earnings. Continuous proof of reserves confirms full backing. Verified true.",
            germanContent: "Tethers Überschussreserven steigen, da Treasury-Renditen die Gewinne steigern. Kontinuierliche Reservenachweise bestätigen die vollständige Deckung. Bestätigt."
        },
        {
            title: "Arbitrum Foundation Proposes Gaming Catalyst Program",
            germanTitle: "Arbitrum Foundation schlägt Gaming Catalyst Program vor",
            source: "Arbitrum DAO",
            time: "23h ago",
            sentiment: "Bullish",
            content: "A 200M ARB request to fund game development on the network. Community sentiment is currently 75% in favor of the proposal.",
            germanContent: "Ein Antrag über 200 Mio. ARB zur Finanzierung der Spieleentwicklung im Netzwerk. Das Community-Sentiment ist derzeit zu 75 % für den Vorschlag."
        }
    ];
};
