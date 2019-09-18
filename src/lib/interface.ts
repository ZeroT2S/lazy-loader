import { IRegistry, IRegistryItem } from './registry'

export interface ILazyLoaderOptions {
  registry?: IRegistryItem[],
  load: string | IRegistryItem
}

export enum LazyLoaderEvent {
  READY='ready',
  LOAD='load',
  LOAD_ERROR='load-error',
  LOADED='loaded',
  CREATE='create',
  CREATE_ERROR='create-error',
  CREATED='created',
  REMOVE='remove',
  REMOVE_ERROR='remove-error',
  REMOVED='removed',
  UNLOAD='unload',
  UNLOADED='unloaded'
}

export interface ILazyLoaderStatic {
  constructor: (param?: string | string[] | ILazyLoaderOptions) => this
  registry: IRegistry
  // setConfig: (key: string, value: any) => void
  // getConfig: (key: string) => any
  load: (param?: string|ILazyLoaderOptions) => this
  readonly loaded: boolean,
  reload: () => this
  unload: () => this
  reset: () => this
  // create
  // get
  // getIndexById
  // getIdByIndex
  // getList
  // removeById
  // removeByIndex
  // removeAll
  on: (name: LazyLoaderEvent, callback: Function) => this
  version: string
}
