import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-screen.component.html',
  styleUrls: ['./tutorial-screen.component.css']
})
export class TutorialScreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario ya ha visto el tutorial
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {
      this.router.navigate(['/practice']);
    }
  }

  finishTutorial(): void {
    // Marcar que el usuario ha visto el tutorial
    localStorage.setItem('hasSeenTutorial', 'true');
    this.router.navigate(['/practice']);
  }
}
