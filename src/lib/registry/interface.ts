export interface ILoaderRegistryAliasData {
  name: string
  version?: string
}

export interface ILoaderRegistryItemUpdateData {
  name?: string
  version?: string | null
  url?: string
  test?: Function
  target?: string
}

export interface ILoaderRegistryItemData extends ILoaderRegistryItemUpdateData {
  url: string
}

export interface ILoaderRegistryItemRawData {
  id: string
  url: string
  name: string
  version: string | null
  alias: string
  type: string
  target: string
}

export interface ILoaderRegistryItem {
  readonly id: string
  url: string
  name: string
  version: string | null
  target: string
  readonly alias: string
  readonly type: string
  readonly filename: string
  readonly jsonData: ILoaderRegistryItemRawData
  readonly hasVersion: boolean
}

export type LoaderRegistryDataType = string | ILoaderRegistryItemData

export interface ILoaderRegistry {
  add(params: LoaderRegistryDataType | LoaderRegistryDataType[]): ILoaderRegistryItem|ILoaderRegistryItem[]|null
  remove(alias: string): ILoaderRegistryItem | ILoaderRegistryItem[] | void
  list(): string[]
  readonly length: number
  get(alias: string): ILoaderRegistryItem | null
  exists(alias: string): boolean
  info(alias: string): string
  getAll(alias: string): ILoaderRegistryItem[] | []
  getIndexByAlias(alias: string): number
  update(alias: string, data: ILoaderRegistryItemUpdateData): void
}
