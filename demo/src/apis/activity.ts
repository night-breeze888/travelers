

import * as joi from 'joi'
import { TravelApis } from 'travel'

let items: TravelApis = [
    {
        path: '/everyDay',
        method: 'get',
        summary: '获取游戏每日活动列表',
        description: '获取游戏每日活动列表',
        operationId: 'everyDay_list',
        req: {
            query: {
                name: joi.string().required().regex(/^\w+$/)
            }
        },
        res: {
            body: joi.object({
                name: joi.string()
            })
        }
    },
    {
        path: '/everyDay',
        method: 'post',
        summary: '获取游戏每日活动列表',
        description: '获取游戏每日活动列表',
        operationId: 'everyDay_list1',
        req: {
            query: {
                name: joi.string().required()
            },
            body: joi.array().items(joi.string())
        },
        res: {
            body: joi.object({
                name: joi.string()
            })
        }
    }
]

export default items

// [
//     {
//         path: '/everyDay',
//         method: 'get',
//         summary: '获取游戏每日活动列表',
//         description: '获取游戏每日活动列表',
//         operationId: 'everyDay_list',

//         responses: {
//             '200': {
//                 description: '通过返回值来标示执行结果　返回true表示执行成功'
//             },
//             default: {
//                 description: '操作异常,执行失败.返回信息描述错误详情'
//             }
//         }
//     },
//     {
//         path: '/everyDay/award/{id}',
//         method: 'post',
//         summary: '每日活动奖品领取',
//         description: '每日活动奖品领取',
//         operationId: 'activity.everyDay_award',
//         parameters: [
//             {
//                 name: 'id',
//                 in: 'path',        //query get  path {}  formData post
//                 description: '每日活动列表id',
//                 required: true,
//                 type: 'string'
//             },
//             {
//                 name: 'player',
//                 in: 'formData',        //query get  path {}  formData post
//                 description: '玩家名称',
//                 required: true,
//                 type: 'string'
//             }
//         ],
//         responses: {
//             '200': {
//                 description: '通过返回值来标示执行结果　返回true表示执行成功'
//             },
//             default: {
//                 description: '操作异常,执行失败.返回信息描述错误详情'
//             }
//         },

//     }
// ]
