



game = {}

game.list = async function (ctx) {

    let { session, knex } = ctx
    // if (!session.system_auth) {
    //     ctx.body = {
    //         code: 400, msg: 'not jurisdiction'
    //     }
    //     return
    // }
    // let data = await knex('game')

    let data = global.config.game

    ctx.body = {
        code: 200, data, count: data.length
    }

}

game.record = async function (ctx) {

    let { session, params, request: { query }, knex } = ctx
    // if (!session.system_auth) {
    //     ctx.body = {
    //         code: 400, msg: 'not jurisdiction'
    //     }
    //     return
    // }
    let { id } = params
    let { page, pageSize, startTime, endTime } = query
    
    let game = global.config.game
    if (id == game[0].id) {     //二人牛牛
        let data = await knex('analysis').orderBy('id', 'desc').offset((page - 1) * pageSize).limit(pageSize)
        let { count } = await knex('analysis').count('* as count').first()
        ctx.body = { code: 200, data, total: { count, page, pageSize } }

    }
    if (id == game[1].id) {     //百人斗牛
        let data = await knex('bull100_game')
            .orderBy('id', 'desc').offset((page - 1) * pageSize).limit(pageSize)
        let { count } = await knex('bull100_game').count('* as count').first()
        ctx.body = { code: 200, data, total: { count, page, pageSize } }
    }
    if (id == game[2].id) {     //德州扑克
        let data = await knex('holdempve').orderBy('id', 'desc').offset((page - 1) * pageSize).limit(pageSize)
        let { count } = await knex('holdempve').count('* as count').first()
        ctx.body = { code: 200, data, total: { count, page, pageSize } }

    }
    if (id == game[3].id) {     //龙虎斗
        let data = await knex('tiger_game')
            .orderBy('id', 'desc').offset((page - 1) * pageSize).limit(pageSize)
        let { count } = await knex('tiger_game').count('* as count').first()
        ctx.body = { code: 200, data, total: { count, page, pageSize } }

    }
    if (id == game[4].id) {     //百人通比
        let data = await knex('bulltobe_game')
            .orderBy('id', 'desc').offset((page - 1) * pageSize).limit(pageSize)
        let { count } = await knex('bulltobe_game').count('* as count').first()
        ctx.body = { code: 200, data, total: { count, page, pageSize } }

    }

    // ctx.body = {
    //     code: 200, data
    // }
}






module.exports = game