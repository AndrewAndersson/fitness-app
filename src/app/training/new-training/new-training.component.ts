import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exersice } from './../exersice.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exrsices: Exersice[];
  exerciseSubscription: Subscription;
  isLoading = false;
  private isLoadingSubs: Subscription;

  constructor(
              private trainingService: TrainingService,
              private uiService: UiService
              ) { }

  ngOnInit() {
    this.isLoadingSubs = this.uiService.loadingStateChanged
          .subscribe(isLoading => {
            this.isLoading = isLoading;
          });
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(exercises => this.exrsices = exercises);
    this.trainingService.fetchAvaliableExersices();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  onstartTraining(form: NgForm) {
   this.trainingService.startExercise(form.value.exercise);
  }

}
