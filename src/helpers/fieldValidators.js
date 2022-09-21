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

const validators = {
  required,
  test,
  email,
};

export default validators;
