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
  LazyLoaderStatus,
  LazyLoaderEvent,
} from './interface'
import {
  get, set, isNil, castArray, isString,
  find, assignIn
} from './shared/lodash'
import {
  documentReady,
  appendJs,
  appendCss,
} from './shared/dom-utils'

const LOADED_TEST_RETRY_MAX_COUNT = 10
const LOADED_TEST_RETRY_INTERVAL = 200

/**
 * LazyLoader Main Class
 */
class LazyLoader extends EventEmitter implements ILazyLoaderStatic {
  private _status: LazyLoaderStatus = LazyLoaderStatus.PENDING
  private _ready: boolean = false
  private _jobs: ILoaderRegistryItem[]
  private _RETRY_MAX_COUNT: number
  private _RETRY_INTERVAL_TIME: number
  private _debugMode: boolean
  registry: ILoaderRegistry
  constructor(options?: ILazyLoaderOptions) {
    super()
    this._RETRY_MAX_COUNT = get(options, 'retry.maxCount', LOADED_TEST_RETRY_MAX_COUNT)
    this._RETRY_INTERVAL_TIME = get(options, 'retry.intervalTime', LOADED_TEST_RETRY_INTERVAL)
    this._debugMode = get(options, 'debug', false)
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
  get debug(): boolean { return this._debugMode }
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
      documentReady(() => this.startJob())
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
      const eventTarget = { target: item }
      this.emit(LazyLoaderEvent.LOAD, eventTarget)
      const { id, url, target, type } = item.jsonData
      const elData = { id, url, target }
      let isSuccess: boolean = false
      let errMsg = null
      switch (type) {
        case 'css':
          isSuccess = appendCss(elData)
          break
        case 'js':
          isSuccess = appendJs(elData)
          break
        default:
          // nothing
          errMsg = `[${item.alias}] not supported import type: ${type}`
      }
      if (isNil(errMsg) && !isSuccess) {
        errMsg = `[${item.alias}] failed to create element in document`
      }
      if (!isNil(errMsg)) {
        this.emit(LazyLoaderEvent.LOAD_REJECT, assignIn(eventTarget, { message: errMsg }))
        if (this.debug) {
          console.warn(errMsg)
        }
        continue
      }
      const INTERVAL_TIME = this._RETRY_INTERVAL_TIME

      new Promise((resolve, reject) => {
        let nCount = 1
        const testInterval = setInterval(() => {
          if (nCount > this._RETRY_MAX_COUNT) {
            return reject()
          }
          if (item.test()) {
            clearInterval(testInterval)
            return resolve()
          }
          if (this.debug) {
            console.warn(`"${item.alias}" is delayed (${nCount * INTERVAL_TIME}ms)`,)
          }
          nCount += 1
        }, INTERVAL_TIME)
      }).then(() => {
        this.emit(LazyLoaderEvent.LOADED, eventTarget)
      }).catch(() => {
        this.emit(LazyLoaderEvent.LOAD_ERROR, eventTarget)
      })
    }
    this._status = LazyLoaderStatus.IDLE
  }
  private existsJob(item: ILoaderRegistryItem): boolean {
    const target = find(this._jobs, { id: item.id })
    return !isNil(target)
  }

  // @override
  public emit(event: string | symbol, ...args: any[]): boolean {
    return super.emit(event, assignIn({ type: event }, ...args))
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
