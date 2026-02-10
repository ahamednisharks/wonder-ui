// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-orders',
//   templateUrl: './add-orders.component.html',
//   styleUrl: './add-orders.component.scss'
// })
// export class AddOrdersComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.scss'
})
export class AddOrdersComponent implements OnInit {

  orderForm!: FormGroup;
  loading = false;
  error = '';

  itemsMaster: any[] = [];


  // showTime: boolean;
  deliveryLocationOptions = [
    { label: 'Shop', value: 'SHOP' },
    { label: 'Others', value: 'OTHERS' }
  ];

  itemsList = [
    { id: 1, name: 'Chocolate Cake', category: 'Cake', unit: 'Kg', price: 800 },
    { id: 2, name: 'Black Forest', category: 'Cake', unit: 'Kg', price: 900 },
    { id: 3, name: 'Cup Cake', category: 'Bakery', unit: 'Nos', price: 60 }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.addItemRow();
    this.loadItemList();   // 🔥 HERE
  }
  

  initForm() {
    this.orderForm = this.fb.group({
      orderNo: ['WB-2026-000001'],
      orderDate: [new Date()],

      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAltPhone: [''],

      deliveryDateTime: [null, Validators.required],
      deliveryLocationType: ['SHOP'],
      deliveryAddress: [''],

      deliveryCharge: [0],

      items: this.fb.array([]),

      totalAmount: [{ value: 0, disabled: true }],
      discount: [0],
      advanceAmount: [0],
      paymentAmount: [0]
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItemRow() {
    this.items.push(
      this.fb.group({
        itemId: [null, Validators.required],
        category: [{ value: '', disabled: true }],
        unit: [{ value: '', disabled: true }],
        quantity: [1, Validators.required],
        price: [0, Validators.required],
        notes: [''],
        designFile: [null]
      })
    );
  }

  removeItemRow(index: number) {
    this.items.removeAt(index);
    this.calculateTotal();
  }

  // onItemSelect(index: number) {
  //   const itemId = this.items.at(index).get('itemId')?.value;
  //   const item = this.itemsList.find(i => i.id === itemId);

  //   if (item) {
  //     this.items.at(index).patchValue({
  //       category: item.category,
  //       unit: item.unit,
  //       price: item.price,
  //       quantity: 1
  //     });
  //     this.calculateTotal();
  //   }
  // }

  calculateTotal() {
    let total = 0;

    this.items.getRawValue().forEach((row: any) => {
      total += row.quantity * row.price;
    });

    total += Number(this.orderForm.value.deliveryCharge || 0);
    total -= Number(this.orderForm.value.discount || 0);

    this.orderForm.patchValue({ totalAmount: total });
  }

  // submit() {
  //   if (this.orderForm.invalid) return;
  //   console.log(this.orderForm.getRawValue());
  // }


  submit() {

    if (this.orderForm.invalid) return;

    this.loading = true;

    const raw = this.orderForm.getRawValue();
    const formData = new FormData();

    // --------------------
    // BASIC FIELDS
    // --------------------
    formData.append('customerName', raw.customerName);
    formData.append('customerPhone', raw.customerPhone);
    formData.append('customerAltPhone', raw.customerAltPhone || '');

    // formData.append('deliveryDateTime', raw.deliveryDateTime);
    formData.append('deliveryLocationType', raw.deliveryLocationType);
    formData.append('deliveryAddress', raw.deliveryAddress || '');

    formData.append('deliveryCharge', raw.deliveryCharge || 0);
    formData.append('discount', raw.discount || 0);
    formData.append('advanceAmount', raw.advanceAmount || 0);
    formData.append('paymentAmount', raw.paymentAmount || 0);

   // const deliveryDate = new Date(raw.deliveryDateTime);

      // Convert to ISO (UTC-safe)

      // formData.append(
      //   'deliveryDateTime',
      //   deliveryDate.toISOString()
      // );


      // formData.append(
      //   'deliveryDateTime',
      //   new Date(raw.deliveryDateTime).toISOString()
      // );

      // formData.append('deliveryDateTime', raw.deliveryDateTime);
      formData.append('deliveryDateTime', new Date(raw.deliveryDateTime).toISOString());

      


    // --------------------
    // ITEMS (JSON)
    // --------------------
    formData.append('items', JSON.stringify(raw.items));

    // --------------------
    // FILES (ORDER MATTERS!)
    // --------------------
    raw.items.forEach((item: any) => {
      if (item.designFile instanceof File) {
        formData.append('designFiles', item.designFile);
      }
    });

    // --------------------
    // API CALL (COMMON SERVICE)
    // --------------------
    this.api.post('orders/save', formData).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('Order Saved', res);
       if(res.sucess) {
        this.toast.success('Saved successfully');

        this.router.navigate(['/orders']);
       }

        // optional redirSect
        // this.router.navigate(['/orders/view']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to save order';
      }
    });
  }

  onDesignSelect(event: any, index: number) {
    const file = event.files[0];
    if (file) {
      this.items.at(index).patchValue({
        designFile: file
      });
    }
  }
  


  loadOrderById(orderId: string) {
    this.loading = true;
  
    this.api.post('orders/get', { orderId }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.orderForm.patchValue(res);
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load order';
      }
    });
  }


  loadItemList() {
    this.loading = true;
  
    this.api.post('items/list', {}).subscribe({
      next: (res: any) => {
        this.loading = false;
  
        this.itemsMaster = res.map((item: any) => ({
          label: item.name,      // PrimeNG dropdown
          value: item.id,
          category: item.category,
          unit: item.unit,
          price: item.price
        }));
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load items';
      }
    });
  }
  

  onItemSelect(index: number) {
    const selectedId = this.items.at(index).get('itemId')?.value;
  
    const selectedItem = this.itemsMaster.find(
      i => i.value === selectedId
    );
  
    if (!selectedItem) return;
  
    this.items.at(index).patchValue({
      category: selectedItem.category,
      unit: selectedItem.unit,
      price: selectedItem.price,
      quantity: 1
    });
  
    this.calculateTotal();
  }
  

}
