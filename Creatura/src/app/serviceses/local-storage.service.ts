// src/app/services/local-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() { }

  // Guardar datos
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener datos
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Eliminar un dato
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo
  clear(): void {
    localStorage.clear();
  }
}
