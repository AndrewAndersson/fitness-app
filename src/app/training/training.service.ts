import { Injectable } from '@angular/core';
import { Exersice } from './exersice.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChange = new Subject<Exersice>();
  exercisesChange = new Subject<Exersice[]>();
  finishedExerciseChange = new Subject<Exersice[]>();
  private avaliableExersices: Exersice[] = [];

  private runningExercise: Exersice;

  constructor(
    private db: AngularFirestore
  ) { }

  fetchAvaliableExersices() {
    this.db.collection('avaliableExercises')
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
        ).subscribe((exercises: Exersice[]) => {
          this.avaliableExersices = exercises;
          this.exercisesChange.next([...this.avaliableExersices]);
        });
  }

  startExercise(selectedId: string) {
    // this.db.doc('avaliableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.avaliableExersices.find(ex => ex.id === selectedId);
    this.exerciseChange.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.db.collection('finshedExercises')
        .valueChanges()
        .subscribe((exercises: Exersice[]) => {
          this.finishedExerciseChange.next(exercises);
        });
  }

  private addDataToDatabase(exercise: Exersice) {
    this.db.collection('finshedExercises').add(exercise);
  }
}
