/**
 * @param {Object} target
 * @param {...?Object} sources
 * @return {Object}
 */
function implementation(target, ...sources) {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }

    let to = Object(target);
    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        if (source === undefined || source === null) {
            continue;
        }

        let keys = Object.keys(Object(source));
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            let desc = Object.getOwnPropertyDescriptor(source, key);
            if (desc !== undefined && desc.enumerable) {
                to[key] = source[key];
            }
        }
    }
    return to;
}

export default function() {
    return Object.assign || implementation;
}