
module.exports = [
    {
        path: '/login',
        method: 'post',
        summary: '用户登录',
        description: '用户输入有账户名称',
        tags: 'auth',
        handler: 'auth.login',
        parameters: [
            {
                name: 'username',
                in: 'formData',        //query get  path {}  formData post
                description: '账号',
                required: true,
                type: 'string'
            },
            {
                name: 'password',
                in: 'formData',        //query get  path {}  formData post
                description: '密码',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            '200': {
                description: '通过返回值来标示执行结果　返回true表示执行成功'
            },
            default: {
                description: '操作异常,执行失败.返回信息描述错误详情'
            }
        }
    }
]