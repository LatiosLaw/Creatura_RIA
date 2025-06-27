import { MatPaginatorIntl } from '@angular/material/paginator';

export function customPaginator() {
    const paginatorIntl = new MatPaginatorIntl();
  
    paginatorIntl.itemsPerPageLabel = ''; 
  
    paginatorIntl.nextPageLabel = 'Siguiete';
    paginatorIntl.previousPageLabel = 'Anterior';
    paginatorIntl.firstPageLabel = 'Primero';
    paginatorIntl.lastPageLabel = 'Ultimo';
  
    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 of ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return `${startIndex + 1} - ${endIndex} / ${length}`;
    };
  
    return paginatorIntl;
  }