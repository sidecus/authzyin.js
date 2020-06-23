import { Place } from './Contract';

export const policiesApi = `${process.env.PUBLIC_URL}/policies.json`;
const placesApi = `${process.env.PUBLIC_URL}/places.json`;

const callHttpGetAsync = async <T>(url: string):Promise<T> => {
    const response = await fetch(url);

    if (response.ok) {
        return await response.json() as T;
    } else {
        // Throw error with HTTP status code
        throw new Error(response.status.toString());
    }
}

/* ====================== Api definition =============================*/
export const callGetPlaces = async () => {
    return await callHttpGetAsync<Place[]>(placesApi);
}