'use client';

import { CldImage, CldImageProps } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import { useEffect, useState } from 'react';

export default function CloudinaryImage({
  alt,
  height,
  src,
  width,
  ...props
}: CldImageProps) {
  const [dataUrl, setDataUrl] = useState<string>('data:image/png;base64,');
  useEffect(() => {
    const getImageData = async () => {
      const imageUrl = getCldImageUrl({
        src,
        width: 100, // Resize the original file to a smaller size
      });
      const response = await fetch(imageUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      setDataUrl(`data:${response.type};base64,${base64}`);
    };
    getImageData();
  }, [src]);
  return (
    <CldImage
      alt={alt}
      blurDataURL={dataUrl}
      height={height}
      placeholder="blur"
      src={src}
      width={width}
      {...props}
    />
  );
}
