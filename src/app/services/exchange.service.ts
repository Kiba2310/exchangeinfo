import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Currency, ExchangeRate, ConversionResult } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiKey = 'be9ffceaf7abad71aa66b6b5'; 
  private baseUrl = 'https://v6.exchangerate-api.com/v6';

  private currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  ];

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    return of(this.currencies);
  }

  getExchangeRate(from: string, to: string): Observable<ExchangeRate> {
    return this.http.get<any>(`${this.baseUrl}/${this.apiKey}/pair/${from}/${to}`)
      .pipe(
        map(response => ({
          from,
          to,
          rate: response.conversion_rate,
          lastUpdated: new Date(response.time_last_update_utc)
        }))
      );
  }

  convertCurrency(amount: number, from: Currency, to: Currency): Observable<ConversionResult> {
    return this.getExchangeRate(from.code, to.code)
      .pipe(
        map(rate => ({
          amount,
          fromCurrency: from,
          toCurrency: to,
          rate: rate.rate,
          result: amount * rate.rate
        }))
      );
  }
}
