/**
 * @description Global objects
 */
export const __globalThis__ = (() => {
    // define globalThis
    if (typeof self !== "undefined") return self;

    // browser
    if (typeof window !== "undefined") return window;

    // nodejs
    if (typeof global !== "undefined") return global;

    // other
    throw new Error("Unable to locate global object.");
})();
