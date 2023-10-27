import React, { SetStateAction } from "react";

export interface FormDataI {
    [key: string]: string;
}
export interface RegistrationFormDataI  {
  name: string
  email:string
  password:string
  role:string
};
export interface CommonModalInterfaceI {
    modalTitle?: string;
    mainContent?:  any;
    showbutton?: boolean;
    buttonComponents?: boolean;
    show?: boolean;
    setShow?:any;
    showModalTitle?: boolean;
  }
  export interface InputComponentsI {
    id: string;
    label: string;
    placeHolder: string;
    onChange: (label: string,value: string) => void;
    value?: string;
    type: string;
  }
  export interface SelectComponentsI {
    id: string;
    label: string;
    value?: string;
    onChange: (value: string, label: string) => void;
    options: Array<object> ;
  }
//  export interface configOptionsI{
//   useNewUrlParser:boolean,
//   useUnifiedTopology:boolean
// }

// export interface ApiLoginI {
//   email:string,
//   password:string
// }
// export interface ApiRegisterI {
//   name:string,
//   email:string,
//   password:string,
//   role:string
// }


export interface RegistrationFormInputI {
  id: string
  type: string
  placeholder: string
  label: string
  componentType: string
  options?:any //getting error when using OptionI 
}
export interface LoginFormInputI {
  email:string,
  password:string
}
export interface OptionI {
  id: string
  label: string
}
export interface NavbarMenuI {
  id:string,
  label:string,
  path:string

}
export interface UserDataI {
  email: string
  name: string
  role: string
  _id: string
}
