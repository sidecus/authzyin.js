import * as React from 'react';
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Paper, Container } from '@material-ui/core';
import { initializeAuthZyinContext, AuthZyinProvider } from 'authzyin.js';
import { Home } from './components/Home';
import { policiesApi } from './api/Api';

// dark theme
export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

// Initialize authzyin context globally
initializeAuthZyinContext();

export default () => {
    const classes = useStyles();

    return (
        // Sign in succeeded, render main content wrapped with AuthZyinProvider
        <AuthZyinProvider options={{ url: policiesApi }}>
            <Container>
                <MuiThemeProvider theme={darkTheme}>
                    <Paper className={classes.root}>
                        <Home />
                    </Paper>
                </MuiThemeProvider>
            </Container>
        </AuthZyinProvider>
    );
};
