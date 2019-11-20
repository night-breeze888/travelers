
## travelers

### 使用
1. 安装
```
npm i travelers
```

2. 使用
import { travelers, travelersOption, travelersApis, travelersCtx } from 'travelers'

### src/apis/api.ts
```
import { travelersApis } from 'travelers'
let items: travelersApis = [
    {
        path: '/everyDay',
        method: 'get',
        summary: '概要',
        description: '描述',
        operationId: 'controllerKey',
        req: {
            query: {
                name: joi.string().required().regex(/^\w+$/)
            },
            body: joi.object({
                name: joi.string()
            })
        },
        res: {
            body: joi.object({
                name: joi.string()
            })
        }
    }
]
```

### src/controllers/controller.ts
```
import { travelersCtx } from 'travelers'
export async function everyDay_list(ctx: travelersCtx) {
    let {  body, srvs } = ctx
    const { knex  } = srvs
    ctx.body = {
        code: 200
    }
}

```

### src/index.ts
```
import { travelersOption, travelers } from 'travelers'
import * as  apis from './apis/index'
import * as  srvs from './srvs/index'
import * as controllers from './controllers/index'
import config from './config/index'

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
travelers(option)
```




