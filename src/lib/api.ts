
import * as Koa from "koa";
import * as Router from "koa-router";
import * as joi from "joi";
import * as convert from 'joi-to-json-schema'

const defalut = {
    swagger: '2.0',
    info: {
        title: '接口文档',
        description: 'swagger默认生成系统',
        version: '1.0.0'
    },
    host: '127.0.0.1:3000',
    basePath: '/v1',
    schemes: ['http', 'https'],
    produces: ['application/json']
}

type Info = {
    title: string,
    description: string,
    version: string,
}

type SwaggerDefalut = {
    swagger: string,
    info: Info,
    host: string,
    basePath: string,
    schemes: string[],
    produces: string[],
}

interface Reqeust {
    params?: any;
    query?: any;
    body?: any;
}

interface Responses {
    body?: any
}

interface ApiItem {
    path: string;
    method: string;
    summary: string;
    description?: string;
    tags?: string;
    operationId: string;
    produces?: string[];
    req?: Reqeust;
    res?: Responses;
}

type ApiItems = ApiItem[]

async function apiManage(app: Koa<Koa.DefaultState, Koa.DefaultContext>, apis: object, controllers: object, swaggerDefalut: SwaggerDefalut) {
    const router = new Router()
    console.log(apis)
    Object.keys(apis).forEach(apiItem => {
        const items: ApiItems = apis[apiItem]
        items.forEach(item => {
            console.log(item)
            router[item.method](item.path, async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>, next) => {
                // 验证
                const _query = item.req.query || {}
                const _body = item.req.body || {}
                const _params = item.req.params || {}
                let { params, request, response } = ctx
                let { query, body } = request
                console.log(query, params, body)
                try {
                    await joi.validate(query, _query)
                    await joi.validate(body, _body)
                    await joi.validate(params, _params)
                } catch (error) {
                    console.log(error)
                    response.status = 400
                    response.body = error
                    return
                }

                // 处理
                try {
                    const result = await controllers[item.operationId]
                    response.body = result
                } catch (error) {
                    response.status = error.code
                    response.body = error
                }
            })
        })
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
}


export { SwaggerDefalut, apiManage, ApiItems }
