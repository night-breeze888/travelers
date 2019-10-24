

let game_info = [
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
        tags: 'game',
        handler: 'game.list',
        parameters: [
            {
                name: 'startTime',
                in: 'query',        //query get  path {}  formData post
                description: '开始时间',
                required: false,
                type: 'string'
            },
            {
                name: 'endtTime',
                in: 'query',        //query get  path {}  formData post
                description: '开始时间',
                required: false,
                type: 'string'
            },
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
        path: '/record/{id}',
        method: 'get',
        summary: '获取游戏记录',
        description: '获取游戏列表',
        tags: 'game',
        handler: 'game.record',
        parameters: [
            {
                name: 'id',
                in: 'path',        //query get  path {}  formData post
                description: '游戏id',
                required: true,
                type: 'string'
            },
            {
                name: 'pageSize',
                in: 'query',        //query get  path {}  formData post
                description: '一次多少条',
                required: true,
                type: 'string'
            },
            {
                name: 'page',
                in: 'query',        //query get  path {}  formData post
                description: '多少页',
                required: true,
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
    // {
    //     path: '/create',
    //     method: 'post',
    //     summary: '添加游戏',
    //     description: '添加游戏',
    //     tags: 'game',
    //     handler: 'game.create',
    //     parameters: game_info,
    //     responses: {
    //         '200': {
    //             description: '通过返回值来标示执行结果　返回true表示执行成功'
    //         },
    //         default: {
    //             description: '操作异常,执行失败.返回信息描述错误详情'
    //         }
    //     }
    // },

    // {
    //     path: '/list/{id}',
    //     method: 'put',
    //     summary: '修改游戏信息',
    //     description: '修改游戏信息',
    //     tags: 'game',
    //     handler: 'game.put',
    //     parameters: [
    //         {
    //             name: 'id',
    //             in: 'path',        //query get  path {}  formData post
    //             description: '候选人id',
    //             required: true,
    //             type: 'string'
    //         },
    //         {
    //             name: 'status',
    //             in: 'formData',        //query get  path {}  formData post
    //             description: '上线状态 状态：1-上线 2-即将上线',
    //             required: true,
    //             type: 'string'
    //         }
    //     ],
    //     responses: {
    //         '200': {
    //             description: '通过返回值来标示执行结果　返回true表示执行成功'
    //         },
    //         default: {
    //             description: '操作异常,执行失败.返回信息描述错误详情'
    //         }
    //     }
    // },

]