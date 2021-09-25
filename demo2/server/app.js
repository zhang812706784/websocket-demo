/*
 * @Author: your name
 * @Date: 2021-09-13 15:03:07
 * @LastEditTime: 2021-09-18 16:54:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mutipage\webSocket\app.js
 */
// let tools = require('./tool') // 这个文件没啥用
var router = require('koa-router');
const Koa = require("koa")
// 导入WebSocket模块:
const WebSocket = require("ws")
// 引用Server类:
const WebSocketServer = WebSocket.Server;
const app = new Koa()
const route = new router();

// koa app的listen()方法返回http.Server:
const httpServer = app.listen(3000,function(){
    console.log('start in 3000 port ...')
}); //创建了一个端口号3000的服务

// 解决跨域问题
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

// 随便写一个接口 认证引入websocket不会影响其他请求
route.get('/user',async (ctx, next) => {
    // 给头设置cookie
//     ctx.cookies.set('username','lisa',{
//         domain:'localhost',
//         path:'/index',   //cookie写入的路径
//         maxAge:1000*60*60*1,
//         expires:new Date('2018-07-06'),
//         httpOnly:false,
//         overwrite:false
//     
    // ctx.cookies.set('name',ctx.headers.username,{
    //     domain:'localhost',
    //     path:'/',   //cookie写入的路径
    // })
    ctx.body = 200;
})

// 注册路由
app.use(route.routes()).use(route.allowedMethods());;

/* 
    浏览器创建WebSocket时发送的仍然是标准的HTTP请求。
    无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。
    具体的处理方式则是由koa和WebSocketServer注入的回调函数实现的。WebSocketServer会首先判断请求是不是WS请求，
    如果是，它将处理该请求，如果不是，该请求仍由koa处理。所以，WS请求会直接由WebSocketServer处理，它根本不会经过koa 
*/

// 在3000端口上打开一个WebSocket Server
let wss = new WebSocketServer({
    server: httpServer
})

// 如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket
wss.on('connection', function(ws, request){
    // ws： WebSocket
    ws.on('message', function (message) {
        let obj = JSON.parse(message)
        let msg = {
            id: new Date().getTime(),
            type: obj.type,
            user: obj.name,
            data: obj.value
        }
        wss.broadcast(JSON.stringify(msg))
    })
})

// 向所有客户端发送广播
wss.broadcast = function (data) {
    console.log(wss.clients)
    wss.clients.forEach(function (client) {
        client.send(data);
    });
};







