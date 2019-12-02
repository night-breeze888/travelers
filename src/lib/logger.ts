import { configure, getLogger, Logger } from "log4js";
import * as path from "path";

function srvsLogger(srvs) {
    const { logPath = "logs" } = srvs.$config;
    const cwd = process.cwd();
    const log_path = path.join(cwd, logPath);
    configure({
        appenders: {
            info: {
                type: "file",
                filename: log_path + "/info.log",
                pattern: "yyyy-MM-dd.log",
            },
            all: {
                type: "file",
                filename: log_path + "/all.log",
                pattern: "yyyy-MM-dd.log",
            },
            error: {
                type: "file",
                filename: log_path + "/error.log",
                pattern: "yyyy-MM-dd.log",
            },
            console: {
                type: "console"
            }
        },
        categories: {
            error: { appenders: ["error"], level: "error" },
            default: { appenders: ["console", "all"], level: "ALL" },
            info: { appenders: ["info"], level: "info" },
        },
    });

    const logger = getLogger();
    const loggerInfo = getLogger("info");
    const loggerError = getLogger("error");
    srvs.logger = logger;
    srvs.loggerError = loggerError;
    srvs.loggerInfo = loggerInfo;
    return srvs;
}

export { srvsLogger, Logger };