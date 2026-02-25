import React from 'react';
import { Link as TanStackLink } from '@tanstack/react-router';

export interface LinkProps {
  label: string;
  href: string;
  onClick?: () => void;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
  'data-testid'?: string;
}

export const Link = ({
  label,
  href,
  onClick,
  target,
  rel,
  className,
  'data-testid': testId,
}: LinkProps) => {
  return (
    <TanStackLink
      to={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={className}
      data-testid={testId}
    >
      {label}
    </TanStackLink>
  );
};
