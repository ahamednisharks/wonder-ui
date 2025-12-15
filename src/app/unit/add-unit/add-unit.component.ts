// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-unit',
//   templateUrl: './add-unit.component.html',
//   styleUrl: './add-unit.component.scss'
// })
// export class AddUnitComponent {

// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  unitForm!: FormGroup;
  unitId: string | null = null;
  isEdit = false;

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.unitId;

    this.initForm();

    if (this.isEdit) {
      this.loadUnitData();
    }
  }

  initForm() {
    this.unitForm = this.fb.group({
      name: ['', Validators.required],
      short_name: ['', Validators.required]
    });
  }

  loadUnitData() {
    this.loading = true;

    this.api.post('unit/get', { id: this.unitId }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.unitForm.patchValue(res);
      },
      error: () => {
        this.loading = false;
        this.error = "Failed to load unit details";
      }
    });
  }

  submit() { debugger
    if (this.unitForm.invalid) {
      this.unitForm.markAllAsTouched();
      return;
    }

    this.isEdit ? this.updateUnit() : this.saveUnit();
  }

  saveUnit() {
    this.loading = true;
    this.api.post('unit/create', this.unitForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/unit']);
      },
      error: () => {
        this.loading = false;
        this.error = "Failed to save unit";
      }
    });
  }

  updateUnit() {
    this.loading = true;

    const payload = {
      id: this.unitId,
      ...this.unitForm.value
    };

    this.api.post('unit/update', payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/unit']);
      },
      error: () => {
        this.loading = false;
        this.error = "Failed to update unit";
      }
    });
  }

}
