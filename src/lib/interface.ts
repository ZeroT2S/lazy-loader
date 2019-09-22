import {
  ILoaderRegistry,
  ILoaderRegistryItem,
  LoaderRegistryDataType
} from './registry'

export interface ILazyLoaderTestOptions {
  maxCount?: number
  intervalTime?: number
}

export interface ILazyLoaderOptions {
  registry?: LoaderRegistryDataType[]
  ready?: Function
  load?: LoaderRegistryDataType|LoaderRegistryDataType[]
  retry?: ILazyLoaderTestOptions
  debug?: boolean
}

export enum LazyLoaderEvent {
  LOAD = 'load',
  LOAD_REJECT = 'load-reject',
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

export interface ILoaderEvent {
  type: LazyLoaderEvent
  target: ILoaderRegistryItem
  data?: any
  message?: string
}

export enum LazyLoaderStatus {
  IDLE,
  PENDING,
  STARTED,
  LOADING,
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
