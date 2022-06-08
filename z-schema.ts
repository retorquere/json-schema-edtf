import { formats } from './index'

export = function (zschema) {
  for (const [format, validator] of Object.entries(formats)) {
    zschema.registerFormat(format, function (date) {
      return validator(date)
    })
  }
  return zschema
}
