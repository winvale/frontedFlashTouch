import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HeroComponent } from './shared/hero/hero.component';
import { ScienceComponent } from './shared/science/science.component';
import { FeaturesComponent } from './shared/features/features.component';
import { DemoComponent } from './shared/demo/demo.component';
import { PricingComponent } from './shared/pricing/pricing.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthModalComponent } from './shared/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    ScienceComponent,
    FeaturesComponent,
    DemoComponent,
    PricingComponent,
    FooterComponent,
    AuthModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
