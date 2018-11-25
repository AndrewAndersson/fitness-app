import { Injectable } from '@angular/core';
import { Exersice } from './exersice.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private avaliableExersices: Exersice[] = [
    { id: 'crunches', name: 'Crunches', durarion: 30, calories: 8 },
    { id: 'touch-ties', name: 'Touch Toes', durarion: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', durarion: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', durarion: 60, calories: 8 }
  ];

  constructor() { }

  getAvaliableExersices() {
    return this.avaliableExersices.slice();
  }
}
