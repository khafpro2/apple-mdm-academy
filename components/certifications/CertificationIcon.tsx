import PictogramIcon from '@/components/icons/PictogramIcon';

interface CertificationIconProps {
  src: string;
  size?: number;
  className?: string;
}

/** Editorial pictogram — not an official certification badge or trademarked logo. */
export default function CertificationIcon(props: CertificationIconProps) {
  return <PictogramIcon {...props} />;
}
