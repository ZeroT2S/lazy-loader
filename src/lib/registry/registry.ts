import {
  ILoaderRegistry,
  ILoaderRegistryItemUpdateData,
  ILoaderRegistryItem,
  ILoaderRegistryItemData,
  LoaderRegistryDataType,
} from './interface'
import { LoaderRegistryItem } from './item'
import {
  findIndex,
  keys,
  has,
  set,
  isNil,
  castArray,
  remove,
  includes,
  lastIndexOf
} from '../shared/lodash'
import { EventEmitter } from 'events'

// constructor: (param?: ILoaderRegistryItem|ILoaderRegistryItem[]) => this
// add: (param: ILoaderRegistryItem|ILoaderRegistryItem[]) => this
// remove: (key: string) => boolean
// list: () => string[]
// readonly length: number
// getItem: (key: string) => ILoaderRegistryItem
// setItem: (key: string, value: ILoaderRegistryItem) => void

class LoaderRegistry extends EventEmitter implements ILoaderRegistry {
  private _list: ILoaderRegistryItem[]
  constructor(params?: LoaderRegistryDataType | LoaderRegistryDataType[]) {
    super()
    const self = this
    this._list = []
    if (!isNil(params)) {
      self.add(params)
    }
    return this
  }
  get length(): number {
    return this._list.length
  }
  add(params: LoaderRegistryDataType | LoaderRegistryDataType[]) {
    const self = this
    castArray(params).forEach((data: string | ILoaderRegistryItemData) => {
      const item = new LoaderRegistryItem(data)
      self._list.push(item)
    })
    return this
  }
  get(alias: string): ILoaderRegistryItem | null {
    const ndx = this.getIndexByAlias(alias)
    if (ndx < 0) return null
    return this._list[ndx]
  }
  info(alias: string): string {
    let res: any = this.getAll(alias).map(item => item.toString())
    if (res.length === 1) res = res[0]
    return JSON.stringify(res, null, 2)
  }
  getAll(query: string): ILoaderRegistryItem[] {
    const hasVersion = lastIndexOf(query, '@') > 0
    return this._list.filter(item => {
      if (hasVersion) {
        return item.alias === query
      }
      return item.name === query
    })
  }
  getIndexByAlias(alias: string): number {
    return findIndex(this._list, { alias })
  }
  update(alias: string, data: ILoaderRegistryItemUpdateData) {
    const item = this.get(alias)
    if (isNil(item)) return
    keys(data).forEach(key => {
      if (has(item, key)) {
        set(item, key, data[key])
      }
    })
  }
  remove(alias: string) {
    const items = this.getAll(alias)
    if (!items.length) return
    const ids = items.map(item => item.id)
    const result: ILoaderRegistryItem[] = []
    remove(this._list, item => {
      const match = includes(ids, item.id)
      if (match) result.push(item)
      return match
    })
    if (result.length === 1) return result[0]
    return result
  }
  list(): string[] {
    return this._list.map(item => item.alias)
  }
}

export { LoaderRegistry }
export default LoaderRegistry
