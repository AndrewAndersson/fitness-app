import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
    isAuthinticated: boolean;
}

const initialState: State = {
    isAuthinticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthinticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthinticated: false
            };
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthinticated;