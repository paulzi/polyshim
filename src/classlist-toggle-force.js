const proto  = DOMTokenList.prototype;
const native = proto.toggle;

/**
 * @returns {boolean}
 */
function support() {
    const testClass = 't';
    let el = document.createElement('div');
    let classList = el.classList;
    let data = [true, true, false, false];
    for (let i = 0; i < data.length; i++) {
        let v = data[i];
        if (classList.toggle(testClass, (i % 2) ? v : undefined) !== v || classList.contains(testClass) !== v) {
            return false;
        }
    }
    return true;
}

/**
 * @this {DOMTokenList}
 * @param {string} name
 * @param {boolean} [force]
 * @returns {boolean}
 */
function implementation(name, force) {
    if (force === undefined) {
        return native.call(this, name);
    }
    if (force) {
        this.add(name);
    } else {
        this.remove(name);
    }
    return !!force;
}

export default function() {
    return support() ? native : implementation;
}