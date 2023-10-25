import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, takeUntil } from 'rxjs';

import { Timezone } from 'src/app/interfaces/timezone.interface';
import { ModalService } from 'src/app/services/modal.service';
import { TableService } from 'src/app/services/table.service';
import { TimezoneService } from 'src/app/services/timezone.service';

@Component({
	selector: 'app-timezone-table',
	templateUrl: './timezone-table.component.html',
	styleUrls: ['./timezone-table.component.scss'],
})
export class TimezoneTableComponent implements OnInit, OnDestroy {
	public timezonesWithData$!: Observable<Timezone[]>;
	public isModalOpen$!: Observable<boolean>;
	public columns: string[] = [];
	private $destroy$: Subject<void> = new Subject<void>();

	public addButtonText: string = 'Add';

	constructor(
		private timezoneService: TimezoneService, private tableService: TableService,
		private modalService: ModalService) { }

	ngOnInit(): void {
		this.initializeValues();
		this.enableRealTimeData();
	}

	public initializeValues(): void {
		this.columns = this.tableService.getColumns();
		this.isModalOpen$ = this.modalService.isModalOpen;
		this.timezonesWithData$ = this.timezoneService.getTimezonesWithData();
		this.timezoneService.init();
	}

	public enableRealTimeData(): void {
		interval(1000).pipe(takeUntil(this.$destroy$)).subscribe(() => {
			this.timezoneService.refreshTimezones();
		});
	}

	public openModal(): void {
		this.modalService.openModal();
	}

	public ngOnDestroy(): void {
		this.$destroy$.next();
		this.$destroy$.complete();
	}
}
