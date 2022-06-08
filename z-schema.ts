import { formats } from './index'

/**
 * Adds the EDTF formats to the ZSchema instance
 *
 * @returns the ZSchema instance with added EDTF formats
 */
export function addFormats(zschema) {
  for (const [format, validator] of Object.entries(formats)) {
    zschema.registerFormat(format, function (date) {
      return validator(date)
    })
  }
  return zschema
}
