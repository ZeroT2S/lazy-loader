// tslint:disable:no-expression-statement
import get from 'lodash/get'

// document ready
$((): void => {
  console.log('* jquery loaded:', `v${$.fn.jquery}`)
  const LazyLoader = get(window, 'LazyLoader')
  const loader = new LazyLoader({
    registry: [
      {
        // name: 'fontawesome',
        url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ],
    ready: function() {
      console.log(this.registry.list())
    }
  }).on('loaded', () => {
    console.log('************loaded')
  }).load(123)

  console.log('* LazyLoader:', `v${loader.version}`)
})
