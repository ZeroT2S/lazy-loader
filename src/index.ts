import { double, power } from './lib/number'
import { version } from './lib/version'
import { LazyLoaderStatic } from './interface'
import { set } from 'lodash-es'

class LazyLoader implements LazyLoaderStatic {
  constructor() {
    return this
  }
  get version(): string {
    return version
  }
  double: (value: number) => number
  power: (base: number, exponent: number) => number
}

const fn = LazyLoader.prototype

fn.double = double
fn.power = power

// set global(window) variable
set(window, 'LazyLoader', LazyLoader)

export default LazyLoader
