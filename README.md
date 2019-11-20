
### travelers

#### 使用
1. 安装
```
npm i travelers
```
2. 使用
```
import { travelers, travelersOption } from 'travelers'
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



