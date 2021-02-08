export interface BaseMenuItem {
  [key: string]: string | number;
  name: string;
  price: number;
  tagline: string;
  description: string;
  image: string;
  calories: number;
  category: string;
}

export interface MenuItem extends BaseMenuItem {
  id: string;
}

export interface MenuItems {
  [key: string]: MenuItem;
}

export interface MenuError {
  status: number;
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
  tagline: string;
  description: string;
  image: string;
  calories: number;
  category: string;
}

export enum FetchState {
  FETCHING = "FETCHING",
  FETCHED = "FETCHED",
  FETCH_ERROR = "FETCH_ERROR",
  FETCH_NOT_FOUND = "FETCH_NOT_FOUND",
}
