


auth = {}



auth.login = async function (ctx) {

    let { session, knex, email, request: { body }, bcrypt } = ctx

    let { username, password } = body

    let uname = await knex('system').where({ username }).first()
    if (!uname) {
        return { code: 400, msg: '账号不存在' }
    }

    let pword = await knex('system').where({ username, password }).first()
    if (!pword) {
        return { code: 400, msg: '密码错误' }
    }

    session.auth = true
    session.auth_id = uname.id
    return { code: 200, msg: '登录成功' }

}



module.exports = auth