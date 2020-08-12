import * as chai from 'chai';
const chaiAsPromised = require('chai-as-promised');

// This is executed before all tests are run
before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});
