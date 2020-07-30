import * as React from 'react';
import { Typography, Card, CardContent, CardHeader } from '@material-ui/core';
import { useAuthZyinContext } from 'authzyin.js';
import { AuthorizationData } from '../api/Contract';

export const User = () => {
    const context = useAuthZyinContext<AuthorizationData>();

    if (!context) {
        return <></>;
    }

    // main rendering based on state
    return (
        <Card variant="outlined">
            <CardHeader title='User information' />
            <CardContent>
                <Typography variant="body1" component="div">
                    Age: {context.data.age}
                </Typography>
                <Typography variant="body1" component="div">
                    Has driver's license: {String(context.data.withDriversLicense)}
                </Typography>
                <Typography variant="body1" component="div">
                    Has passport: {String(context.data.withPassport)}
                    </Typography>
                <Typography variant="body1" component="div">
                    PaymentMethods: {JSON.stringify(context.data.paymentMethods.map(x => x.type))}
                </Typography>
            </CardContent>
        </Card>
    );
};