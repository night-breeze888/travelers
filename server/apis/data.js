

let data_info = [
    {
        name: 'name',
        in: 'formData',        //query get  path {}  formData post
        description: '游戏名称',
        required: true,
        type: 'string'
    },
    {
        name: 'english_name',
        in: 'formData',        //query get  path {}  formData post
        description: '英文游戏名称',
        required: true,
        type: 'string'
    },
    {
        name: 'status',
        in: 'formData',        //query get  path {}  formData post
        description: '上线状态 状态：1-上线 2-即将上线',
        required: true,
        type: 'string'
    },
    {
        name: 'banner',
        in: 'formData',        //query get  path {}  formData post
        description: 'banner链接',
        required: true,
        type: 'string'
    },
    {
        name: 'url',
        in: 'formData',        //query get  path {}  formData post
        description: '游戏链接',
        required: true,
        type: 'string'
    }
]

module.exports = [
    {
        path: '/list',
        method: 'get',
        summary: '获取游戏列表',
        description: '获取游戏列表',
        tags: 'data',
        handler: 'data.list',
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
        path: '/create',
        method: 'post',
        summary: '添加游戏',
        description: '添加游戏',
        tags: 'data',
        handler: 'data.create',
        parameters: data_info,
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
        summary: '修改游戏信息',
        description: '修改游戏信息',
        tags: 'data',
        handler: 'data.put',
        parameters: [
            {
                name: 'id',
                in: 'path',        //query get  path {}  formData post
                description: '候选人id',
                required: true,
                type: 'string'
            },
            {
                name: 'status',
                in: 'formData',        //query get  path {}  formData post
                description: '上线状态 状态：1-上线 2-即将上线',
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
        path: '/record',
        method: 'get',
        summary: '获取游戏记录',
        description: '获取游戏列表',
        tags: 'data',
        handler: 'data.record',
        parameters: [
            {
                name: 'dataId',
                in: 'formData',        //query get  path {}  formData post
                description: '游戏id',
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