export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface MenuItems {
  [key: number]: MenuItem;
}

export interface MenuError {
  error: boolean;
  message: string;
}

export interface MenuField {
  id: string;
  name: string;
  validation?: {
    validator: (value: string) => void;
    invalidMessage: string;
  };
  isRequired?: boolean;
  defaultValue?: string | number;
}

export interface MenuFields {
  [key: string]: MenuField;
}

export interface MenuFormInput {
  name: string;
  price: number;
  description: string;
  image: string;
}
