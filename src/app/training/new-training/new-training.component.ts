import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exersice } from './../exersice.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() tariningStart = new EventEmitter<void>();
  exrsices: Exersice[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exrsices = this.trainingService.getAvaliableExersices();
  }
  onstartTraining() {
    this.tariningStart.emit();
  }

}
