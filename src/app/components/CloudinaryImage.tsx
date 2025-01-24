'use client';

import { CldImage, CldImageProps } from 'next-cloudinary';

export default function CloudinaryImage({
  alt,
  height,
  src,
  width,
  ...props
}: CldImageProps) {
  return (
    <CldImage
      alt={alt}
      height={height}
      src={src} // Use this sample image or upload your own via the Media Explorer
      width={width} // Transform the image: auto-crop to square aspect_ratio
      {...props}
    />
  );
}
