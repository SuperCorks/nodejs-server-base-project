import {stub} from "../../stubs";
import {expect} from "../../functions";
import {spy, SpyCollection} from "../../spies";

export function createTestObjectsAndSpies() {
    let stubbed = generateObjectToStub();
    let spiedOn = generateObjectToSpyOn();
    let stubs = createTestStubs(stubbed);
    let spies = createTestSpies(spiedOn);

    return {stubbed, spiedOn, stubs, spies};
}

export function generateObjectToStub() {
    return {
        get isOriginal() { return true; },
        kind: () => 'original',
        value: 'clean',
    };
}

export function generateObjectToSpyOn() {
    return {getValue: () => 'some-value'};
}

export function createTestStubs(objectToStub) {
    return {
        plainStub: stub().returns(1),
        isOriginal: stub(objectToStub, 'isOriginal').get(() => false),
        kind: stub(objectToStub, 'kind').returns('fake'),
        value: stub(objectToStub, 'value').value('dirty')
    }
}

export function createTestSpies(objectToSpyOn) {
    return {plainSpy: spy(), getValue: spy(objectToSpyOn, 'getValue')}
}

export function expectStubbedBehavior(stubbed) {
    expect(stubbed.isOriginal).to.equal(false);
    expect(stubbed.kind()).to.equal('fake');
    expect(stubbed.value).to.equal('dirty');
}

export function expectToHaveSpyProperties(spiedOn) {
    expect(spiedOn.getValue.callCount).to.exist;
}

export function expectStubsToBeRestored(stubbed) {
    expect(stubbed.isOriginal).to.equal(true);
    expect(stubbed.kind()).to.equal('original');
    expect(stubbed.value).to.equal('clean');
}

export function expectSpiesToBeRestored(spiedOn) {
    expect(spiedOn.getValue.callCount).to.not.exist;
}

export function expectToContainTestStubs(collection) {
    expect(collection.plainStub).to.exist;
    expect(collection.isOriginal).to.exist;
    expect(collection.kind).to.exist;
    expect(collection.value).to.exist;
}

export function expectToContainTestSpies(collection) {
    expect(collection.plainSpy).to.exist;
    expect(collection.getValue).to.exist;
}

export function notDefaultProperty(spyCollectionKey) {
    return !SpyCollection.ReservedKeywords.includes(spyCollectionKey)
}
