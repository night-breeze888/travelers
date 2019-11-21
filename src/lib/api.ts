

import * as joi from "joi";
import * as convert from 'joi-to-json-schema'
import { join } from 'path';
import * as path from 'path';
import { Request, Response, Express, NextFunction } from "../index";
import * as chalk from 'chalk';
import * as verify from "./verify";
import * as express from "express";

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

type travelersApis = ApiItem[]

let swagger = {
    ...swaggerDefalutSwagger,
    paths: {}
}

type ManageApis = {
    [key: string]: travelersApis
}

type ManageControllers = {
    [key: string]: (req: Request, res: Response) => Promise<any>
}

async function apiManage(
    app: Express,
    apis: ManageApis,
    controllers: ManageControllers,
    swaggerDefalut: SwaggerDefalut = {},
    config) {
    const { port = '3000' } = config
    const host = '127.0.0.1'
    verify.apiVerify(apis, controllers)
    Object.keys(apis).forEach(apiItem => {
        const items: travelersApis = apis[apiItem]
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
            app[method](koaPath, (req: Request, res: Response, next: NextFunction) => {
                (async function () {
                    // 验证
                    const _query = item.req.query || {}
                    const _body = item.req.body || {}
                    const _params = item.req.params || {}
                    let { params, query, body } = req
                    try {
                        let queryKeys = Object.keys(_query)
                        for (const queryKey of queryKeys) {
                            await joi.validate(query[queryKey], _query[queryKey])
                        }
                        let paramsKeys = Object.keys(_params)
                        for (const paramsKey of paramsKeys) {
                            await joi.validate(params[paramsKey], _params[paramsKey])
                        }
                        if (_body) await joi.validate(body, _body)
                    } catch (error) {
                        res.status(400).send(error)
                        return
                    }

                    try {
                        if (controllers[item.operationId]) {
                            const result = await controllers[item.operationId](req,res)
                            if (result) res.json(result)
                        } else {
                            next()
                        }
                    } catch (error) {
                        res.status(error.code || 500).send(error)
                    }
                })()
            })
        })
    })

    swaggerDefalut.host = `${host}:${port}`
    swagger = { ...swagger, ...swaggerDefalut }
    app.use('/document', express.static(path.join(__dirname, '../../swagger')));

    console.log(chalk.bold.red(`document you can click: http://${host}:${port}/document`))
    app.get('/swagger', (req, res, next) => {
        res.send(swagger)
    })
}


export { SwaggerDefalut, apiManage, travelersApis, swagger, ManageApis, ManageControllers }
