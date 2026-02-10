// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-view-orders',
//   templateUrl: './view-orders.component.html',
//   styleUrl: './view-orders.component.scss'
// })
// export class ViewOrdersComponent {

// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { BillPdfService } from '../../service/bill-pdf.service';


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent {
  loading = false;
  error = '';


  constructor(
    private router: Router,
    private api: ApiService,
    private billPdfService: BillPdfService
  ) { }

  ngOnInit(): void {

    this.loadOrders();
  }

  orders = [
    {
      orderNo: 'WB-2026-000001',
      orderDate: '2026-01-29',
      customerName: 'Ahamed Nishar',
      customerPhone: '2233445566',
      advanceAmount: 200,
      paymentAmount: 600,
      deliveryDateTime: '2026-02-02T13:30',
      deliveryLocation: 'Shop',
      status: 'Pending',
      billGenerated: false
    }
  ];

  canEdit(order: any) {
    return !order.billGenerated;
  }

  canCancel(order: any) {
    return new Date() < new Date(order.deliveryDateTime);
  }


  goToAddOrder() {
    this.router.navigate(['/orders/add']);
  }


  loadOrders() {
    this.loading = true;

    this.api.post('orders/list', {}).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.orders = res;
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load orders';
      }
    });
  }

  deleteOrder(orderId: string) {
    this.api.post('orders/delete', { orderId }).subscribe({
      next: () => this.loadOrders(),
      error: () => this.error = 'Failed to delete order'
    });
  }


  downloadBill(order: any) {
    debugger

    this.api.post('orders/list', { orderID: order.id }).subscribe({
      next: (res) => {
  
        // 🔹 map API response → bill format
        const billData = {
          orderNo: res.orderNo,
          orderDate: this.formatDate(res.orderDate),
          deliveryDate: this.formatDate(res.deliveryDate),
          customerName: res.customerName,
          contactNo: res.contactNo,
          deliveryPlace: res.deliveryPlace,
  
          items: res.items.map((i: any) => ({
            name: i.itemName,
            unit: i.unit,
            qty: i.qty,
            price: i.price
          })),
  
          grandTotal: res.grandTotal,
          discount: res.discount,
          advance: res.advance,
          totalPaid: res.totalPaid
        };
  
        // 🔹 generate PDF
        this.billPdfService.generateBill(billData);
      },
      error: err => {
        console.error('Order fetch failed', err);
        alert('Unable to generate bill');
      }
    });





  //   order = {
  //     logoBase64: 'data:image/png;base64,iVBORw0KGgoAAA...',
  //     orderNo: 'WB-2026-000001',
  //     orderDate: '02/05/2026 09:10 AM',
  //     deliveryDate: '03/05/2026 09:10 AM',
  //     customerName: 'Nishar',
  //     contactNo: '778687687686',
  //     deliveryPlace: 'Shop',
    
  //     items: [
  //       { name: 'Black Forest Cake', unit: 'Kg', qty: 1, price: 450 },
  //       { name: 'Puff', unit: 'Psc', qty: 4, price: 15 }
  //     ],
    
  //     grandTotal: 510,
  //     discount: 10,
  //     advance: 100,
  //     totalPaid: 500
  //   };
    
    
  //   this.billPdfService.generateBill(order);
  // }

  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}
