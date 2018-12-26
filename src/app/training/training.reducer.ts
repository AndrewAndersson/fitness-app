import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {TrainingActions, SET_AVALIABLE_TRAINIGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exersice } from './exersice.model';
import * as fromRoot from '../app.reducer';
import { from } from 'rxjs';

export interface TrainingState {
    avaliableExercises: Exersice[];
    finishedExercises: Exersice[];
    activeTraining: Exersice
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    avaliableExercises: [],
    finishedExercises: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVALIABLE_TRAINIGS:
            return {
                ...state,
                avliableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: action.payload
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default: {
            return state;
        }
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvaliableExercises = createSelector(getTrainingState, (state: TrainingState) => state.avaliableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
