import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class BillPdfService {

  async generateBill(order: any) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    /* ================= LOGO ================= */
    // convert logo to base64 and store once
    // const logoBase64 = order.logoBase64; // pass from component

    const logoBase64 = await this.getBase64Image('assets/wonder-bakery-logo.png');
    doc.addImage(logoBase64, 'PNG', 14, 10, 30, 30);

    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 14, 10, 30, 30);
    }

    /* ================= HEADER ================= */
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('The Wonder Bakery', pageWidth / 2, 18, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      '12, address, street,\nKadayanallur, 213123232, 4354353',
      pageWidth / 2,
      26,
      { align: 'center' }
    );

    /* ================= ORDER INFO ================= */
    const startY = 45;

    doc.setFontSize(10);
    doc.text('Order No', 14, startY);
    doc.text(': ' + order.orderNo, 40, startY);

    doc.text('Customer Name', 120, startY);
    doc.text(': ' + order.customerName, 155, startY);

    doc.text('Order Date', 14, startY + 8);
    doc.text(': ' + order.orderDate, 40, startY + 8);

    doc.text('Contact No', 120, startY + 8);
    doc.text(': ' + order.contactNo, 155, startY + 8);

    doc.text('Deliver Date', 14, startY + 16);
    doc.text(': ' + order.deliveryDate, 40, startY + 16);

    doc.text('Delivery place', 120, startY + 16);
    doc.text(': ' + order.deliveryPlace, 155, startY + 16);

    /* ================= ITEMS TABLE ================= */
    autoTable(doc, {
      startY: startY + 25,
      head: [['#', 'Item', 'Unit', 'Qty', 'Price', 'Total']],
      body: order.items.map((i: any, index: number) => [
        index + 1,
        i.name,
        i.unit,
        i.qty,
        i.price.toFixed(2),
        (i.qty * i.price).toFixed(2)
      ]),
      styles: {
        fontSize: 10,
        halign: 'center'
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255]
      },
      columnStyles: {
        1: { halign: 'left' }
      }
    });

    /* ================= SUMMARY TABLE ================= */
    const finalY = (doc as any).lastAutoTable.finalY;

    autoTable(doc, {
      startY: finalY,
      body: [
        ['Grand Total', order.grandTotal.toFixed(2)],
        ['Discount', order.discount.toFixed(2)],
        ['Advance Amount', order.advance.toFixed(2)],
        ['Total Paid Amount', order.totalPaid.toFixed(2)]
      ],
      styles: { fontSize: 10 },
      columnStyles: {
        0: { halign: 'right', fillColor: [240, 240, 240] },
        1: { halign: 'right', fontStyle: 'bold' }
      }
    });

    /* ================= FOOTER ================= */
    doc.setFontSize(11);
    doc.text(
      'Thanks For Visit Pls Come Again .....!',
      pageWidth / 2,
      285,
      { align: 'center' }
    );

    /* ================= DOWNLOAD ================= */
    doc.save(`Bill_${order.orderNo}.pdf`);
  }


  private getBase64Image(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
  
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = error => reject(error);
      img.src = url;
    });
  }
  
}
