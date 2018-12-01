import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exersice } from './../exersice.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exrsices: Exersice[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exrsices = this.trainingService.getAvaliableExersices();
  }
  onstartTraining(form: NgForm) {
   this.trainingService.startExercise(form.value.exercise);
  }

}
