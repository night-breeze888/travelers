
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

### src/apis/index.ts
```js
import api from "./api";

export { api };
```

### src/controllers/controller.ts
```js
import { Req, Res } from "travelers";
export async function operationId(req: Req, res: Res) {
    let { body, srvs } = req;
    const { knex, codes } = srvs;
    codes.ok.resJson(res);
}
```

### src/controllers/index.ts
```js
import * as controller from "./controller";
const controllers = {
    ...controller
};
export default controllers;
```

### src/index.ts
```js

import { travelers, TravelersOption, Req, Res, NextFunction, Config } from "travelers";
import * as apis from "./apis/index";
import * as srvs from "./srvs/index";
import controllers from "./controllers/index";
import config from "./config/index";
import * as security from "./security";
const option: TravelersOption = {
    config,
    before: function (app) {

    },
    srvs,
    security,
    apis,
    controllers,
    after: function (app, srvs) {
        app.use((req: Req, res: Res) => {
            const { codes } = req.srvs;
            return codes.notfind.resJson(res);
        });
    }
};
travelers(option).then(data => {
    // console.log(JSON.stringify(data, null, 4));
});

```


