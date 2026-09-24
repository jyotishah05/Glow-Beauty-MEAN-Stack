import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h3>Glow Beauty</h3>
          <p>Enhancing beauty with care & confidence.</p>
        </div>
      </div>
      <p class="footer-bottom">&copy; 2026 Glow Beauty. All rights reserved.</p>
    </footer>
  `
})
export class FooterComponent {}
