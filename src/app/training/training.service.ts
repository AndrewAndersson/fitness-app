import { Injectable } from '@angular/core';
import { Exersice } from './exersice.model';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as UI from '../shared/ui.actions';





@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private fbSubs: Subscription[] = [];

  private runningExercise: Exersice;

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) { }

  fetchAvaliableExersices() {
    this.fbSubs.push(this.db.collection('avaliableExercises')
        .snapshotChanges()
        .pipe(
          map(docData => {
            // throw(new Error());
            return docData.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
              };
            });
          })
        ).subscribe((exercises: Exersice[]) => {
          this.store.dispatch(new UI.StopLoading());          
          this.store.dispatch(new Training.SetAvaliableTrainings(exercises));
        }, err => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Ftching exersices failed! pleace try again later', null, 3000);
        }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTrainig(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining)
        .pipe(take(1))
        .subscribe(exercise => {
          this.addDataToDatabase({...exercise, date: new Date(), state: 'completed'});
          this.store.dispatch(new Training.StopTrainig());
        });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining)
        .pipe(take(1))
        .subscribe(exercise => {
          this.addDataToDatabase({
            ...exercise,
            duration: exercise.duration * (progress / 100),
            calories: exercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
          });
          this.store.dispatch(new Training.StopTrainig());
        });
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finshedExercises')
        .valueChanges()
        .subscribe((exercises: Exersice[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(subs => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exersice) {
    this.db.collection('finshedExercises').add(exercise);
  }
}
