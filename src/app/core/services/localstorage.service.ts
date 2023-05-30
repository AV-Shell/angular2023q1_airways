import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  private prefix = 'av-shell_angular_2023_q1';

  setItem(key: string, value: unknown): void {
    localStorage.setItem(this.getKey(key), JSON.stringify({ value }));
  }

  getItem<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(this.getKey(key));

    if (data !== null) {
      try {
        return JSON.parse(data).value;
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  getKey(key: string) {
    return `${this.prefix}-${key}`;
  }
}
