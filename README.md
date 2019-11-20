
### travelers

#### 使用
1. 安装
```
npm i travelers
```
2. 使用
```
import { travelers, travelersOption, travelersApis } from 'travelers'
```

#### src/apis/api.ts
```
let items: travelersApis = [
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
    }
]
```

#### src/controllers/controller.ts
```
const option: travelersOption = {
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
```

### src/index.js
```
travelers(option)
```



