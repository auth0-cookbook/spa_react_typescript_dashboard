import React from "react";
import { useForm } from "react-hook-form";

import { BaseMenuItem, MenuFormInput } from "../../models/menu.types";
import { FormField } from "./form-field";

import { OutlineButton } from "../ui/outline-button";
import { TextButton } from "../ui/text-button";

import "./form.scss";

interface FormProps {
  menuItem: BaseMenuItem;
  onSubmit: (data: MenuFormInput) => void;
}

export const MenuItemForm: React.FC<FormProps> = ({ menuItem, onSubmit }) => {
  const { register, handleSubmit, errors, formState, reset } = useForm<
    MenuFormInput
  >({
    mode: "onChange",
  });
  const { isValid } = formState;

  const onClear = async () => {
    reset({
      name: "",
      price: 0,
      tagline: "",
      description: "",
      image: "",
      calories: 0,
      category: "",
    });
  };

  return (
    <>
      <form className="form">
        <FormField
          label="Name"
          name="name"
          required={true}
          pattern={/^[A-Za-z ]+$/}
          error={errors.name}
          errorMessage="must only include letters"
          register={register}
          defaultValue={menuItem.name}
        />
        <FormField
          label="Price"
          name="price"
          required={true}
          pattern={/^([1-9]+[0-9]*|0)(\.[\d][\d])$/}
          error={errors.price}
          errorMessage="must be a dollar amount including cents"
          register={register}
          defaultValue={(menuItem.price / 100).toFixed(2)}
        />
        <FormField
          label="Tagline"
          name="tagline"
          required={true}
          error={errors.tagline}
          pattern={/^[A-Za-z0-9 '".,;!?\-()]+$/}
          errorMessage={`must only include letters, numbers, or any of the following: ' " . , ; ! ?`}
          register={register}
          defaultValue={menuItem.tagline}
        />
        <FormField
          label="Description"
          name="description"
          required={true}
          pattern={/^[A-Za-z0-9 '".,;!?\-()]+$/}
          error={errors.description}
          errorMessage={`must only include letters, numbers, or any of the following: ' " . , ; ! ?`}
          register={register}
          defaultValue={menuItem.description}
        />
        <FormField
          label="Image URL"
          name="image"
          required={true}
          pattern={/^(https:\/\/).+(\.[a-z]{2,3}\/).+(\.(jpg|jpeg|png))$/}
          error={errors.image}
          errorMessage="must be a valid URL"
          register={register}
          defaultValue={menuItem.image}
        />
        <FormField
          label="Calories"
          name="calories"
          required={true}
          pattern={/^[0-9]+$/}
          error={errors.calories}
          errorMessage="must be an integer number"
          register={register}
          defaultValue={menuItem.calories}
        />
        <FormField
          label="Category"
          name="category"
          required={true}
          pattern={/^[a-zA-Z]+$/}
          error={errors.category}
          errorMessage="must only include letters"
          register={register}
          defaultValue={menuItem.category}
        />
      </form>
      <div className="form__actions">
        <OutlineButton
          enabled={isValid}
          label="Save"
          action={handleSubmit(onSubmit)}
        />
        <TextButton enabled={true} label="Clear" action={onClear} />
      </div>
    </>
  );
};
