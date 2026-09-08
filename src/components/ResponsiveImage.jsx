// Originals remain untouched; delivery images use responsive WebP copies.
export default function ResponsiveImage({ src, sizes = '(max-width: 767px) 100vw, 50vw', ...props }) {
  const srcSet = src.endsWith('.webp') ? `${src.replace('.webp', '-small.webp')} 640w, ${src} ${src.startsWith('/projects/') ? 1600 : 1440}w` : undefined;
  return <img src={src} srcSet={srcSet} sizes={srcSet ? sizes : undefined} decoding="async" {...props} />;
}
