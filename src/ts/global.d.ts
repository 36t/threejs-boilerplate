// Definitions to let TS understand .vs, .fs, .glsl shader files
declare module '*.fs' {
  const value: string
  export default value
}
declare module '*.vs' {
  const value: string
  export default value
}
declare module '*.glsl' {
  const value: string
  export default value
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}
