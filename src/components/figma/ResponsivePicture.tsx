import { useState } from 'react'

type SourceDef = {
  type?: string
  srcSet: string
  sizes?: string
  media?: string
}

type ResponsivePictureProps = {
  alt: string
  imgSrc: string
  className?: string
  imgClassName?: string
  sources?: SourceDef[]
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'auto' | 'sync'
  width?: number
  height?: number
}

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Rya2Utd2lkdGg9IjMuNyI+PHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHJ4PSI2Ii8+PHBhdGggZD0ibTE2IDU4IDE2LTE4IDMyIDMyIi8+PGNpcmNsZSBjeD0iNTMiIGN5PSIzNSIgcj0iNyIvPjwvc3ZnPgoK'

export function ResponsivePicture(props: ResponsivePictureProps) {
  const {
    alt,
    imgSrc,
    className,
    imgClassName,
    sources = [],
    sizes,
    priority = false,
    loading,
    decoding = 'async',
    width,
    height,
  } = props

  const [didError, setDidError] = useState(false)

  const resolvedLoading = priority ? 'eager' : loading ?? 'lazy'
  const fetchPriority: 'high' | 'low' | 'auto' = priority ? 'high' : 'auto'

  return (
    <picture className={className}>
      {sources.map((s, idx) => (
        <source key={idx} type={s.type} srcSet={s.srcSet} sizes={s.sizes ?? sizes} media={s.media} />
      ))}
      {didError ? (
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          className={imgClassName}
          decoding={decoding}
          loading={resolvedLoading}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          data-original-url={imgSrc}
        />
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          className={imgClassName}
          decoding={decoding}
          loading={resolvedLoading}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          onError={() => setDidError(true)}
        />
      )}
    </picture>
  )
}

export default ResponsivePicture

// Helper: from imagetools generated map, produce a srcset string
// Usage: buildSrcSet(heroImages, 'w') -> "... 640w, ... 960w, ..."
export function buildSrcSet(
  variants: Record<string, { src: string; w?: number; h?: number; format?: string }>,
  descriptor: 'w' | 'x' = 'w'
) {
  const parts: string[] = []
  for (const key of Object.keys(variants)) {
    const v = variants[key]
    if (descriptor === 'w' && v.w) parts.push(`${v.src} ${v.w}w`)
    else if (descriptor === 'x') parts.push(`${v.src} ${key.replace(/^[^,]*,x(\d+(?:\.\d+)?)$/, '$1')}x`)
  }
  // Sort numerically when using width descriptor
  return parts
    .sort((a, b) => {
      const aw = parseInt(a.match(/(\d+)w$/)?.[1] ?? '0', 10)
      const bw = parseInt(b.match(/(\d+)w$/)?.[1] ?? '0', 10)
      return aw - bw
    })
    .join(', ')
}
