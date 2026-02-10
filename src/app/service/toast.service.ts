import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<{ message: string; type: string }>();
  toast$ = this.toastSubject.asObservable();

  success(msg: string) {

    debugger
    this.toastSubject.next({ message: msg, type: 'success' });
  }

  error(msg: string) {
    this.toastSubject.next({ message: msg, type: 'error' });
  }

  warning(msg: string) {
    this.toastSubject.next({ message: msg, type: 'warning' });
  }
}
