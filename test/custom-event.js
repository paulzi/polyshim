import CustomEventShim from '../shim/custom-event';
import '../polyfill/custom-event';

const chai   = require('chai');
const assert = chai.assert;

describe("CustomEvent tests", function() {
    let node = document.createElement('div');
    node.innerHTML = `
        <div class="component">
            <a href="#" id="link">link</a>
            <button type="button" id="button">button</button>
        </div>
    `;
    document.body.appendChild(node);

    it('basic test', function() {
        let button = document.getElementById('button');
        let handler = e => {
            assert.deepEqual(e.detail, { one: 1, two: 2 });
        };
        button.addEventListener('custom', handler);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: true, detail: { one: 1, two: 2 } });
        button.dispatchEvent(event);
        button.removeEventListener('custom', handler);
    });

    it('shim test', function() {
        let pass = false;
        let button = document.getElementById('button');
        let handler = () => { pass = true; };
        button.addEventListener('custom', handler);
        let event = new CustomEventShim('custom', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        button.removeEventListener('custom', handler);
        assert.isTrue(pass);
    });

    it('bubble test', function() {
        let target, type;
        let button = document.getElementById('button');
        let handler = e => {
            target = e.target;
            type   = e.type;
        };
        document.addEventListener('custom', handler);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        document.removeEventListener('custom', handler);
        assert.strictEqual(target, button);
        assert.strictEqual(type, 'custom');
    });

    it('no bubble test', function() {
        let pass = true;
        let button = document.getElementById('button');
        let handler = () => { pass = false; };
        document.addEventListener('custom', handler);
        let event = new CustomEvent('custom', { bubbles: false, cancelable: true });
        button.dispatchEvent(event);
        document.removeEventListener('custom', handler);
        assert.isTrue(pass);
    });

    it('prevent test', function() {
        let pass = false;
        let link = document.getElementById('link');
        let linkHandler     = e => { e.preventDefault(); };
        let documentHandler = e => { pass = e.defaultPrevented; };
        link.addEventListener('custom', linkHandler);
        document.addEventListener('custom', documentHandler);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        assert.isTrue(event.defaultPrevented);
        document.removeEventListener('custom', documentHandler);
        link.removeEventListener('custom', linkHandler);
        assert.isTrue(pass);
    });

    it('no cancelable test', function() {
        let pass = null;
        let link = document.getElementById('link');
        let linkHandler     = e => { e.preventDefault(); };
        let documentHandler = e => { pass = e.defaultPrevented; };
        link.addEventListener('custom', linkHandler);
        document.addEventListener('custom', documentHandler);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: false });
        link.dispatchEvent(event);
        document.removeEventListener('custom', documentHandler);
        link.removeEventListener('custom', linkHandler);
        assert.isFalse(pass);
    });

    it('stopPropagation test', function() {
        let counter = 0;
        let link = document.getElementById('link');
        let linkHandler1    = e => { counter++; e.stopPropagation(); };
        let linkHandler2    = () => { counter++; };
        let documentHandler = () => { counter++; };
        link.addEventListener('custom', linkHandler1);
        link.addEventListener('custom', linkHandler2);
        document.addEventListener('custom', documentHandler);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        document.removeEventListener('custom', documentHandler);
        link.removeEventListener('custom', linkHandler2);
        link.removeEventListener('custom', linkHandler1);
        assert.strictEqual(counter, 2);
    });

    it('stopImmediatePropagation test', function() {
        let counter = 0;
        let link = document.getElementById('link');
        let linkHandler1 = e => { counter++; e.stopImmediatePropagation(); };
        let linkHandler2 = () => { counter++; };
        link.addEventListener('custom', linkHandler1);
        link.addEventListener('custom', linkHandler2);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        link.removeEventListener('custom', linkHandler2);
        link.removeEventListener('custom', linkHandler1);
        assert.strictEqual(counter, 1);
    });

    it('capture phase test', function() {
        let order = [];
        let button = document.getElementById('button');
        let buttonHandler = e => {
            order.push('target');
            assert.strictEqual(e.eventPhase, Event.AT_TARGET);
        };
        let documentCaptureHandler = e => {
            order.push('capture');
            assert.strictEqual(e.eventPhase, Event.CAPTURING_PHASE);
        };
        let documentBubbleHandler = e => {
            order.push('bubble');
            assert.strictEqual(e.eventPhase, Event.BUBBLING_PHASE);
        };
        button.addEventListener('custom', buttonHandler);
        document.addEventListener('custom', documentBubbleHandler);
        document.addEventListener('custom', documentCaptureHandler, true);
        let event = new CustomEvent('custom', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        button.removeEventListener('custom', buttonHandler);
        document.removeEventListener('custom', documentCaptureHandler, true);
        document.removeEventListener('custom', documentBubbleHandler);
        assert.deepEqual(order, ['capture', 'target', 'bubble']);
    });
});