import EventShim from '../shim/event';
import '../polyfill/event';

const chai   = require('chai');
const assert = chai.assert;

describe("event tests", function() {
    let node = document.createElement('div');
    node.innerHTML = `
        <div class="component">
            <a href="#" id="link">link</a>
            <button type="button" id="button">button</button>
        </div>
    `;
    document.body.appendChild(node);

    it('basic test', function() {
        let pass = false;
        let button = document.getElementById('button');
        let handler = () => { pass = true; };
        button.addEventListener('click', handler);
        let event = new Event('click', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        button.removeEventListener('click', handler);
        assert.isTrue(pass);
    });

    it('shim test', function() {
        let pass = false;
        let button = document.getElementById('button');
        let handler = () => { pass = true; };
        button.addEventListener('click', handler);
        let event = new EventShim('click', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        button.removeEventListener('click', handler);
        assert.isTrue(pass);
    });

    it('bubble test', function() {
        let target, type;
        let button = document.getElementById('button');
        let handler = e => {
            target = e.target;
            type   = e.type;
        };
        document.addEventListener('click', handler);
        let event = new Event('click', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        document.removeEventListener('click', handler);
        assert.strictEqual(target, button);
        assert.strictEqual(type, 'click');
    });

    it('no bubble test', function() {
        let pass = true;
        let button = document.getElementById('button');
        let handler = () => { pass = false; };
        document.addEventListener('click', handler);
        let event = new Event('click', { bubbles: false, cancelable: true });
        button.dispatchEvent(event);
        document.removeEventListener('click', handler);
        assert.isTrue(pass);
    });

    it('prevent test', function() {
        let pass = false;
        let link = document.getElementById('link');
        let linkHandler     = e => { e.preventDefault(); };
        let documentHandler = e => { pass = e.defaultPrevented; };
        link.addEventListener('click', linkHandler);
        document.addEventListener('click', documentHandler);
        let event = new Event('click', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        document.removeEventListener('click', documentHandler);
        link.removeEventListener('click', linkHandler);
        assert.isTrue(pass);
    });

    it('no cancelable test', function() {
        let pass = null;
        let link = document.getElementById('link');
        let linkHandler     = e => { e.preventDefault(); };
        let documentHandler = e => { pass = e.defaultPrevented; };
        link.addEventListener('click', linkHandler);
        document.addEventListener('click', documentHandler);
        let event = new Event('click', { bubbles: true, cancelable: false });
        link.dispatchEvent(event);
        document.removeEventListener('click', documentHandler);
        link.removeEventListener('click', linkHandler);
        assert.isFalse(pass);
    });

    it('stopPropagation test', function() {
        let counter = 0;
        let link = document.getElementById('link');
        let linkHandler1    = e => { counter++; e.stopPropagation(); };
        let linkHandler2    = () => { counter++; };
        let documentHandler = () => { counter++; };
        link.addEventListener('click', linkHandler1);
        link.addEventListener('click', linkHandler2);
        document.addEventListener('click', documentHandler);
        let event = new Event('click', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        document.removeEventListener('click', documentHandler);
        link.removeEventListener('click', linkHandler2);
        link.removeEventListener('click', linkHandler1);
        assert.strictEqual(counter, 2);
    });

    it('stopImmediatePropagation test', function() {
        let counter = 0;
        let link = document.getElementById('link');
        let linkHandler1 = e => { counter++; e.stopImmediatePropagation(); };
        let linkHandler2 = () => { counter++; };
        link.addEventListener('click', linkHandler1);
        link.addEventListener('click', linkHandler2);
        let event = new Event('click', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        link.removeEventListener('click', linkHandler2);
        link.removeEventListener('click', linkHandler1);
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
        button.addEventListener('click', buttonHandler);
        document.addEventListener('click', documentBubbleHandler);
        document.addEventListener('click', documentCaptureHandler, true);
        let event = new Event('click', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        button.removeEventListener('click', buttonHandler);
        document.removeEventListener('click', documentCaptureHandler, true);
        document.removeEventListener('click', documentBubbleHandler);
        assert.deepEqual(order, ['capture', 'target', 'bubble']);
    });
});