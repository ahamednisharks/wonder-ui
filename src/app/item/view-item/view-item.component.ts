import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent {

  categoryOptions = [{ label: 'All', value: null }, { label: 'Bakery', value: 'Bakery' }, { label: 'Dairy', value: 'Dairy' }, { label: 'Snacks', value: 'Snacks' }]; unitOptions = [{ label: 'All', value: null }, { label: 'KG', value: 'KG' }, { label: 'PCS', value: 'PCS' }, { label: 'Ltr', value: 'Ltr' }];
  items: any[] = [];
  filteredItems: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  searchText: string = '';
  selectedCategory: any = null;
  selectedUnit: any = null;

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getItemList();
  }

  // 🔥 API LIST (POST request)
  getItemList() {
    this.loading = true;
    this.errorMessage = "";

    this.api.post('items/list', {})   // ONLY POST allowed
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          this.items = res;
          this.filteredItems = [...this.items];
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = "Unable to load items.";
        }
      });
  }

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      const matchesSearch =
        this.searchText === '' ||
        item.name.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesCategory =
        !this.selectedCategory || item.category === this.selectedCategory;

      const matchesUnit =
        !this.selectedUnit || item.unit === this.selectedUnit;

      return matchesSearch && matchesCategory && matchesUnit;
    });
  }
  
  addItem() {
    this.router.navigate(['/item/add-item', { mode: 'add', value: '' }]);
  }

  editItem(item: any) {
    this.router.navigate(['/item/update-item', { mode: 'update', value: item.id }]);
  }

  deleteItem(item: any) {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    this.api.post('items/delete', { id: item.id }).subscribe({
      next: (res: any) => {
        console.log("Deleted Successfully!");
        this.getItemList(); // refresh list
      },
      error: (err: any) => {
        console.log("Delete failed", err);
      }
    });
  }

}
