


let node = []   //节点网络排名
let refresh_node = []           //节点更新网络排名用
let request = require('request');

let node_url = [
    'https://openapi.eos.ren/v1/chain/get_info',
    'https://proxy.eosnode.tools/v1/chain/get_info',
    'https://node.betdice.one/v1/chain/get_info',
    'https://api.eosbeijing.one/v1/chain/get_info',
    'https://mainnet-tw.meet.one/v1/chain/get_info',
    'https://api.eossweden.se/v1/chain/get_info'
]

timer(1000)

function timer(time) {      //time 参数为单位毫秒
    refresh_node = []
    let request_before_date = new Date().getTime()
    for (let i in node_url) {
        request({
            method: 'GET',
            uri: node_url[i],
            timeout: time - 400,      //超时
        }, function (error, response, body) {
            // if (error) console.log('error~~~~~~~~~~', error)
            if (response && response.statusCode == 200) {
                let request_affter_date = new Date().getTime()
                if (request_affter_date - request_before_date < time) {
                    // console.log(response)
                    refresh_node.push({ url: node_url[i], await: request_affter_date - request_before_date })
                }
            }
        });
    }

    setTimeout(() => {
        node = refresh_node
        timer(time)
    }, time)

}


setInterval(() => {
    console.log('node~~~~~',node,'node~~~~~~')
}, 2000);


