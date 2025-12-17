interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

export default function cloudflareImageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps): string {
  // If already a Cloudflare Images URL, add transformations
  if (src.includes('imagedelivery.net')) {
    return `${src}/w=${width},q=${quality}`
  }

  // For Sanity images, use their CDN with params
  if (src.includes('cdn.sanity.io')) {
    return `${src}?w=${width}&q=${quality}&auto=format`
  }

  // For Cloudflare Stream thumbnails
  if (src.includes('cloudflarestream.com')) {
    return src
  }

  // Return as-is for other images
  return src
}
