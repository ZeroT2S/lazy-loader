export interface ILoaderRegistryAliasData {
  name: string
  version?: string
}

export interface ILoaderRegistryItemUpdateData {
  name?: string
  version?: string | null
  url?: string
}

export interface ILoaderRegistryItemData extends ILoaderRegistryItemUpdateData {
  url: string
}

export interface ILoaderRegistryItem {
  readonly id: string
  name: string
  version: string | null
  readonly alias: string
  url: string
}

export type ILoaderRegistryAddData =
  | ILoaderRegistryItemData
  | ILoaderRegistryItemData[]

export interface ILoaderRegistry {
  add(params: string | string[] | ILoaderRegistryAddData): ILoaderRegistry
  remove(alias: string): ILoaderRegistryItem | ILoaderRegistryItem[] | void
  list(): string[]
  readonly length: number
  get(alias: string): ILoaderRegistryItem | null
  getAll(alias: string): ILoaderRegistryItem[] | []
  getIndexByAlias(alias: string): number
  update(alias: string, data: ILoaderRegistryItemUpdateData): void
}
