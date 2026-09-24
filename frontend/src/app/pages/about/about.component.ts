import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 class="main-topic">About Glow Beauty</h1>
    <section id="about" class="about-section">
      <div class="about-container">
        <div class="about-text">
          <span class="about-tag">AMAZING LASHES</span>
          <h3>About Us</h3>
          <p>
            Learn perfect technique for flawless application in our small group
            training. You will leave the training event with the knowledge and
            confidence to become a successful Amazing Lashes Certified Specialist.
          </p>
          <p>
            If you ever have concerns after attending a training event we are always
            here to support you. Feel free to contact our Specialist Support team.
            Once you have reached the level of excellence required, you can contact
            us to complete your certification.
          </p>
          <button class="about-btn" routerLink="/contact">Join Us</button>
        </div>
        <div class="about-image">
          <img src="assets/images/girl.jpg" alt="About Beauty">
        </div>
      </div>
    </section>

    <section class="story-section">
      <h2>Our Story</h2>
      <p class="subtitle">
        Glow Beauty started as a small idea: make it easy to find beauty and
        skincare products from brands people already trust, without hunting
        across a dozen different stores. Today we bring together makeup,
        skincare, hair care, and fragrance from over ten leading brands in
        one place, backed by a real support team and a growing product
        catalogue we keep expanding based on customer requests.
      </p>
    </section>
  `
})
export class AboutComponent {}
