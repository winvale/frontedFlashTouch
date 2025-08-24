import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-header.component.html',
  styleUrls: ['./practice-header.component.css']
})
export class PracticeHeaderComponent {
  username: string = localStorage.getItem('auth_user') || 'Usuario';

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.router.navigateByUrl('/');
  }
}
