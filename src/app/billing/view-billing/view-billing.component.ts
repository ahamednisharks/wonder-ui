import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-billing',
  templateUrl: './view-billing.component.html',
  styleUrls: ['./view-billing.component.scss']
})
export class ViewBillingComponent implements OnInit {

  bills = [
    { id: 1, bill_no: 'B001', date: '2025-01-10', total: 340, payment: 'Cash', items: 4 },
    { id: 2, bill_no: 'B002', date: '2025-01-11', total: 520, payment: 'UPI', items: 6 },
    { id: 3, bill_no: 'B003', date: '2025-01-12', total: 120, payment: 'Card', items: 2 },
  ];

  filteredBills = [...this.bills];

  searchText = '';
  dateRange: any;
  selectedPayment: any = null;

  paymentOptions = [
    { label: 'All', value: null },
    { label: 'Cash', value: 'Cash' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Card', value: 'Card' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // -------------- FILTER LOGIC ------------------

  applyFilters() {
    this.filteredBills = this.bills.filter(bill => {

      // Search filter
      const matchesSearch = 
          bill.bill_no.toLowerCase().includes(this.searchText.toLowerCase()) ||
          bill.payment.toLowerCase().includes(this.searchText.toLowerCase()) ||
          bill.date.toLowerCase().includes(this.searchText.toLowerCase());

      // Payment filter
      const matchesPayment =
        !this.selectedPayment || bill.payment === this.selectedPayment;

      // Date filter
      let matchesDate = true;
      if (this.dateRange && this.dateRange.length === 2) {
        const billDate = new Date(bill.date);
        const from = new Date(this.dateRange[0]);
        const to = new Date(this.dateRange[1]);

        matchesDate = billDate >= from && billDate <= to;
      }

      return matchesSearch && matchesPayment && matchesDate;
    });
  }

  // -------------- ACTIONS ------------------

  goToAddBilling() {
    this.router.navigate(['/billing/add-billing']);
  }

  viewDetails(bill: any) {
    console.log("VIEW BILL", bill);
  }

  editBill(bill: any) {
    console.log("EDIT BILL", bill);
  }

  deleteBill(bill: any) {
    if (confirm(`Delete ${bill.bill_no}?`)) {
      this.bills = this.bills.filter(b => b.id !== bill.id);
      this.applyFilters();
    }
  }

  exportData() {
    console.log("Exporting… work in progress");
  }

}
