import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createSlicedReducer } from 'roth.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
    SampleActions,
    SetPlacesAction,
    SetCurrentPlaceAction,
    SetAlertAction,
} from './actions';
import { Place } from "../api/Contract";

/* ====================== State definition =============================*/
export interface PlaceState {
    places: Place[];
    currentPlace: number;
}

export enum Severity {
    Info = 'info',
    Warn = 'warning',
    Error = 'error',
}

export interface AlertState {
    severity: Severity,
    message: string,
}

/* ====================== Reducer definition =============================*/
/**
 * place state reducer
 */
const defaultPlaceState: PlaceState = {
    places: [],
    currentPlace: -1
};
const placeStateReducer = createSlicedReducer(defaultPlaceState, {
    [SampleActions.SetPlaces]: [
        (state: PlaceState, action: SetPlacesAction) => {
            return {...state, places: action.payload, currentPlace: -1};
        }
    ],
    [SampleActions.SetCurrentPlace]: [
        (state: PlaceState, action: SetCurrentPlaceAction) => {
            return {...state, currentPlace: action.payload};
        }
    ],
});

/**
 * Alert reducer
 */
const defaultAlertState: AlertState = {
    severity: Severity.Info,
    message: 'Which place do you want to go?'
};
const alertReducer = createSlicedReducer(defaultAlertState, {
    [SampleActions.SetAlert]: [
        (state: AlertState, action: SetAlertAction) => {
            return {...state, ...action.payload};
        }
    ],
});

/**
 * root reducer
 */
const rootReducer = combineReducers({
    places: placeStateReducer,
    alertInfo: alertReducer,
});

/**
 * store, created with thunk middleware and redux dev tools
 */
export const sampleStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

/**
 * app store type
 */
export type ISampleStore = ReturnType<typeof rootReducer>;