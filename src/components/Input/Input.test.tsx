import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input component', () => {
  it('renders with label and value', () => {
    const mockChange = jest.fn();
    render(<Input label="Username" value="john_doe" onChange={mockChange} />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();
  });

  it('displays the correct label text', () => {
    const mockChange = jest.fn();
    render(<Input label="Email Address" value="" onChange={mockChange} />);

    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    const mockChange = jest.fn();
    render(<Input label="Name" value="Jane Doe" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Name');
    expect(inputElement).toHaveValue('Jane Doe');
  });

  it('calls onChange handler when value changes', () => {
    const mockChange = jest.fn();
    render(<Input label="Search" value="" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Search');
    fireEvent.change(inputElement, { target: { value: 'test query' } });

    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange handler multiple times', () => {
    const mockChange = jest.fn();
    render(<Input label="Text" value="" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Text');
    fireEvent.change(inputElement, { target: { value: 'a' } });
    fireEvent.change(inputElement, { target: { value: 'ab' } });
    fireEvent.change(inputElement, { target: { value: 'abc' } });

    expect(mockChange).toHaveBeenCalledTimes(3);
  });

  it('renders with default type "text"', () => {
    const mockChange = jest.fn();
    render(<Input label="Default Type" value="" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Default Type');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with type "email"', () => {
    const mockChange = jest.fn();
    render(<Input label="Email" value="" type="email" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Email');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('renders with type "password"', () => {
    const mockChange = jest.fn();
    render(<Input label="Password" value="" type="password" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Password');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('renders with type "number"', () => {
    const mockChange = jest.fn();
    render(<Input label="Age" value="25" type="number" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Age');
    expect(inputElement).toHaveAttribute('type', 'number');
  });

  it('renders with placeholder text', () => {
    const mockChange = jest.fn();
    render(<Input label="Search" value="" placeholder="Enter search term..." onChange={mockChange} />);

    const inputElement = screen.getByPlaceholderText('Enter search term...');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders as disabled when disabled prop is true', () => {
    const mockChange = jest.fn();
    render(<Input label="Disabled Field" value="cannot edit" disabled onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Disabled Field');
    expect(inputElement).toBeDisabled();
  });

  it('is not disabled by default', () => {
    const mockChange = jest.fn();
    render(<Input label="Enabled Field" value="" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Enabled Field');
    expect(inputElement).not.toBeDisabled();
  });

  it('renders with required attribute and asterisk', () => {
    const mockChange = jest.fn();
    render(<Input label="Required Field" value="" required onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Required Field *');
    expect(inputElement).toBeRequired();
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('is not required by default', () => {
    const mockChange = jest.fn();
    render(<Input label="Optional Field" value="" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Optional Field');
    expect(inputElement).not.toBeRequired();
  });

  it('renders with name attribute', () => {
    const mockChange = jest.fn();
    render(<Input label="Username" value="" name="username" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Username');
    expect(inputElement).toHaveAttribute('name', 'username');
  });

  it('renders with id attribute', () => {
    const mockChange = jest.fn();
    render(<Input label="Email" value="" id="email-input" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Email');
    expect(inputElement).toHaveAttribute('id', 'email-input');
  });

  it('uses name as id when id is not provided', () => {
    const mockChange = jest.fn();
    render(<Input label="Username" value="" name="username" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Username');
    expect(inputElement).toHaveAttribute('id', 'username');
  });

  it('generates id from label when neither id nor name provided', () => {
    const mockChange = jest.fn();
    render(<Input label="Email Address" value="" onChange={mockChange} />);

    const inputElement = screen.getByLabelText('Email Address');
    expect(inputElement).toHaveAttribute('id', 'input-email-address');
  });

  it('label htmlFor matches input id', () => {
    const mockChange = jest.fn();
    render(<Input label="Test Field" value="" id="test-id" onChange={mockChange} />);

    const labelElement = screen.getByText('Test Field');
    expect(labelElement).toHaveAttribute('for', 'test-id');
  });

  it('renders with custom className on wrapper div', () => {
    const mockChange = jest.fn();
    render(<Input label="Styled Input" value="" className="custom-input-wrapper" onChange={mockChange} />);

    const wrapperDiv = screen.getByText('Styled Input').parentElement;
    expect(wrapperDiv).toHaveClass('custom-input-wrapper');
  });

  it('renders with data-testid', () => {
    const mockChange = jest.fn();
    render(<Input label="Test Input" value="" data-testid="custom-input-test" onChange={mockChange} />);

    const inputElement = screen.getByTestId('custom-input-test');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with all props combined', () => {
    const mockChange = jest.fn();
    render(
      <Input
        label="Complete Input"
        value="test value"
        onChange={mockChange}
        type="email"
        placeholder="Enter email"
        disabled={false}
        required={true}
        name="email"
        id="complete-input"
        className="complete-wrapper"
        data-testid="complete-test"
      />
    );

    const inputElement = screen.getByTestId('complete-test');
    expect(inputElement).toHaveValue('test value');
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter email');
    expect(inputElement).not.toBeDisabled();
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute('name', 'email');
    expect(inputElement).toHaveAttribute('id', 'complete-input');

    fireEvent.change(inputElement, { target: { value: 'new@email.com' } });
    expect(mockChange).toHaveBeenCalled();
  });

  it('updates value correctly', () => {
    const mockChange = jest.fn();
    const { rerender } = render(<Input label="Dynamic Value" value="initial" onChange={mockChange} />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();

    rerender(<Input label="Dynamic Value" value="updated" onChange={mockChange} />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });

  it('renders different input types correctly', () => {
    const mockChange = jest.fn();
    const { rerender } = render(<Input label="Test" value="" type="text" onChange={mockChange} />);
    expect(screen.getByLabelText('Test')).toHaveAttribute('type', 'text');

    rerender(<Input label="Test" value="" type="tel" onChange={mockChange} />);
    expect(screen.getByLabelText('Test')).toHaveAttribute('type', 'tel');

    rerender(<Input label="Test" value="" type="url" onChange={mockChange} />);
    expect(screen.getByLabelText('Test')).toHaveAttribute('type', 'url');

    rerender(<Input label="Test" value="" type="search" onChange={mockChange} />);
    expect(screen.getByLabelText('Test')).toHaveAttribute('type', 'search');
  });

  it('renders without onChange handler as readOnly', () => {
    render(<Input label="Read Only" value="cannot change" />);

    const inputElement = screen.getByLabelText('Read Only');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('readonly');
  });
});
