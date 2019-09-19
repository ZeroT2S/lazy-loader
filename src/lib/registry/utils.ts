import { ILoaderRegistryItemData } from './interface'
import { isString } from '../shared/lodash'

export function castLoaderRegistryItemData(
  param: string | ILoaderRegistryItemData
): ILoaderRegistryItemData {
  if (isString(param)) {
    return { url: param }
  }
  return param
}
