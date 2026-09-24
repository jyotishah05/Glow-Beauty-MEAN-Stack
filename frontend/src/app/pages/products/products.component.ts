import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1 class="main-topic">Glow Beauty - Products</h1>

    <section id="products" class="products-section">
      <h2>Product Offerings</h2>
      <p class="subtitle">
        This site focuses on cosmetic and beauty products offered by our company
        which includes makeup, skincare, hair care, body care & fragrances.
      </p>

      <div class="category-filter">
        <button (click)="filterByCategory('')" [class.active]="selectedCategory === ''">All</button>
        <button (click)="filterByCategory('Makeup')" [class.active]="selectedCategory === 'Makeup'">Makeup</button>
        <button (click)="filterByCategory('Skincare')" [class.active]="selectedCategory === 'Skincare'">Skincare</button>
        <button (click)="filterByCategory('Hair Care')" [class.active]="selectedCategory === 'Hair Care'">Hair Care</button>
        <button (click)="filterByCategory('Body Care & Fragrances')" [class.active]="selectedCategory === 'Body Care & Fragrances'">Body Care & Fragrances</button>
      </div>

      <p *ngIf="loading">Loading products…</p>
      <p *ngIf="error">Could not reach the API. Is the backend running on port 5000?</p>
      <p *ngIf="!loading && !error && filteredProducts.length === 0">No products in this category yet.</p>

      <div class="product-cards" *ngIf="!loading && !error">
        <div class="product-card" *ngFor="let p of filteredProducts">
          <img [src]="p.image" [alt]="p.name" width="150" height="150">
          <span class="brand">{{ p.brand }}</span>
          <ul>
            <li *ngFor="let f of p.features">{{ f }}</li>
          </ul>
          <p class="price">₹{{ p.price | number }}</p>
          <a [routerLink]="['/products', p._id]" class="buy-btn">View Product</a>
        </div>
      </div>
    </section>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = '';
  loading = true;
  error = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = category
      ? this.products.filter((p) => p.category === category)
      : this.products;
  }
}
