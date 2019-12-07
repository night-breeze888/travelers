import { apiManage, travelersApis, swagger } from "./lib/api";
import * as chalk from "chalk";
import { srvsCode, Code } from "./lib/code";
import { Request, Response, NextFunction, RequestHandler, Express, ErrorRequestHandler } from "express";
import * as express from "express";
import { srvsLogger, Logger } from "./lib/logger";


declare global {
    namespace Travelers {
        interface Srvs {
            [k: string]: any;
        }
    }
}

interface Srvs extends Travelers.Srvs {

}

interface Req extends Request {
    srvs: Travelers.Srvs
}

interface Res extends Response {

}

let exportSrvs: Travelers.Srvs;

interface TravelersOption {
    config: { [key: string]: any },
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
    ready?: (app: Express, srvs: Travelers.Srvs) => void,
    after?: (app: Express, srvs: Travelers.Srvs) => void
}



export async function travelers(option: TravelersOption) {
    const app = express();
    let { config, before, security = {}, apis, controllers, ready, after, srvs } = option;
    const { host = "0.0.0.0", port = 3000 } = config;
    srvs.$config = config;
    srvs = srvsCode(srvs);
    srvs = srvsLogger(srvs);

    if (before) before(app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req: Request, res: Response, next: NextFunction) => {
        req["srvs"] = srvs;
        next();
    });

    if (ready) ready(app, srvs);
    await apiManage(app, security, apis, controllers, config, srvs);
    if (after) after(app, srvs);

    app.listen(port, `${host}`);

    srvs.logger.info(`travelers start host:${host} prot:${port}`);
    exportSrvs = srvs;
    return { swagger, srvs };
}


export { Req, Res, NextFunction, RequestHandler, Express, ErrorRequestHandler, TravelersOption, Code, Srvs, Logger, travelersApis };

export let srvs = exportSrvs;
