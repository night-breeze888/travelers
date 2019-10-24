

let avtivity_info = [
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
        path: '/everyDay',
        method: 'get',
        summary: '获取游戏每日活动列表',
        description: '获取游戏每日活动列表',
        tags: 'activity',
        handler: 'activity.everyDay_list',
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
        path: '/everyDay/award/{id}',
        method: 'post',
        summary: '每日活动奖品领取',
        description: '每日活动奖品领取',
        tags: 'activity',
        handler: 'activity.everyDay_award',
        parameters: [
            {
                name: 'id',
                in: 'path',        //query get  path {}  formData post
                description: '每日活动列表id',
                required: true,
                type: 'string'
            },
            {
                name: 'player',
                in: 'formData',        //query get  path {}  formData post
                description: '玩家名称',
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