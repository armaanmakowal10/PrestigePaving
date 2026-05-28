import { mediaUrl, LOGO_SRC } from './mediaUrl';

export const BRAND_NAME = 'Prestige Paving Solutions';

export function BrandLogo({ className = 'brand-logo' }) {
  return (
    <img
      src={mediaUrl(LOGO_SRC)}
      alt={BRAND_NAME}
      className={className}
      width={978}
      height={204}
      decoding="async"
    />
  );
}

export function BrandText({ className = '' }) {
  return (
    <span className={`brand-text${className ? ` ${className}` : ''}`}>
      {BRAND_NAME}
    </span>
  );
}
