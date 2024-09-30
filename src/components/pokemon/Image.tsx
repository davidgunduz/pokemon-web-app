/* components/common/PokemonImage.tsx */
import React from 'react';
import Image from 'next/image';

type PokemonImageProps = {
  src: string;
  alt: string;
  className: string; 
  blurDataURL?: string;
  unoptimized?: boolean
};

function PokemonImage({ src, alt, blurDataURL, className, unoptimized = false }: PokemonImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={475}
      height={475}
      className={className}
      placeholder="blur"
      blurDataURL={blurDataURL}
      unoptimized={unoptimized}
    />
  );
}

export default PokemonImage;
