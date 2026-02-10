import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.scss']
})
export class ViewUnitComponent implements OnInit {

  units: any[] = [];
  filteredUnits: any[] = [
    { id: 'u1', name: 'Kilogram', short_name: 'KG' },
    { id: 'u2', name: 'Gram', short_name: 'GM' },
    { id: 'u3', name: 'Litre', short_name: 'L' },
    { id: 'u4', name: 'Millilitre', short_name: 'ML' },
    { id: 'u5', name: 'Piece', short_name: 'PCS' },
    { id: 'u6', name: 'Pack', short_name: 'PKT' }
  ];
  

  searchText = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUnits();
  }

  loadUnits() {
    this.api.post('unit/list', {}).subscribe({
      next: (res: any) => {
        this.units = res;
        this.filteredUnits = [...this.units];
      },
      error: () => {
        console.log("Unit loading failed");
      }
    });
  }

  applyFilters() {
    const search = this.searchText.toLowerCase();

    this.filteredUnits = this.units.filter(unit =>
      unit.name.toLowerCase().includes(search) ||
      unit.short_name.toLowerCase().includes(search)
    );
  }

  addUnit() {
    this.router.navigate(['/unit/add-unit']);
  }

  editUnit(unit: any) {
    this.router.navigate(['/unit/edit', unit.id]);
  }

  deleteUnit(unit: any) {
    if (!confirm("Are you sure you want to delete this unit?")) return;

    this.api.post('unit/delete', { id: unit.id }).subscribe({
      next: () => this.loadUnits(),
      error: () => alert("Delete failed")
    });
  }


}
