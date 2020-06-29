import * as React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { useAppBoundActions } from '../store/actions';
import { Place, IsAgeLimitedPlace, IsBar } from '../api/Contract';
import { Severity } from '../store/store';
import { LightTooltip } from './LightTooltip';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import WeekendIcon from '@material-ui/icons/Weekend';
import { useAuthorize, Authorize } from 'authzyin.js';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const toolTipTitle = (place: Place, authorized: boolean) => {
    return (
        <>
            <Typography color="inherit">{place.name}</Typography>
            <Typography color="secondary">{`accepts ${place.acceptedPaymentMethods[0].toString()}`}</Typography>
            <Typography color="secondary">{IsAgeLimitedPlace(place) && `Age:${place.minAge}-${place.maxAge}`}</Typography>
            <Typography color={authorized ? "primary" : "error"}>{authorized ? 'Authorized' : 'Not authorized'}</Typography>
        </>
    );
};

const getIcon = (place: Place) => IsBar(place) ? <LocalBarIcon/> : <WeekendIcon/>;

interface PlaceProps {
    place: Place;
    buttonClass: string,
    onEnterPlace: (authorized: boolean) => void;
}

/**
 * Use the useAuthorize hook to authorize
 * @param props props
 */
const PlaceWihtUseAuthorizeHook = (props: PlaceProps) => {
    const authorize = useAuthorize();
    const authorized = authorize(props.place.policy, props.place);

    return (
        <LightTooltip key={props.place.id} placement='top' arrow title={toolTipTitle(props.place, authorized)}>
            <Button
                variant="contained"
                className={props.buttonClass}
                color = {authorized ? "primary" : "secondary"}
                startIcon={getIcon(props.place)}
                onClick={() => props.onEnterPlace(authorized)}
            >
                {props.place.name}
            </Button>
        </LightTooltip>
    );
}

/**
 * Use the Authorize component to authorize, mimicing a class component behavior here
 * @param props props
 */
const PlaceWithAuthorizeComponent = (props: PlaceProps) => {
    return (
        <Authorize policy={props.place.policy} resource={props.place}>
            {
                // This function is used as the "render props (as children)" to the Authorize component.
                (authorized) => (
                    <LightTooltip key={props.place.id} placement='top' arrow title={toolTipTitle(props.place, authorized)}>
                        <Button
                            variant="contained"
                            className={props.buttonClass}
                            color={authorized ? "primary" : "secondary"}
                            startIcon={getIcon(props.place)}
                            onClick={() => props.onEnterPlace(authorized)}
                        >
                            {props.place.name}
                        </Button>
                    </LightTooltip>
                )
            }
        </Authorize>
    );
}

/**
 * Render a place either using the useAuthorize or using the Authorize component based on id
 * @param { place }: place
 */
export const PlaceComponent = ({ place }: { place: Place }) => {
    const classes = useStyles();
    const { setAlert, setCurrentPlace, enterPlace } = useAppBoundActions();

    const tryEnterPlace = (authorized: boolean) => {
        setCurrentPlace(-1);
        if (authorized) {
            // invoke server api if client authorization succeeded or sneak in option is selected
            enterPlace(place);
        } else {
            console.error(`Entering "${place.name}": not authorized`);
            setAlert({
                severity: Severity.Warn,
                message: `Authorization failed - "${place.name}" forbidden by policy "${place.policy}"`,
            });
        }
    }

    return place.id % 2 === 0 ?
        <PlaceWihtUseAuthorizeHook place={place} onEnterPlace={tryEnterPlace} buttonClass={classes.button}/> :
        <PlaceWithAuthorizeComponent place={place} onEnterPlace={tryEnterPlace} buttonClass={classes.button}/>;
};