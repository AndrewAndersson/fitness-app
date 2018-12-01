import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTrainig = false;
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChange.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTrainig = true;
        } else {
          this.ongoingTrainig = false;
        }
      }
    );
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
