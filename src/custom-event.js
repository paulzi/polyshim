export default function() {
    const proto = CustomEvent.prototype;

    let CustomEventPolyfill = CustomEvent;

    if (typeof CustomEventPolyfill !== 'function') {

        /**
         * @param {string} type
         * @param {Object} [params]
         * @param {boolean} [params.bubbles]
         * @param {boolean} [params.cancelable]
         * @param {Object} [params.detail]
         * @returns {CustomEvent}
         * @constructor
         */
        CustomEventPolyfill = function(type, params) {
            params = params || { bubbles: false, cancelable: false };
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
            return event;
        };

        CustomEventPolyfill.prototype = proto;
    }

    return CustomEventPolyfill;
}