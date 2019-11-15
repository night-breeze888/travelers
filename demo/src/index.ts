
import { travel, TravelOption,TravelApis } from 'travel'
import * as  apis from './apis/index'
import * as  srvs from './srvs/index'
import * as  controllers from './controllers/index'
import config from './config/index'

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const serve = require('koa-static-server')
const { join } = path
const session = require('./middlewares/session')
const cors = require('koa2-cors');
let C =  typeof config
const option: TravelOption = {
  config:{port:3005},
  before: function (app) {
    app.use(cors());
    session(app)
  },
  srvs,
  args: {
    apis,
    controllers,
  },
  after: function (app,obj:any) {
    console.log(JSON.stringify(obj.swagger))
    onerror(app)

    // app.use(bodyparser({
    //   enableTypes: ['json', 'form', 'text']
    // }))

    // app.use(json())
    // app.use(logger())

    // app.use(serve({ rootDir: join(__dirname, '../swagger'), gzip: true, rootPath: '/api/swagger' }))
    // app.use(serve({ rootDir: join(__dirname, '../public'), gzip: true, rootPath: '/api/public' }))


   

    // error-handling
    app.on('error', (err, ctx) => {
      console.error('server error', JSON.stringify(err))
      // ctx.throw(500)
      // ctx.status = 500
      // ctx.body = 'server error'
    });
  }
}


travel(option)
