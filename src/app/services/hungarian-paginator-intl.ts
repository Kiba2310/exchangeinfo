import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class HungarianPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elemek oldalanként';
  override nextPageLabel = 'Következő oldal';
  override previousPageLabel = 'Előző oldal';
  override firstPageLabel = 'Első oldal';
  override lastPageLabel = 'Utolsó oldal';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };
}
