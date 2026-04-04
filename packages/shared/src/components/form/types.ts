export interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  labelAlign?: 'left' | 'right';
  labelCol?: number;
  wrapperCol?: number;
}

export interface FormItemProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: string;
  help?: string;
  className?: string;
}

export interface FormLayouts {
  vertical: 'vertical';
  horizontal: 'horizontal';
  inline: 'inline';
}

export interface FormLabelAlign {
  left: 'left';
  right: 'right';
}

export interface FormContextValue {
  layout?: 'vertical' | 'horizontal' | 'inline';
  labelAlign?: 'left' | 'right';
  labelCol?: number;
  wrapperCol?: number;
}
