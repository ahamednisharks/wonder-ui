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
  // 🔥 REQUIRED FOR YOUR HTML
  billTabs: any[] = [];

  billingForm!: FormGroup;
  activeTab = 0;

  items: any[] = [];
  filteredItems: any[] = [];
  categories: any[] = [];
  selectedCategory: any = null;
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadItemsData();
    this.loadCategoryData();
  }

  // ---------------- SAFE FORM GETTERS ----------------
  get tabs(): FormArray {
    return this.billingForm?.get('tabs') as FormArray;
  }

  get activeBill(): FormGroup {
    return this.tabs?.at(this.activeTab) as FormGroup;
  }

  get activeItems(): FormArray {
    return this.activeBill?.get('items') as FormArray;
  }

  // ---------------- INIT ----------------
  initForm(): void {
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

  // ---------------- BILL TABS ----------------
  addNewBill(): void {
    this.tabs.push(this.createBillTab());
    this.activeTab = this.tabs.length - 1;
  }

  switchTab(i: number): void {
    this.activeTab = i;
  }

  closeTab(i: number): void {
    this.tabs.removeAt(i);

    if (this.tabs.length === 0) {
      this.addNewBill();
    } else if (this.activeTab >= this.tabs.length) {
      this.activeTab = this.tabs.length - 1;
    }
  }

  // ---------------- LOAD DATA ----------------
  loadItemsData(): void {
    this.api.post('items/list', {}).subscribe((res: any[]) => {
      this.items = res;
      this.filteredItems = [...res];
    });
  }

  loadCategoryData(): void {
    this.api.post('category/list', {}).subscribe((res: any[]) => {
      this.categories = [
        { label: 'All', value: null },
        ...res.map(c => ({
          label: c.name,
          value: c.name
        }))
      ];
    });
  }

  // ---------------- FILTER ----------------
  applyFilters(): void {
    this.filteredItems = this.items.filter(item => {
      const catMatch = !this.selectedCategory || item.category === this.selectedCategory;
      const searchMatch =
        !this.searchText ||
        item.name.toLowerCase().includes(this.searchText.toLowerCase());
      return catMatch && searchMatch;
    });
  }

  // ---------------- CART ----------------
  addToCart(item: any): void {
    const index = this.activeItems.value.findIndex((x: any) => x.id === item.id);

    if (index >= 0) {
      const row = this.activeItems.at(index);
      const qty = row.value.qty + 1;
      row.patchValue({
        qty,
        total: qty * row.value.price
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

  changeQty(i: number, type: 'inc' | 'dec'): void {
    const row = this.activeItems.at(i);
    let qty = row.value.qty;

    qty = type === 'inc' ? qty + 1 : qty - 1;

    if (qty <= 0) {
      this.activeItems.removeAt(i);
    } else {
      row.patchValue({
        qty,
        total: qty * row.value.price
      });
    }

    this.calculateTotals();
  }

  removeItem(i: number): void {
    this.activeItems.removeAt(i);
    this.calculateTotals();
  }

  // ---------------- TOTALS ----------------
  calculateTotals(): void {
    const subtotal = this.activeItems.value.reduce(
      (sum: number, x: any) => sum + x.total,
      0
    );

    const discount = this.activeBill.get('discount')?.value ?? 0;
    const amountPaid = this.activeBill.get('amountPaid')?.value ?? 0;

    const total = subtotal - discount;
    const balance = amountPaid - total;

    this.activeBill.patchValue({ subtotal, total, balance });
  }

  // ---------------- SUBMIT ----------------
  submitBill(): void {
    const bill = this.activeBill.value;

    if (!bill.items || bill.items.length === 0) {
      this.message.add({
        severity: 'warn',
        summary: 'Empty Bill',
        detail: 'Add items first'
      });
      return;
    }

    this.api.post('billing/save', bill).subscribe({
      next: () => {
        this.message.add({
          severity: 'success',
          summary: 'Bill Saved',
          detail: 'Billing completed'
        });
        this.tabs.removeAt(this.activeTab);
        this.addNewBill();
      },
      error: () => {
        this.message.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Billing failed'
        });
      }
    });
  }

  updatePayment() {
    this.calculateTotals();
  }
}
