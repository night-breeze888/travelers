
### travel

#### 使用
1. 安装
```
npm i travel
```
2. 使用
```
const option: TravelOption = {
  config,
  before: function (app) {
    app.use(cors());
  },
  srvs,
  args: {
    apis,
    controllers,
  },
  after: function (app, obj: any) {

  }
}
travel(option)
```



