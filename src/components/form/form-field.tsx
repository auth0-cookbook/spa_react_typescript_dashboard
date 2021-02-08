import React from "react";

import "./form-field.scss";

import { FieldError, useForm, ValidationRules } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  register: ReturnType<typeof useForm>["register"];
  required?: boolean;
  error?: FieldError;
  pattern?: RegExp;
  errorMessage?: string;
  defaultValue?: string | number;
}

export const FormField: React.FC<FormFieldProps> = ({
  error,
  label,
  required,
  pattern,
  errorMessage,
  name,
  register,
  defaultValue,
}) => {
  const validationRules: ValidationRules = {};

  if (required) {
    validationRules.required = "Required";
  }

  if (pattern) {
    validationRules.pattern = {
      value: pattern,
      message: errorMessage || "",
    };
  }

  return (
    <div className="form-field">
      <div className="form-field__label-wrapper">
        <label className="form-field__label" htmlFor={name}>
          {label}
          {required && (
            <span className="form-field__label--required">{` *`}</span>
          )}
        </label>
        {error && error.message && (
          <span className="form-field__error">{error.message}</span>
        )}
      </div>
      <input
        defaultValue={defaultValue}
        className="form-field__input"
        name={name}
        ref={register(validationRules)}
      />
    </div>
  );
};
