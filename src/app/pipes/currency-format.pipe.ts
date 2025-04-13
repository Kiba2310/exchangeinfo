import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../models/currency.model';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: Currency): string {
    const formattedValue = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

    return `${currency.symbol}${formattedValue}`;
  }
}
