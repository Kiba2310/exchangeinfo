import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HungarianPaginatorIntl } from '../../services/hungarian-paginator-intl';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ExchangeService } from '../../services/exchange.service';
import { Currency, ExchangeRate } from '../../models/currency.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: HungarianPaginatorIntl }
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['fromCurrency', 'rate', 'toCurrency', 'actions'];
  dataSource = new MatTableDataSource<ExchangeRate>();
  loading = false;
  pageSize = 5;
  baseCurrency: Currency = { code: 'USD', name: 'US Dollar', symbol: '$' };
  private destroy$ = new Subject<void>();
  
  @ViewChild('exchangeRatesSort') sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  targetCurrencies: Currency[] = [
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

  constructor(
    private exchangeService: ExchangeService,
    private snackBar: MatSnackBar
  ) {}

  private setupDataSource(data: ExchangeRate[]): void {
    // Új adatforrás létrehozása
    this.dataSource = new MatTableDataSource<ExchangeRate>();
    
    // Beállítjuk a szűrő funkciót
    this.dataSource.filterPredicate = (data: ExchangeRate, filter: string) => {
      return data.from.toLowerCase().includes(filter) || 
             data.to.toLowerCase().includes(filter) || 
             data.rate.toString().includes(filter);
    };

    // Először beállítjuk az adatokat
    this.dataSource.data = data;

    // Ezután a lapozót
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = 0;
      this.paginator.length = data.length;
      this.dataSource.paginator = this.paginator;
    }

    // Ezután a rendezést
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadExchangeRates();
  }

  ngAfterViewInit() {
    // Ha már vannak adatok, frissítsük a dataSource-t
    if (this.dataSource.data.length > 0) {
      this.setupDataSource(this.dataSource.data);
    }
  }

  onPageSizeChange(event: any): void {
    if (this.paginator) {
      this.pageSize = event.value;
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = 0;
      
      // Kényszerítjük a frissítést
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addToFavorites(rate: ExchangeRate) {
    this.snackBar.open(`Added ${rate.from}/${rate.to} to favorites`, 'Close', {
      duration: 3000
    });
  }

  showDetails(rate: ExchangeRate) {
    this.snackBar.open(`Exchange rate details for ${rate.from}/${rate.to}`, 'Close', {
      duration: 3000
    });
  }

  private loadExchangeRates(): void {
    const rates: ExchangeRate[] = [];
    let completedRequests = 0;
    const totalRequests = this.targetCurrencies.length;

    // Egyszerre kérjük le az összes árfolyamot
    this.targetCurrencies.forEach(currency => {
      this.exchangeService.getExchangeRate(this.baseCurrency.code, currency.code)
        .subscribe({
          next: (rate) => {
            rates.push(rate);
          },
          complete: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              // Rendezzük az árfolyamokat a forráspénznem szerint
              rates.sort((a, b) => a.from.localeCompare(b.from));
              
              // Rendezzük az adatokat
              rates.sort((a, b) => a.from.localeCompare(b.from));
              
              // Beállítjuk az adatforrást
              this.dataSource.data = rates;
              
              // Inicializáljuk a táblázatot a betöltött adatokkal
              this.setupDataSource(rates);
              
              this.loading = false;
            }
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
