// https://www.npmjs.com/package/ws  nodeJs一个ws库 用于websocket
const WebSocket = require('ws');
const path = require("path")
const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views')
const serve = require('koa-static')

const app = new Koa();

const httpServer = app.listen(30002);

// begin websocket start
// 引用server类
const WebSocketServer = WebSocket.Server;

// 在30001端口上打开一个WebSocket Server
let wss = new WebSocketServer({
    server: httpServer
})
console.log(path.join(__dirname + '/../view'))
// 这地方有个bug
app.use(views(path.join(__dirname + '/../view'),
    {
        extension: 'html'
    }
)).use(router.routes());
// 前端websocket发送连接请求 走这里
wss.on('connection', function (ws) {
    // ws websocket实例
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});

// end websocket start

// url地址请求页面
router.get('/simple-demo', async (ctx, next)=>{
    await ctx.render('simple-demo');
})
console.log(__dirname)






