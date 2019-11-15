

// import config from './src/config/index'

// import * as  Knex from 'knex'

// let knex = Knex(config.knex)


// let a = knex.table('User').where({id:0}).first('').then((res) => {
//     console.log(res)
// })


import * as convert from 'joi-to-json-schema'
import * as joi from 'joi'

const joiSchema = joi.object({
    'name': joi.string().required().regex(/^\w+$/),
    'description': joi.string().optional().default('no description provided'),
    'a': joi.boolean().required().default(false),
    'b': joi.alternatives().when('a', {
      is: true,
      then: joi.string().default('a is true'),
      otherwise: joi.number().default(0)
    })
  })

;

console.log(convert(joiSchema))

