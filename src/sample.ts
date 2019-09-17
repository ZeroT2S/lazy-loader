import { LazyLoaderStatic } from './interface'
import { get } from 'lodash-es'

// document ready
$(():void => {
  console.log('jQuery:', $.fn.jquery)
  const LazyLoader = get(window, 'LazyLoader')
  const loader: LazyLoaderStatic = new LazyLoader()

  console.log('LazyLoader.double:', loader.double(3))
  console.log('LazyLoader.power:', loader.power(3, 3))
  console.log('LazyLoader:', loader.version)
})
