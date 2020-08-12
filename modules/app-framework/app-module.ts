/** 
 * @description Provides methods needed to manage the life cycle of an application module.
 * 
 * @see IRegisterExpressRoutes if the module must register HTTP API routes.
*/
export interface AppModule {

  /**
   * @description Initializes the module by executing all the work needed before the application starts. This method is
   * called every time the application is started.
   *
   * @throws {Error} This method can throw if it is called twice without a call to {@link destroy} between the two calls
   * to initialize().
   */
  initialize(): Promise<void>

  /**
   * @description Destroys any resources (e.g. close opened connections) created by the module during initialization.
   * This method is called every time the application is stopped. This method **should not throw** if the
   * {@link initialize} method hasn't been called.
   */
  destroy(): Promise<void>
}
