// tslint:disable:no-expression-statement
import get from 'lodash/get'
import { ILazyLoaderStatic } from './lib'

import './assets/styles.scss'

// document ready
$((): void => {
  console.log('* jquery loaded:', `v${$.fn.jquery}`)
  const LazyLoader = get(window, 'LazyLoader')
  const loader: ILazyLoaderStatic = new LazyLoader({
    registry: [
      {
        name: 'font-awesome',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css',
        version: 'all'
      },
      {
        name: 'font-awesome',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/brands.min.css',
        version: 'brands'
      },
      {
        name: 'font-awesome',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/regular.min.css',
        version: 'regular'
      },
      {
        name: 'font-awesome',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/solid.min.css',
        version: 'solid'
      },
    ],
    ready: function() {
      console.log('registry list:', this.registry.list())
    }
  }).on('loaded', () => {
    console.log('************loaded')
  }).load(123)

  console.log('* LazyLoader:', `v${loader.version}`)
  console.log(loader.registry.info('font-awesome@all'))
})
