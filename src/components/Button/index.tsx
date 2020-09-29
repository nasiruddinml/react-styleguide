import React from 'react';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | string;
export type ButtonVariant =
  | Variant
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark'
  | 'outline-light';

export type ButtonType = 'button' | 'reset' | 'submit' | string;

interface ButtonProps {
  /**
   * @default 'btn'
   */
  bsPrefix?: string,

  /**
   * One or more button variant combinations
   *
   * buttons may be one of a variety of visual variants such as:
   *
   * `'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link'`
   *
   * as well as "outline" versions (prefixed by 'outline-*')
   *
   * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'`
   */
  variant?: ButtonVariant,

  /**
   * Specifies a large or small button.
   *
   * @type ('sm'|'lg')
   */
  size?: 'sm' | 'lg',

  /** Spans the full width of the Button parent */
  block?: boolean,

  /** Manually set the visual state of the button to `:active` */
  active?: boolean,

  /**
   * Disables the Button, preventing mouse events,
   * even if the underlying component is an `<a>` element
   */
  disabled?: boolean,

  /** Providing a `href` will render an `<a>` element, _styled_ as a button. */
  href?: string,

  /**
   * Defines HTML button type attribute.
   *
   * @default 'button'
   */
  type?: ButtonType,

  as?: React.ReactElement | React.ReactElement[],
  
  target?: any;
  
  className?: string;
};

const defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false,
};

const Button = ({bsPrefix, variant, size, active, className, block, type, as, ...props}: ButtonProps): React.ReactElement => {
  const prefix = 'btn';

  const classes =`${className? className : ''} ${prefix} ${active ? 'active' : ''} ${prefix}-${variant} ${block? prefix+'-block' : ''} ${size ? prefix+'-'+size: ''}`;

  if (type) {
    (props as any).type = type;
  } else if (!as) {
    (props as any).type = 'button';
  }

  const Component: any = as || 'button';
  return <Component {...props} className={classes} />;
};

Button.defaultProps = defaultProps;

export default Button;