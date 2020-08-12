import {overwriteConfigs} from "../stubs";
import {assert, expect} from "../functions";

describe('unit: test-utils/stubs', () => {

    context('overwriteConfigs()', () => {

        it(`should stub change the values of the configs object`, assertChangesTheValuesOfConfigs);
        it(`should return an array of stubs with a restore method`, assertReturnsDecoratedArray);
        it(`should allow to restore all values at once with the restore() function`, assertAllowsToRestoreAllValuesAtOnce);
    });
});

function generateTestConfigs() {
    return {
        configs: {host: 'localhost', port: 8080},
        newValues: {host: 'remotehost', port: 80}
    }
}

function assertChangesTheValuesOfConfigs() {
    const {configs, newValues} = generateTestConfigs();

    overwriteConfigs(configs, newValues);

    expect(configs).to.eql(newValues);
}

function assertReturnsDecoratedArray() {
    const {configs, newValues} = generateTestConfigs();

    let stubs = overwriteConfigs(configs, newValues);

    assert(Array.isArray(stubs), `Returned value is not an array!`);
    stubs.restore.should.be.a('function');
}

function assertAllowsToRestoreAllValuesAtOnce() {
    const {configs, newValues} = generateTestConfigs();
    const originalConfigs = {...configs};

    let stubs = overwriteConfigs(configs, newValues);

    stubs.restore();

    expect(configs).to.eql(originalConfigs);
}
