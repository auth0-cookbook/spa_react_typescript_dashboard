import React from "react";

import "./form-field.scss";

import { DeepMap, FieldError, useForm } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  errors: DeepMap<String, FieldError> | undefined;
  pattern?: RegExp;
  register: ReturnType<typeof useForm>["register"];
  defaultValue?: string | number;
}

const FormField: React.FC<FormFieldProps> = ({
  errors,
  label,
  required,
  pattern,
  name,
  register,
  defaultValue,
}) => {
  return (
    <div className="form-field">
      <div>
        <label className="form-field__label">
          {label}
          {required && (
            <span className="form-field__label--required">{` *`}</span>
          )}
        </label>
        {errors && <span className="form-field__error">Required</span>}
      </div>
      <input
        defaultValue={defaultValue}
        className="form-field__input"
        name={name}
        ref={register({ required, pattern })}
      />
    </div>
  );
};

export default FormField;
