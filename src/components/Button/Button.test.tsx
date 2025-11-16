import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with the correct label', () => {
    const mockClick = jest.fn();
    render(<Button label="Click me" onClick={mockClick} />);

    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
  });

  it('calls onClick handler when clicked', () => {
    const mockClick = jest.fn();
    render(<Button label="Click me" onClick={mockClick} />);

    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(buttonElement);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler multiple times when clicked multiple times', () => {
    const mockClick = jest.fn();
    render(<Button label="Click me" onClick={mockClick} />);

    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    expect(mockClick).toHaveBeenCalledTimes(3);
  });

  it('renders correctly with different labels', () => {
    const mockClick = jest.fn();
    const { rerender } = render(<Button label="Submit" onClick={mockClick} />);

    expect(screen.getByRole('button')).toHaveTextContent('Submit');

    rerender(<Button label="Cancel" onClick={mockClick} />);
    expect(screen.getByRole('button')).toHaveTextContent('Cancel');
  });

  it('renders as a button element', () => {
    const mockClick = jest.fn();
    render(<Button label="Test" onClick={mockClick} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement.tagName).toBe('BUTTON');
  });
});
