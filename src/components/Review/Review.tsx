import { Image } from '@/components/Image/Image';

interface PhotoProps {
  url: string;
  alt: string;
  description: string;
  width: number;
  height: number;
}
export interface ReviewProps {
  id: string;
  date?: string;
  rating?: number;
  meal?: string;
  notes?: string;
  photos?: PhotoProps[];
  testId?: string;
}

export const Review = ({
  id,
  date,
  rating,
  meal,
  notes,
  photos,
  testId,
}: ReviewProps) => {
  const renderPhotos = (photos: PhotoProps[]) => {
    return photos.map((photo) => (
      <div key={photo.url}>
        <Image
          src={photo.url}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
        />
      </div>
    ));
  };

  return (
    <div id={id} data-testid={testId}>
      <h2>{date}</h2>
      <h3>{rating}</h3>
      <p>{meal}</p>
      <p>{notes}</p>
      {photos && renderPhotos(photos)}
    </div>
  );
};
