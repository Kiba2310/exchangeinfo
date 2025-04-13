import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Currency } from '../../models/currency.model';

@Component({
  selector: 'app-currency-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent {
  @Input() currencies: Currency[] = [];
  @Output() convert = new EventEmitter<{amount: number; from: Currency; to: Currency}>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { amount, fromCurrency, toCurrency } = this.form.value;
      this.convert.emit({
        amount: amount,
        from: fromCurrency,
        to: toCurrency
      });
    }
  }
}
