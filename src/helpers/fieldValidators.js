const isString = (str) => typeof str === "string";

function number(message = "Value is invalid") {
    return (value) => {
        const valid = /^\d*\.?\d*$/.test(value);

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

function integer(message = "Value is invalid") {
    return (value) => {
        const valid = /^\d+$/.test(value);

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

function required(message = "This field is required.") {
    return (value) => {
        const valid = isString(value) ? value.trim() !== "" : !!value;

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

function min(minValue, message = "Value is invalid") {
    return (value) => {
        const valid = value >= minValue;

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

function max(maxValue, message = "Value is invalid") {
    return (value) => {
        const valid = value <= maxValue;

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

function minMax(minValue, maxValue, message = "Value is invalid") {
    return (value) => {
        const valid = value >= minValue && value <= maxValue;

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

function test(validator, message = "Value is invalid") {
    return (value) => {
        const valid = validator(value);

        if (!valid) {
            return {
                valid,
                message,
            };
        }

        return { valid };
    };
}

const validators = {
    number,
    required,
    min,
    max,
    minMax,
    test,
    integer,
};

export default validators;
