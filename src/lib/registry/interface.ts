export interface IRegistryAliasData {
  name: string
  version: string
}

export interface IRegistryItem {
  id?: number
  name?: string
  version?: string
  url: string
}

export type IRegistryAddParam = IRegistryItem|IRegistryItem[]

export interface IRegistry {
  constructor: (param?: IRegistryAddParam) => this
  add: (param: IRegistryAddParam) => this
  remove: (key: string) => boolean
  list: () => string[]
  readonly length: number
  getItem: (key: string) => IRegistryItem | null
  setItem: (key: string, value: IRegistryItem) => void
}
