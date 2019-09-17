// tslint:disable:no-expression-statement
import { LazyLoaderStatic } from './lib'
import get from 'lodash/get'

// document ready
$(():void => {
  console.log('* jquery loaded:', `v${$.fn.jquery}`)
  const LazyLoader = get(window, 'LazyLoader')
  const loader: LazyLoaderStatic = new LazyLoader()

  console.log('* LazyLoader:', `v${loader.version}`)
})
