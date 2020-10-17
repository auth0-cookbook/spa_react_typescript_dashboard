import React from "react";

import FormField from "./form-field";
import FormButton from "./form-button";
import FormService, {
  IFormFields,
  FormValidity,
  IFormValues
} from "./form.service";
import { Subscription } from "rxjs";

import "./form.scss";

interface IFormCompState {
  fields: IFormFields;
  validity: FormValidity;
  errorMessage: string;
}

interface IFormProps {
  fields: IFormFields;
  values?: IFormValues;
  onSubmit: (payload: IFormValues) => void;
  onClear?: () => void;
}

class Form extends React.Component<IFormProps, IFormCompState> {
  state = {
    fields: {},
    validity: FormValidity.Invalid,
    errorMessage: ""
  };

  FormService: FormService = new FormService();

  form$Sub: Subscription | null = null;

  componentDidMount() {
    this.form$Sub = this.FormService.observeForm$().subscribe(data => {
      this.setState({
        fields: data.fields,
        validity: data.validity,
        errorMessage: data.errorMessage
      });
    });

    this.FormService.initForm(this.props.fields, this.props.values);
  }

  componentWillUnmount() {
    if (this.form$Sub) {
      this.form$Sub.unsubscribe();
    }
  }

  render() {
    return (
      <div className="Form">
        <span className="Form__message--error">{this.state.errorMessage}</span>
        {Object.values(this.state.fields).length &&
          Object.values(this.state.fields).map((field: any) => {
            return (
              <FormField
                setFormField={this.FormService.setFormField}
                key={field.id}
                {...field}
              />
            );
          })}
        <FormButton
          enabled={this.state.validity === FormValidity.Valid}
          label="Save"
          action={() => {
            const payload: IFormValues | null = this.FormService.formData;

            if (payload) {
              this.props.onSubmit(payload);
            }
          }}
        />
        <FormButton
          enabled={true}
          label="Clear"
          action={() => {
            this.FormService.clear();

            if (this.props.onClear) {
              this.props.onClear();
            }
          }}
        />
      </div>
    );
  }
}

export default Form;
