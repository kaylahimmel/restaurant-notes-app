import '@testing-library/jest-dom';

// Mock TanStack Router so components don't need a full router context in tests
jest.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: any) => {
    const React = require('react');
    return React.createElement('a', { href: to, ...props }, children);
  },
  useNavigate: jest.fn(() => jest.fn()),
  useParams: () => ({}),
}));

// Mock Firebase signout function and auth
jest.mock('firebase/auth', () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@/lib/firebase/client', () => ({
  auth: {},
}));

// Mock the Image component globally so tests don't need to handle img rendering
jest.mock('@/components/Image/Image', () => ({
  Image: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => {
    const React = require('react');
    return React.createElement('img', {
      src,
      alt,
      width,
      height,
      'data-testid': 'mocked-image',
    });
  },
}));
