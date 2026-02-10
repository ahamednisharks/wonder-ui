import { Component, OnInit } from '@angular/core';

interface SalesDataPoint {
  time: string;
  velocity: number;
}

interface ProductMixItem {
  name: string;
  percentage: number;
  color: string;
}

interface WasteItem {
  name: string;
  sold: number;
  waste: number;
}

interface IngredientLevel {
  name: string;
  levels: ('high' | 'medium' | 'low')[];
}

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {
  // Top metrics
  dailyRevenue = 1250;
  revenueChange = 15;
  orderVolume = 125;
  topSeller = 'Sourdough Batard';
  lowStockCount = 3;

  // Sales velocity data
  salesVelocityData: SalesDataPoint[] = [
    { time: '8 AM', velocity: 1 },
    { time: '8 AM', velocity: 2 },
    { time: '9 AM', velocity: 4 },
    { time: '9 AM', velocity: 31 },
    { time: '3 PM', velocity: 30 }
  ];
  
  peakHours = '8 AM - 3:2 AM';

  // Product mix data
  productMix: ProductMixItem[] = [
    { name: 'Pastries', percentage: 45, color: '#d4a574' },
    { name: 'Coffee & Drinks', percentage: 30, color: '#d87856' },
    { name: 'Bread', percentage: 15, color: '#8b6f47' },
    { name: 'Other', percentage: 10, color: '#a8c4a8' }
  ];

  // Waste vs Sold data
  wasteData: WasteItem[] = [
    { name: 'Croissant', sold: 90, waste: 0 },
    { name: 'Muffin', sold: 90, waste: 0 },
    { name: 'Danish', sold: 0, waste: 10 },
    { name: 'Breste', sold: 0, waste: 10 }
  ];

  // Ingredient levels
  ingredients: IngredientLevel[] = [
    { 
      name: 'Flour', 
      levels: ['high', 'high', 'medium', 'high', 'high'] 
    },
    { 
      name: 'Butter', 
      levels: ['high', 'high', 'high', 'high', 'medium'] 
    },
    { 
      name: 'Salted', 
      levels: ['high', 'high', 'medium', 'high', 'low'] 
    },
    { 
      name: 'Salted', 
      levels: ['high', 'high', 'high', 'high', 'high'] 
    }
  ];

  ingredientColumns = ['Bil-Pee\nAll-Poruase', 'Wheat', '', '', 'Sugar'];

  // Alert message
  alertMessage = '7:00 AM: Cinnamon Rolls selling 20% faster. Move tray to front display!';

  constructor() { }

  ngOnInit(): void {
    // Initialize or fetch data from API
  }

  // Helper method to calculate chart height
  getChartHeight(value: number, max: number): number {
    return (value / max) * 100;
  }

  // Helper method to get product mix rotation
  getProductMixRotation(): string {
    let rotation = 0;
    return this.productMix.map(item => {
      const result = `rotate(${rotation}deg)`;
      rotation += (item.percentage / 100) * 360;
      return result;
    }).join(', ');
  }
}