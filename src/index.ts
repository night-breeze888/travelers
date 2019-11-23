import { SwaggerConfig, apiManage, travelersApis, swagger } from "./lib/api";
import * as chalk from "chalk";
import { srvsCode, Code } from "./lib/code";
import { Request, Response, NextFunction, RequestHandler, Express, ErrorRequestHandler } from "express";
import * as express from "express";

interface Args {
    apis: {
        [key: string]: travelersApis
    },
    controllers: {
        [key: string]: (req: Request, res: Response) => Promise<any>
    }
}


interface Config extends travelers.$config {
    swaggerConfig: SwaggerConfig
    swaggerPath: string
}

interface travelersOption {
    config: Config,
    before?: (app: Express) => void,
    args: Args,
    srvs?: { [key: string]: any },
    after?: (app: Express) => void
}



export async function travelers(option: travelersOption) {
    const app = express();
    let { config, before, args, after, srvs } = option;
    const { host = "0.0.0.0", port = "3000" } = config;
    const { apis, controllers } = args;

    srvs = srvsCode(srvs);
    if (before) before(app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req: Request, res: Response, next: NextFunction) => {
        req["srvs"] = srvs;
        req["$config"] = config;
        next();
    });
    app["srvs"] = srvs;
    app["$config"] = config;
    await apiManage(app, apis, controllers, config);
    if (after) after(app);

    app.listen(port, `${host}`);

    console.log(chalk.bold.red(`travelers start host:${host} prot:${port}`));
    return { swagger };
}



declare global {
    namespace travelers {
        interface Srvs {
            [k: string]: any;
        }
        interface $config {
            [k: string]: any;
        }
    }
}


declare module "express-serve-static-core" {
    interface Request {
        srvs: travelers.Srvs
        $config: travelers.$config
        $operationId: string
    }
    interface Express {
        srvs: travelers.Srvs
        $config: travelers.$config
    }
}

declare module "express" {
    interface Request {
        srvs: travelers.Srvs
        $config: travelers.$config
        $operationId: string
    }
    interface Express {
        srvs: travelers.Srvs
        $config: travelers.$config
    }
}

export { Request, Response, NextFunction, RequestHandler, Express, ErrorRequestHandler, travelersApis, travelersOption, Code, Config };

