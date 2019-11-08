

import * as Koa from "koa";
import { SwaggerDefalut, apiManage, ApiItems } from './lib/api'
import * as  bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';


export type Config = {
    apis: object,
    controllers: object
    srvs?: object
}


export async function travel(args: Config[] | Config, swaggerDefalut?: SwaggerDefalut) {
    const app = new Koa()
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))
    app.use(json({}))
    if (args instanceof Array) {
        for (const arg of args) {
            const { apis, controllers, srvs } = arg
            
            await apiManage(app, apis, controllers, swaggerDefalut)
        }
    } else {
        const { apis, controllers, srvs } = args
        await apiManage(app, apis, controllers, swaggerDefalut)
    }
    return app
}


export { ApiItems }



