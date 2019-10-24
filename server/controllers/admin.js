


system = {}

system.list = async function (ctx) {
    let { session, knex, email, request: { query } } = ctx
    if(!session.system_auth){
        ctx.body = {
            code: 400, msg:'not jurisdiction'
        }
        return
    }
    

    let data = await knex('sys_user').select('name','phone','created_at','updated_at','username','last_login')

    ctx.body = {
        code:200,data
    }

}

system.login = async function (ctx) {

    let { session, knex, email, request: { body }, bcrypt } = ctx

    let { userName, passWord } = body

    let uname = await knex('sys_user').where({ username: userName }).first()
    if (!uname) {
        ctx.body = {
            code: 400, msg: '账号不存在'
        }
        return
    }

    let pword = await bcrypt.compare(passWord, uname.password)
    if (!pword) {
        ctx.body = {
            code: 400, msg: '密码错误'
        }
        return
    }

    session.system_auth = true
    session.system_id = uname.id
    ctx.body = {
        code: 200, msg: '登录成功'
    }

}

system.create = async function (ctx) {
    let { session, knex, email, request: { body }, bcrypt } = ctx
    if(!session.system_auth){
        ctx.body = {
            code: 400, msg:'not jurisdiction'
        }
        return
    }
    let { name, phone, userName, passWord } = body

    let uname = await knex('sys_user').where({ username: userName }).first()
    if (uname) {
        ctx.body = {
            code: 400, msg: '账号已经存在'
        }
        return
    }

    let { salt, password } = await bcrypt.genPassword(passWord)
    let [id] = await knex('sys_user').insert({
        name,phone, username: userName, password, salt
    })

    session.system_auth = true
    session.system_id = id
    ctx.body = {
        code: 200, msg: '注册成功'
    }

}

system.put = async function (ctx) {

    let { session, knex, email, request: { body }, bcrypt ,params} = ctx
    if(!session.system_auth){
        ctx.body = {
            code: 400, msg:'not jurisdiction'
        }
        return
    }
    let {id} = params
    let { name, phone, userName, passWord } = body

    let isid = await knex('sys_user').where({ id}).first()
    if (!isid) {
        ctx.body = {
            code: 400, msg: 'id不存在'
        }
        return
    }

    let uname = await knex('sys_user').where({ username: userName }).andWhere('id','<>',id).first()
    if (uname) {
        ctx.body = {
            code: 400, msg: '账号已经存在'
        }
        return
    }

    let { salt, password } = await bcrypt.genPassword(passWord)
    await knex('sys_user').update({
        name,phone, username: userName, password, salt
    }).where({id})

    session.system_auth = true
    session.system_id = id
    ctx.body = {
        code: 200, msg: '修改成功'
    }

}


system.delete = async function (ctx) {

    let { session, knex, email, request: { body }, bcrypt ,params} = ctx
    if(!session.system_auth){
        ctx.body = {
            code: 400, msg:'not jurisdiction'
        }
        return
    }
    let {id} = params

    let uname = await knex('sys_user').where({ id}).first()
    if (!uname) {
        ctx.body = {
            code: 400, msg: '账号不存在'
        }
        return
    }

    await knex('sys_user').where({id}).del()

    ctx.body = {
        code: 200, msg: '删除成功'
    }

}

module.exports = system