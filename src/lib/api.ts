

import * as joi from "joi";
import * as convert from "joi-to-json-schema";
import * as path from "path";
import * as express from "express";
import { Req, Res, Express, NextFunction } from "../index";
import * as chalk from "chalk";
import * as verify from "./verify";
import * as fs from "fs";

const swaggerConfigDefalut = {
    swagger: "2.0",
    info: {
        title: "接口文档",
        description: "swagger defalut",
        version: "1.0.0"
    },
    host: "127.0.0.1:3000",
    basePath: "/v1",
    schemes: ["http", "https"],
    produces: ["application/json"],
    security: [

    ],
};


type SwaggerConfig = typeof swaggerConfigDefalut

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
    security?: string[];
    produces?: string[];
    req?: Reqeust;
    res?: Responses;
}

type travelersApis = ApiItem[]

let swagger = {
    ...swaggerConfigDefalut,
    paths: {}
};

interface ManageApis {
    [key: string]: travelersApis
}

interface ManageControllers {
    [key: string]: (req: Req, res: Res) => Promise<any>
}

async function apiManage(
    app: Express,
    security: {
        [key: string]: (req: Req, res: Res, next: NextFunction) => Promise<any>
    },
    apis: ManageApis,
    controllers: ManageControllers,
    config: { [key: string]: any },
    srvs
) {
    verify.apiVerify(apis, controllers);
    let selfSecurity = security;
    Object.keys(security).forEach(_key => {
        swagger.security.push({ [_key]: [] });
    });
    const { swaggerPath, swaggerConfig, port = "3000" } = config;
    Object.keys(apis).forEach(apiItem => {
        const items: travelersApis = apis[apiItem];
        items.forEach(item => {
            const { path, method, summary = "默认", tags = [apiItem], security = [], description, operationId, req, res } = item;
            const { query, body, params } = req;
            const resBody = res.body;

            if (!swagger.paths[path]) {
                swagger.paths[path] = {};
            }
            swagger.paths[path][method] = {
                summary,
                description,
                operationId,
                parameters: [],
                tags,
                security,
                responses: {
                    "200": {
                        description: "successful",
                    }
                }
            };

            if (params) {
                Object.keys(params).forEach(key => {
                    const s = convert(params[key]);
                    s["in"] = "path";
                    s["name"] = key;
                    swagger.paths[path][method].parameters.push(s);
                });
            }

            if (query) {
                Object.keys(query).forEach(key => {
                    const s = convert(query[key]);
                    s["in"] = "query";
                    s["name"] = key;
                    swagger.paths[path][method].parameters.push(s);
                });
            }

            if (body) {
                const s = convert(body);
                swagger.paths[path][method].parameters.push({
                    in: "body",
                    name: "body",
                    schema: s
                });
            }

            if (resBody) {
                const s = convert(resBody);
                swagger.paths[path][method].responses["200"]["schema"] = s;
            }

            let koaPath = path.replace(/}/g, "");
            koaPath = koaPath.replace(/{/g, ":");

            let funcs: any[] = [koaPath];

            for (const securityItme of security) {
                if (selfSecurity[securityItme]) funcs.push(selfSecurity[securityItme]);
            }

            funcs.push(async (req: Req, res: Res, next: NextFunction) => {
                const _query = item.req.query || {};
                const _body = item.req.body || {};
                const _params = item.req.params || {};
                let { params, query, body } = req;
                try {
                    let queryKeys = Object.keys(_query);
                    for (const queryKey of queryKeys) {
                        await joi.validate(query[queryKey], _query[queryKey]);
                    }
                    let paramsKeys = Object.keys(_params);
                    for (const paramsKey of paramsKeys) {
                        await joi.validate(params[paramsKey], _params[paramsKey]);
                    }
                    if (_body) await joi.validate(body, _body);
                } catch (error) {
                    res.status(400).send(error);
                    return;
                }

                try {
                    if (controllers[item.operationId]) {
                        const result = await controllers[item.operationId](req, res);
                        if (result) res.json(result);
                    } else {
                        next();
                    }
                } catch (error) {
                    res.status(error.code || 500).send(error);
                }

            });

            app[method].apply(app, funcs);
        });
    });

    swagger = { ...swagger, ...swaggerConfig };
    app.use(swaggerPath, express.static(path.join(__dirname, "../../swagger")));

    srvs.logger.info(`document you can click: http://127.0.0.1${port == 80 ? "" : `:${port}`}${swaggerPath}`);

    app.get(`${swaggerPath}/json`, (req, res, next) => {
        res.send(swagger);
    });
    let swaggerUrlFile = `let swaggerUrl = "${swaggerPath}/json"`;
    fs.writeFileSync(path.join(__dirname, "../../swagger/url.js"), swaggerUrlFile);
}


export { SwaggerConfig, apiManage, travelersApis, swagger, ManageApis, ManageControllers };
