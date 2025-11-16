import React from 'react';

export interface InputProps {
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  'data-testid'?: string;
}

export const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  required,
  name,
  id,
  className,
  'data-testid': testId,
}: InputProps) => {
  // Generate a unique ID if neither id nor name is provided
  const inputId = React.useMemo(() => {
    if (id) return id;
    if (name) return name;
    return `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  }, [id, name, label]);

  return (
    <div className={className}>
      <label htmlFor={inputId}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        name={name}
        id={inputId}
        data-testid={testId}
        readOnly={!onChange}
      />
    </div>
  );
};
