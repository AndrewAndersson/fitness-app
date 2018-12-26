import { Action } from '@ngrx/store';
import { Exersice } from './exersice.model';

export const SET_AVALIABLE_TRAINIGS = '[Training] Set Avaliable Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvaliableTrainings implements Action {
    readonly type = SET_AVALIABLE_TRAINIGS;

    constructor(public payload: Exersice[]) {}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Exersice[]) {}
}

export class StartTrainig implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: Exersice) {}
}

export class StopTrainig implements Action {
    readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvaliableTrainings | SetFinishedTrainings | StartTrainig | StopTrainig;