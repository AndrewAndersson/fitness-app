import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exersice } from './../exersice.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exrsices$: Observable<Exersice[]>;
  isLoading$: Observable<boolean>;
  constructor(
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>
              ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exrsices$  = this.store.select(fromTraining.getAvaliableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.store.dispatch(new UI.StartLoading());          
    this.trainingService.fetchAvaliableExersices();
  }


  onstartTraining(form: NgForm) {
   this.trainingService.startExercise(form.value.exercise);
  }

}
