

import { SwaggerDefalut, apiManage, travelersApis, swagger } from './lib/api'
import * as  chalk from 'chalk';
import { srvsCode, Code } from './lib/code'
import { Request, Response, NextFunction, RequestHandler, Express, ErrorRequestHandler } from "express";
import * as express from "express";

type travelersConfig<T> = {
    host?: String,
    port: number,
} & T


type Args = {
    apis: {
        [key: string]: travelersApis
    },
    controllers: {
        [key: string]: (req: Request, res: Response) => Promise<any>
    }
}

type travelersOption = {
    config: travelersConfig<any>,
    before?: (app: Express) => void,
    args: Args,
    srvs?: {
        [key: string]: any
    },
    swaggerDefalut?: SwaggerDefalut,
    after?: (app: Express, obj?: object) => void
}


export async function travelers(option: travelersOption) {
    const app = express()

    let { config, before, args, swaggerDefalut, after, srvs } = option
    const { host = '0.0.0.0', port = '3000' } = config
    const { apis, controllers } = args

    srvs = srvsCode(srvs)
    if (before) before(app)
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req: Request, res: Response, next: NextFunction) => {
        req["srvs"] = srvs
        next()
    })
    await apiManage(app, apis, controllers, swaggerDefalut, config)
    if (after) after(app, { swagger })

    app.listen(port, `${host}`)

    console.log(chalk.bold.red(`travelers start host:${host} prot:${port}`))

}



declare global {
    namespace travelers {
        interface Srvs {
            [k: string]: any;
        }
        interface $config {

        }
    }
}

declare module "express" {
    interface Request {
        srvs: travelers.Srvs
        $config: travelers.$config
    }
}

interface App extends Express {
    srvs: travelers.Srvs
    $config: travelers.$config
}

export { Request, Response, NextFunction, RequestHandler, Express, ErrorRequestHandler, travelersApis, travelersOption, Code, App }

