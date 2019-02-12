import matches from '../shim/matches';
import '../polyfill/matches';

const chai   = require('chai');
const assert = chai.assert;

// shorthand
const $ = function(selector) {
    return document.querySelector(selector);
};

describe("matches polyfill tests", function() {
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

    it('polyfill test', function() {
        assert.isTrue($('#component__item_1')  .matches('.component__item'));
        assert.isTrue($('.nav__item')          .matches('li'));
        assert.isTrue($('#main')               .matches('#main'));
        assert.isTrue($('.main')               .matches('[itemscope]'));
        assert.isTrue($('.header')             .matches('[data-scope="header"]'));
        assert.isTrue($('.component')          .matches('main .component'));
        assert.isTrue($('.nav__list')          .matches('.header > nav > ul'));
        assert.isFalse($('.component')         .matches('.none'));
    });

    it('shim test', function() {
        assert.isTrue(matches.call($('#component__item_1'), '.component__item'));
        assert.isTrue(matches.call($('.nav__item'),         'li'));
        assert.isTrue(matches.call($('#main'),              '#main'));
        assert.isTrue(matches.call($('.main'),              '[itemscope]'));
        assert.isTrue(matches.call($('.header'),            '[data-scope="header"]'));
        assert.isTrue(matches.call($('.component'),         'main .component'));
        assert.isTrue(matches.call($('.nav__list'),         '.header > nav > ul'));
        assert.isFalse(matches.call($('.component'),        '.none'));
    });
});