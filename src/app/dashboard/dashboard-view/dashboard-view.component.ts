
import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})

export class DashboardViewComponent implements AfterViewInit {

  fromDate!: string;
  toDate!: string;
  stats = [
    { title: 'Total Sales', value: 140000, displayValue: '₹0', trend: 12 },
    { title: 'Orders', value: 15, displayValue: '0', trend: 8 },
    { title: 'Profit', value: 55000, displayValue: '₹0', trend: 10 },
    { title: 'Expense', value: 120000, displayValue: '₹0', trend: -5 }
  ];

  insights = [
    'Cream cakes contribute 38% of total sales',
    'Friday evening is peak order time',
    'Reduce PE cost by bulk ingredient purchase'
  ];

  ngAfterViewInit() {
    this.animateCounters();
    this.loadCharts();
  }

  animateCounters() {
    this.stats.forEach(stat => {
      let current = 0;
      const increment = stat.value / 40;

      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        stat.displayValue =
          stat.title === 'Orders'
            ? Math.floor(current).toString()
            : '₹' + Math.floor(current).toLocaleString();
      }, 20);
    });
  }

  loadCharts() {
    new Chart('salesTrend', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [12000, 15000, 14000, 18000, 22000, 26000, 24000],
          borderColor: '#4fd1c5',
          backgroundColor: 'rgba(79,209,197,.2)',
          fill: true,
          tension: .4
        }]
      },
      options: { plugins: { legend: { display: false } } }
    });

    new Chart('itemSales', {
      type: 'bar',
      data: {
        labels: ['Cream Cake', 'Pastry', 'Bread', 'Choco Cake', 'Beverage'],
        datasets: [{
          data: [38, 22, 15, 18, 7],
          backgroundColor: ['#3ddc97', '#4fd1c5', '#667eea', '#f56565', '#ecc94b']
        }]
      },
      options: { plugins: { legend: { display: false } } }
    });

    new Chart('ordersChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [210, 180, 260, 300, 340, 390],
          backgroundColor: '#667eea'
        }]
      },
      options: { plugins: { legend: { display: false } } }
    });

    new Chart('expenseChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          { label: 'Expense', data: [30, 40, 35, 50, 45], backgroundColor: '#f56565' },
          { label: 'PO', data: [20, 25, 30, 28, 32], backgroundColor: '#4fd1c5' },
          { label: 'PE', data: [15, 18, 20, 22, 24], backgroundColor: '#ecc94b' }
        ]
      }
    });
  }



  onDateChange(type: string) {
    const today = new Date();

    if (type === 'today') {
      this.fromDate = this.toDate = this.formatDate(today);
    }

    if (type === 'month') {
      this.fromDate = this.formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
      this.toDate = this.formatDate(today);
    }

    if (type === 'lastMonth') {
      this.fromDate = this.formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
      this.toDate = this.formatDate(new Date(today.getFullYear(), today.getMonth(), 0));
    }

    this.loadDashboardData();
  }

  applyCustomDate() {
    if (!this.fromDate || !this.toDate) return;
    this.loadDashboardData();
  }
  loadDashboardData() {
    console.log('From:', this.fromDate);
    console.log('To:', this.toDate);

    // API example
    // this.dashboardService.getData(this.fromDate, this.toDate)
    //   .subscribe(res => {
    //     this.updateStats(res);
    //     this.updateCharts(res);
    //   });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  applyDateRange() {
    if (!this.fromDate || !this.toDate) {
      alert('Please select both dates');
      return;
    }

    if (this.fromDate > this.toDate) {
      alert('From date cannot be greater than To date');
      return;
    }

    console.log('From:', this.fromDate);
    console.log('To:', this.toDate);

    this.loadDashboardData();
  }


}
