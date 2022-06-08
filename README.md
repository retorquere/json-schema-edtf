# json-schema-edtf

Add EDTF validation to your JSON schema

```
const schema = {
  type: 'object',
  properties: {
    date: { type: 'string', format: 'edtf/level-1+season-intervals' },
  },
}
const date ={ date: '2016-XX' }

const { formats } = require('../index')

// for AJV
const Ajv = require("ajv")
const ajv = require('../ajv').addFormats(new Ajv)
console.log(ajv.validate(schema, date))

// for ZSchema
const ZSchema = require('../z-schema').addFormats(require('z-schema'))
const zschema = new ZSchema
console.log(zschema.validate(date, schema))

// for is-my-json-valid
const IMJV = require('is-my-json-valid')
const imjv = IMJV(schema, { formats })
console.log(imjv(date))

// for JSEN
const JSEN = require('jsen')
const jsen = JSEN(schema, { formats })
console.log(jsen(date))
```
