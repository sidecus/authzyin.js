import * as React from 'react';
import { Resource } from './Resource';
import { AuthZyinContext } from './AuthZyinContext';
import { evaluateRequirement } from './RequirementEvaluator';
import { useAuthZyinContext } from './AuthZyinProvider';

/**
 * authorize method which finds the policy and evaluates all requirements in it
 * @param context - AuthZyin context object containing user context, policy definitions and custom authorization data
 * @param policy - the policy to authorize against
 * @param resource - resource, optional depending  on the policy and requirement
 */
export const authorizeFunc = (context: AuthZyinContext<object> | undefined, policy: string, resource?: Resource) => {
    if (!context || !context.userContext || !context.policies) {
        // Incorrect context
        return false;
    }

    const policyObject = context.policies.filter((p) => p.name === policy)[0];
    if (!policyObject || !policyObject.requirements) {
        // Cannot find policy
        return false;
    }

    for (const requirement of policyObject.requirements) {
        const result = evaluateRequirement(context, requirement, resource);
        if (!result) {
            return false; // requirement failed, no need to continue
        }
    }

    return true;
};

/**
 * Authorization hooks, returns a convenient authorize method you can use in your component.
 * An always false func is returned when context is not initialized.
 */
export const useAuthorize = () => {
    const context = useAuthZyinContext<object>();
    return (policy: string, resource?: Resource) => {
        return authorizeFunc(context, policy, resource);
    };
};

// Use React render props (with children as the render props function)
interface AuthorizeProps {
    policy: string;
    resource?: Resource;
    children: (authorized: boolean) => JSX.Element;
}

/**
 * Authorize component which can be used to authorize without hooks.
 */
export const Authorize = (props: AuthorizeProps) => {
    const authorize = useAuthorize();

    if (!props?.children) {
        return <></>;
    }

    const authorized = authorize(props.policy, props.resource);

    // Render children using render props and passing in the authorization result
    return props.children(authorized);
};
