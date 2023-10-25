import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { Timezone } from 'src/app/interfaces/timezone.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class TimezoneService {
	private static BASE_TIMEZONE_API_URL = 'https://worldtimeapi.org/api/';

	private timezonesNames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private timezonesWithData$: BehaviorSubject<Timezone[]> = new BehaviorSubject<Timezone[]>([]);

	constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

	public init(): void {
		forkJoin([
			this.fetchSavedTimezonesWithData(),
			this.fetchTimezoneWithDataByCurrentIp(),
			this.fetchTimezonesNames()],
		).subscribe(([savedTimezones, timezoneWithDataByIp, timezonesNames]) => {
			this.timezonesNames$.next(timezonesNames);
			this.timezonesWithData$.next([timezoneWithDataByIp, ...savedTimezones]);
		});
	}

	public refreshTimezones(): void {
		forkJoin([this.fetchSavedTimezonesWithData(), this.fetchTimezoneWithDataByCurrentIp()]).
			subscribe(([savedTimezones, timezoneWithDataByIp]) => {
				this.timezonesWithData$.next([timezoneWithDataByIp, ...savedTimezones]);
			});
	}

	public getTimezonesWithData(): BehaviorSubject<Timezone[]> {
		return this.timezonesWithData$;
	}

	public getTimezonesNames(): BehaviorSubject<string[]> {
		return this.timezonesNames$;
	}

	public fetchTimezoneWithDataByCurrentIp(): Observable<Timezone> {
		return this.http.get<Timezone>(TimezoneService.BASE_TIMEZONE_API_URL + 'ip');
	}

	public fetchTimezonesNames(): Observable<string[]> {
		return this.http.get<string[]>(TimezoneService.BASE_TIMEZONE_API_URL + 'timezone');
	}

	public fetchSavedTimezonesWithData(): Observable<Timezone[]> {
		const savedTimezones: string[] = this.localStorageService.getTimezonesNames();

		if (savedTimezones.length === 0) {
			return of([]);
		}

		const requests: Observable<Timezone>[] = savedTimezones.map((timezoneName: string) =>
			this.http.get<Timezone>(TimezoneService.BASE_TIMEZONE_API_URL + 'timezone/' + timezoneName),
		);

		return forkJoin(requests);
	}

	public addTimezoneWithDataByTimezoneName(timezoneName: string): void {
		this.http.get<Timezone>(TimezoneService.BASE_TIMEZONE_API_URL + 'timezone/' + timezoneName).
			subscribe((timezone: Timezone) => {
				this.timezonesWithData$.next([...this.timezonesWithData$.value, timezone]);
			});
	}
}
