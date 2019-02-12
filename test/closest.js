import closest from '../shim/closest';
import '../polyfill/closest';

const chai   = require('chai');
const assert = chai.assert;

// shorthand
const $ = function(selector) {
    return document.querySelector(selector);
};

describe("context-selector tests", function() {
    let node = document.createElement('div');
    node.innerHTML = `
        <header class="header" data-scope="header">
            <nav class="nav">
                <ul class="nav__list">
                    <li class="nav__item"><a href="#">Item1</a></li>
                    <li class="nav__item"><a href="#">Item2</a></li>
                    <li class="nav__item"><a href="#">Item3</a></li>
                </ul>
            </nav>
        </header>
        <main class="main" id="main" itemscope>
            <section class="component">
                <article class="component__item" id="component__item_1">item 1</article>
                <article class="component__item" id="component__item_2">item 2</article>
            </section>
        </main>
        <footer class="footer">
            <div class="copyright">copyright</div>        
        </footer>
    `;
    document.body.appendChild(node);

    it('simple selector', function() {
        assert.strictEqual($('#component__item_1')  .closest('.component'),             $('.component'));
        assert.strictEqual($('.nav__item')          .closest('nav'),                    $('.nav'));
        assert.strictEqual($('#component__item_2')  .closest('#main'),                  $('.main'));
        assert.strictEqual($('.component')          .closest('.component'),             $('.component'));
        assert.strictEqual($('.component')          .closest('[itemscope]'),            $('.main'));
        assert.strictEqual($('.nav')                .closest('[data-scope="header"]'),  $('.header'));
        assert.strictEqual($('.component')          .closest('.none'),                  null);
    });

    it('composite selector', function() {
        assert.strictEqual($('#component__item_1')  .closest('main .component'),        $('.component'));
        assert.strictEqual($('.nav__item')          .closest('.header > nav > ul'),     $('.nav__list'));
    });

    it('shim test', function() {
        assert.strictEqual(closest.call($('#component__item_1'), '.component'),             $('.component'));
        assert.strictEqual(closest.call($('.nav__item'),         'nav'),                    $('.nav'));
        assert.strictEqual(closest.call($('.nav__item'),         '.header > nav > ul'),     $('.nav__list'));
        assert.strictEqual(closest.call($('.component'),         '.none'),                  null);
    });
});