import {
  IRegistry,
  IRegistryItem,
  IRegistryAddParam,
  IRegistryAliasData
} from './interface'
import {
  find,
  isNil, castArray,
  lastIndexOf
} from '../shared/lodash'

// constructor: (param?: IRegistryItem|IRegistryItem[]) => this
// add: (param: IRegistryItem|IRegistryItem[]) => this
// remove: (key: string) => boolean
// list: () => string[]
// readonly length: number
// getItem: (key: string) => IRegistryItem
// setItem: (key: string, value: IRegistryItem) => void

function parseRegistryAlias(str: string): IRegistryAliasData {
  const ndx = lastIndexOf(str, '@')
  if (ndx < 0) {
    return {
      name: str,
      version: 'latest'
    }
  }
  return {
    name: str.substr(0, ndx),
    version: str.substr(ndx + 1)
  }
}

class Registry implements IRegistry {
  private _list: IRegistryItem[]
  constructor(param: IRegistryAddParam) {
    const self = this
    this._list = []
    if (!isNil(param)) {
      castArray(param).forEach(o => self.add(o))
    }
    return this
  }
  add(param: IRegistryAddParam) {
    const self = this
    castArray(param).forEach(o => {
      self._list.push(o)
    })
    return this
  }
  getItem(param: string): IRegistryItem | null {
    let data: any;
    try {
      data = parseRegistryAlias(param)
    } catch (err) {
      console.error(err)
    }
    const item = find(this._list, data)
    if (isNil(item)) return null
    return item as IRegistryItem
  }

  remove(alias: string) {
    const item = this.getItem(alias)
    return true
  }

  list(): string[] {
    return this._list
      .map(o => `${o.name}@${o.version}`)
  }
}
