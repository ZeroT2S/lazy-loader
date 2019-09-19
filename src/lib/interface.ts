import {
  ILoaderRegistry,
  LoaderRegistryDataType
} from './registry'

export interface ILazyLoaderOptions {
  registry?: LoaderRegistryDataType[]
  ready?: Function
  load?: LoaderRegistryDataType|LoaderRegistryDataType[]
}

export enum LazyLoaderEvent {
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
  load(param?: LoaderRegistryDataType|LoaderRegistryDataType[]): ILazyLoaderStatic
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
