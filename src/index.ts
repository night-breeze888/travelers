

import * as Koa from "koa";
import { SwaggerDefalut, apiManage, TravelApis, swagger } from './lib/api'
import * as  bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as http from 'http';
import chalk from 'chalk';


type Before = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => void
type After = (app: Koa<Koa.DefaultState, Koa.DefaultContext>, obj: object) => void
type TravelConfig<T> = {
    host?: String,
    port: number,
} & T


type Args = {
    apis: {
        [key: string]: TravelApis
    },
    controllers: {
        [key:string]: (ctx:Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) => Promise<any> 
    }
}

type TravelOption = {
    config: TravelConfig<any>,
    before?: Before,
    args: Args,
    srvs?: object,
    swaggerDefalut?: SwaggerDefalut,
    after?: After
}


export async function travel(option: TravelOption) {
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
    // if (args instanceof Array) {
    //     for (const arg of args) {
    //         const { apis, controllers } = arg
    //         await apiManage(app, apis, controllers, swaggerDefalut, config)
    //     }
    // } else {
    //     const { apis, controllers } = args
    //     await apiManage(app, apis, controllers, swaggerDefalut, config)
    // }
    const { apis, controllers } = args
    await apiManage(app, apis, controllers, swaggerDefalut, config)
    if (after) after(app, { swagger })

    app.listen(port, `${host}`)

    console.log(chalk.bold.red(`\ntravel start host:${host} prot:${port}`))
}


type App = Koa<Koa.DefaultState, Koa.DefaultContext>

type Ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>


export { TravelApis, TravelOption, App, Ctx }



