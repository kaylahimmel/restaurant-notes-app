export interface ImageProps {
  src: string;
  alt: string;
  width?: number; // default is 500px
  height?: number; // default is 500px
  overrideSrc?: string;
  'data-testid'?: string;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  overrideSrc,
  'data-testid': testId,
}: ImageProps) => {
  return (
    <img
      src={overrideSrc || src}
      alt={alt}
      width={width}
      height={height}
      data-testid={testId}
    />
  );
};
