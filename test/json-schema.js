const assert = require('assert')

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    date: { type: 'string', format: 'edtf/level-1+season-intervals' },
    validates: { type: 'boolean' },
  },
  required: ['date'],
  additionalProperties: false
}

const { formats } = require('../index')

const Ajv = require("ajv")
const ajv = require('../ajv').addFormats(new Ajv)

const ZSchema = require('../z-schema').addFormats(require('z-schema'))
const zschema = new ZSchema
console.log(ZSchema.getRegisteredFormats())

const IMJV = require('is-my-json-valid')
const imjv = IMJV(schema, { formats })

const JSEN = require('jsen')
const jsen = JSEN(schema, { formats })

const dates = [
  { name: 'validates wildcard date', date: '2016-XX', validates: true },
  { name: 'validates season-interval', date: '2017-24/2018-21', validates: true },
  { name: 'fails invalid date', date: 'invalid', validates: false },
]

describe('JSON schema', () => {
  for (const date of dates) {
    const test = `${date.name} ${JSON.stringify(date.date)}`
    it(`${test} with ajv`, () => {
      assert.equal(ajv.validate(schema, date), date.validates)
    })
    it(`${test} with z-schema`, () => {
      assert.equal(zschema.validate(date, schema), date.validates)
    })
    it(`${test} with is-my-json-valid`, () => {
      assert.equal(imjv(date), date.validates)
    })
    it(`${test} with jsen`, () => {
      assert.equal(jsen(date), date.validates)
    })
  }
})
