!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.polyshim=t():e.polyshim=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";t.a=function(){var e=Element.prototype;return e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector}},function(e,t,n){"use strict";var r=n(0);t.a=Object(r.a)()},function(e,t,n){"use strict";t.a=Object.assign||function(e){if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=0;n<(arguments.length<=1?0:arguments.length-1);n++){var r=n+1<1||arguments.length<=n+1?void 0:arguments[n+1];if(null!=r)for(var o=Object.keys(Object(r)),c=0,u=o.length;c<u;c++){var a=o[c],i=Object.getOwnPropertyDescriptor(r,a);void 0!==i&&i.enumerable&&(t[a]=r[a])}}return t}},function(e,t,n){"use strict";var r,o=n(0);t.a=(r=Object(o.a)(),Element.prototype.closest||function(e){for(var t=this;t;){if(r.call(t,e))return t;t=t.parentElement}return null})},function(e,t,n){"use strict";var r,o;t.a=(r=CustomEvent.prototype,"function"!=typeof(o=CustomEvent)&&((o=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}).prototype=r),o)},function(e,t,n){"use strict";var r,o;t.a=(r=Event,"function"!=typeof(o=r)&&(o=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("Event");return n.initEvent(e,t.bubbles,t.cancelable),n},Object.keys(r).forEach(function(e){o[e]=r[e]}),o.prototype=r.prototype),o)},function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(1),c=n(3),u=n(5),a=n(4);t.default={objectAssign:r.a,matches:o.a,closest:c.a,Event:u.a,CustomEvent:a.a}}])});