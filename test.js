


// (async function(){
//     let knex = require('knex')({
//         client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
//         connection: { //指明连接参数
//           host: '47.75.215.23',
//           user: 'root',
//           password: 'r4110f27',
//           database: 'niuniu2re'
//         },
//         debug: true, //指明是否开启debug模式，默认为true表示开启
//         pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
//           min: 0,
//           max: 7,
//         },
//         acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
//         migrations: {
//           tableName: 'migrations' //数据库迁移，可选
//         }
//       })
//     let game = await knex('bull100').where('created_at','>=',1554048000).groupBy('player').select('player')
    
//     console.log(game.length)

//     // for(let i in game){
//     //   await knex('Account').insert({player:game[i].player})
//     // }

//     // let a =  await knex('everyday_activity_record').insert({ datestr:12, player:32, name: '21', activity_id: '123' })
//     //   console.log(a)
// })()


