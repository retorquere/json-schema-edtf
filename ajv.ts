// see https://rawgit.com/zaggino/z-schema/master/benchmark/results.html for a list of schema engines

import { formats } from './index'

export = function (ajv) {
  for (const [format, validator] of Object.entries(formats)) {
    ajv.addFormat(format, validator)
  }
  return ajv
}
