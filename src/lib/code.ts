const Code = {
    ok: {
        code: 200,
        msg: 'success'
    },
    paramsErr: {
        code: 400,
        msg: 'params err'
    },
    notAuthorization: {
        code: 401,
        msg: 'not authorization'
    },
    rejectVisit: {
        code: 403,
        msg: 'reject visit'
    },
    notfind: {
        code: 404,
        msg: 'not find'
    },
    serverErr: {
        code: 500,
        msg: 'server err'
    },
    $message: {
        code: 400,
        msg: '$message'
    }
}


type CodeType = { [key: string]: { code: number, msg: string } }

function HttpCode(codeAll: CodeType) {
    let result: { [key: string]: any } = {
        
    }
    Object.keys(codeAll).forEach(key => {
        if (!key.includes('$')) {
            result[key] = codeAll[key]
        } else {
            result[key] = function (args: { [key: string]: string }) {
                let msg = codeAll[key].msg
                Object.keys(args).forEach(objKey => {
                    let replaceObj = `$${objKey}`
                    msg = msg.replace(replaceObj, args[objKey])
                })
                return msg
            }
        }
    })
    return result
}

function srvsCode(srvs) {
    let { code = {} } = srvs
    const codeAll = {
        ...code,
        ...Code
    }
    srvs.codes = HttpCode(codeAll)
    return srvs
}

export { srvsCode, Code } 