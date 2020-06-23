import * as React from 'react';
import { makeStyles, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useAppBoundActions } from '../store/actions';
import { placesSelector } from '../store/selectors';
import { Place } from '../api/Contract';
import { AlertBanner } from './Alert';
import { PlaceComponent } from './PlaceComponent';

const useStyles = makeStyles(() => ({
    placelist: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
}));

export const PlaceList = () => {
    const classes = useStyles();
    const places = useSelector(placesSelector);
    const { getPlaces } = useAppBoundActions();

    React.useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    if (places && places.length >= 0) {
        const placesInfo = places.map((place: Place) => (<PlaceComponent key={place.id} place={place} />));
    
        return (
            <Card variant="outlined">
                <CardHeader title='Local places nearby you' />
                <CardContent>
                    <Typography variant="subtitle1" component="div">Hover to see more details. Click to enter</Typography>
                    <div className={classes.placelist}>
                        {placesInfo}
                    </div>
                    <AlertBanner />
                </CardContent>
            </Card>
        );
    };

    return <></>;
};
