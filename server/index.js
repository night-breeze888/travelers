
const Koa = require('koa')
const app = new Koa()
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
app.use(cors());

onerror(app)

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())

app.use(serve({ rootDir: join(__dirname, '../swagger'), gzip: true, rootPath: '/api/swagger' }))
app.use(serve({ rootDir: join(__dirname, '../public'), gzip: true, rootPath: '/api/public' }))  


session(app)
require('./lib/swagger')
require('./lib/router')(app)





// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', JSON.stringify(err) )
  // ctx.throw(500)
  // ctx.status = 500
  // ctx.body = 'server error'
});


module.exports = app;
