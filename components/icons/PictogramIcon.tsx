import Image from 'next/image';
import clsx from 'clsx';

interface PictogramIconProps {
  src: string;
  size?: number;
  className?: string;
  alt?: string;
}

/** Editorial pictogram — not an official badge or trademarked logo. */
export default function PictogramIcon({
  src,
  size = 28,
  className,
  alt = '',
}: PictogramIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      width={size}
      height={size}
      className={clsx('shrink-0', className)}
    />
  );
}
