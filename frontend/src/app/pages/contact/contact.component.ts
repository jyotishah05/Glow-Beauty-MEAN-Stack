import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1 class="main-topic">Contact Glow Beauty</h1>

    <section id="location" class="contact-section">
      <div class="contact-container">
        <div class="contact-left">
          <h4>LOCATION</h4>
          <p>28 Jackson Blvd Ste 1020<br>Chicago<br>IL 60604-2340</p>
          <h4>FOLLOW US</h4>
          <div class="social-icons">
            <span>f</span><span>t</span><span>i</span><span>g+</span>
          </div>
          <p class="contact-footer">Image from Freepik<br>&copy;2026 Privacy policy</p>
        </div>
        <div class="contact-right">
          <img src="assets/images/contact.webp" alt="Contact Girl">
        </div>
      </div>
    </section>

    <section id="contact" class="contact-page">
      <div class="contact-wrapper">
        <div class="contact-form">
          <h2>Get in Touch</h2>
          <p class="contact-desc">
            Contact us for product queries, beauty consultations, collaborations,
            or to join the Glow Beauty team.
          </p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <input type="text" placeholder="First name*" formControlName="firstName">
              <input type="text" placeholder="Last name*" formControlName="lastName">
            </div>
            <div class="form-row">
              <input type="email" placeholder="Email*" formControlName="email">
              <input type="tel" placeholder="Phone*" formControlName="phone">
            </div>
            <div class="form-row">
              <input type="text" placeholder="Favorite Beauty Brand" formControlName="favoriteBrand">
              <input type="text" placeholder="Instagram / Website" formControlName="instagram">
            </div>
            <textarea placeholder="Tell us about your beauty needs..." formControlName="message"></textarea>
            <button type="submit" class="contact-btn" [disabled]="form.invalid || submitting">Send Message</button>
          </form>
          <p id="successMessage">{{ statusMessage }}</p>
        </div>

        <div class="contact-info">
          <h3>Glow With Confidence</h3>
          <div class="steps">
            <div class="step">
              <span>1</span>
              <div><h4>We understand your style</h4><p>We analyze your beauty needs, skin type, and preferences.</p></div>
            </div>
            <div class="step">
              <span>2</span>
              <div><h4>We recommend the perfect products</h4><p>Our experts curate makeup that fits your look and lifestyle.</p></div>
            </div>
            <div class="step">
              <span>3</span>
              <div><h4>We help you shine</h4><p>From daily glam to special occasions, we've got you covered.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  submitting = false;
  statusMessage = '';

  form!: ReturnType<FormBuilder['group']>;

constructor(private fb: FormBuilder, private contactService: ContactService) {
  this.form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    favoriteBrand: [''],
    instagram: [''],
    message: ['']
  });
}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.contactService.submit(this.form.value).subscribe({
      next: () => {
        this.statusMessage = 'Thank you! We will contact you soon 💄';
        this.form.reset();
        this.submitting = false;
      },
      error: () => {
        this.statusMessage = 'Something went wrong. Please try again.';
        this.submitting = false;
      }
    });
  }
}
