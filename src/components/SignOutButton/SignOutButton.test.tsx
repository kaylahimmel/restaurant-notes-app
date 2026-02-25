import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignOutButton } from './SignOutButton';

describe('SignOutButton component', () => {
  it('renders a Sign Out button', () => {
    render(<SignOutButton />);
    expect(
      screen.getByRole('button', { name: 'Sign Out' })
    ).toBeInTheDocument();
  });

  it('calls signOut and navigates to /auth when clicked', async () => {
    const { signOut } = require('firebase/auth');
    const mockNavigate = jest.fn();
    const { useNavigate } = require('@tanstack/react-router');
    useNavigate.mockReturnValue(mockNavigate);

    render(<SignOutButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign Out' }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith({ to: '/auth' });
    });
  });
});
