import { isCheckboxInput, isRadioInput, isSelect } from "./fieldTypeCheckers";

// eslint-disable-next-line import/no-anonymous-default-export
export default (field, initialValue) => {
  if (isCheckboxInput(field) || isRadioInput(field)) {
    field.checked = !!initialValue;
  } else if (isSelect(field)) {
    for (let option of field.options) {
      if (option.value === initialValue) {
        option.selected = true;
        break;
      }
    }
  } else {
    field.value = initialValue;
  }
};
