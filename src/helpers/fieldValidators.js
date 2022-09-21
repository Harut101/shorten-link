const isString = (str) => typeof str === "string";

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

function email(message = "Value is invalid") {
  return (value) => {
    const valid = /^[^@]+@\w+(\.\w+)+\w$/.test(value);

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

function url(message = "Value is invalid") {
  return (value) => {
    /* eslint-disable */
    const valid =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
        value
      );

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
  required,
  test,
  email,
  url,
};

export default validators;
