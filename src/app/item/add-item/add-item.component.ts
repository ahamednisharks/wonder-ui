import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  itemForm!: FormGroup;
  mode: string = 'add';      // add | update
  itemId: string | null = null;
  isEdit: string = 'add';
  loading = false;
  errorMessage = '';

  categoryList = [
    { label: 'Bakery', value: 'Bakery' },
    { label: 'Snacks', value: 'Snacks' },
    { label: 'Dairy', value: 'Dairy' }
  ];

  unitList = [
    { label: 'KG', value: 'KG' },
    { label: 'PCS', value: 'PCS' },
    { label: 'Ltr', value: 'Ltr' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.initForm();


    // Read router params (from matrix params)
    this.route.params.subscribe(params => {
      this.mode = params['mode'] || 'add';
      this.itemId = params['value'] || null;


      if (this.mode === 'update' && this.itemId) {
        this.loadItemData(this.itemId);
        this.isEdit = 'update'
      }
    });
  }

  initForm() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      unit: ['', Validators.required],
      price: [0, Validators.required],
      description: ['']
    });
  }

  // 🔥 Load item details in update mode
  loadItemData(id: string) {
    this.loading = true;

    this.api.post('items/getItem', { id }).subscribe({
      next: (item: any) => {
        this.loading = false;
        this.itemForm.patchValue(item);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Unable to load item details.";
      }
    });
  }

  // 🔥 Submit handler
  submit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    if (this.mode === 'update') {
      this.updateItem();
    } else {
      this.saveItem();
    }
  }

  // ➕ ADD
  saveItem() {
    this.loading = true;

    // if (this.selectedFile) {
    //   formData.append('image', this.selectedFile);
    // }

    this.api.post('items/add-item', this.itemForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['item/view-item']);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Failed to save item.";
        }
      });



    const formData = new FormData();
    formData.append('name', this.itemForm.value.name);
    formData.append('category', this.itemForm.value.category);
    formData.append('unit', this.itemForm.value.unit);
    formData.append('price', this.itemForm.value.price);
    formData.append('description', this.itemForm.value.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }


    this.api.post('items/add-item', formData)
    .subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['item/view-item']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Failed to save item.";
      }
    });
  }

  // ✏ UPDATE
  updateItem() {
    this.loading = true;

    const payload = {
      id: this.itemId,
      ...this.itemForm.value
    };

    this.api.post('items/update', payload)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['item/view-item']);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Failed to update item.";
        }
      });
  }


  previewImage: string | null = null;
  selectedFile: File | null = null;

  onImageSelect(event: any) {
    const file = event.files[0];
    this.selectedFile = file;

    // preview
    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(file);
  }


}
