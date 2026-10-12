import Image from 'next/image';
import { visualAssets } from '../lib/visual-assets';

// Static srcsets work with the site's unoptimised-image CDN deployment.
// Existing client screenshots and article assets keep their Next Image behaviour.
export default function VisualImage({ src, alt = '', fill = false, width, height, sizes, priority = false, className, unoptimized, style, ...rest }) {
  const asset = visualAssets[src];
  if (!asset) return <Image src={src} alt={alt} fill={fill} width={width} height={height} sizes={sizes} priority={priority} className={className} unoptimized={unoptimized} style={style} {...rest}/>;

  return <img {...rest} src={src} srcSet={asset.srcSet} sizes={sizes || '100vw'} alt={alt} width={asset.width} height={asset.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" className={className} style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style}/>;
}
