
module.exports = app => {

    let fs = require('fs');

    const router = require('koa-router')()

    let apis = fs.readdirSync('./server/apis');

    let controllers = fs.readdirSync('./server/controllers');

    // console.log(apis, controllers)

    for (let i = 0; i < apis.length; i++) {

        if (~apis[i].indexOf('.js')) {

            let api_path = require(`../apis/${apis[i]}`)
            for (let j in api_path) {

                api_path[j].path = api_path[j].path.replace(/{/g, ":");
                api_path[j].path = api_path[j].path.replace(/}/g, "");

                router[api_path[j].method](`/${apis[i].split('.')[0]}${api_path[j].path}`, async function (ctx, next) {
                    let api_path_parameters = api_path[j].parameters
                    for (let k in api_path_parameters) {

                        // 参数验证
                        if (api_path_parameters[k].required) {
                            if (api_path_parameters[k].in == 'query') {
                                if (typeof ctx.request.query[api_path_parameters[k].name] != api_path_parameters[k].type) {
                                    ctx.response.status = 400;
                                    ctx.body = { code: 400, msg: 'params error', data: api_path_parameters[k].name }
                                    return
                                }
                            }
                            if (api_path_parameters[k].in == 'path') {
                                console.log(ctx.params, ctx.params[api_path_parameters[k].name], api_path_parameters[k].type)
                                if (typeof ctx.params[api_path_parameters[k].name] != api_path_parameters[k].type) {
                                    ctx.response.status = 400;
                                    ctx.body = { code: 400, msg: 'params error', data: api_path_parameters[k].name, param_type: api_path_parameters[k].type }
                                    return
                                }
                            }
                            if (api_path_parameters[k].in == 'formData') {
                                if (typeof ctx.request.body[api_path_parameters[k].name] != api_path_parameters[k].type) {
                                    ctx.response.status = 400;
                                    ctx.body = { code: 400, msg: 'params error', data: api_path_parameters[k].name }
                                    return
                                }
                            }
                        }
                    }

                    // 加载仓库
                    let deps = fs.readdirSync('./server/deps');
                    // console.log(deps)
                    for (let x = 0; x < deps.length; x++) {

                        if (~deps[x].indexOf('.js')) {

                            let deps_path = require(`../deps/${deps[x]}`)

                            ctx[deps[x].split('.')[0]] = deps_path

                        }
                    }

                    let api_handler = api_path[j].handler.split('.')
                    let controller
                    try {
                        controller = require(`../controllers/${api_handler[0]}`)
                    }
                    catch (e) {
                        console.log(`${controller}不存在~~~~~~~~~~~~~`)
                        ctx.response.status = 500;
                        ctx.body = { code: 500, msg: 'server error' ,data:e}
                        return
                    }


                    if (!controller[api_handler[1]]) {
                        console.log(`${controller[api_handler[1]]}不存在~~~~~~~~~~~~~`)
                        ctx.response.status = 500;
                        ctx.body = { code: 500, msg: 'server error' }
                        return
                    }
                    try{
                        let  controller_result = await controller[api_handler[1]](ctx)
                        if(controller_result){
                            ctx.body = controller_result
                        }
                    }catch(e){
                        console.log('controller_result 报错~~~~~~~~~~~~~~~~~~',e,typeof e)
                        if(typeof e == 'object'){
                            ctx.response.status = 400
                            ctx.body = e
                        }else{
                            ctx.response.status = 500
                            ctx.response = e
                        }
                       
                        
                    }
                    
                })

            }

        }
    }
    // router.get('/',async function(ctx, next){
    //     ctx.body = {data:'hello word'}
    // })
    router.prefix('/api/v1')

    console.log(router)
    // app.use(router.routes());
    app.use(router.routes(), router.allowedMethods())

}
