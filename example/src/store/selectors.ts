import { createSelector } from 'reselect';
import { ISampleStore } from './store';

// Use reselect.js for memoization and define all selectors outside of the function components.
// If they are defined within the fuinction component it can potentially defeat the purpose of memoization,

/**
 * places selector
 */
export const placesStateSelector = (store: ISampleStore) => store.places;

/**
 * Places selector
 */
export const placesSelector = createSelector(
    [placesStateSelector],
    x => x.places
);

/**
 * Current place selector
 */
export const currentPlaceSelector = createSelector(
    [placesStateSelector],
    x => x.currentPlace
);

/**
 * Alert selector selector
 */
export const alertSelector = (store: ISampleStore) => store.alertInfo;