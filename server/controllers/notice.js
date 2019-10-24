



notice = {}

notice.list = async function (ctx) {

    let { session, knex } = ctx
    // if (!session.system_auth) {
    //     ctx.body = {
    //         code: 400, msg: 'not jurisdiction'
    //     }
    //     return
    // }
    // let data = await knex('notice')

    let data = await knex('notice')

    ctx.body = {
        code: 200, data: data ? data : []
    }

}

notice.create = async function (ctx) {

    let { session, params, request: { body }, knex } = ctx
    // if (!session.system_auth) {
    //     ctx.body = {
    //         code: 400, msg: 'not jurisdiction'
    //     }
    //     return
    // }
    let { title, content } = body

    await knex('notice').insert( body)


    ctx.body = { code: 200, data:body,msg:'操作成功' }
}






module.exports = notice