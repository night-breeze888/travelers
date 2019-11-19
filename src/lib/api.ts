
import * as Koa from "koa";
import * as Router from "koa-router";
import * as joi from "joi";
import * as convert from 'joi-to-json-schema'
import * as serve from 'koa-static-server';
import { join } from 'path';
import { TravelCtx } from "../index";
import chalk from 'chalk';
import * as verify from "./verify";

const swaggerDefalutSwagger = {
    swagger: '2.0',
    info: {
        title: '接口文档',
        description: 'swagger defalut',
        version: '1.0.0'
    },
    host: '127.0.0.1:3000',
    basePath: '/v1',
    schemes: ['http', 'https'],
    produces: ['application/json'],
    security: [
        {
            "bearerAuth": []
        }
    ],
}

type Info = {
    title: string,
    description: string,
    version: string,
}

type SwaggerDefalut = {
    swagger?: string,
    info?: Info,
    host?: string,
    basePath?: string,
    schemes?: string[],
    produces?: string[],
}

interface Reqeust {
    params?: {
        [key: string]: joi.Schema
    };
    query?: {
        [key: string]: joi.Schema
    };
    body?: joi.Schema;
}

interface Responses {
    body?: joi.Schema;
}

interface ApiItem {
    path: string;
    method: string;
    summary?: string;
    description?: string;
    tags?: string[];
    operationId: string;
    produces?: string[];
    req?: Reqeust;
    res?: Responses;
}

type TravelApis = ApiItem[]

let swagger = {
    ...swaggerDefalutSwagger,
    paths: {}
}

type ManageApis = {
    [key: string]: TravelApis
}

type ManageControllers = {
    [key: string]: (ctx: TravelCtx) => Promise<any>
}

async function apiManage(
    app: Koa<Koa.DefaultState, Koa.DefaultContext>,
    apis: ManageApis,
    controllers: ManageControllers,
    swaggerDefalut: SwaggerDefalut = {},
    config) {
    const { port = '3000' } = config
    const host = '127.0.0.1'
    const router = new Router()
    verify.apiVerify(apis, controllers)
    Object.keys(apis).forEach(apiItem => {
        const items: TravelApis = apis[apiItem]
        items.forEach(item => {
            const { path, method, summary = '默认', tags = [apiItem], description, operationId, req, res } = item
            const { query, body, params } = req
            const resBody = res.body
            if (!swagger.paths[path]) {
                swagger.paths[path] = {}
            }
            swagger.paths[path][method] = {
                summary,
                description,
                operationId,
                parameters: [],
                tags,
                responses: {
                    "200": {
                        description: "successful",
                    }
                }
            }

            if (params) {
                Object.keys(params).forEach(key => {
                    const s = convert(params[key])
                    s['in'] = "path"
                    s["name"] = key
                    swagger.paths[path][method].parameters.push(s)
                })
            }

            if (query) {
                Object.keys(query).forEach(key => {
                    const s = convert(query[key])
                    s['in'] = "query"
                    s["name"] = key
                    swagger.paths[path][method].parameters.push(s)
                })
            }

            if (body) {
                const s = convert(body)
                swagger.paths[path][method].parameters.push({
                    in: "body",
                    name: "body",
                    schema: s
                })
            }

            if (resBody) {
                const s = convert(resBody)
                swagger.paths[path][method].responses['200']["schema"] = s
            }

            let koaPath = path.replace(/}/g, '')
            koaPath = koaPath.replace(/{/g, ':')
            router[method](koaPath, async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>, next) => {
                console.log(koaPath)
                // 验证
                const _query = item.req.query || {}
                const _body = item.req.body || {}
                const _params = item.req.params || {}
                let { params, request, response } = ctx
                let { query, body } = request
                console.log(`query : ${query}`, `params:${params}`, `body:${body}`)
                try {
                    let queryKeys = Object.keys(query)
                    for (const queryKey of queryKeys) {
                        await joi.validate(query[queryKey], _query[queryKey])
                    }
                    let paramsKeys = Object.keys(params)
                    for (const paramsKey of paramsKeys) {
                        await joi.validate(params[paramsKey], _params[paramsKey])
                    }
                    if (_body) await joi.validate(body, _body)
                } catch (error) {
                    response.status = 400
                    response.body = error.message
                    return
                }

                // 处理
                try {
                    const result = await controllers[item.operationId]
                    response.body = result
                } catch (error) {
                    response.status = error.code || 500
                    response.body = error
                    return
                }
                await next()
            })


        })
    })

    swaggerDefalut.host = `${host}:${port}`
    swagger = { ...swagger, ...swaggerDefalut }
    app.use(serve({ rootDir: join(__dirname, '../../swagger'), gzip: true, rootPath: '/document' }))
    console.log(chalk.bold.red(`\ndocument you can click: http://${host}:${port}/document`))
    router.get('/swagger', (ctx) => {
        ctx.body = swagger
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
}


export { SwaggerDefalut, apiManage, TravelApis, swagger, ManageApis, ManageControllers }
