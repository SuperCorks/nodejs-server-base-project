import { Express } from "express";
const express = require('express');

const CORS = require('cors');
const bodyParser = require('body-parser');

import {IServerAppConfigs} from "./i-server-app-configs";
import {AppModule} from 'soulmate/app-framework/app-module';
import {ExpressJsUtil} from "../express-utils/express-utils";
import {canRegisterExpressRoutes, IRegisterExpressRoutes} from "./i-register-api-routes";

/**
 * Abstracts the process of creating an HTTP server application and provides methods
 * to start, stop and add application modules.
 */
export class ServerApplication {

  private server: any;
  private isStarted: boolean = false;
  private readonly expressApp: Express;
  private defaultAppRoutes = express.Router();
  private readonly modules: Array<AppModule> = [];

  public constructor() {

    this.expressApp = express();

    // https://github.com/expressjs/cors
    this.expressApp.use(CORS());

    // https://github.com/expressjs/body-parser/issues/235#issuecomment-352618421
    this.expressApp.use(bodyParser.json({ limit: '50mb' }));
    // TODO: check with integration test if non-json body bigger than 50mb is a problem. If so, size limit in configs.
    this.expressApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    ExpressJsUtil.avoidCircularJsonStructure(this.expressApp);
  }

  /**
   * @description Adds an application module to this application.
   *
   * @param {AppModule} module - Module to add to this application.
   *
   * @throws {Error} If the server has already been isStarted. The server must be stopped to register new modules.
   */
  public register(module: AppModule): void {

    if (this.isStarted) {
      throw Error("The server is already isStarted, it must be stopped to register new modules!");
      // because the endpoints registered would go after the default routes and will never be reached.
    }

    this.modules.push(module);

    if (canRegisterExpressRoutes(module)) {
      (module as unknown as IRegisterExpressRoutes).registerExpressRoutes(this.expressApp);
    }
  }

  /**
   * @description Starts the app and its http server.
   *
   * @param configs - The configs needed to start the app.
   *
   * @throws {Error} If the server is already started.
   *
   * @returns A promise that resolves when all the registered modules have been initialized and when the http server
   * has started listening to http requests.
   */
  public async start(configs: IServerAppConfigs): Promise<void> {

    if (this.isStarted) throw new Error('Server already started!');

    try {

      // Initialize all modules at the same time (not sequentially one by one)
      await Promise.all(this.modules.map(module => module.initialize()));

      // Server
      const http = require('http');
      this.server = http.createServer(this.expressApp);

      this.registerDefaultRoutes();

      await this.startServerInstance(configs.httpPort);

      this.isStarted = true;

      console.log(`🚀 Server Started! Listening on port ${configs.httpPort}.`);

    } catch (e) {

      await this.stop();

      throw e;
    }
  }

  /**
   * @description Stops this application.
   *
   * @returns A promise that resolves when all the registered modules have been {@link AppModule.destroy destroyed}
   * and the http server has stopped listening to http requests.
  */
  public async stop(): Promise<void> {

    // Destroy all modules
    await Promise.all(this.modules.map(module => module.destroy()));

    if (this.server && this.server.listening) {

      await new Promise((resolve, reject) => {

        this.server.close((e) => {

          if (e) return reject(e);

          resolve();
        })
      });
    }

    this.isStarted = false;
  }

  /** @description Make sure there is no default route and register a default route .*/
  private registerDefaultRoutes(): void {

    // Remove default routes to clean for another potential startup
    ExpressJsUtil.clearRouter(this.expressApp._router, "defaultAppRoutes");

    // https://stackoverflow.com/a/40918734/2005440
    Object.defineProperty(this.defaultAppRoutes, 'name', { value: "defaultAppRoutes", writable: false });

    // 404 route not found
    this.defaultAppRoutes.use((req, res, next) => res.status(404).send("not found"));
  }

  /**
   * @param port - The port on which the server will listen for http request.
   */
  private async startServerInstance(port: number): Promise<void> {

    await new Promise((resolve, reject) => {

      this.server.on('error', reject);
      this.server.on('listening', resolve);

      this.server.listen(port);
    });
  }
}
