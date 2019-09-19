import {
  ILoaderRegistry,
  ILoaderRegistryItemUpdateData,
  ILoaderRegistryItem,
  ILoaderRegistryAddData
} from './interface'
import { LoaderRegistryItem } from './item'
import {
  find,
  findIndex,
  keys,
  has,
  set,
  isNil,
  castArray,
  remove,
  includes
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
  constructor(params?: string | string[] | ILoaderRegistryAddData) {
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
  add(params: string | string[] | ILoaderRegistryAddData) {
    const self = this
    castArray(params).forEach(data => {
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
    return JSON.stringify(this.get(alias))
  }
  getAll(alias: string): ILoaderRegistryItem[] {
    const res = find(this._list, { alias })
    if (isNil(res)) return []
    return castArray(res)
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
