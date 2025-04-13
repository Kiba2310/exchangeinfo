import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatTabsModule,
    CurrencyConverterComponent,
    ExchangeRatesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Exchange Rate App';
}
