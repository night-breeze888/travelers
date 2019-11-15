


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

import * as convert from 'joi-to-json-schema'
import * as joi from 'joi'



const joiSchema = joi.object({
    'name': joi.string().required().regex(/^\w+$/),
    'description': joi.string().optional().default('no description provided'),
    'a': joi.boolean().required().default(false)
});
// const joiSchema  ={}
let c = convert(joiSchema);

console.log(c)
// console.log(output)
// const joiSchema = joi.object({
//     'name': joi.string().required().regex(/^\w+$/),
//     'description': joi.string().optional().default('no description provided'),
//     'a': joi.boolean().required().default(false)
// });

// const joiSchema = joi.array().items(joi.number());

// params: {
//     id: definitions.ID().required().description('activity share id')
//   },

// let c = convert(joiSchema);
// console.log(c)



import * as Koa from "koa";
import { DefaultState, DefaultContext } from "koa";
import * as   Router from "koa-router";
import * as  bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';

const app = new Koa()

const router = new Router()

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
  
app.use(json({}))


app.use(async (ctx:Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>, next) => {
    const { query, method, path, req, body } = ctx.request
    
    await next()
})

router.get('/test/:id', async (ctx:Koa.BaseContext, next: () => Promise<any>) => {
    ctx.body = '123'
    await next()
}, async (ctx, next) => {
        const { params,  query ,request} = ctx
        
    const {  method, path ,body} = request 
    console.log(params,body,query)
})

router.post('/test', async (ctx, next) => {
    const {params,query,request,response} = ctx
    const { method, path, body } =request
    console.log(query, method, path, body, params)
    response.body = {
        code:213
    }
    await next()
})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000)




class A {
    constructor() {

    }
}

const a: A = new A()

