import {
  ILoaderRegistry,
  ILoaderRegistryItemData,
  ILoaderRegistryAddData
} from './registry'

export type ILazyLoadParam = string | string[] | ILoaderRegistryAddData

export interface ILazyLoaderOptions {
  registry?: string[] | ILoaderRegistryItemData[]
  ready?: Function
  load?: ILazyLoadParam
}

export enum LazyLoaderEvent {
  READY = 'ready',
  LOAD = 'load',
  LOAD_ERROR = 'load-error',
  LOADED = 'loaded',
  CREATE = 'create',
  CREATE_ERROR = 'create-error',
  CREATED = 'created',
  REMOVE = 'remove',
  REMOVE_ERROR = 'remove-error',
  REMOVED = 'removed',
  UNLOAD = 'unload',
  UNLOADED = 'unloaded'
}

export enum LazyLoaderStatus {
  IDLE,
  LOAD,
  LOADING,
  LOADED
}

export interface ILazyLoaderStatic {
  registry: ILoaderRegistry
  // setConfig: (key: string, value: any) => void
  // getConfig: (key: string) => any
  load(param?: ILazyLoadParam): ILazyLoaderStatic
  readonly ready: boolean
  readonly status: LazyLoaderStatus
  reload(): ILazyLoaderStatic
  unload(): ILazyLoaderStatic
  reset(): ILazyLoaderStatic
  // create
  // get
  // getIndexById
  // getIdByIndex
  // getList
  // removeById
  // removeByIndex
  // removeAll
  version: string
}
