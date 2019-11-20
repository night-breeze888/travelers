

import * as Koa from "koa";
import { SwaggerDefalut, apiManage, travelersApis, swagger } from './lib/api'
import * as  bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import chalk from 'chalk';
import { srvsCode, Code } from './lib/code'
import * as Router from "koa-router";

type travelersConfig<T> = {
    host?: String,
    port: number,
} & T


type Args = {
    apis: {
        [key: string]: travelersApis
    },
    controllers: {
        [key: string]: (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) => Promise<any>
    }
}

type travelersOption = {
    config: travelersConfig<any>,
    before?: (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => void,
    args: Args,
    srvs?: {
        [key: string]: any
    },
    swaggerDefalut?: SwaggerDefalut,
    after?: (app: Koa<Koa.DefaultState, Koa.DefaultContext>, obj: object) => void
}


export async function travelers(option: travelersOption) {
    const app = new Koa()
    let { config, before, args, swaggerDefalut, after, srvs } = option
    const { host = '0.0.0.0', port = '3000' } = config
    const { apis, controllers } = args

    srvs = srvsCode(srvs)

    if (before) before(app)
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))
    app.use(async (ctx, next) => {
        ctx.srvs = srvs
        await next()
    })
    app.use(json({}))
    await apiManage(app, apis, controllers, swaggerDefalut, config)
    if (after) after(app, { swagger })

    app.listen(port, `${host}`)

    console.log(chalk.bold.red(`travelers start host:${host} prot:${port}`))

}


type App = Koa<Koa.DefaultState, Koa.DefaultContext>

type APPCtx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>

type RouterCtx = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>

declare global {
    namespace travelers {
        interface Srvs {
            [k: string]: any;
        }
        interface $config {

        }
    }
}


interface travelersCtx extends RouterCtx {
    srvs: travelers.Srvs
    $config: travelers.$config
}


interface travelersApp extends App {
    srvs: travelers.Srvs
    $config: travelers.$config
}

let a: travelersCtx


export { travelersApis, travelersOption, App, APPCtx, RouterCtx, travelersCtx, travelersApp, Code }