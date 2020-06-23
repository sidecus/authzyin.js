import { Dispatch } from 'redux';
import { createActionCreator, useBoundActions } from 'roth.js';
import { AlertState, Severity } from './store';
import { callGetPlaces } from '../api/Api';
import { Place } from '../api/Contract';

/* action type string enums */

/**
 * Sample app action types
 */
export enum SampleActions {
    SetPlaces = "SetPlaces",
    SetCurrentPlace = "SetCurrentPlace",
    SetAlert = "SetAlert",
};

/**
 * set places info action creator
 */
const setPlaces = createActionCreator<Place[]>(SampleActions.SetPlaces);
export type SetPlacesAction = ReturnType<typeof setPlaces>;


/**
 * set current place action creator
 */
const setCurrentPlace = createActionCreator<number>(SampleActions.SetCurrentPlace);
export type SetCurrentPlaceAction = ReturnType<typeof setCurrentPlace>;

/**
 * set error
 */
const setAlert = createActionCreator<AlertState>(SampleActions.SetAlert);
export type SetAlertAction = ReturnType<typeof setAlert>;


/* ===============================thunk action creators============================ */

/**
 * This is a thunk action creator used to get authorization context
 */
const getPlaces = () => {
    return async (dispatch: Dispatch<any>) => {
        const places = await callGetPlaces();
        dispatch(setPlaces(places));
    }
};

/**
 * This is a thunk action creator used to enter a place
 */
const enterPlace = (place: Place) => {
    return (dispatch: Dispatch<any>) => {
        console.log(`Entered "${place.name}" successfully.`);
        dispatch(setCurrentPlace(place.id))
        dispatch(setAlert({
            severity: Severity.Info,
            message: `You just walked into "${place.name}"`,
        }));
    }
}


/* action creators */
const actionCreators = {
    getPlaces,
    setAlert,
    setCurrentPlace,
    enterPlace,
}

/**
 * Custom hooks for auto bound action creators.
 * You can create one for each domain area to logically separate them.
 */
export const useAppBoundActions = () => useBoundActions(actionCreators);
