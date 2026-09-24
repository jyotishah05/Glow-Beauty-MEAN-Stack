import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1 class="main-topic">Admin — Manage Products</h1>

    <section class="admin-section">
      <div class="admin-form-wrapper">
        <h2>Add a New Product</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <input type="text" placeholder="Product name*" formControlName="name">
          <input type="text" placeholder="Brand*" formControlName="brand">

          <select formControlName="category">
            <option value="" disabled selected>Select category*</option>
            <option value="Makeup">Makeup</option>
            <option value="Skincare">Skincare</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Body Care & Fragrances">Body Care & Fragrances</option>
          </select>

          <input type="text" placeholder="Features, comma separated" formControlName="featuresInput">
          <input type="number" placeholder="Price (₹)*" formControlName="price">
          <input type="text" placeholder="Image path, e.g. assets/images/new.jpg*" formControlName="image">

          <button type="submit" class="contact-btn" [disabled]="form.invalid || saving">
            {{ saving ? 'Saving…' : 'Add Product' }}
          </button>
        </form>
        <p class="admin-status">{{ statusMessage }}</p>
      </div>

      <div class="admin-list-wrapper">
        <h2>Existing Products ({{ products.length }})</h2>
        <p *ngIf="loading">Loading…</p>
        <table class="admin-table" *ngIf="!loading">
          <tr *ngFor="let p of products">
            <td><img [src]="p.image" [alt]="p.name" width="50" height="50"></td>
            <td>{{ p.name }}</td>
            <td>{{ p.brand }}</td>
            <td>₹{{ p.price | number }}</td>
            <td><button class="delete-btn" (click)="delete(p._id!)">Delete</button></td>
          </tr>
        </table>
      </div>
    </section>
  `
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  saving = false;
  statusMessage = '';

  form!: ReturnType<FormBuilder['group']>;

constructor(private fb: FormBuilder, private productService: ProductService) {
  this.form = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    featuresInput: [''],
    price: [null, [Validators.required, Validators.min(0)]],
    image: ['', Validators.required]
  });
}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.statusMessage = 'Could not load products. Is the backend running?';
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;

    const raw = this.form.value;
    const payload: Product = {
      name: raw.name!,
      brand: raw.brand!,
      category: raw.category!,
      price: Number(raw.price),
      image: raw.image!,
      features: raw.featuresInput ? raw.featuresInput.split(',').map((f: string) => f.trim()).filter(Boolean) : []
    };

    this.productService.createProduct(payload).subscribe({
      next: () => {
        this.statusMessage = 'Product added!';
        this.saving = false;
        this.form.reset();
        this.loadProducts();
      },
      error: () => {
        this.statusMessage = 'Failed to add product.';
        this.saving = false;
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: () => (this.statusMessage = 'Failed to delete product.')
    });
  }
}
