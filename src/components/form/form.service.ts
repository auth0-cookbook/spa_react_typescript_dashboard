import { BehaviorSubject, Observable } from "rxjs";

export enum FormFieldState {
  Valid = "valid",
  Invalid = "invalid",
  Pending = "pending",
  Pristine = "pristine",
  Dirty = "dirty",
  Untouched = "untouched",
  Touched = "touched"
}

export enum FormValidity {
  Valid = "valid",
  Invalid = "invalid"
}

interface IInternalField {
  id: string;
  name: string;
  label: string;
  value: string;
  isRequired?: boolean;
  input: FormFieldState;
  touch: FormFieldState;
  validity: FormFieldState | undefined;
  invalidMessage: string;
  validator?: (value: string) => boolean;
  errorMessage: string;
}

interface IInternalFields {
  [id: string]: IInternalField;
}

export interface IFormField {
  id: string;
  isRequired?: boolean;
  name: string;
  validation?: {
    validator: (value: string) => boolean;
    invalidMessage: string;
  };
  defaultValue?: string;
}

export interface IFormFields {
  [key: string]: IFormField;
}

export interface IFormValues {
  [key: string]: string;
}

export interface ISetFormField {
  id: string;
  value?: string;
  input?: FormFieldState;
  touch?: FormFieldState;
  isValid?: boolean;
  errorMessage?: string;
}

interface IFormState {
  fields: IInternalFields;
  validity: FormValidity;
  invalidMessage: string;
  errorMessage: string;
}

const formInitState: IFormState = {
  fields: {},
  validity: FormValidity.Invalid,
  invalidMessage: "Please enter valid values for the required (*) fields",
  errorMessage: ""
};

export default class FormService {
  formSubject: BehaviorSubject<IFormState> = new BehaviorSubject(formInitState);
  observeForm$ = (): Observable<IFormState> => this.formSubject.asObservable();

  getFormValidity = (formFields: IInternalFields): FormValidity => {
    const fields: IInternalField[] = Object.values({ ...formFields });

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].isRequired) {
        if (fields[i].validity !== FormFieldState.Valid) {
          return FormValidity.Invalid;
        }
      } else {
        if (
          fields[i].value.length !== 0 &&
          fields[i].validity !== FormFieldState.Valid
        ) {
          return FormValidity.Invalid;
        }
      }
    }

    return FormValidity.Valid;
  };

  createField = (): IInternalField => {
    return {
      id: "",
      name: "",
      label: "",
      value: "",
      isRequired: false,
      input: FormFieldState.Pristine,
      touch: FormFieldState.Touched,
      validity: undefined,
      invalidMessage: "",
      validator: undefined,
      errorMessage: ""
    };
  };

  initForm = (
    formFields: IFormFields,
    formValues: IFormValues | undefined
  ): void => {
    const state: IFormState = this.formSubject.getValue();
    const fields: IInternalFields = { ...state.fields };

    Object.values(formFields).map((field: IFormField) => {
      const newField: IInternalField = this.createField();
      const fieldId: string = field.id;
      let isValid: boolean = true;

      if (formValues && formValues[fieldId]) {
        newField.value = formValues[fieldId];
      } else if (field.defaultValue) {
        newField.value = field.defaultValue;
      }

      if (field.isRequired && newField.value.length === 0) {
        isValid = false;
      } else if (field.validation && field.validation.validator) {
        isValid = field.validation.validator(newField.value);
      }

      newField.validity = isValid
        ? FormFieldState.Valid
        : FormFieldState.Invalid;

      newField.id = fieldId;
      newField.name = fieldId;
      newField.label = field.name;
      newField.isRequired = field.isRequired;
      newField.errorMessage = "";
      newField.invalidMessage = field.validation
        ? field.validation.invalidMessage
        : "";
      newField.validator = field.validation
        ? field.validation.validator
        : undefined;

      fields[fieldId] = newField;

      return null;
    });

    this.formSubject.next({
      ...state,
      fields: fields,
      validity: this.getFormValidity(fields)
    });
  };

  setFormField = ({
    id,
    value,
    input,
    touch,
    isValid,
    errorMessage
  }: ISetFormField): void => {
    const state: IFormState = { ...this.formSubject.getValue() };
    const field: IInternalField = state.fields[id];

    field.value = value === undefined ? field.value : value;
    field.input = input === undefined ? field.input : input;
    field.touch = touch === undefined ? field.touch : touch;
    field.validity =
      isValid === undefined
        ? field.validity
        : isValid
        ? FormFieldState.Valid
        : FormFieldState.Invalid;

    field.errorMessage =
      errorMessage === undefined ? field.errorMessage : errorMessage;

    const newFields: IInternalFields = {
      ...state.fields,
      [id]: field
    };

    const newFormState: IFormState = {
      ...state,
      fields: newFields,
      validity: this.getFormValidity(newFields),
      errorMessage: ""
    };

    this.formSubject.next(newFormState);
  };

  clear = (): void => {
    const state: IFormState = { ...this.formSubject.getValue() };
    const fields: IInternalFields = { ...state.fields };

    Object.values(fields).map((field: IInternalField) => {
      const fieldId: string = field.id;
      const currentField: IInternalField = fields[fieldId];

      currentField.value = "";
      currentField.input = FormFieldState.Pristine;
      currentField.touch = FormFieldState.Untouched;
      currentField.validity = undefined;
      currentField.errorMessage = "";

      return null;
    });

    const newState: IFormState = {
      ...state,
      fields: fields,
      validity: FormValidity.Invalid
    };

    this.formSubject.next(newState);
  };

  get formData(): IFormValues | null {
    const state: IFormState = { ...this.formSubject.getValue() };

    if (state.validity !== FormValidity.Valid) {
      state.errorMessage = state.invalidMessage;
      this.formSubject.next(state);
      return null;
    }

    const formPayload: IFormValues = {};

    Object.values(state.fields).map(
      (field: IInternalField) => (formPayload[field.id] = field.value)
    );

    return formPayload;
  }
}
