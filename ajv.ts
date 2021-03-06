// see https://rawgit.com/zaggino/z-schema/master/benchmark/results.html for a list of schema engines

import { formats, validate } from './index'

/**
 * Adds the EDTF formats to the AJV instance
 *
 * @returns the AJV instance with added EDTF formats
 */
export function addFormats(ajv) {
  for (const [format, validator] of Object.entries(formats)) {
    ajv.addFormat(format, validator)
  }
  return ajv
}

type AjvValidator = {
  (schema: any, date: string): boolean
  errors: {
    keyword: string
    message: string
    params: {
      keyword: 'edtf'
    }
  }[]
}
const validator = <AjvValidator>((schema, date) => {
  validator.errors = validate(date, schema) ? [] : [{
    keyword: 'edtf',
    message: 'not a valid edtf date',
    params: { keyword: 'edtf' },
  }]
  return validator.errors.length !== 0
})

/**
 * Adds an `{ edtf: <options> }` keyword to the AJV instance
 *
 * @returns the AJV instance with added `edtf` keyword
 */
export function addKeyword(ajv) {
  ajv.addKeyword({ keyword: 'edtf', validate: validator })
  return ajv
}
