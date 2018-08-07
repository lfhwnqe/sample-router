# routerofsample
> 一个前端单页应路由

安装
```
npm install routerofsample -s
```

rollup是bable配置
```
{
    "presets": [
      ["latest", {
        "es2015": {
          "modules": false
        }
      }s]
    ],
    "plugins": ["external-helpers"]
  }
```
开始时parcel配置
```
{
  "presets": ["env"]
}
```