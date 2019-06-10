# Polyshim

[![NPM version](http://img.shields.io/npm/v/polyshim.svg?style=flat)](https://www.npmjs.org/package/polyshim)
[![Build Status](https://img.shields.io/travis/paulzi/polyshim/master.svg)](https://travis-ci.org/paulzi/polyshim)
[![Downloads](https://img.shields.io/npm/dt/polyshim.svg)](https://www.npmjs.org/package/polyshim)
![License](https://img.shields.io/npm/l/express.svg)

A set of polyfills and shims for working with DOM and ECMAScript.

[Russian readme](https://github.com/paulzi/polyshim/blob/master/README.ru.md)

## Install

```sh
npm install polyshim
```

## Usage

The library offers two use cases:

### Polyfill

Just connect the necessary polyfills, and use the functionality as if the functionality was supported by browsers:

```javascript
import 'polyshim/polyfill/closest';

let item = document.querySelector('.component .component__item');
let component = item.closest('.component');
```

### Shim

The use of shims allows you to "not touch" the native methods, thus without overwriting perhaps another implementation of polyfills. This is especially useful for writing redistributable libraries.

```javascript
import closest from 'polyshim/shim/closest';

let item = document.querySelector('.component .component__item');
let component = closest.call(item, '.component');
```

## Polyfill list

- Object.assign
- Element.prototype.matches
- Element.prototype.closest
- DOMTokenList.prototype.toggle (force parameter)
- Event (constructor)
- CustomEvent (constructor)

## Testing

To run tests, use:

```sh
npm test
```

If necessary, you can install launchers for other browsers and activate them in `karma.conf.js`:

```sh
npm i --save-dev karma-ie-launcher
```

## Browser support

- Internet Explorer 11+
- Other modern browsers
