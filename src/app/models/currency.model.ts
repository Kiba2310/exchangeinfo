export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface ExchangeRate {
    from: string;
    to: string;
    rate: number;
    lastUpdated: Date;
}

export interface ConversionResult {
    amount: number;
    fromCurrency: Currency;
    toCurrency: Currency;
    result: number;
    rate: number;
}

export interface CurrencyPair {
    baseCurrency: Currency;
    quoteCurrency: Currency;
    favorited: boolean;
}
