import {Application, Router} from "express";

/** Utilities to deal with expressjs components. */
export class ExpressJsUtil {

    /**
     * Removes one or all request handling functions from the provided router.
     *
     * @param expressRouter - The router to clear.
     * @param functionName - The name of the function to remove. If none is specified, all the functions are
     * removed from the router.
     *
     * @see https://stackoverflow.com/questions/10378690/remove-route-mappings-in-nodejs-express
     */
    static clearRouter(expressRouter: Router, functionName?: string) {

        for (let routeIndex = 0; routeIndex < expressRouter.stack.length; routeIndex++) {

            let route = expressRouter.stack[routeIndex];

            if (route.route) {

                if (functionName) { // Remove one using function name

                    let endpointFnIndex = route.route.stack.findIndex(layer => layer.name === functionName);

                    if (endpointFnIndex !== -1) {
                        route.route.stack.splice(endpointFnIndex, 1);

                        if (route.route.stack.length === 0) {
                            expressRouter.stack.splice(routeIndex, 1);
                            routeIndex--;
                        }
                    }

                } else { // Remove all

                    expressRouter.stack.splice(routeIndex, 1);
                    routeIndex--;
                }
            }
        }
    }

    /**
     * Sets the 'json replacer' setting of the provided app with a serializer that
     * avoids the circular json structure error caused by Timeouts.
     *
     * @param expressApp - An app returned by express().
     */
    static avoidCircularJsonStructure(expressApp: Application) {

        // To avoid circular json structure error from JSON.stringify
        const Timeout = setTimeout(() => { }, 0).constructor;

        expressApp.set('json replacer', function circularJsonReplacer(key, value) {

            if (value instanceof Timeout) return undefined;

            return value;
        });
    }
}
