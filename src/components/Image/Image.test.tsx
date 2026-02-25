import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.unmock('@/components/Image/Image');

import { Image } from './Image';

describe('Image component', () => {
  it('renders an image from a local source', () => {
    const { getByAltText } = render(
      <Image
        src="/public/profile.svg"
        alt="profile image"
        width={200}
        height={200}
      />
    );
    const imgElement = getByAltText('profile image');
    expect(imgElement).toBeInTheDocument();
    // Next.js transforms the src, so check if it contains the path
    expect(imgElement.getAttribute('src')).toContain('profile.svg');
  });

  it('renders an image from a remote URL', () => {
    const { getByAltText } = render(
      <Image
        src="http://source.unsplash.com/photos/green-leaves-with-white-background-hVlf2TDEXV8"
        alt="monstera leaf"
        width={400}
        height={600}
        overrideSrc="http://source.unsplash.com/photos/green-leaves-with-white-background-hVlf2TDEXV8"
      />
    );
    const imgElement = getByAltText('monstera leaf');

    expect(imgElement).toBeInTheDocument();
    // With our mock, the src is passed through directly (via overrideSrc)
    expect(imgElement.getAttribute('src')).toContain('source.unsplash.com');
  });

  it('renders with custom data-testid', () => {
    render(
      <Image
        src="/test.jpg"
        alt="test image"
        width={100}
        height={100}
        data-testid="custom-image-test"
      />
    );

    const imgElement = screen.getByTestId('custom-image-test');
    expect(imgElement).toBeInTheDocument();
  });

  it('overrideSrc takes precedence over src', () => {
    const { getByAltText } = render(
      <Image
        src="/original.jpg"
        alt="override test"
        width={200}
        height={200}
        overrideSrc="/overridden.jpg"
      />
    );

    const imgElement = getByAltText('override test');
    // Next.js transforms the src, so check if it contains the overridden path
    expect(imgElement.getAttribute('src')).toContain('overridden.jpg');
  });

  it('uses src when overrideSrc is not provided', () => {
    const { getByAltText } = render(
      <Image src="/default.jpg" alt="default image" width={200} height={200} />
    );

    const imgElement = getByAltText('default image');
    // Next.js transforms the src, so check if it contains the default path
    expect(imgElement.getAttribute('src')).toContain('default.jpg');
  });

  it('renders with specified dimensions', () => {
    const { getByAltText } = render(
      <Image src="/test.jpg" alt="test image" width={300} height={300} />
    );

    const imgElement = getByAltText('test image');
    expect(imgElement).toBeInTheDocument();
  });

  it('renders with different width and height combinations', () => {
    const { getByAltText } = render(
      <Image
        src="/test.jpg"
        alt="custom dimensions"
        width={1920}
        height={1080}
      />
    );

    const imgElement = getByAltText('custom dimensions');
    expect(imgElement).toBeInTheDocument();
  });

  it('handles empty string alt text', () => {
    const { container } = render(
      <Image src="/test.jpg" alt="" width={100} height={100} />
    );

    // Next.js Image with empty alt gets role="presentation", so query by tag
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('alt', '');
  });
});
