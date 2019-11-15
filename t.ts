import chalk from 'chalk';

import * as joi from "joi";

let a = joi.optional()
joi.validate(123, a).then(res => {
     console.log(res)
}).catch(e => {
     console.log(e)
 })