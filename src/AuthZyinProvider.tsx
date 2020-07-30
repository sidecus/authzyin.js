import * as React from 'react';
import { useState, useEffect, PropsWithChildren } from 'react';
import { AuthZyinContext } from './AuthZyinContext';
import { camelCaseContext } from './PropNameCamelCase';

/**
 * AuthZyin context api URL - this is setup by the AutZyin library automatically for you
 */
const contextApiUrl = '/authzyin/context';

/**
 * Global variable of the authorization React context object
 */
let AuthZyinReactContext: React.Context<AuthZyinContext<object> | undefined> | undefined;

/**
 * Function to initialize the authorization React context - similar as createStore from redux.
 * Call this in your app startup (e.g. index.tsx).
 * @param context - optional AuthZyin context object. Pass this parameter when you already have the context data required for authorization
 * before calling this and don't want to rely an separate api call to load it.
 */
export const initializeAuthZyinContext = (context?: AuthZyinContext<object>) => {
    if (AuthZyinReactContext) {
        throw new Error('AuthZyin React context is already initialized.');
    }

    // Create the React context wrapping around the context object
    AuthZyinReactContext = React.createContext<AuthZyinContext<object> | undefined>(context);
};

/**
 * This is for testing only - to reset the global reference to the React context;
 */
export const resetAuthZyinContext = () => {
    AuthZyinReactContext = undefined;
};

/**
 * Assertion for better type checking
 * @param condition condition to assert on
 */
function assert(condition: unknown): asserts condition {
    if (!condition) {
        throw new Error('AuthZyin React context is not setup. Call createAuthZyinContext first.');
    }
}

/**
 * Hooks to read AuthZyinContext object from React context (e.g. to access basic user info or policies)
 * @template TData Data type for AuthZyinContext
 */
export const useAuthZyinContext = <TData extends object = object>() => {
    assert(AuthZyinReactContext !== undefined);
    const reactContext = AuthZyinReactContext as React.Context<AuthZyinContext<TData> | undefined>;
    return React.useContext(reactContext);
};

/**
 * Options interface for AuthZyinProvider
 */
export interface AuthZyinProviderOptions {
    /**
     * URL for the context api call. Defaults to contextApiUrl (/authzyin/context)
     */
    url: string;

    /**
     * Function to initialize requestInit for the context api fetch call.
     * Use this to set authorization headers.
     */
    requestInitFn: () => Promise<RequestInit>;

    /**
     * Automatically convert property names in requirement JsonPath to camel case.
     * If you are using Pascal case propery names in your C# authorization data definition and your asp.net core configuration
     * converts them to Camel case, you'll want to set this to true.
     * If you are serializing as Pascal case to the client, then set this to false.
     * Defaults to true since this the most common case.
     */
    jsonPathPropToCamelCase: boolean;
}

const defaultOptions: AuthZyinProviderOptions = {
    url: contextApiUrl,
    requestInitFn: () => Promise.resolve({}),
    jsonPathPropToCamelCase: true
};

/**
 * HOC component which sets the authorization React context - similar as Provider from redux
 * @param props - props to specify various options for the provider behavior. refer to AuthZyinProviderOptions.
 */
export const AuthZyinProvider = (
    props: PropsWithChildren<{ options?: Partial<AuthZyinProviderOptions> }>
): JSX.Element => {
    const [context, setContext] = useState<AuthZyinContext<object>>();

    // useAuthZyinContext call here returns the defaultValue set by initializeAuthZyinContext
    const defaultContext = useAuthZyinContext<object>();

    useEffect(() => {
        const options: AuthZyinProviderOptions = { ...defaultOptions, ...props?.options };

        const handleContext = (contextToSave: AuthZyinContext<object>) => {
            if (options.jsonPathPropToCamelCase) {
                // Convert property names in JSON path to camel case
                camelCaseContext(contextToSave);
            }

            setContext(contextToSave);
        };

        const fetcAndHandleContext = async (): Promise<void> => {
            const request = await options.requestInitFn();
            request.method = 'GET';
            request.body = undefined;

            // Call the context api from server to get the context data
            const response = await fetch(options.url, request);
            if (response.ok) {
                const result = (await response.json()) as AuthZyinContext<object>;
                handleContext(result);
            } else {
                throw new Error(`AuthZyinContext loading error: ${response.status}`);
            }
        };

        if (defaultContext) {
            // If a default value is provided in initializeAuthZyinContext, use it
            handleContext(defaultContext);
        } else {
            // No default value provided. Load it from server instead.
            fetcAndHandleContext();
        }
    }, [props]);

    // Assertion to ensure React context has already been initialized. This has already been coverd by the
    // useAuthZyinContext call above but still having to repeat it here to make TS happy for the below JSX element usage.
    assert(AuthZyinReactContext !== undefined);

    // Return children components wrapped with proper React context.
    // Children are only rendered when context is set correctly.
    return (
        <AuthZyinReactContext.Provider value={context}>
            {context && context.userContext && props.children}
        </AuthZyinReactContext.Provider>
    );
};
