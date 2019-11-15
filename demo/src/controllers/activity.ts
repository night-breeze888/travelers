



import * as Koa from "koa";
import {Ctx} from "travel";
// interface Ctx extends Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext,Srvs>{
//     srvs:Srvs
// } 

// interface Ctx extends Koa.ParameterizedContext < Koa.DefaultState, Koa.DefaultContext > {
            
// }

export  async function everyDay_list(ctx:Ctx) {
    let { session, knex, body, srvs  } = ctx
    
    // if(!session.system_auth){
    //     ctx.body = {
    //         code: 400, msg:'not jurisdiction'
    //     }
    //     return
    // }
    let data = await knex('everyday_activity')

    ctx.body = {
        code: 200, data
    }
}

export  async function everyDay_award (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) {

    let { session, knex, request: { body }, params, utils, eos, status } = ctx

    let { id } = params
    let { player } = body

    let everyday_activity = await knex('everyday_activity').where({ id }).first()

    if (!everyday_activity) {
        ctx.body = { code: 400, msg: 'id不存在' }
        return
    }

    let date = new Date()
    let datestr = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    let everyday_activity_record = await knex('everyday_activity_record').where({ datestr, player }).first()
    if (everyday_activity_record) {
        ctx.body = { code: 400, msg: '你已经领取今日活动奖品' }
        return
    }

    let getDayTime = utils.getDayTime()     //今日0点的秒时间戳

    let game_record = await knex(everyday_activity.game_table).where({ player }).andWhere('created_at', '>=', getDayTime).sum('cellAmount as cellAmount').first()

    if (!game_record.cellAmount || game_record.cellAmount < everyday_activity.min_eos) {
        ctx.body = { code: 400, msg: `你的投注金额还不够领取奖品，最低消费${everyday_activity.min_eos} EOS` }
        return
    }


    let [record_id] = await knex('everyday_activity_record').insert({ datestr, player, name: everyday_activity.name, activity_id: everyday_activity.id })

    let transfer = await eos.pke_transfer(player, everyday_activity.award_pke, `领取${everyday_activity.name}游戏每日活动奖品,奖品为${everyday_activity.award_pke}`)

    if (transfer.transaction_id) {
        await knex('everyday_activity_record').where({ id: record_id }).update({ status: 1 })
        ctx.body = { code: 200, msg: '领取成功', transfer }
    } else {
        ctx.body = { code: 200, msg: '领取失败,我们会尽快处理异常数据' }
    }
}


export async function time_put(ctx) {

    let { session, knex, email, request: { body }, bcrypt, params } = ctx
    if (!session.system_auth) {
        ctx.body = {
            code: 400, msg: 'not jurisdiction'
        }
        return
    }
    let { id } = params
    let { title, start_time, end_time } = body

    let activity_time = await knex('activity_time').where({ id }).first()

    if (!activity_time) {
        ctx.body = {
            code: 200, msg: 'id不存在'
        }
        return
    }

    await knex('activity_time').update(body).where({ id })

    ctx.body = {
        code: 200, msg: '修改成功'
    }

}


export async function time_delete(ctx) {

    let { session, knex, email, request: { body }, bcrypt, params } = ctx
    if (!session.system_auth) {
        ctx.body = {
            code: 400, msg: 'not jurisdiction'
        }
        return
    }
    let { id } = params

    let uname = await knex('activity_time').where({ id }).first()
    if (!uname) {
        ctx.body = {
            code: 400, msg: 'id不存在'
        }
        return
    }

    await knex('activity_time').where({ id }).del()

    ctx.body = {
        code: 200, msg: '删除成功'
    }
}

export  async function activity_choice(ctx) {
    let { session, knex, email, request: { body }, bcrypt, params } = ctx
    if (!session.user_auth) {
        ctx.body = {
            code: 400, msg: 'not jurisdiction'
        }
        return
    }
    let { id } = params

    let iscandidate = await knex('candidate').where({ id }).first()
    if (!iscandidate) {
        ctx.body = {
            code: 400, msg: '候选人id不存在'
        }
        return
    }

    let isactivity = await knex('activity').where({ user_id: session.user_id, candidate_id: id }).first()
    if (!isactivity) {
        ctx.body = {
            code: 400, msg: '你已经对该候选人投票'
        }
        return
    }

    let cdd_count = await knex('candidate').count('* as count')

    let activity_count = Math.round(cdd_count.count / 2)        //能投票的次数

    if (activity_count < 2) activity_count = 2
    if (activity_count > 5) activity_count = 5

    let user_count = await knex('activity').count('* as count')

    if (user_count.count > activity_count) {
        ctx.body = {
            code: 400, msg: `目前最大投票次数未${activity_count},你已经超过最大次数`
        }
        return
    }

    await knex('activity').insert({ user_id: session.user_id, candidate_id: id })

    ctx.body = {
        code: 200, msg: '投票成功'
    }

}


