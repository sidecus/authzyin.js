# authzyin.js

> Javascript library to enable policy based authorization in React.

[![NPM](https://img.shields.io/npm/v/authzyin.js.svg)](https://www.npmjs.com/package/authzyin.js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![CI](https://github.com/sidecus/authzyin.js/workflows/CI/badge.svg)

This library enables [policy based authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-3.1) in React. It supports various types of policy/requirement evaluations leveraging JSON path.

Simply define your policies, initialize and authorize!

There is also a server library [authzyin](https://github.com/sidecus/authzyin). Using **authzyin.js** together with **authzyin** can further simplify your authorization story across server and client.


## Install
```Shell
npm install --save authzyin.js
```

## Usage
1. Initialize ```AuthZyinContext``` (similar as ```createStore``` in Redux, call this globally).
```TSX
    // Initialize context
    initializeAuthZyinContext();
```
2. Wrap your main component with ```AuthZyinProvider``` like below.
```TSX
    // Wrap main content with AuthZyinProvider after signing in
    export const App = () => {
        if (signedIn) {
            return (
                <AuthZyinProvider options={{ requestInitFn: getAuthorizationHeadersAsync }}>
                    <MainContent />
                </AuthZyinProvider>
            );
        }
    }
```
3. Now you can call the ```useAuthorize``` hook to achieve policy based authorization in your components like below.
```TSX
    const authorize = useAuthorize();

    // pure policy + user based
    const IsCustomer = authorize('IsCustomer');

    // policy + resource + user based
    const barAuthorized = authorize('CanEnterBar' /*policy*/, bar /*resource*);
```

## AuthZyinProvider Flexibility
To better suite your porject needs, ```AuthZyinProvide``` has great flexibility built in to initialize the authorization context (of type ```AuthZyinContext<T>```).
- **Already loaded the context before hand**: Pass your context object to the ```initializeAuthZyinContext``` method. ```AuthZyinProvider``` will simply use it as is.
- **Need to load context from your own api**: Pass your api url to the ```AuthZyinProvider``` options. The provider will load it from the URL (HTTP GET) for you.
- **Use together with authzyin server library**: Everything is taken care of for you automatically. You might need to pass a ```requestInitFn``` async call back as part of the ```AuthZyinProvider``` options to customize the authentication.

## Build and run locally
```Shell
# Build lib
yarn install
yarn build

# build and run example
cd example
yarn start
```

# Happy coding. Peace.
MIT © [sidecus](https://github.com/sidecus)
