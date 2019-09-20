import { EventEmitter } from 'events'
// import { parse as parseURL } from 'url'
import isUrl from 'is-url'

import { double, power } from './number'
import { version as APP_VERSION } from './version'
import {
  ILoaderRegistry,
  LoaderRegistryDataType,
  LoaderRegistry,
  ILoaderRegistryItem
} from './registry'
import {
  ILazyLoaderOptions,
  ILazyLoaderStatic,
  LazyLoaderStatus
} from './interface'
import {
  get, set, isNil, castArray, isString,
  find
} from './shared/lodash'
import {
  documentReady,
  appendJs,
  appendCss,
} from './shared/dom-utils'

// document.addEventListener("DOMContentLoaded", function(event) {
//   //do work
// });

/**
 * LazyLoader Main Class
 */
class LazyLoader extends EventEmitter implements ILazyLoaderStatic {
  private _status: LazyLoaderStatus = LazyLoaderStatus.PENDING
  private _ready: boolean = false
  private _jobs: ILoaderRegistryItem[]
  registry: ILoaderRegistry
  constructor(options?: ILazyLoaderOptions) {
    super()
    const regOption = get(options, 'registry')
    this.registry = new LoaderRegistry(regOption)
    this._jobs = []
    this._ready = true
    this._status = LazyLoaderStatus.IDLE

    documentReady(() => {
      this._ready = true
      const readyCallback = get(options, 'ready')
      if (!isNil(readyCallback)) {
        readyCallback.call(this)
      }
    });
    return this
  }
  get version(): string { return APP_VERSION }
  /**
   * @desc
   * DOMContentLoaded 상태를 반환
   */
  get ready(): boolean {
    return this._ready
  }
  get status(): LazyLoaderStatus {
    if (this._status === LazyLoaderStatus.STARTED && this._jobs.length) {
      return LazyLoaderStatus.LOADING
    }
    return this._status
  }
  private addJob(item: ILoaderRegistryItem, immediatly: boolean = false): void {
    if (this.existsJob(item)) return
    this._jobs.push(item)
    if (immediatly) {
      documentReady(() => {
        this.startJob()
      })
    }
  }
  private startJob(): void {
    if (this.status >= LazyLoaderStatus.STARTED || !this._jobs.length) {
      return
    }
    this._status = LazyLoaderStatus.STARTED
    let item: ILoaderRegistryItem
    while (this._jobs.length) {
      item = this._jobs.shift() as ILoaderRegistryItem
      const { id, url, target, type } = item.jsonData
      const elData = { id, url, target }
      switch (type) {
        case 'css':
          appendCss(elData)
          break
        case 'js':
          appendJs(elData)
          break
        default:
          // nothing
      }
    }
    this._status = LazyLoaderStatus.IDLE
  }
  private existsJob(item: ILoaderRegistryItem): boolean {
    const t = find(this._jobs, { id: item.id })
    return !isNil(t)
  }
  load(params?: LoaderRegistryDataType|LoaderRegistryDataType[]): ILazyLoaderStatic {
    castArray(params).forEach(data => {
      let item: ILoaderRegistryItem|null
      if (isString(data)) {
        // check localpath or url
        if (data.indexOf('/') >= 0 || isUrl(data)) {
          item = this.registry.add(data) as ILoaderRegistryItem
        }
        // check exists registry
        else {
          item = this.registry.get(data)
        }
      } else {
        item = this.registry.add(data) as ILoaderRegistryItem
      }
      if (isNil(item)) return
      this.addJob(item, true)
    })
    return this
  }
  reload(): ILazyLoaderStatic {
    return this
  }
  unload(): ILazyLoaderStatic {
    return this
  }
  reset(): ILazyLoaderStatic {
    return this
  }
  // abstract test prototype
  double: (value: number) => number
  power: (base: number, exponent: number) => number
}

/**
 * test prototype
 * @hidden
 */
const fn = LazyLoader.prototype
fn.double = double
fn.power = power

// set global variable
set(window, 'LazyLoader', LazyLoader)

export default LazyLoader
