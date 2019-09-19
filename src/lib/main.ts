import { double, power } from './number'
import { version as APP_VERSION } from './version'
import { ILoaderRegistry, LoaderRegistry } from './registry'
import {
  ILazyLoaderOptions,
  ILazyLoaderStatic,
  LazyLoaderStatus
} from './interface'
import { get, set, isNil } from './shared/lodash'
import { EventEmitter } from 'events'

/**
 * LazyLoader Main Class
 */
class LazyLoader extends EventEmitter implements ILazyLoaderStatic {
  private _status: LazyLoaderStatus
  private _ready: boolean
  registry: ILoaderRegistry
  constructor(options?: ILazyLoaderOptions) {
    super()
    const regOption = get(options, 'registry')
    this.registry = new LoaderRegistry(regOption)
    this._ready = true
    this._status = LazyLoaderStatus.IDLE
    const readyCallback = get(options, 'ready')
    if (!isNil(readyCallback)) {
      readyCallback.call(this)
    }
    return this
  }
  get version(): string { return APP_VERSION }
  /**
   * @desc
   * LazyLoader 초기화 완료 상태를 반환
   */
  get ready(): boolean {
    return this._ready
  }
  get status(): LazyLoaderStatus {
    return this._status
  }
  load(): ILazyLoaderStatic {
    this._status = LazyLoaderStatus.LOAD
    this._status = LazyLoaderStatus.LOADING
    this._status = LazyLoaderStatus.LOADED
    this.emit('loaded')
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
