import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js Image component globally
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return React.createElement('img', props);
  },
}));

// Mock Next.js Link component globally
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    return React.createElement('a', props, children);
  },
}));
