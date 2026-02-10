import { Component, OnInit } from '@angular/core';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  toast: any;
showToast = false;

  constructor(private toastService: ToastService) {}

  // ngOnInit(): void {
    

  //   this.toastService.toast$.subscribe(data => {
  //     console.log('TOAST RECEIVED 👉', data); // 🔥 MUST print

  //     this.toast = data;
  //     setTimeout(() => this.toast = null, 3000);
  //   });
  // }



  ngOnInit(): void {
    this.toastService.toast$.subscribe(data => {
      this.toast = data;
      this.showToast = true;
      console.log(this.toast)
  
      setTimeout(() => {
        this.showToast = false;
        this.toast = null;
      }, 3000);
    });
  }
  
}
