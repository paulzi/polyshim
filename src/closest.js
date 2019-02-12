export default function(matches) {

    /**
     * @this {Element}
     * @param {string} selector
     * @returns {?Element}
     */
    function implementation(selector) {
        let node = this;
        while (node) {
            if (matches.call(node, selector)) {
                return node;
            }
            node = node.parentElement;
        }
        return null;
    }

    return Element.prototype.closest || implementation;
}
