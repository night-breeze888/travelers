import * as bcrypt from './bcrypt'

import * as knex from './knex'

interface Srvs {
    bcrypt: bcrypt.typeServer
    knex: knex.typeServer
}


export {
    Srvs,
    bcrypt,
    knex
}