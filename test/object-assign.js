import objectAssign from '../shim/object-assign';
import '../polyfill/object-assign';

const chai   = require('chai');
const assert = chai.assert;

describe("Object.assign() tests", function() {
    it('polyfill test', function() {
        let a, b;

        a = {one: 1};
        b = Object.assign(a, {two: 2});
        assert.deepEqual(a, {one: 1, two: 2});
        assert.strictEqual(a, b);

        a = {one: 2, two: 1, three: 3};
        b = {two: 2, one: 1};
        assert.deepEqual(Object.assign({}, a, b), {one: 1, two: 2, three: 3});

        a = {one: {a: 1, b: 2, c: 3}, two: 2};
        b = {one: {d: 4}};
        assert.deepEqual(Object.assign(a, b), {one: {d: 4}, two: 2});

        assert.deepEqual(Object.assign({one: 1}, undefined, null, {}), {one: 1});
    });

    it('shim test', function() {
        let a, b;

        a = {one: 1};
        b = objectAssign(a, {two: 2});
        assert.deepEqual(a, {one: 1, two: 2});
        assert.strictEqual(a, b);

        a = {one: 2, two: 1, three: 3};
        b = {two: 2, one: 1};
        assert.deepEqual(objectAssign({}, a, b), {one: 1, two: 2, three: 3});

        a = {one: {a: 1, b: 2, c: 3}, two: 2};
        b = {one: {d: 4}};
        assert.deepEqual(objectAssign(a, b), {one: {d: 4}, two: 2});

        assert.deepEqual(objectAssign({one: 1}, undefined, null, {}), {one: 1});
    });
});