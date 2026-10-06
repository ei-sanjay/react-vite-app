import Button from '@mui/material/Button';
import type { ReactNode } from 'react';

interface UiButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function UiButton({
  children,
  onClick,
  variant = 'contained',
  type = 'button',
  disabled,
  className,
  ...rest
}: UiButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
}
