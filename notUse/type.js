export const objIs = (t, e) => Object.is(t, e);

export const isArray = t => Array.isArray(t);

export const isBigInt = t => "bigint" == typeof t;

export const isBoolean = t => "boolean" == typeof t;

export const isFunction = t => "function" == typeof t;

export const isNumber = t => "number" == typeof t;

export const isObject = t => "object" == typeof t && null !== t;

export const isObjectAndNotArray = t => isObject(t) && !isArray(t);

export const isString = t => "string" == typeof t;

export const isSymbol = t => "symbol" == typeof t;

export const isNotANumber = t => isNumber(t) && objIs(NaN, t);

export const isNull = t => null === t;

export const isUndefined = t => void 0 === t;

export const isInfinity = t => isNumber(t) && (t === 1 / 0 || t === -1 / 0);

export const checkType = (t, e = !1) => {
    if (isNull(t)) return "null";
    if (isArray(t)) return "array";
    if (isBoolean(e) && !e) {
        if (isNotANumber(t)) return "NaN";
        if (isInfinity(t)) return "Infinity";
    }
    return typeof t;
};

export const getTypesFromArray = ({ val: t, skip: e }) => t.map(t => checkType(t, e));

export const isInvalid = (t, e) => {
    const n = (null == e ? void 0 : e.ignore) || [],
        o = (null == e ? void 0 : e.affirm) || null,
        i = [
            { type: "null", check: isNull },
            { type: "undefined", check: isUndefined },
            { type: "NaN", check: isNotANumber },
            { type: "Infinity", check: isInfinity },
        ];

    for (const { type: e, check: o } of i) if (!n.includes(e) && o(t)) return !0;

    return isFunction(o) && o(t);
};

export const isEffective = (t, e) => {
    const n = (null == e ? void 0 : e.affirm) || null;
    return !(!isFunction(n) || !n(t)) || !isInvalid(t, e);
};
