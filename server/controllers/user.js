


user = {}


user.register = async function (ctx) {

    let { session, knex, request: { body } } = ctx

    let { player } = body

    let uname = await knex('Account').where({ player }).first()
    if (uname) {
        ctx.body = {
            code: 200, msg: '账号已经存在'
        }
        return
    }

    await knex('Account').insert({ player })

    ctx.body = {
        code: 200, msg: '注册成功'
    }

}

user.list = async function (ctx) {

    let { session, knex, query,eos,pke } = ctx

    let { player,startTime,endTime,pageSize,page } = query

    let sql = knex('Account')

    if (player) sql.where({player})
    if (startTime) sql.where('created_time','>',new Date(startTime))
    if (endTime) sql.where('created_time','<',new Date(endTime))
    let sql_count  = sql.clone()
    let { count } = await sql_count.count('* as count').first()

    sql.orderBy('id', 'desc').offset((page - 1) * pageSize).limit(pageSize)
    let data = await sql
    console.log(data)
    for(let i in data){
        let [eos_res] =await eos.query_eos(data[i].player)
        let [pke_res] = await pke.query_pke(data[i].player)
        data[i].eos = eos_res
        data[i].pke = pke_res
    }
    ctx.body = {
        code: 200, data,total:{count,pageSize,page}
    }

}

module.exports = user