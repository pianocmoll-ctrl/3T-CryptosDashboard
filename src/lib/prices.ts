export interface BinanceTicker {
    symbol: string;
    price?: string;
    lastPrice: string;
    priceChangePercent: string;
}

export const fetchRealtimePrice = async (ticker: string) => {
    try {
        // Standardize symbol for Binance (e.g., BTC -> BTCUSDT)
        const symbol = ticker.endsWith('USDT') ? ticker : `${ticker}USDT`;

        // We use the 24hr ticker endpoint because it provides both current price and 24h change
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch price for ${symbol}`);
        }

        const data: BinanceTicker = await response.json();

        return {
            price: parseFloat(data.lastPrice),
            change24h: parseFloat(data.priceChangePercent)
        };
    } catch (error) {
        console.error('Error fetching real-time price:', error);
        return null;
    }
};
