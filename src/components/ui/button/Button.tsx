import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function stripSharedProps<T extends SharedProps>(props: T): Omit<T, keyof SharedProps> {
  const cleanProps = { ...props };
  delete cleanProps.variant;
  delete cleanProps.className;

  return cleanProps as Omit<T, keyof SharedProps>;
}

export default function Button(props: ButtonProps) {
  const classes = [
    styles.button,
    styles[props.variant ?? 'primary'],
    props.className || '',
  ]
    .join(' ')
    .trim();

  if (props.href) {
    const anchorProps = stripSharedProps(props as ButtonAsLinkProps);
    return <a className={classes} {...anchorProps} />;
  }

  const buttonProps = stripSharedProps(props as ButtonAsButtonProps);
  return <button className={classes} {...buttonProps} />;
}
