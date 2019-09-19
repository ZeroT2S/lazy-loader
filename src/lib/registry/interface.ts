export interface ILoaderRegistryAliasData {
  name: string
  version?: string
}

export interface ILoaderRegistryItemUpdateData {
  name?: string
  version?: string | null
  url?: string
  test?: Function
}

export interface ILoaderRegistryItemData extends ILoaderRegistryItemUpdateData {
  url: string
}

export interface ILoaderRegistryItem {
  readonly id: string
  url: string
  name: string
  version: string | null
  readonly alias: string
  readonly type: string
}

export type LoaderRegistryDataType = string | ILoaderRegistryItemData

export interface ILoaderRegistry {
  add(params: LoaderRegistryDataType | LoaderRegistryDataType[]): ILoaderRegistry
  remove(alias: string): ILoaderRegistryItem | ILoaderRegistryItem[] | void
  list(): string[]
  readonly length: number
  get(alias: string): ILoaderRegistryItem | null
  info(alias: string): string
  getAll(alias: string): ILoaderRegistryItem[] | []
  getIndexByAlias(alias: string): number
  update(alias: string, data: ILoaderRegistryItemUpdateData): void
}
