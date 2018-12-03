import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exersice } from './../exersice.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exrsices: Observable<Exersice[]>;

  constructor(
              private trainingService: TrainingService,
              private db: AngularFirestore
              ) { }

  ngOnInit() {
    this.exrsices = this.db.collection('avaliableExercises')
            .snapshotChanges()
            .pipe(
              map(docData => {
                return docData.map(doc => {
                  return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories']
                  };
                });
              })
            );
  }
  onstartTraining(form: NgForm) {
   this.trainingService.startExercise(form.value.exercise);
  }

}
