import { LazyLoaderStatic } from './index.d'
import { get } from 'lodash-es'

// document ready
$(():void => {
  console.log('* jquery loaded:', `v${$.fn.jquery}`)
  const LazyLoader = get(window, 'LazyLoader')
  const loader: LazyLoaderStatic = new LazyLoader()

  console.log('* LazyLoader:', `v${loader.version}`)
  console.log('* LazyLoader test double:', loader.double(3))
  console.log('* LazyLoader test power:', loader.power(3, 3))
})
