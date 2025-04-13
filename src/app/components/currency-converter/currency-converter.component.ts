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
  currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' }
  ];
  conversionResult: ConversionResult | null = null;
  loading = false;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    // A pénznemek már be vannak állítva, nincs szükség API hívásra
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
