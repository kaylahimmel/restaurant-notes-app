import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Review, ReviewProps } from './Review';

describe('Review component', () => {
  const baseProps: ReviewProps = {
    id: 'review-1',
    date: '2024-01-15',
    rating: 5,
    meal: 'Chicken Parmesan',
    notes: 'Absolutely delicious! The chicken was perfectly crispy.',
    testId: 'review-test',
  };

  it('renders with all required and optional props', () => {
    render(<Review {...baseProps} />);

    expect(screen.getByTestId('review-test')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Chicken Parmesan')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Absolutely delicious! The chicken was perfectly crispy.'
      )
    ).toBeInTheDocument();
  });

  it('renders with only required id prop', () => {
    render(<Review id="review-minimal" />);

    const reviewElement = screen.getByText('', {
      selector: '[id="review-minimal"]',
    });
    expect(reviewElement).toBeInTheDocument();
  });

  it('renders without optional date prop', () => {
    const propsWithoutDate = { ...baseProps };
    delete propsWithoutDate.date;

    render(<Review {...propsWithoutDate} />);

    expect(screen.queryByText('2024-01-15')).not.toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders without optional rating prop', () => {
    const propsWithoutRating = { ...baseProps };
    delete propsWithoutRating.rating;

    render(<Review {...propsWithoutRating} />);

    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('renders without optional meal prop', () => {
    const propsWithoutMeal = { ...baseProps };
    delete propsWithoutMeal.meal;

    render(<Review {...propsWithoutMeal} />);

    expect(screen.queryByText('Chicken Parmesan')).not.toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('renders without optional notes prop', () => {
    const propsWithoutNotes = { ...baseProps };
    delete propsWithoutNotes.notes;

    render(<Review {...propsWithoutNotes} />);

    expect(
      screen.queryByText(
        'Absolutely delicious! The chicken was perfectly crispy.'
      )
    ).not.toBeInTheDocument();
  });

  it('renders with photos', () => {
    const propsWithPhotos: ReviewProps = {
      ...baseProps,
      photos: [
        {
          url: 'https://example.com/photo1.jpg',
          alt: 'Dish photo 1',
          description: 'Main dish',
          width: 400,
          height: 300,
        },
        {
          url: 'https://example.com/photo2.jpg',
          alt: 'Dish photo 2',
          description: 'Side dish',
          width: 400,
          height: 300,
        },
      ],
    };

    render(<Review {...propsWithPhotos} />);

    const images = screen.getAllByTestId('mocked-image');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Dish photo 1');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/photo2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Dish photo 2');
  });

  it('renders without photos when photos array is empty', () => {
    const propsWithEmptyPhotos: ReviewProps = {
      ...baseProps,
      photos: [],
    };

    render(<Review {...propsWithEmptyPhotos} />);

    const images = screen.queryAllByTestId('mocked-image');
    expect(images).toHaveLength(0);
  });

  it('applies correct id attribute', () => {
    render(<Review {...baseProps} />);

    const reviewElement = screen.getByTestId('review-test');
    expect(reviewElement).toHaveAttribute('id', 'review-1');
  });

  it('renders with custom testId', () => {
    render(<Review {...baseProps} testId="custom-test-id" />);

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('renders correct HTML structure', () => {
    render(<Review {...baseProps} />);

    const container = screen.getByTestId('review-test');
    const h2 = container.querySelector('h2');
    const h3 = container.querySelector('h3');
    const paragraphs = container.querySelectorAll('p');

    expect(h2).toHaveTextContent('2024-01-15');
    expect(h3).toHaveTextContent('5');
    expect(paragraphs[0]).toHaveTextContent('Chicken Parmesan');
    expect(paragraphs[1]).toHaveTextContent(
      'Absolutely delicious! The chicken was perfectly crispy.'
    );
  });

  it('renders single photo correctly', () => {
    const propsWithOnePhoto: ReviewProps = {
      ...baseProps,
      photos: [
        {
          url: 'https://example.com/single-photo.jpg',
          alt: 'Single dish photo',
          description: 'Amazing dish',
          width: 500,
          height: 500,
        },
      ],
    };

    render(<Review {...propsWithOnePhoto} />);

    const images = screen.getAllByTestId('mocked-image');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('width', '500');
    expect(images[0]).toHaveAttribute('height', '500');
  });
});
