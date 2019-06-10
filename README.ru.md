# Polyshim

[![NPM version](http://img.shields.io/npm/v/polyshim.svg?style=flat)](https://www.npmjs.org/package/polyshim)
[![Build Status](https://img.shields.io/travis/paulzi/polyshim/master.svg)](https://travis-ci.org/paulzi/polyshim)
[![Downloads](https://img.shields.io/npm/dt/polyshim.svg)](https://www.npmjs.org/package/polyshim)
![License](https://img.shields.io/npm/l/express.svg)

Набор polyfill и shim для работы с DOM и ECMAScript.

[English readme](https://github.com/paulzi/polyshim/)

## Установка

```sh
npm install polyshim
```

## Использование

Библиотека предлагает два варианта использования:

### Polyfill

Просто подключите необходимые полифилы, и используйте функционал так, как если бы функционал поддерживался браузерами.

```javascript
import 'polyshim/polyfill/closest';

let item = document.querySelector('.component .component__item');
let component = item.closest('.component');
```

### Shim

Использование полифилов в виде прокладок (shim) позволяет «не трогать» нативные методы, тем самым не затирая возможно другую реализацию полифиллов. Это особенно полезно для написания распространяемых библиотек.

```javascript
import closest from 'polyshim/shim/closest';

let item = document.querySelector('.component .component__item');
let component = closest.call(item, '.component');
```

## Список полифилов

- Object.assign
- Element.prototype.matches
- Element.prototype.closest
- DOMTokenList.prototype.toggle (параметр force)
- Event (конструктор)
- CustomEvent (конструктор)

## Тестирование

Для запуска тестов используйте:

```sh
npm test
```

При необходимости установите ланчеры для других браузеров и активируйте их в `karma.conf.js`:

```sh
npm i --save-dev karma-ie-launcher
```

## Поддержка браузерами

- Internet Explorer 11+
- Другие современные браузеры
