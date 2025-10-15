declare module '*?imagetools' {
  const src: string
  export default src
}

declare module '*&as=srcset' {
  const srcset: string
  export default srcset
}

declare module '*&as=object' {
  const variants: Record<string, { src: string; w?: number; h?: number; format?: string }>
  export default variants
}