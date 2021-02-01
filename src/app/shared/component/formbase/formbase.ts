export class Formbase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  min: any;
  max: any;
  validations: [];
  order: number;
  controlType: string;
  type: string;
  lov: string;
  disabled: boolean;
  options: { key: string, value: string }[];

  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    min?: any;
    max?: any;
    validations?: [];
    order?: number;
    controlType?: string;
    type?: string;
    lov?: string;
    disabled?: boolean;
    options?: { key: string, value: string }[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.lov = options.lov || '';
    this.options = options.options || [];
    this.validations = options.validations || [];;
    this.disabled = options.disabled || false;
  }
}

export class Dropdown extends Formbase<string>{
  controlType = 'dropdown';
}
export class Textbox extends Formbase<string>{
  controlType = 'textbox';
}
