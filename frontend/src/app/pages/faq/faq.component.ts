import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface FaqEntry {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <h1 class="main-topic">Frequently Asked Questions</h1>

    <section id="faq" class="faq-section">
      <div class="faq-header">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-search">
          <input type="text" placeholder="Search answers here..." [(ngModel)]="searchTerm" (input)="filterFaqs()">
          <button (click)="filterFaqs()">Search</button>
        </div>
      </div>

      <div class="faq-support">
        <p>
          Our makeup isn't just about beauty — it's about confidence.
          Get in touch with our Beauty Experts.<br>
          Available Mon–Sun, 8am–5pm
        </p>
        <p class="chat">💬 Live Chat <span>on our website</span></p>
      </div>

      <div class="faq-list">
        <div class="faq-item-row" *ngFor="let f of filteredFaqs" (click)="f.open = !f.open">
          <h3 class="question">{{ f.question }}</h3>
          <p class="answer" [style.display]="f.open ? 'block' : 'none'">{{ f.answer }}</p>
        </div>
        <p *ngIf="filteredFaqs.length === 0" class="no-results">No matching questions. Try a different search term.</p>
      </div>

      <div class="faq-grid">
        <div class="faq-item">📦<p>Exchanges & Returns</p></div>
        <div class="faq-item">🚚<p>Shipping & Orders</p></div>
        <div class="faq-item">💄<p>Defective Items</p></div>
        <div class="faq-item">👤<p>My Beauty Account</p></div>
        <div class="faq-item">💳<p>Payments</p></div>
        <div class="faq-item">🛍️<p>Products</p></div>
        <div class="faq-item">🏷️<p>Offers</p></div>
        <div class="faq-item">👩<p>Beauty Tips & Tutorials ⭐</p></div>
        <div class="faq-item">🔍<p>Model Search</p></div>
      </div>
    </section>

    <section class="thankyou-section">
      <div class="thankyou-image">
        <img src="assets/images/thank.jpg" alt="Beauty Products">
      </div>
      <div class="thankyou-text">
        <h1>Thank You!</h1>
        <p>Your message has been received.<br>Our beauty team will get back to you soon.</p>
        <a routerLink="/" class="thank-btn">Back to Home</a>
      </div>
    </section>
  `
})
export class FaqComponent {
  searchTerm = '';

  faqs: FaqEntry[] = [
    { question: 'What services do you offer?', answer: 'We offer bridal and party makeup services, along with personalized skincare consultations.', open: false },
    { question: 'How long does delivery take?', answer: 'Most orders arrive within 2–4 business days across India.', open: false },
    { question: 'Can I return a product?', answer: 'Yes, unopened products can be returned within 7 days of delivery.', open: false },
    { question: 'Do you offer skin-type recommendations?', answer: 'Yes, our Contact form lets you tell us your skin type and preferences so our team can recommend products.', open: false },
    { question: 'Which payment methods are supported?', answer: 'We support UPI, credit/debit cards, and cash on delivery.', open: false }
  ];

  filteredFaqs: FaqEntry[] = [...this.faqs];

  filterFaqs(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredFaqs = !term
      ? this.faqs
      : this.faqs.filter(
          (f) => f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
        );
  }
}
