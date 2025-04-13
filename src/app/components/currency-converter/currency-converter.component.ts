import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeService } from '../../services/exchange.service';
import { Currency, ConversionResult } from '../../models/currency.model';
import { CurrencyFormComponent } from '../currency-form/currency-form.component';
import { CurrencyCardComponent } from '../currency-card/currency-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyFormComponent,
    CurrencyCardComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: Currency[] = [];
  conversionResult: ConversionResult | null = null;
  loading = false;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.exchangeService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  onConvert(data: {amount: number; from: Currency; to: Currency}): void {
    this.loading = true;
    this.exchangeService.convertCurrency(data.amount, data.from, data.to)
      .subscribe({
        next: (result) => {
          this.conversionResult = result;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}
