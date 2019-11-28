import { SwaggerConfig, apiManage, travelersApis, swagger } from "./lib/api";
import * as chalk from "chalk";
import { srvsCode, Code } from "./lib/code";
import { Request, Response, NextFunction, RequestHandler, Express, ErrorRequestHandler } from "express";
import * as express from "express";

declare global {
    namespace Travelers {
        interface Srvs {
            [k: string]: any;
        }
        interface Config {
            [k: string]: any;
        }
    }
}

interface Srvs extends Travelers.Srvs {

}

interface Req extends Request {
    srvs: Travelers.Srvs
    $config: Travelers.Config
}

interface Res extends Response {

}

interface Config extends Travelers.Config {
    host?: string
    port: number
    swaggerConfig: SwaggerConfig
    swaggerPath: string
}

interface TravelersOption {
    config: Config,
    before?: (app: Express) => void,
    security?: {
        [key: string]: (req: Req, res: Res) => Promise<any>
    },
    apis: {
        [key: string]: travelersApis
    },
    controllers: {
        [key: string]: (req: Req, res: Res) => Promise<any>
    }
    srvs?: { [key: string]: any },
    after?: (app: Express, srvs: Travelers.Srvs) => void
}



export async function travelers(option: TravelersOption) {
    const app = express();
    let { config, before, security = {}, apis, controllers, after, srvs } = option;
    const { host = "0.0.0.0", port = 3000 } = config;

    srvs = srvsCode(srvs);

    if (before) before(app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req: Request, res: Response, next: NextFunction) => {
        req["srvs"] = srvs;
        req["$config"] = config;
        next();
    });

    await apiManage(app, security, apis, controllers, config);
    if (after) after(app, srvs);

    app.listen(port, `${host}`);

    console.log(chalk.bold.red(`travelers start host:${host} prot:${port}`));
    return { swagger };
}


export { Req, Res, NextFunction, RequestHandler, Express, ErrorRequestHandler, travelersApis, TravelersOption, Code, Config, Srvs };

