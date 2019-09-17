export interface LazyLoaderStatic {
  double: (value: number) => number
  power: (base: number, exponent: number) => number
  version: string
}

declare const LazyLoader: LazyLoaderStatic

export default LazyLoader
