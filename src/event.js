export default function() {
    const Orig = Event;

    let EventPolyfill = Orig;

    if (typeof EventPolyfill !== "function") {

        /**
         * @param {string} type
         * @param {Object} [params]
         * @param {boolean} [params.bubbles]
         * @param {boolean} [params.cancelable]
         * @return {Event}
         * @constructor
         */
        EventPolyfill = function(type, params) {
            params = params || {bubbles: false, cancelable: false};
            let event = document.createEvent('Event');
            event.initEvent(type, params.bubbles, params.cancelable);
            return event;
        };

        Object.keys(Orig).forEach(key => {
            EventPolyfill[key] = Orig[key];
        });

        EventPolyfill.prototype = Orig.prototype;
    }

    return EventPolyfill;
}