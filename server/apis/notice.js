

let notice_info = [
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
        summary: '获取公告列表',
        description: '获取公告列表',
        tags: 'notice',
        handler: 'notice.list',
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
        summary: '添加公告',
        description: '每日活动奖品领取',
        tags: 'notice',
        handler: 'notice.create',
        parameters: [
            {
                name: 'title',
                in: 'formData',        //query get  path {}  formData post
                description: '标题',
                required: true,
                type: 'string'
            },
            {
                name: 'content',
                in: 'formData',        //query get  path {}  formData post
                description: '内容',
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