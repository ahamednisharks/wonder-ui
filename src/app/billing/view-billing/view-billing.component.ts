import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-view-billing',
  templateUrl: './view-billing.component.html',
  styleUrls: ['./view-billing.component.scss']
})
export class ViewBillingComponent implements OnInit {

  // bills: any[] = [];
  filteredBills: any[] = [];

  searchText = '';
  dateRange: any;
  selectedPayment: any = null;

  loading = false;
  errorMessage = '';
  bills = [ { id: 1, bill_no: 'B001', date: '2025-01-10', total: 340, payment: 'Cash', items: 4 }, { id: 2, bill_no: 'B002', date: '2025-01-11', total: 520, payment: 'UPI', items: 6 }, { id: 3, bill_no: 'B003', date: '2025-01-12', total: 120, payment: 'Card', items: 2 }, ];

  paymentOptions = [
    { label: 'All', value: null },
    { label: 'Cash', value: 'Cash' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Card', value: 'Card' }
  ];

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  // ------------------ API LIST ------------------

  getList() {
    this.loading = true;
    this.errorMessage = '';

    const payload = {
      search: this.searchText || null,
      fromDate: this.dateRange?.[0] || null,
      toDate: this.dateRange?.[1] || null,
      paymentMode: this.selectedPayment
    };

    // ✅ POST ONLY (as you requested)
    this.api.post('billing/list', payload)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          
          this.bills = res || [];
          this.filteredBills = [...this.bills];
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Unable to load bills.';
        }
      });
  }

  // -------------- FILTER LOGIC ------------------

  applyFilters() {
    // If filtering is server-side, just call API again
    this.getList();
  }

  // -------------- ACTIONS ------------------

  goToAddBilling() {
    this.router.navigate(['/billing/add-billing']);
  }

  viewDetails(bill: any) {
    console.log('VIEW BILL', bill);
  }


  deleteBill(bill: any) {
    if (confirm(`Delete ${bill.bill_no}?`)) {
      // call delete API later
      console.log('DELETE BILL', bill.id);
    }
  }

  exportData() {
    console.log('Exporting… work in progress');
  }

  editBill(bill: any) {
    this.router.navigate(['/billing/add-billing', bill.id]);
  }
  
}
