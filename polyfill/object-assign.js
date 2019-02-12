import objectAssign from '../shim/object-assign';

if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: objectAssign,
    });
}
