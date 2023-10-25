import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get isModalOpen() {
    return this.isModalOpen$;
  }

  public openModal(): void {
    this.isModalOpen$.next(true);
  }

  public closeModal(): void {
    this.isModalOpen$.next(false);
  }
}
