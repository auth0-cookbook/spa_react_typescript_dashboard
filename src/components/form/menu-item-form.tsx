import React from "react";
import { FieldError, useForm } from "react-hook-form";

import { BaseMenuItem } from "../../models/menu.types";
import { FormField } from "./form-field";

import "./form.scss";
import { Button } from "../ui/button";

interface FormProps {
  menuItem: BaseMenuItem;
  onSubmit: (data: BaseMenuItem) => void;
}

interface IFormField {
  label: string;
  name: string;
  required?: boolean;
  error?: FieldError;
  pattern?: RegExp;
  errorMessage?: string;
  defaultValue?: string | number;
}

export const MenuItemForm: React.FC<FormProps> = ({ menuItem, onSubmit }) => {
  const { register, handleSubmit, errors, formState, reset } = useForm<
    BaseMenuItem
  >({
    mode: "onChange",
  });
  const { isValid } = formState;

  const clearMenuFormFields = {
    name: "",
    price: 0,
    tagline: "",
    description: "",
    image: "",
    calories: 0,
    category: "",
  };

  const onClear = async () => {
    reset(clearMenuFormFields);
  };

  const menuFormFields: IFormField[] = [
    {
      label: "Name",
      name: "name",
      required: true,
      pattern: /^[A-Za-z ]+$/,
      error: errors.name,
      errorMessage: "must only include letters",
      defaultValue: menuItem.name,
    },
    {
      label: "Price",
      name: "price",
      required: true,
      pattern: /^([1-9]+[0-9]*|0)(\.[\d][\d])$/,
      error: errors.price,
      errorMessage: "must be a dollar amount including cents",
      defaultValue: menuItem.price,
    },
    {
      label: "Tagline",
      name: "tagline",
      required: true,
      pattern: /^[A-Za-z0-9 '".,;!?\-()]+$/,
      error: errors.tagline,
      errorMessage: `must only include letters, numbers, or any of the following: ' " . , ; ! ?`,
      defaultValue: menuItem.tagline,
    },
    {
      label: "Description",
      name: "Description",
      required: true,
      pattern: /^[A-Za-z0-9 '".,;!?\-()]+$/,
      error: errors.description,
      errorMessage: `must only include letters, numbers, or any of the following: ' " . , ; ! ?`,
      defaultValue: menuItem.description,
    },
    {
      label: "Image URL",
      name: "image",
      required: true,
      pattern: /^(https:\/\/).+(\.[a-z]{2,3}\/).+(\.(jpg|jpeg|png))$/,
      error: errors.image,
      errorMessage: "must be a valid URL",
      defaultValue: menuItem.image,
    },
    {
      label: "Calories",
      name: "calories",
      required: true,
      pattern: /^[0-9]+$/,
      error: errors.calories,
      errorMessage: "must be an integer number",
      defaultValue: menuItem.calories,
    },
    {
      label: "Category",
      name: "category",
      required: true,
      pattern: /^[a-zA-Z]+$/,
      error: errors.category,
      errorMessage: "must only include letters",
      defaultValue: menuItem.category,
    },
  ];

  return (
    <>
      <form className="form">
        {menuFormFields.map((menuField) => (
          <FormField key={menuField.name} {...menuField} register={register} />
        ))}
      </form>
      <div className="form__actions">
        <Button
          variant="outline"
          enabled={isValid}
          label="Save"
          action={handleSubmit(onSubmit)}
        />
        <Button variant="text" enabled={true} label="Clear" action={onClear} />
      </div>
    </>
  );
};
