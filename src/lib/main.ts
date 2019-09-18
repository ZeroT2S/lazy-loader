import { double, power } from './number'
import PkgVersion from './version'
import { IRegistry } from './registry'
import {
  ILazyLoaderOptions,
  ILazyLoaderStatic
} from './interface'
import {
  get, set,
  isNil
} from './shared/lodash'
import { EventEmitter } from 'events'

/**
 * global object
 */
class LazyLoader extends EventEmitter implements ILazyLoaderStatic {
  registry: IRegistry
  constructor(options?: ILazyLoaderOptions) {
    super()
    const regList = get(options, 'registry')
    this.registry = new
    return this
  }
  get version(): string {
    return PkgVersion
  }
  double: (value: number) => number
  power: (base: number, exponent: number) => number
}

/**
 * @hidden
 */
const fn = LazyLoader.prototype

fn.double = double
fn.power = power

// set global variable
set(window, 'LazyLoader', LazyLoader)

export default LazyLoader
