import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PracticeHeaderComponent } from '../practice-header/practice-header.component';
import { PracticeFooterComponent } from '../practice-footer/practice-footer.component';

@Component({
  selector: 'app-practice-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PracticeHeaderComponent, PracticeFooterComponent],
  templateUrl: './practice-layout.component.html',
  styleUrls: ['./practice-layout.component.css']
})
export class PracticeLayoutComponent {}


