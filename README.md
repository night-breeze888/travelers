
## travelers

### 使用
1. 安装
```
npm i travelers
```

2. 使用

### src/apis/api.ts
```js
import * as joi from "joi";
import { travelersApis } from "travelers";
let items: travelersApis = [
    {
        path: "/everyDay",
        method: "get",
        summary: "获取游戏每日活动列表",
        description: "获取游戏每日活动列表",
        operationId: "everyDay_list",
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
];
export default items;
```

### src/controllers/controller.ts
```js
import { Request, Response } from "travelers";
export async function everyDay_list(req: Request, res: Response) {
    let { body, srvs } = req;
    const { knex } = srvs;
    res.json({
        code: 200
    });
}
```

### src/index.ts
```js
import { travelers, travelersOption,Response,Request,NextFunction } from "travelers";
import * as apis from "./apis/index";
import * as srvs from "./srvs/index";
import * as controllers from "./controllers/index";
import config from "./config/index";
const option: travelersOption = {
    config,
    before: function (app) {
    
    },
    srvs,
    args: {
        apis,
        controllers,
    },
    after: function (app, obj: any) {
        app.use((req: Request, res: Response) => {
            const { codes } = req.srvs;
            return codes.notfind.resJson(res);
        });
    }
};
travelers(option);

```


