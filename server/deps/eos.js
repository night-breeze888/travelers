

// console.log(global.config.mysql)

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
// const { TextEncoder, TextDecoder } = require('text-encoding');

const defaultPrivateKey = "5JZQfByWnXkZRxdxFHqQUcW4sfFN7eFHJRDqvp5wQ2FgYyMEqH5"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://mainnet-tw.meet.one:443', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

let eos = {
    // pke_transfer: async function (to, quantity, memo) {
    //     console.log(to, quantity, memo, '~~~~~~~~~')
    //     const result = await api.transact({
    //         actions: [{
    //             account: 'pokereotoken',
    //             name: 'transfer',
    //             authorization: [{
    //                 actor: 'pokereostest',
    //                 permission: 'active',
    //             }],
    //             data: {
    //                 from: 'pokereostest',
    //                 to: to,   //'shuai1234512'
    //                 quantity: quantity, //'0.0001 PKE'
    //                 memo: memo,    //'测试'
    //             },
    //         }]
    //     }, {
    //             blocksBehind: 3,
    //             expireSeconds: 30,
    //         });
    //     console.log('result~~~~~~~~~~', JSON.stringify(result));
    //     return result
    // },
    query_eos: async function (account){
       let result = await rpc.get_currency_balance('eosio.token',account,'EOS')
       console.log(`query_eos =====> ${result}`)
       return result
    }
}
eos.query_eos('shuai1234512')
// pke.pke_transfer('shuai1234512','0.0001 PKE','ceshi')
module.exports = eos