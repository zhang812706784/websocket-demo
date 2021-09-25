// 导入WebSocket模块:
const WebSocket = require("ws")
function createWebSocketFun(httpServer){
    // 引用Server类:
    const WebSocketServer = WebSocket.Server;
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
        debugger;
        console.log(global.userId)
        console.log(global.userMap)
        let userOnLine = []
        let userId = request.headers.cookie.match(/userId=(.+)/)[1]
        for (let value of global.userMap.values()) {
            userOnLine.push(value);
        }
        broadCast({
            type: 'login',
            uName: global.userMap.get(userId),
            data: `${global.userMap.get(userId)} 上线了`,
            userOnLine: userOnLine
        })
        ws.on('message', function (message) {
            let msg = {
                type: 'chat',
                uName: global.userMap.get(userId),
                data: message.toString(),
                userOnLine: []
            }
            broadCast(msg)
        })
    })

    // 向所有客户端发送广播
    wss.broadcast = function (data) {
        console.log(wss.clients)
        wss.clients.forEach(function (client) {
            client.send(data);
        });
    };

    function broadCast(data){
        wss.broadcast(JSON.stringify(data))
    }
    
}



module.exports = {
    createWebSocketFun
}



