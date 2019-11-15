
import * as  bcrypt from './srvs/bcrypt'

import * as  knex from './srvs/knex'


declare module "koa" {
    interface srvs {
        knex: knex.typeServer
    }
}