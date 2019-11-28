const Code = {
    ok: {
        code: 200,
        msg: "success"
    },
    paramsErr: {
        code: 400,
        msg: "params err"
    },
    notAuthorization: {
        code: 401,
        msg: "not authorization"
    },
    rejectVisit: {
        code: 403,
        msg: "reject visit"
    },
    notfind: {
        code: 404,
        msg: "not find"
    },
    serverErr: {
        code: 500,
        msg: "server err"
    },
    $message: {
        code: 400,
        msg: "${message}"
    }
};

import { Req, Res, Express, NextFunction } from "../index";
interface CodeType { [key: string]: { code: number, msg: string } }

interface Result {
    [key: string]: {
        resJson: (res: Res, args?: { [key: string]: string | number }) => void
    }
}

function HttpCode(codeAll: CodeType) {
    let result: Result = {

    };
    Object.keys(codeAll).forEach(key => {
        if (!key.includes("$")) {
            result[key] = {
                resJson: function (res) {
                    res.status(codeAll[key].code).send(codeAll[key]);
                }
            };
        } else {
            result[key] = {
                resJson: function (res, args = {}) {
                    let obj = codeAll[key];
                    Object.keys(args).forEach(objKey => {
                        let replaceObj = "${" + objKey + "}";
                        obj.msg = obj.msg.replace(replaceObj, `${args[objKey]}`);
                    });
                    res.status(codeAll[key].code).send(obj);
                }
            };
        }
    });
    return result;
}

function srvsCode(srvs) {
    let { code = {} } = srvs;
    const codeAll = {
        ...code,
        ...Code
    };
    srvs.codes = HttpCode(codeAll);
    return srvs;
}

export { srvsCode, Code }; 