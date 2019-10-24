

// console.log(global.config.mysql)

var knex = require('knex')(global.config.knex);


module.exports = knex