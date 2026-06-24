import { getProductIconSrc, getToolIconSrc, type ProductIconKey } from '@/lib/icons';
import type { Tool } from '@/lib/courses';
import PictogramIcon from './PictogramIcon';

interface ProductIconByKeyProps {
  product: ProductIconKey;
  size?: number;
  className?: string;
}

interface ProductIconByToolProps {
  tool: Tool;
  size?: number;
  className?: string;
}

type ProductIconProps = ProductIconByKeyProps | ProductIconByToolProps;

function isToolProps(props: ProductIconProps): props is ProductIconByToolProps {
  return 'tool' in props;
}

export default function ProductIcon(props: ProductIconProps) {
  const { size = 20, className } = props;
  const src = isToolProps(props)
    ? getToolIconSrc(props.tool)
    : getProductIconSrc(props.product);

  if (!src) return null;

  return <PictogramIcon src={src} size={size} className={className} />;
}
