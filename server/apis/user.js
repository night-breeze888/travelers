
module.exports = [
    {
        path: '/register',
        method: 'post',
        summary: '用户注册',
        description: '用户输入有账户名称',
        tags: 'user',
        handler: 'user.register',
        parameters: [
            {
                name: 'player',
                in: 'formData',        //query get  path {}  formData post
                description: '账号名称',
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
    },
    {
        path: '/list',
        method: 'get',
        summary: '用户列表',
        description: '用户列表',
        tags: 'user',
        handler: 'user.list',
        parameters: [
            {
                name: 'player',
                in: 'query',        //query get  path {}  formData post
                description: '账号名称',
                required: false,
                type: 'string'
            },
            {
                name: 'startTime',
                in: 'query',        //query get  path {}  formData post
                description: '查询开始时间',
                required: false,
                type: 'string'
            },
            {
                name: 'endTime',
                in: 'query',        //query get  path {}  formData post
                description: '查询结束时间',
                required: false,
                type: 'string'
            },
            {
                name: 'pageSize',
                in: 'query',        //query get  path {}  formData post
                description: '查询条数',
                required: true,
                type: 'string'
            },
            {
                name: 'page',
                in: 'query',        //query get  path {}  formData post
                description: '查询页数',
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