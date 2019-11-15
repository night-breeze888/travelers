
export default  {
  port: 3005,
  host: '0.0.0.0',
  knex: {
    client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
    connection: { //指明连接参数
      host: '47.75.215.23',
      user: 'root',
      password: 'r4110f27',
      database: 'niuniu2re'
    },
    debug: true, //指明是否开启debug模式，默认为true表示开启
    pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
      min: 2,
      max: 20,
    },
    acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
    migrations: {
      tableName: 'migrations' //数据库迁移，可选
    }
  },
  redis: {
    port: 6379,          // Redis port
    host: '47.75.215.23',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'wb67gtce',
    db: 0
  },
  session_redis: {
    port: 6379,          // Redis port
    host: '47.75.215.23',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'wb67gtce',
    db: 1
  },
  swagger:{
    swagger: '2.0',
    info: {
        title: '投票系统接口文档',
        description: '投票系统',
        version: '1.0.0'
    },
    host: 'pokereos.io/api',
    basePath: '/v1',
    schemes: ['https'],
    produces: ['application/json'],
    paths: {}
  },
  game:[
    {
      "id": 213,
      "english_name": "",
      "name": "二人斗牛",
      "status": 1,
      "created_at": "2019-04-02T02:46:37.000Z",
      "updated_at": null,
      "deleted_at": null,
      "banner": null,
      "url": null
    },
    {
      "id": 214,
      "english_name": null,
      "name": "百人斗牛",
      "status": 1,
      "created_at": "2019-04-02T02:46:45.000Z",
      "updated_at": null,
      "deleted_at": null,
      "banner": null,
      "url": null
    },
    {
      "id": 215,
      "english_name": null,
      "name": "德州扑克",
      "status": 1,
      "created_at": "2019-04-02T02:46:52.000Z",
      "updated_at": null,
      "deleted_at": null,
      "banner": null,
      "url": null
    },
    {
      "id": 216,
      "english_name": null,
      "name": "龙虎斗",
      "status": 1,
      "created_at": "2019-04-02T02:46:56.000Z",
      "updated_at": null,
      "deleted_at": null,
      "banner": null,
      "url": null
    },
    {
      "id": 217,
      "english_name": null,
      "name": "百人通比",
      "status": 1,
      "created_at": "2019-04-02T02:47:01.000Z",
      "updated_at": null,
      "deleted_at": null,
      "banner": null,
      "url": null
    }
  ]
}