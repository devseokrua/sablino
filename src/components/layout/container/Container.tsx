import { ReactNode, ElementType } from 'react';
import styles from './Container.module.css';

type ContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  as?: T;
  className?: string;
};

export default function Container<T extends ElementType = 'div'>({
  children,
  as,
  className,
}: ContainerProps<T>) {
  const Tag = as || 'div';

  return (
    <Tag className={`${styles.container}${className ? ` ${className}` : ''}`}>
      {children}
    </Tag>
  );
}
