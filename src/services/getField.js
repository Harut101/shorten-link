import isUndefined from "./isUndefined";

export default (_ref) =>
  isUndefined(_ref?.value)
    ? _ref?.querySelectorAll
      ? _ref?.querySelectorAll("input,select,textarea")[0] || _ref
      : _ref
    : _ref;
