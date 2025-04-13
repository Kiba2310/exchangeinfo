import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { ConversionResult } from '../../models/currency.model';

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CurrencyFormatPipe
  ],
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {
  @Input() result!: ConversionResult;
}
