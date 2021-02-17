import {ChangeEvent, useEffect, useState} from "react";

const EMAIL_REGEXP = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface IFormState {
  errors: any;
  values: any;
}

export enum ValidationsEnum {
  IS_REQUIRED = "IS_REQUIRED",
  MIN = "MIN",
  MAX = "MAX",
  IS_EMAIL = "IS_EMAIL",
}

export const useForm = (config: any) => {
  const [formState, setFormState] = useState<IFormState>({
    values: {},
    errors: {},
  });

  useEffect(() => {
    Object.keys(config.fields).forEach(fieldName => {
      setFormState(prev => {
        return {
          ...prev,
          values: {...prev.values, [fieldName]: config.fields[fieldName].initialValue}
        }
      })
    })
    //eslint-disable-next-line
  }, [])

  const updateErrorState = (fieldName: string, message: string) => {
    setFormState((prev) => {
      const stateCopy = { ...prev, errors: { ...prev.errors } };

      if (message) {
        stateCopy.errors[fieldName] = message;
      } else {
        delete stateCopy.errors[fieldName];
      }

      return stateCopy;
    });
  };

  const checkField = (
    validations: any,
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    let isError = false;
    Object.keys(validations).forEach((validationName: string) => {
      if (!isError) {
        switch (validationName) {
          case ValidationsEnum.IS_REQUIRED:
            if (!e.target.value.trim()) {
              updateErrorState(fieldName, validations[validationName].message);
              isError = true;
            } else {
              updateErrorState(fieldName, "");
            }
            break;
          case ValidationsEnum.MIN:
            if (
              e.target.value.trim().length < validations[validationName].value
            ) {
              updateErrorState(fieldName, validations[validationName].message);
              isError = true;
            } else {
              updateErrorState(fieldName, "");
            }
            break;
          case ValidationsEnum.MAX:
            if (
              e.target.value.trim().length > validations[validationName].value
            ) {
              updateErrorState(fieldName, validations[validationName].message);
              isError = true;
            } else {
              updateErrorState(fieldName, "");
            }
            break;
          case ValidationsEnum.IS_EMAIL:
            if (!e.target.value.trim().match(EMAIL_REGEXP)) {
              updateErrorState(fieldName, validations[validationName].message);
              isError = true;
            } else {
              updateErrorState(fieldName, "");
            }
            break;
          default:
            throw new Error("Unknown validation field");
        }
      }
    });
  };
  return {
    errors: formState.errors,
    values: formState.values,
    getFieldProps: (fieldName: string) => ({
      onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        checkField(config.fields[fieldName].validations, fieldName, e);

        if (config.fields[fieldName]) {
          setFormState((prev) => {
            return {
              ...prev,
              values: { ...prev.values, [fieldName]: e.target.value },
            };
          });
        }
      },
      value: formState.values[fieldName],
      error: formState.errors[fieldName],
    }),
  };
};
