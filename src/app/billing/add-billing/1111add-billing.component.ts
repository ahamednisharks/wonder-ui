import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html1',
  styleUrls: ['./add-billing.component.scss1'],
  providers: [MessageService],
  standalone: false
})
export class AddBillingComponent implements OnInit {

  activeTab: number = 0;

  categories = [
    { label: 'All', value: null },
    { label: 'Bakery', value: 'Bakery' },
    { label: 'Snacks', value: 'Snacks' },
    { label: 'Dairy', value: 'Dairy' },


  ];

  selectedCategory: any = null;
  searchText: string = '';

  items = [
    { id: 1, name: 'Bread', category: 'Bakery', price: 40 },
    { id: 2, name: 'Cake', category: 'Bakery', price: 120 },
    { id: 3, name: 'Milk', category: 'Dairy', price: 50 },
    { id: 4, name: 'Biscuit', category: 'Snacks', price: 10 }
  ];

  filteredItems = [...this.items];

  billTabs: any[] = [];

  constructor(
    private message: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addNewBill();
    this.loadDatas();
  }

  // ------------------------------
  // MULTI BILL SYSTEM
  // ------------------------------
  addNewBill() {
    this.billTabs.push({
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      paymentMode: 'Cash',
      amountPaid: 0,
      balance: 0
    });

    this.activeTab = this.billTabs.length - 1;
  }

  switchTab(index: number) {
    this.activeTab = index;
  }

  closeTab(index: number) {
    this.billTabs.splice(index, 1);

    if (this.billTabs.length === 0) {
      this.addNewBill();
    } else if (this.activeTab >= this.billTabs.length) {
      this.activeTab = this.billTabs.length - 1;
    }
  }

  // ------------------------------
  // ITEM FILTERING
  // ------------------------------
  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      const matchesCategory =
        !this.selectedCategory || item.category === this.selectedCategory;

      const matchesSearch =
        !this.searchText ||
        item.name.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }

  // ------------------------------
  // CART MANAGEMENT
  // ------------------------------
  addToCart(item: any) {
    const bill = this.billTabs[this.activeTab];

    const found = bill.items.find((x: any) => x.id === item.id);

    if (found) {
      found.qty += 1;
    } else {
      bill.items.push({
        ...item,
        qty: 1,
        total: item.price
      });
    }


    this.calculateTotals();
  }

  changeQty(item: any, type: string) {
    if (type === 'inc') item.qty++;
    else if (type === 'dec' && item.qty > 1) item.qty--;
    else if (type === 'dec' && item.qty === 1) {
      this.removeItem(item);
      return;
    }

    item.total = item.qty * item.price;
    this.calculateTotals();
  }

  removeItem(item: any) {
    const bill = this.billTabs[this.activeTab];
    bill.items = bill.items.filter((x: any) => x.id !== item.id);
    this.calculateTotals();
  }

  // ------------------------------
  // TOTAL CALCULATION
  // ------------------------------
  calculateTotals() {
    debugger
    const bill = this.billTabs[this.activeTab];

    bill.subtotal = bill.items.reduce((sum: number, x: any) => Number(sum) + Number(x.total), 0);

    bill.total = bill.subtotal - bill.discount;

    bill.balance = bill.amountPaid - bill.total;
  }

  // ------------------------------
  // PAYMENT HANDLING
  // ------------------------------
  updatePayment() {
    this.calculateTotals();
  }

  submitBill() {
    const bill = this.billTabs[this.activeTab];

    if (bill.items.length === 0) {
      this.message.add({ severity: 'warn', summary: 'Empty Bill', detail: 'Add items first' });
      return;
    }

    this.message.add({
      severity: 'success',
      summary: 'Bill Saved',
      detail: 'Billing successful!'
    });

    this.billTabs[this.activeTab] = {
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      paymentMode: 'Cash',
      amountPaid: 0,
      balance: 0
    };
  }


  loadDatas() {
    // this.loadCategoryData();
    this.loadItemsData();
  }

  loadItemsData() {
    this.api.post('items/list', {})   // empty payload
      .subscribe({
        next: (res: any) => {
          this.items = res;
          this.filteredItems = [...this.items];
        },
        error: (err: any) => {
          console.error("Items load error", err);
        }
      });
  }

  loadCategoryData() {
    this.api.post('category/list', {})
      .subscribe({
        next: (res: any) => {
          this.categories = [
            { label: 'All', value: null },
            ...res.map((c: any) => ({
              label: c.name,
              value: c.name
            }))
          ];
        },
        error: (err: any) => {
          console.error("Category load error", err);
        }
      });
  }


  

}
