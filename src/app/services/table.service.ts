import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TableService {
	private columns: string[] = [
		'Time zone',
		'Abbr & Offset',
		'Local time',
		'Local date',
		'Daylight Saving',
	];

	public getColumns(): string[] {
		return this.columns;
	}
}
