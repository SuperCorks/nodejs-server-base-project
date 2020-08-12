import * as chai from 'chai';
const chaiFail = chai.assert.fail;
import {Maybe} from 'modules/types/maybe';

export const expect = chai.expect;
export const assert = chai.assert;

/**
 * Fails a test if the provided reason.
 * @param reason - The reason why the test failed.
 */
export function fail(reason?: Maybe<string|Error>) {
    if (reason) chaiFail(null, null, reason.toString());
    else chaiFail();
}

/**
 * Marks a test as not implemented and fails it with a TODO message.
 *
 * @example
 * it(`should not be implemented`, todo);
 */
export function todo() {
    // @ts-ignore
    if (this.test) throw new Error(`TODO: ${this.test.title}`);
    throw new Error('TODO');
}

//
// /**
//  * @description Overwrites the values in configsObject with the values in the newValues argument. Each value overwrite
//  * creates a new sinon.stub. The stubs created are returned in an array which is decorated with a restore() method
//  * that restores all the stubs within.
//  *
//  * @param {object} configsObject - The object that contains the values to overwrite.
//  * @param {object} newValues - The object that contains the new values.
//  *
//  * @return {Array|{restore: function}} An array of sinon.stub that contains the created stubs.
//  *
//  * @example
//  * let stubs = overwriteConfigs(mySqlConfigs, {host: "localhost", port: 8080});<br>
//  * // perform tests<br>
//  * stubs.restore();<br>
//  * // SAME AS DOING<br>
//  * let hostStub = sinon.stub(mySqlConfigs, 'host').value('localhost');
//  * let portStub = sinon.stub(mySqlConfigs, 'port').value(8080);<br>
//  * // perform tests<br>
//  * hostStub.restore();
//  * portStub.restore();
//  */
// export function overwriteConfigs(configsObject, newValues){
//     let stubs = [];
//
//     for (let key in newValues){
//         stubs.push(sinon.stub(configsObject, key).value(newValues[key]));
//     }
//
//     stubs.restore = () => stubs.forEach((stub) => stub.restore());
//
//     return stubs;
// }
//
// /**
//  * @extends {}.<string, SinonStub|SinonSpy>
//  *
//  * @description Provides a way to group a set of spies and stubs, and restore them
//  * all using the {@link SpyCollection.restore} method.
//  *
//  * @example
//  * class MyClass {
//  *    getA() { return "A"; }
//  *    getOne() { return 1; }
//  * }<br>
//  * // Works for spies also
//  * let stubs = new SpyCollection({
//  *  ['MyClass.getA']: stub(MyClass.prototype, 'getA').returns("B")
//  * });
//  * stubs['MyClass.getOne'] = stub(MyClass.prototype, 'getOne').returns(2);<br>
//  * // perform test<br>
//  * stubs.restore();<br>
//  * // You can even merge collections together
//  * let allStubs = new SpyCollection({
//  *  authManager: new SpyCollection({
//  *      login: stub(AuthManager.prototype, "login").returns()
//  *  }),
//  *  userDao: new SpyCollection({
//  *      getUser: stub(UserDao.prototype, "getUser").resolves()
//  *  })
//  * });
//  */
// class SpyCollection {
//
//     /**
//      * @param {{}.<string, SinonSpy|SinonStub|SpyCollection>} [spies] - An initial dictionary of spies or stubs.
//      */
//     constructor(spies) {
//         if (spies) this.add(spies);
//     }
//
//
//     /**
//      * @description Adds a group of spies or stubs to the collection.
//      *
//      * @param {{}.<string, SinonSpy|SinonStub|SpyCollection>} spies - An dictionary of spies, stubs or SpyCollection.
//      *
//      * @throws {Error} If a spy with the same name already exists in this collection.
//      *
//      * @returns {SpyCollection} This instance of SpyCollection to allow method chaining.
//      */
//     add(spies) {
//         for (let spyKey in spies) {
//
//             if (this[spyKey]) throw new Error(`Spy/Stub ${spyKey} already exists!`);
//
//             this[spyKey] = spies[spyKey];
//         }
//
//         return this;
//     }
//
//     /**
//      * Restores and removes all the spies or stubs stored in this collection.
//      */
//     restore() {
//         for (let spyKey in this) {
//             if (typeof(this[spyKey].restore) === 'function') {
//                 this[spyKey].restore();
//                 delete this[spyKey];
//             }
//         }
//     }
//
//     /**
//      * @description Resets the history of all spies or stubs stored in this collection.
//      * @see module:sinon.Spy.resetHistory()
//      */
//     resetHistory() {
//         for (let spyKey in this) {
//             if (typeof(this[spyKey].resetHistory) === 'function') {
//                 this[spyKey].resetHistory();
//             }
//         }
//     }
// }

//
//
// module.exports = {
//     todo,
//     fail,
//     expect,
//     should,
//     spy: sinon.spy,
//     stub: sinon.stub,
//     overwriteConfigs,
//     assert: chai.assert,
//     SpyCollection: SpyCollection,
//     resetAllStubs: () => sinon.reset(),
// };
