

import * as Koa from "koa";
import { SwaggerDefalut, apiManage, ApiItems, swagger } from './lib/api'
import * as  bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as http from 'http';
import chalk from 'chalk';


type Before = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => void
type After = (app: Koa<Koa.DefaultState, Koa.DefaultContext>, obj: object) => void
type TravelConfig = {
    host?: String,
    port: number,
}

type Args = {
    apis: object,
    controllers: object

}


type Option = {
    config: TravelConfig,
    before?: Before,
    args: Args[] | Args
    srvs?: object
    swaggerDefalut?: SwaggerDefalut,
    after?: After
}


export async function travel(option: Option) {
    const app = new Koa()
    const { config, before, args, swaggerDefalut, after, srvs } = option
    const { host = '0.0.0.0', port } = config
    if (before) before(app)
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))
    app.use(async (ctx, next) => {
        ctx.srvs = srvs
        await next()
    })
    app.use(json({}))
    if (args instanceof Array) {
        for (const arg of args) {
            const { apis, controllers } = arg
            await apiManage(app, apis, controllers, swaggerDefalut, config)
        }
    } else {
        const { apis, controllers } = args
        await apiManage(app, apis, controllers, swaggerDefalut, config)
    }

    if (after) after(app, { swagger })

    app.listen(port, `${host}`)

    console.log(chalk.bold.red(`\ntravel start host:${host} prot:${port}\n`))
}


export { ApiItems, Option }



