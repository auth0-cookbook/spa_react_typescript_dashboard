import React from "react";
import { useForm } from "react-hook-form";

import FormButton from "./form-button";
import { MenuFormInput, MenuItem } from "../../models/menu.types";
import FormField from "./form-field";

import "./form.scss";

interface FormProps {
  menuItem: MenuItem;
  onSubmit: (data: MenuFormInput) => void;
}

const MenuItemForm: React.FC<FormProps> = ({ menuItem, onSubmit }) => {
  const { register, handleSubmit, errors, formState } = useForm<MenuFormInput>({
    mode: "onChange",
  });
  const { isValid } = formState;

  return (
    <>
      <form className="form">
        <FormField
          label="Name"
          name="name"
          required={true}
          pattern={/^[A-Za-z ]+$/}
          errors={errors.name}
          register={register}
          defaultValue={menuItem.name}
        />
        <FormField
          label="Price"
          name="price"
          required={true}
          pattern={/^([1-9]+[0-9]*|0)(\.[\d][\d])$/}
          errors={errors.price}
          register={register}
          defaultValue={menuItem.price / 100}
        />
        <FormField
          label="Description"
          name="description"
          required={true}
          pattern={/^[A-Za-z0-9 '".,;!?\-()]+$/}
          errors={errors.description}
          register={register}
          defaultValue={menuItem.description}
        />
        <FormField
          label="Image URL"
          name="image"
          required={true}
          pattern={/^(https:\/\/).+(\.[a-z]{2,3}\/).+(\.(jpg|jpeg|png))$/}
          errors={errors.image}
          register={register}
          defaultValue={menuItem.image}
        />
      </form>
      <FormButton
        enabled={isValid}
        label="Save"
        action={handleSubmit(onSubmit)}
      />
      <FormButton enabled={true} label="Clear" action={() => {}} />
    </>
  );
};

export default MenuItemForm;
