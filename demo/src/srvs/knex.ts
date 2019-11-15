

import config from '../config/index'

import * as Knex from 'knex'

let knex = Knex(config.knex)

type typeServer = Knex

export { typeServer ,knex }

