import { useState, useCallback, useRef } from "react";
import validateForm from "../services/formValidator";
import getField from "../services/getField";
import setFieldValue from "../services/setFieldValue";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const useForm = (schema, submitHandler) => {
  const [formFields, setFormFields] = useState({ ...schema.fields });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});

  const onSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    let errors = validateForm(formFields, schema.validators);

    setErrors(errors);

    if (isEmpty(errors)) {
      submitHandler(formFields);
    }
  };

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;

      if (submitted) {
        const validated = validateForm(
          formFields,
          { [name]: schema.validators[name] },
          value
        );
        const errorsClone = { ...errors };

        if (isEmpty(validated)) {
          delete errorsClone[name];
        }

        setErrors({ ...errorsClone, ...validated });
      }

      setFormFields({ ...formFields, [name]: value });
    },
    [formFields, submitted, errors, schema]
  );

  const setValue = useCallback(
    (name, value) => {
      if (fieldRefs.current[`${name}`].current) {
        fieldRefs.current[`${name}`].current.value = value;
      }
      setFormFields({ ...formFields, [name]: value });
    },
    [formFields, fieldRefs]
  );

  const getValue = useCallback((name) => formFields[name], [formFields]);

  const setError = useCallback(
    (name, message) => setErrors({ ...errors, [name]: message }),
    [errors]
  );

  const reset = useCallback(
    (name = null) => {
      if (name) {
        setFormFields({ ...formFields, [name]: schema.initialValues[name] });
        fieldRefs.current[`${name}`].current.value = schema.initialValues[name];
      } else {
        setFormFields({ ...schema.initialValues });
        for (const refName in fieldRefs.current) {
          fieldRefs.current[refName].current.value =
            schema.initialValues[refName];
        }
      }
    },
    [formFields, fieldRefs, schema.initialValues]
  );

  const register = useCallback(
    (name) => {
      return {
        name,
        ref: (_ref) => {
          const fieldRef = getField(_ref);

          if (fieldRef) {
            setFieldValue(fieldRef, schema.fields[name]);
          }
        },
        onChange,
      };
    },
    [schema.fields]
  );

  return {
    errors,
    submitted,
    register,
    onSubmit,
    setValue,
    getValue,
    setError,
    reset,
  };
};

export default useForm;
