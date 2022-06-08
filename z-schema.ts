import { formats } from './index'

export function addFormat(zschema) {
  for (const [format, validator] of Object.entries(formats)) {
    zschema.registerFormat(format, function (date) {
      return validator(date)
    })
  }
  return zschema
}
