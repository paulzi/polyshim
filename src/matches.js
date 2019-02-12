export default function() {
    const proto = Element.prototype;

    return proto.matches
        || proto.matchesSelector
        || proto.webkitMatchesSelector
        || proto.mozMatchesSelector
        || proto.msMatchesSelector
        || proto.oMatchesSelector;
}