import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1 class="main-topic">Glow Beauty - Premium Makeup Store</h1>

    <section id="home" class="hero">
      <div class="hero-left">
        <img src="assets/images/pro.jpg" width="300" height="200">
      </div>
      <div class="hero-right">
        <div class="logo">
          <img src="assets/images/logo.png" alt="Company Logo" width="200" height="150">
        </div>
        <i>PURE PETAL 🌷</i>
        <h1>ENJOY OUR <span>NEW COLLECTION</span></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy.</p>
        <div class="mini-products">
          <img src="assets/images/1 (1).jpg">
          <img src="assets/images/1 (2).jpg">
          <img src="assets/images/1 (3).jpg">
        </div>
        <button class="btn" routerLink="/products">Begin</button>
      </div>
    </section>

    <!-- FEATURED PRODUCTS (live from MongoDB) -->
    <section class="featured-section">
      <h2>Featured This Week</h2>
      <p class="subtitle">A few favorites from our full collection.</p>

      <p *ngIf="loading">Loading featured products…</p>

      <div class="product-cards" *ngIf="!loading">
        <div class="product-card" *ngFor="let p of featured">
          <img [src]="p.image" [alt]="p.name" width="150" height="150">
          <span class="brand">{{ p.brand }}</span>
          <p class="price">₹{{ p.price | number }}</p>
          <a [routerLink]="['/products', p._id]" class="buy-btn">View Product</a>
        </div>
      </div>

      <a routerLink="/products" class="view-all-link">View all products →</a>
    </section>

    <!-- WHY GLOW BEAUTY -->
    <section class="why-section">
      <h2>Why Choose Glow Beauty</h2>
      <div class="why-grid">
        <div class="why-card">
          <h3>🌿 Curated Brands</h3>
          <p>We only stock brands we'd use ourselves — from MAC to Mamaearth.</p>
        </div>
        <div class="why-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Most orders reach you within 2–4 business days across India.</p>
        </div>
        <div class="why-card">
          <h3>💬 Real Support</h3>
          <p>Our beauty experts help you pick the right products for your skin.</p>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card" *ngFor="let t of testimonials">
          <p class="stars">{{ '⭐'.repeat(t.rating) }}</p>
          <p class="quote">"{{ t.quote }}"</p>
          <p class="name">— {{ t.name }}</p>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  featured: Product[] = [];
  loading = true;

  testimonials: Testimonial[] = [
    { name: 'Ananya R.', quote: 'The skincare set genuinely changed my routine. Fast delivery too!', rating: 5 },
    { name: 'Priya S.', quote: 'Loved the Huda Beauty palette recommendation from their team.', rating: 5 },
    { name: 'Meera K.', quote: 'Great range of brands in one place, easy to compare and order.', rating: 4 }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.featured = data.slice(0, 3);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
