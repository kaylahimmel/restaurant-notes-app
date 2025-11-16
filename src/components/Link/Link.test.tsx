import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from './Link';

describe('Link component', () => {
  it('renders with label and href', () => {
    render(<Link label="Home" href="/" />);

    const linkElement = screen.getByRole('link', { name: 'Home' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('displays the correct label text', () => {
    render(<Link label="About Us" href="/about" />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const mockClick = jest.fn();
    render(<Link label="Click me" href="/test" onClick={mockClick} />);

    const linkElement = screen.getByRole('link', { name: 'Click me' });
    fireEvent.click(linkElement);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler multiple times when clicked multiple times', () => {
    const mockClick = jest.fn();
    render(<Link label="Click me" href="/test" onClick={mockClick} />);

    const linkElement = screen.getByRole('link', { name: 'Click me' });
    fireEvent.click(linkElement);
    fireEvent.click(linkElement);
    fireEvent.click(linkElement);

    expect(mockClick).toHaveBeenCalledTimes(3);
  });

  it('renders with target="_blank"', () => {
    render(<Link label="External Link" href="https://example.com" target="_blank" />);

    const linkElement = screen.getByRole('link', { name: 'External Link' });
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('renders with target="_self"', () => {
    render(<Link label="Self Link" href="/page" target="_self" />);

    const linkElement = screen.getByRole('link', { name: 'Self Link' });
    expect(linkElement).toHaveAttribute('target', '_self');
  });

  it('renders with rel attribute', () => {
    render(<Link label="External" href="https://example.com" rel="noopener noreferrer" />);

    const linkElement = screen.getByRole('link', { name: 'External' });
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders with custom className', () => {
    render(<Link label="Styled Link" href="/styled" className="custom-link-class" />);

    const linkElement = screen.getByRole('link', { name: 'Styled Link' });
    expect(linkElement).toHaveClass('custom-link-class');
  });

  it('renders with data-testid', () => {
    render(<Link label="Test Link" href="/test" data-testid="custom-link-test" />);

    const linkElement = screen.getByTestId('custom-link-test');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Test Link');
  });

  it('renders with multiple attributes combined', () => {
    const mockClick = jest.fn();
    render(
      <Link
        label="Complete Link"
        href="https://example.com"
        onClick={mockClick}
        target="_blank"
        rel="noopener noreferrer"
        className="external-link"
        data-testid="complete-link"
      />
    );

    const linkElement = screen.getByTestId('complete-link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement).toHaveClass('external-link');

    fireEvent.click(linkElement);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('renders different URLs correctly', () => {
    const { rerender } = render(<Link label="Page 1" href="/page1" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/page1');

    rerender(<Link label="Page 2" href="/page2" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/page2');

    rerender(<Link label="External" href="https://google.com" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://google.com');
  });

  it('renders as an anchor element', () => {
    render(<Link label="Test" href="/test" />);

    const linkElement = screen.getByRole('link');
    expect(linkElement.tagName).toBe('A');
  });

  it('renders without onClick handler', () => {
    render(<Link label="No Click Handler" href="/test" />);

    const linkElement = screen.getByRole('link', { name: 'No Click Handler' });
    expect(linkElement).toBeInTheDocument();
    // Should not throw error when clicked
    fireEvent.click(linkElement);
  });

  it('renders with empty string className', () => {
    render(<Link label="Test" href="/test" className="" />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('class', '');
  });
});
