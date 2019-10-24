

let sys_info = [
    {
        name: 'name',
        in: 'formData',        //query get  path {}  formData post
        description: '姓名',
        required: true,
        type: 'string'
    },
    {
        name: 'phone',
        in: 'formData',        //query get  path {}  formData post
        description: '电话',
        required: true,
        type: 'string'
    },
    {
        name: 'userName',
        in: 'formData',        //query get  path {}  formData post
        description: '账号',
        required: true,
        type: 'string'
    },
    {
        name: 'passWord',
        in: 'formData',        //query get  path {}  formData post
        description: '密码',
        required: true,
        type: 'string'
    }
]

module.exports = [
    {
        path: '/list',
        method: 'get',
        summary: '管理员列表',
        description: '管理员列表查询',
        tags: 'admin',
        handler: 'admin.list',
        parameters: [

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
        path: '/list/{id}',
        method: 'put',
        summary: '管理员修改',
        description: '管理员修改',
        tags: 'admin',
        handler: 'admin.put',
        parameters: [
            {
                name: 'id',
                in: 'path',        //query get  path {}  formData post
                description: '管理员id',
                required: true,
                type: 'string'
            },
            {
                name: 'authorized',
                in: 'formData',        //query get  path {}  formData post
                description: '权限 [管理，用户，游戏，数据，活动]  0 - 否  1 - 有 如[1,1,1,1,1]',
                required: false,
                type: 'object'
            },
            {
                name: 'status',
                in: 'formData',        //query get  path {}  formData post
                description: '状态',
                required: false,
                type: 'string'
            },
            {
                name: 'password',
                in: 'formData',        //query get  path {}  formData post
                description: '密码',
                required: false,
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
        path: '/list/{id}',
        method: 'delete',
        summary: '管理员删除',
        description: '管理员删除',
        tags: 'admin',
        handler: 'admin.delete',
        parameters: [
            {
                name: 'id',
                in: 'path',        //query get  path {}  formData post
                description: '管理员id',
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