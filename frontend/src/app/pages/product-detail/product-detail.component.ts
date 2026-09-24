import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1 class="main-topic">Product Details</h1>

    <section class="product-detail-section" *ngIf="product">
      <div class="product-detail-image">
        <img [src]="product.image" [alt]="product.name">
      </div>
      <div class="product-detail-info">
        <span class="brand">{{ product.brand }}</span>
        <h2>{{ product.name }}</h2>
        <p class="category-tag">{{ product.category }}</p>

        <ul class="feature-list">
          <li *ngFor="let f of product.features">✔ {{ f }}</li>
        </ul>

        <p class="price">₹{{ product.price | number }}</p>
        <p class="stock" *ngIf="product.stock !== undefined">{{ product.stock }} in stock</p>

        <div class="detail-actions">
          <button class="buy-btn" (click)="addedToCart = true" [disabled]="addedToCart">
            {{ addedToCart ? 'Added ✔' : 'Add to Cart' }}
          </button>
          <a routerLink="/products" class="back-link">← Back to all products</a>
        </div>
      </div>
    </section>

    <p *ngIf="loading">Loading product…</p>
    <p *ngIf="!loading && !product">Product not found. <a routerLink="/products">Go back</a>.</p>
  `
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  addedToCart = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
