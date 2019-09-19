import { LoaderRegistryDataType, ILoaderRegistryItemData } from './interface'
import { isString } from '../shared/lodash'

/**
 * 인자가 문자열일 경우, ILoaderRegistryItemData 인터페이스로 캐스팅
 * @param param
 * @hidden
 */
export function castLoaderRegistryItemData(
  param: LoaderRegistryDataType
): ILoaderRegistryItemData {
  if (isString(param)) {
    return { url: param }
  }
  return param
}
