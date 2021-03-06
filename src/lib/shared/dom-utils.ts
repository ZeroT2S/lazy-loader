import { isNil, get } from './lodash'

export interface IAppendElementData {
  id: string
  url: string
  target?: string
}

export function documentReady(callback: (evt?: Event) => void): any {
  if (document.readyState !== 'loading') {
    return callback()
  }
  document.addEventListener('DOMContentLoaded', callback);
}

export function createLinkElement(data: IAppendElementData): HTMLLinkElement {
  const { id, url } = data
  const linkEl: HTMLLinkElement = document.createElement('link')
  ;[
    { name: 'id', value: id },
    { name: 'rel', value: 'stylesheet' },
    { name: 'type', value: 'text/css' },
    { name: 'href', value: url },
  ].forEach(attrs => {
    const { name, value } = attrs
    linkEl.setAttribute(name, value)
  })
  return linkEl
}

export function createScriptElement(data: IAppendElementData): HTMLScriptElement {
  const { id, url } = data
  const scriptEl: HTMLScriptElement = document.createElement('script')
  ;[
    { name: 'id', value: id },
    { name: 'src', value: url },
  ].forEach(attrs => {
    const { name, value } = attrs
    scriptEl.setAttribute(name, value)
  })
  return scriptEl
}

export function existsElementById(id: string) {
  return !isNil(document.getElementById(id))
}

/**
 * @hidden
 */
function checkDuplicate(data: IAppendElementData): boolean {
  const { id, url } = data
  if (existsElementById(id)) {
    console.warn('[DomValidate]', `exists ${url}`)
    return true
  }
  return false
}

export function appendCss(data: IAppendElementData): boolean {
  if (checkDuplicate(data)) return false
  const el = createLinkElement(data)
  const target = get(data, 'target', 'head')
  document[target].appendChild(el)
  return true
}

export function appendJs(data: IAppendElementData): boolean {
  if (checkDuplicate(data)) return false
  const el = createScriptElement(data)
  const target = get(data, 'target', 'body')
  document[target].appendChild(el)
  return true
}
