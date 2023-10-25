import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private timezoneNames: string[] = [];

  public getTimezonesNames(): string[] {
    return this.timezoneNames;
  }

  public init(): void {
    this.getTimezonesNamesFromLocalStorage();
  }

  public getTimezonesNamesFromLocalStorage(): void {
    this.timezoneNames = JSON.parse(localStorage.getItem('timezoneNames') || '[]');
  }

  public setTimezonesNamesToLocalStorage(): void {
    localStorage.setItem('timezoneNames', JSON.stringify(this.timezoneNames));
  }

  public saveTimezoneName(timezoneName: string): void {
    this.timezoneNames.push(timezoneName);
    this.setTimezonesNamesToLocalStorage();
  }
}
