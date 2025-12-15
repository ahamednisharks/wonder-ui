import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.scss'],
  providers: [MessageService]
})
export class AddBillingComponent implements OnInit {

  // ---------------------------------------
  // ENTERPRISE REACTIVE FORM STRUCTURE
  // ---------------------------------------
  billingForm!: FormGroup;

  get tabs(): FormArray {
    return this.billingForm.get('tabs') as FormArray;
  }

  get activeBill(): FormGroup {
    return this.tabs.at(this.activeTab) as FormGroup;
  }

  get activeItems(): FormArray {
    return this.activeBill.get('items') as FormArray;
  }

  activeTab = 0;

  // -----------------------------
  // Filters and item list
  // -----------------------------
  items: any[] = [];
  filteredItems: any[] = [];
  categories: any[] = [];
  selectedCategory: any = null;
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadItemsData();
    this.loadCategoryData();
  }

  // ---------------------------------------
  // INIT FORM WITH FIRST TAB
  // ---------------------------------------
  initForm() {
    this.billingForm = this.fb.group({
      tabs: this.fb.array([this.createBillTab()])
    });
  }

  createBillTab(): FormGroup {
    return this.fb.group({
      items: this.fb.array([]),
      subtotal: 0,
      discount: 0,
      total: 0,
      paymentMode: 'Cash',
      amountPaid: 0,
      balance: 0
    });
  }

  // ---------------------------------------
  // MULTI BILL SYSTEM
  // ---------------------------------------
  addNewBill() {
    this.tabs.push(this.createBillTab());
    this.activeTab = this.tabs.length - 1;
  }

  switchTab(i: number) {
    this.activeTab = i;
  }

  closeTab(i: number) {
    this.tabs.removeAt(i);

    if (this.tabs.length === 0) {
      this.addNewBill();
    } else if (this.activeTab >= this.tabs.length) {
      this.activeTab = this.tabs.length - 1;
    }
  }

  // ---------------------------------------
  // LOAD DATA FROM API
  // ---------------------------------------
  loadItemsData() {
    this.api.post('items/list', {}).subscribe({
      next: (res: any) => {
        this.items = res;
        this.filteredItems = [...this.items];
      }
    });
  }

  loadCategoryData() {
    this.api.post('category/list', {}).subscribe({
      next: (res: any) => {
        this.categories = [
          { label: 'All', value: null },
          ...res.map((c: any) => ({
            label: c.name,
            value: c.name
          }))
        ];
      }
    });
  }

  // ---------------------------------------
  // FILTER ITEMS
  // ---------------------------------------
  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      const matchCat = !this.selectedCategory || item.category === this.selectedCategory;
      const matchSearch = !this.searchText ||
        item.name.toLowerCase().includes(this.searchText.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  // ---------------------------------------
  // CART MANAGEMENT (FORMARRAY)
  // ---------------------------------------
  addToCart(item: any) {
    const index = this.activeItems.value.findIndex((x: any) => x.id === item.id);

    if (index >= 0) {
      const row = this.activeItems.at(index);
      row.patchValue({
        qty: row.value.qty + 1,
        total: (row.value.qty + 1) * row.value.price
      });
    } else {
      this.activeItems.push(
        this.fb.group({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
          total: item.price
        })
      );
    }

    this.calculateTotals();
  }

  changeQty(rowIndex: number, type: string) {
    const row = this.activeItems.at(rowIndex);

    let qty = row.value.qty;

    if (type === 'inc') qty++;
    else if (type === 'dec') qty--;

    if (qty === 0) {
      this.activeItems.removeAt(rowIndex);
      this.calculateTotals();
      return;
    }

    row.patchValue({
      qty,
      total: qty * row.value.price
    });

    this.calculateTotals();
  }

  removeItem(rowIndex: number) {
    this.activeItems.removeAt(rowIndex);
    this.calculateTotals();
  }

  // ---------------------------------------
  // TOTAL CALCULATIONS
  // ---------------------------------------
  calculateTotals() {
    const bill = this.activeBill.value;

    const subtotal = this.activeItems.value
      .reduce((sum: number, x: any) => sum + x.total, 0);

    const total = subtotal - (bill.discount || 0);
    const balance = (bill.amountPaid || 0) - total;

    this.activeBill.patchValue({
      subtotal,
      total,
      balance
    });
  }

  updatePayment() {
    this.calculateTotals();
  }

  // ---------------------------------------
  // SUBMIT BILL (ACTIVE TAB ONLY)
  // ---------------------------------------
  // submitBill() {
  //   const bill = this.activeBill.value;

  //   if (bill.items.length === 0) {
  //     this.message.add({ severity: 'warn', summary: 'Empty Bill', detail: 'Add items first' });
  //     return;
  //   }

  //   console.log("Bill submitted:", bill);

  //   this.message.add({
  //     severity: 'success',
  //     summary: 'Bill Saved',
  //     detail: 'Billing successfully completed!'
  //   });

  //   this.tabs.removeAt(this.activeTab);
  //   this.addNewBill();
  //   this.activeTab = this.tabs.length - 1;
  // }



  submitBill() {
    const bill = this.activeBill.value;
  
    if (bill.items.length === 0) {
      this.message.add({
        severity: 'warn',
        summary: 'Empty Bill',
        detail: 'Add items first'
      });
      return;
    }
  
    // 🔥 API CALL
    this.api.post('billing/save', bill).subscribe({
  
      next: (res: any) => {
        console.log("Bill submitted:", res);
  
        this.message.add({
          severity: 'success',
          summary: 'Bill Saved',
          detail: 'Billing successfully completed!'
        });
  
        // Reset current tab
        this.tabs.removeAt(this.activeTab);
        this.addNewBill();
        this.activeTab = this.tabs.length - 1;
      },
  
      error: (err: any) => {
        console.error("Billing error", err);
  
        this.message.add({
          severity: 'error',
          summary: 'Failed',
          detail: err.error?.error || 'Billing failed'
        });
      }
  
    });
  }
  

}
