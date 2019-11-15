
import * as Koa from "koa";
import * as Router from "koa-router";
import * as joi from "joi";
import * as convert from 'joi-to-json-schema'
import * as serve from 'koa-static-server';
import { join } from 'path';

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
    summary: string;
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

async function apiManage(app: Koa<Koa.DefaultState, Koa.DefaultContext>, apis: object , controllers: object, swaggerDefalut : SwaggerDefalut = {}, config) {
    const { host = '0.0.0.0', port } = config
    const router = new Router()
    Object.keys(apis).forEach(apiItem => {
        const items: TravelApis = apis[apiItem]
        items.forEach(item => {
            const { path, method, summary, tags = [apiItem],description, operationId, req, res } = item
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

            router[item.method](item.path, async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>, next) => {
                // 验证
                const _query = item.req.query || {}
                const _body = item.req.body || {}
                const _params = item.req.params || {}
                let { params, request, response } = ctx
                let { query, body } = request
                console.log(query, params, body)
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
                    response.status = error.code
                    response.body = error
                }
                await next()
            })

            swaggerDefalut.host = `${host}:${port}`
            swagger = { ...swagger, ...swaggerDefalut }
        })
    })
    
    app.use(serve({ rootDir: join(__dirname, '../../swagger'), gzip: true, rootPath: '/document' }))
    router.get('/swagger', (ctx) => {
        ctx.body = swagger
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
}


export { SwaggerDefalut, apiManage, TravelApis ,swagger}
