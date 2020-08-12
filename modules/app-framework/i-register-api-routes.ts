import { Express } from "express";
import {AppModule} from "./app-module";

/**
 * @description Interface for [app modules]{@link AppModule} that must register HTTP API routes to the server.
 */
export interface IRegisterExpressRoutes {

    /**
     * @description Registers the HTTP API routes of the current module.
     *
     * @param expressApp - The ExpressJs app on which to register the routes.
     */
    registerExpressRoutes(expressApp: Express)
}

export function canRegisterExpressRoutes(module: any): boolean {
    return typeof module.registerExpressRoute === 'function';
}
