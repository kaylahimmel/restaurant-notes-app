import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './Profile';

describe('Profile Page component', () => {
  it('renders an image', () => {
    render(<Page />);

    const image = screen.getByAltText('Placeholder image');
    expect(image).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(<Page />);

    const image = screen.getByAltText('Placeholder image');
    expect(image).toHaveAttribute('src', 'https://placehold.co/500x500');
  });

  it('renders image with correct dimensions', () => {
    render(<Page />);

    const image = screen.getByAltText('Placeholder image');
    expect(image).toHaveAttribute('width', '500');
    expect(image).toHaveAttribute('height', '500');
  });

  it('renders image with correct alt text', () => {
    render(<Page />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Placeholder image');
  });
});
