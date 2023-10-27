export interface FormDataI {
    [key: string]: string;
}

export interface CommonModalInterfaceI {
    modalTitle?: any;
    mainContent?: any;
    showbutton?: any;
    buttonComponents?: any;
    show?: boolean;
    setShow?: any;
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

//down code is waste
export interface ApiLoginI {
  email:string,
  password:string
}
export interface ApiRegisterI {
  name:string,
  email:string,
  password:string,
  role:string
}