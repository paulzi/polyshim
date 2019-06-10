import classListToggle from '../shim/classlist-toggle-force';
import '../polyfill/classlist-toggle-force';

const chai   = require('chai');
const assert = chai.assert;

describe("classList toggle force polyfill tests", function() {
    it('polyfill test', function() {
        let el = document.createElement('div');
        assert.isTrue(el.classList.toggle('test'));
        assert.isTrue(el.classList.contains('test'));
        assert.isTrue(el.classList.toggle('test', true));
        assert.isTrue(el.classList.contains('test'));
        assert.isFalse(el.classList.toggle('test'));
        assert.isFalse(el.classList.contains('test'));
        assert.isFalse(el.classList.toggle('test', false));
        assert.isFalse(el.classList.contains('test'));

        assert.isFalse(el.classList.toggle('test', 0));
        assert.isFalse(el.classList.contains('test'));
        assert.isFalse(el.classList.toggle('test', ''));
        assert.isFalse(el.classList.contains('test'));
        assert.isTrue(el.classList.toggle('test', 1));
        assert.isTrue(el.classList.contains('test'));
        assert.isTrue(el.classList.toggle('test', {}));
        assert.isTrue(el.classList.contains('test'));
        assert.isTrue(el.classList.toggle('test', 'yes'));
        assert.isTrue(el.classList.contains('test'));
    });

    it('shim test', function() {
        let el = document.createElement('div');
        assert.isTrue(classListToggle.call(el.classList, 'test'));
        assert.isTrue(el.classList.contains('test'));
        assert.isTrue(classListToggle.call(el.classList, 'test', true));
        assert.isTrue(el.classList.contains('test'));
        assert.isFalse(classListToggle.call(el.classList, 'test'));
        assert.isFalse(el.classList.contains('test'));
        assert.isFalse(classListToggle.call(el.classList, 'test', false));
        assert.isFalse(el.classList.contains('test'));

        assert.isFalse(classListToggle.call(el.classList, 'test', 0));
        assert.isFalse(el.classList.contains('test'));
        assert.isFalse(classListToggle.call(el.classList, 'test', ''));
        assert.isFalse(el.classList.contains('test'));
        assert.isTrue(classListToggle.call(el.classList, 'test', 1));
        assert.isTrue(el.classList.contains('test'));
        assert.isTrue(classListToggle.call(el.classList, 'test', {}));
        assert.isTrue(el.classList.contains('test'));
        assert.isTrue(classListToggle.call(el.classList, 'test', 'yes'));
        assert.isTrue(el.classList.contains('test'));
    });
});