// tslint:disable:no-expression-statement
import get from 'lodash/get'
import {
  ILazyLoaderStatic,
  ILoaderEvent
} from './lib/interface'

import './assets/styles.scss'

// document ready
$((): void => {
  console.log('* jquery loaded:', `v${$.fn.jquery}`)
  const LazyLoader = get(window, 'LazyLoader')
  const loader: ILazyLoaderStatic = new LazyLoader({
    registry: [
      {
        name: 'font-awesome',
        url: 'https://kit.fontawesome.com/21c0a510fd.js',
        version: '5',
        target: 'head'
      },
    ],
    ready: function() {
      console.log('registry list:', this.registry.list())
    }
  }).on('loaded', (evt: ILoaderEvent) => {
    const { name, target } = evt
    console.log(`[${name}]`, target.alias)
  // }).load('font-awesome@solid')
  }).load('font-awesome@5')

  console.log('* LazyLoader:', `v${loader.version}`)
  console.log(loader.registry.info('font-awesome@5'))
})
