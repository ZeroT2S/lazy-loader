import { ILoaderRegistryItem, ILoaderRegistryItemData } from './interface'
import { castLoaderRegistryItemData } from './utils'
import { get, isNil } from '../shared/lodash'
import { basename } from 'path'
import { parse as UrlParse } from 'url'
import uuid from 'uuid/v1'

class LoaderRegistryItem implements ILoaderRegistryItem {
  private _id: string
  private _name: string
  private _version: string | null
  private _url: string

  constructor(data: string | ILoaderRegistryItemData) {
    data = castLoaderRegistryItemData(data)
    this.url = get(data, 'url')
    this.name = get(data, 'name', '')
    this.version = get(data, 'version', null)
    this._id = uuid()
    return this
  }

  get id(): string {
    return this._id
  }
  get name(): string {
    return this._name
  }
  set name(value: string) {
    if (!value.length) {
      let { pathname } = UrlParse(this.url)
      if (isNil(pathname)) {
        console.warn(
          '[LoaderRegistryItem]',
          `${this.url} failed parse basename`
        )
        pathname = 'undefined'
      }
      value = basename(pathname)
    }
    this._name = value
  }
  get version(): string | null {
    return this._version
  }
  set version(value: string | null) {
    this._version = value
  }
  get hasVersion(): boolean {
    return !isNil(this.version)
  }
  get alias(): string {
    if (this.hasVersion) {
      return `${this.name}@${this.version}`
    }
    return this.name
  }
  get url(): string {
    return this._url
  }
  set url(value: string) {
    if (isNil(value) || !value.length) {
      throw new Error('undefiend registry url')
    }
    this._url = value
  }
}

export { LoaderRegistryItem }
export default LoaderRegistryItem
