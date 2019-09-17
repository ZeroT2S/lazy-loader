import { double, power } from './number'
import PkgVersion from './version'
import { LazyLoaderStatic } from './main.interface'
import { set } from 'lodash-es'

class LazyLoader implements LazyLoaderStatic {
  constructor() {
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

// set global(window) variable
set(window, 'LazyLoader', LazyLoader)

export default LazyLoader
