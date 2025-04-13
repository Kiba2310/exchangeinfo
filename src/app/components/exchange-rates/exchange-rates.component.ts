import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExchangeService } from '../../services/exchange.service';
import { Currency, ExchangeRate } from '../../models/currency.model';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  displayedColumns: string[] = ['fromCurrency', 'rate', 'toCurrency'];
  rates: ExchangeRate[] = [];
  loading = false;
  baseCurrency: Currency = { code: 'USD', name: 'US Dollar', symbol: '$' };
  targetCurrencies: Currency[] = [
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
  ];

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadExchangeRates();
  }

  private loadExchangeRates(): void {
    this.targetCurrencies.forEach(currency => {
      this.exchangeService.getExchangeRate(this.baseCurrency.code, currency.code)
        .subscribe({
          next: (rate) => {
            this.rates.push(rate);
          },
          complete: () => {
            this.loading = false;
          }
        });
    });
  }
}
