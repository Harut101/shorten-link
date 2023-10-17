import { useState, useCallback, useRef } from "react";
import validateForm from "../services/formValidator";
import getField from "../services/getField";
import setFieldValue from "../services/setFieldValue";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const useForm = (schema, submitHandler) => {
  const [formFields] = useState({ ...schema.fields });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  //   const fieldRefs = useRef({});
  const form = useRef({ ...schema.fields });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setSubmitted(true);

      let errors = validateForm(form.current, schema.validators);

      setErrors(errors);

      if (isEmpty(errors)) {
        submitHandler(form.current);
      }
    },
    [submitHandler, schema.validators]
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;

      if (submitted) {
        const validated = validateForm(
          form,
          { [name]: schema.validators[name] },
          value
        );

        setErrors((errors) => {
          const clone = { ...errors };

          if (isEmpty(validated)) delete clone[name];

          return { ...clone, ...validated };
        });
      }

      form.current[name] = value;
    },
    [submitted, schema.validators]
  );

  const setValue = useCallback((name, value) => {
    form.current[name] = value;
  }, []);

  const getValue = useCallback((name) => form.current[name], []);

  const setError = useCallback(
    (name, message) => setErrors({ ...errors, [name]: message }),
    [errors]
  );

  const reset = useCallback(
    (name = null) => {
      if (name) {
        form.current[name] = formFields[name];
      } else {
        form.current = { ...formFields };
      }
    },
    [formFields]
  );

  const register = useCallback(
    (name) => {
      const fieldObj = {
        name,
        ref: (_ref) => {
          const fieldRef = getField(_ref);

          if (fieldRef) {
            setFieldValue(fieldRef, form.current[name]);
          }
        },
        onChange,
      };

      return fieldObj;
    },
    [form, onChange]
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
