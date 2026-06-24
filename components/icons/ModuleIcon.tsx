import { getModuleIconSrc } from '@/lib/icons';
import PictogramIcon from './PictogramIcon';

interface ModuleIconProps {
  moduleSlug: string;
  size?: number;
  className?: string;
}

export default function ModuleIcon({ moduleSlug, size = 28, className }: ModuleIconProps) {
  return (
    <PictogramIcon
      src={getModuleIconSrc(moduleSlug)}
      size={size}
      className={className}
    />
  );
}
