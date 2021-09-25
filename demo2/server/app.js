/*
 * @Author: your name
 * @Date: 2021-09-13 15:03:07
 * @LastEditTime: 2021-09-18 16:54:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mutipage\webSocket\app.js
 */

// let tools = require('./tool') // 这个文件没啥用
let { createWebSocketFun } = require('./websocketServer.js')

let { routes, allowedMethods } = require('./router.js')

const Koa = require("koa")
const app = new Koa()

// koa app的listen()方法返回http.Server:  创建一个端口号 3000的 http服务 
const httpServer = app.listen(3000,function(){
    console.log('start in 3000 port ...')
}); //创建了一个端口号3000的服务

// 解决跨域问题 统一入口 优先解决跨域问题
app.use(async (ctx, next)=> {
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:5500');
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , username');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
        await next();
    }
});

// 注册路由
app.use(routes).use(allowedMethods);

createWebSocketFun(httpServer)











