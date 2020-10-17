import React from "react";

import "./form-field.scss";

import { FormFieldState, ISetFormField } from "./form.service";

interface IFormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  input: FormFieldState;
  errorMessage: string;
  validity: FormFieldState;
  isRequired: boolean;
  setFormField: ({
    id,
    value,
    input,
    touch,
    isValid,
    errorMessage
  }: ISetFormField) => void;
  validator: (value: string) => boolean;
  invalidMessage: string;
  touch?: FormDataEntryValue;
}

interface IFormFieldCompState {
  isValid: boolean;
  invalidMessage: string;
}

export default class FormField extends React.PureComponent<
  IFormFieldProps,
  IFormFieldCompState
> {
  state = {
    isValid: false,
    invalidMessage: ""
  };

  validator = (value: string) => {
    return /^[A-Za-z ]+$/.test(value);
  };

  isEmptyString = (value: string) => value.length === 0;

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const id: string = event.target.id;

    let isValid: boolean = true;
    let isValueEmpty: boolean = this.isEmptyString(value);
    let errorMessage: string = "";

    if (isValueEmpty) {
      if (this.props.isRequired) {
        errorMessage = "Required";
        isValid = false;
      } else {
        errorMessage = "";
        isValid = true;
      }
    }

    if (!isValueEmpty) {
      if (this.props.validator) {
        isValid = this.props.validator(value);
        errorMessage = isValid ? "" : this.props.invalidMessage;
      } else {
        errorMessage = "";
        isValid = true;
      }
    }

    this.props.setFormField({
      id,
      value,
      input: FormFieldState.Dirty,
      isValid,
      errorMessage
    });
  };

  focusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = event.target.id;

    this.props.setFormField({
      id,
      touch: FormFieldState.Touched
    });
  };

  blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const id: string = event.target.id;

    if (
      this.props.touch === FormFieldState.Touched &&
      this.props.isRequired &&
      this.isEmptyString(value)
    ) {
      this.props.setFormField({
        id,
        input: FormFieldState.Dirty,
        isValid: false,
        errorMessage: "Required"
      });
    }
  };

  render() {
    return (
      <div className="Form__field">
        <>
          <label htmlFor={this.props.id} className="Form__field-label">
            {this.props.label}
            {this.props.isRequired ? (
              <span className="Form__field-label--required">{` *`}</span>
            ) : (
              ""
            )}
          </label>
          {this.props.input === FormFieldState.Dirty &&
          this.props.validity === FormFieldState.Invalid ? (
            <span className="Form__field-error">{this.props.errorMessage}</span>
          ) : null}
        </>
        <input
          id={this.props.id}
          name={this.props.id}
          className="Form__field-input"
          value={this.props.value}
          onChange={this.changeHandler}
          onFocus={this.focusHandler}
          onBlur={this.blurHandler}
        />
      </div>
    );
  }
}
