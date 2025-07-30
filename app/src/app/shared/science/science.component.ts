import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-science',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css']
})
export class ScienceComponent implements OnInit {
  constructor(public langService: LanguageService) {}

  ngOnInit() {
    console.log('Cards:', this.cards);
  }

  get titleText() {
    return this.langService.currentLang === 'es' ?
      'Por Qué Funciona el Aprendizaje Visual' :
      'Why Visual Learning Works';
  }

  get cards() {
    return this.langService.currentLang === 'es' ?
      [
        {
          icon: '/assets/lightning-icon.png',
          title: 'Procesamiento de 13ms',
          description: 'Tu cerebro procesa imágenes en solo 13 milisegundos, haciendo que el aprendizaje visual sea increíblemente rápido y eficiente.'
        },
        {
          icon: '/assets/brain-icon.png',
          title: 'Teoría del Doble Código',
          description: 'La investigación de Allan Paivio muestra que las imágenes crean múltiples vías de memoria, aumentando la retención hasta en un 65%.'
        },
        {
          icon: '/assets/target-icon.png',
          title: 'Superioridad de la Imagen',
          description: 'Las imágenes se almacenan en la memoria a largo plazo más efectivamente que el texto, creando una retención de vocabulario duradera.'
        }
      ] :
      [
        {
          icon: '/assets/lightning-icon.png',
          title: '13ms Processing',
          description: 'Your brain processes images in just 13 milliseconds, making visual learning incredibly fast and efficient.'
        },
        {
          icon: '/assets/brain-icon.png',
          title: 'Dual Coding Theory',
          description: "Allan Paivio's research shows images create multiple memory pathways, increasing retention by up to 65%."
        },
        {
          icon: '/assets/target-icon.png',
          title: 'Picture Superiority',
          description: 'Images are stored in long-term memory more effectively than text, creating lasting vocabulary retention.'
        }
      ];
  }
}
