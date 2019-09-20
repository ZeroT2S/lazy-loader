import {
  ILoaderRegistryItem,
  ILoaderRegistryItemData,
  ILoaderRegistryItemRawData,
} from './interface'
import { castLoaderRegistryItemData } from './utils'
import { get, isNil } from '../shared/lodash'
import { basename } from 'path'
import { parse as UrlParse } from 'url'
import uuid from 'uuid/v1'

/**
 * @hidden
 */
const getFilenameFromURL = (url: string): string => {
  let { pathname } = UrlParse(url)
  if (isNil(pathname)) {
    console.warn(
      '[UrlParser]',
      `${url} failed parse basename`
    )
    return 'undefined'
  }
  return basename(pathname)
}

const UNDEFINED = 'undefined'

class LoaderRegistryItem implements ILoaderRegistryItem {
  private _id: string
  private _name: string
  private _version: string | null
  private _url: string
  private _filename: string = UNDEFINED
  private _type: string = UNDEFINED
  target: string

  constructor(data: string | ILoaderRegistryItemData) {
    data = castLoaderRegistryItemData(data)
    this.url = get(data, 'url')
    this.name = get(data, 'name', this.filename)
    if (!this.name.length || this.name === UNDEFINED) {
      throw new Error(`invalid url or required name property: ${this.url}`)
    }
    this.version = get(data, 'version', null)
    let target = get(data, 'target')
    if (isNil(target)) {
      target = (this.type === 'css') ? 'head' : 'body'
    }
    this.target = target
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
    const file = getFilenameFromURL(value).split('.')
    if (file.length) {
      this._type = file.pop() as string
    }
    this._filename = file.join('.')
    this._url = value
  }
  get jsonData(): ILoaderRegistryItemRawData {
    return {
      id: this.id,
      url: this.url,
      name: this.name,
      version: this.version,
      alias: this.alias,
      type: this.type,
      target: this.target,
    }
  }
  get filename(): string { return this._filename }
  get type(): string { return this._type }
  public toString = (): string => {
    return `${this.alias}: ${this.url}`
  }
}

export { LoaderRegistryItem }
export default LoaderRegistryItem
