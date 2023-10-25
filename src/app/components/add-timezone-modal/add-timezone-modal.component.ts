import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LocalStorageService } from './../../services/local-storage.service';
import { ModalService } from './../../services/modal.service';
import { TimezoneService } from './../../services/timezone.service';

@Component({
	selector: 'app-add-timezone-modal',
	templateUrl: './add-timezone-modal.component.html',
	styleUrls: ['./add-timezone-modal.component.scss'],
})
export class AddTimezoneModalComponent implements OnInit {
	public timezonesNames$!: Observable<string[]>;
	public timezoneControl: FormControl = new FormControl('', Validators.required);

	public title: string = 'Select timezone';
	public defaultOptionText: string = 'Choose here...';
	public errorMessage: string = '* this field is required';
	public addButtonText: string = 'Add';
	public cancelButtonText: string = 'Cancel';

	constructor(
		private timezoneService: TimezoneService, private modalService: ModalService,
		private localStorageService: LocalStorageService) { }

	ngOnInit(): void {
		this.timezonesNames$ = this.timezoneService.getTimezonesNames();
	}

	public addTimezone(): void {
		this.timezoneService.addTimezoneWithDataByTimezoneName(this.timezoneControl.value);
		this.localStorageService.saveTimezoneName(this.timezoneControl.value);
		this.modalService.closeModal();
	}

	public closeModal(event: Event): void {
		if (event.target === event.currentTarget) {
			this.modalService.closeModal();
		}
	}
}
