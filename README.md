# websocket-demo
websocket案例(H5-websocket)

后台nodeJs 
安装
    ws  npm install ws
    koa
    koa-router 
    
    # nunjucks(nodeJS一个html模板)  npm install nunjucks 没用到


demo1:
    简单的websocket创建及后端交互
    npm run s-dev  启动demo1的后台服务
    
    http://localhost:30002/simple-demo 访问前端页面

    
demo2:
    简易聊天室 
    demo2中用到了一个 live server的插件（小服务器），用vscode就可以安装 

    npm run dev  启动demo2的后台服务

    后台文件说明：
    websocketServer.js  --》 websocket相关
    router.js --》 接口相关
    app.js --》程序主入口

参考文档：
https://zhuanlan.zhihu.com/p/149680021
https://juejin.cn/post/6844903544978407431

杀进程：
netstat -aon | findstr "8080"
taskkill /pid 4456 /F