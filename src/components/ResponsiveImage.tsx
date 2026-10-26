import React from 'react'
import { optimizeImageUrl } from '../lib/dataService'
import { responsiveImageAssets } from '../lib/responsiveImageAssets'

const RESPONSIVE_WIDTHS = [480, 960, 1600]

export const getResponsiveImageUrl = (src: string, preferredWidth = 960) => {
  const localAsset = responsiveImageAssets[src.split('?')[0]]
  if (!localAsset) return optimizeImageUrl(src, preferredWidth, 78)

  const availableWidths = Object.keys(localAsset.variants).map(Number).sort((left, right) => left - right)
  const selectedWidth = availableWidths.find(width => width >= preferredWidth) ?? availableWidths[availableWidths.length - 1]
  return selectedWidth ? localAsset.variants[selectedWidth] : src
}

export const getResponsiveImageSrcSet = (src: string) => {
  const source = src.split('?')[0]
  const localAsset = responsiveImageAssets[source]
  if (localAsset) {
    return Object.entries(localAsset.variants)
      .map(([width, url]) => `${url} ${width}w`)
      .join(', ')
  }

  if (source.includes('images.unsplash.com')) {
    return RESPONSIVE_WIDTHS.map(width => `${optimizeImageUrl(source, width, 78)} ${width}w`).join(', ')
  }

  return undefined
}

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'sync' | 'async' | 'auto'
  pictureClassName?: string
}

const ResponsiveImage = ({
  src,
  alt,
  className,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  pictureClassName = 'contents',
}: ResponsiveImageProps) => {
  const source = src.split('?')[0]
  const localAsset = responsiveImageAssets[source]
  const isUnsplash = source.includes('images.unsplash.com')
  const srcSet = getResponsiveImageSrcSet(source)
  const optimizedSrc = isUnsplash ? optimizeImageUrl(source, 960, 78) : src

  return (
    <picture className={pictureClassName}>
      {localAsset && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={optimizedSrc}
        srcSet={isUnsplash ? srcSet : undefined}
        sizes={srcSet ? sizes : undefined}
        width={localAsset?.width}
        height={localAsset?.height}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  )
}

export default ResponsiveImage