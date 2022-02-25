### 1 vue

vue 版本为2.x，`element ui`也是适配 vue 2.x，对于3.x 会有不适配。

### 2 需要修改的地方

#### 2.1 src/main.js

打开路由规则，存储token，无`token`跳转到`login`

```js
import "@/router/permit";
```

#### 2.2 src/router/index.js

将`index`改为`login`，这样默认跳转到`login`页面。

```js
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: { name: "主页" }
  },
```



