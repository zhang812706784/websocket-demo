var router = require('koa-router');
var uuid = require('node-uuid');
const route = new router();
global.userMap = new Map() // 创建全局的user信息
let allUser = global.userMap
// 随便写一个接口 认证引入websocket不会影响其他请求
route.get('/login',async (ctx, next) => {
    // 先检测cookie中是否有userid 如有有需要 查询是否存在
    // 1.存在不加入
    let userId = ctx.cookies.get('userId')
    if(!userId){
        userId = uuid.v1();
        let username = ctx.request.header.username;
        allUser.set(userId, username)
        ctx.cookies.set('userId', userId,{
            domain: ctx.request.hostname,
            path:'/',   //cookie写入的路径
        })
    }
    global.userId = userId
    // 给头设置cookie
//     ctx.cookies.set('username','lisa',{
//         domain:'localhost',
//         path:'/index',   //cookie写入的路径
//         maxAge:1000*60*60*1,
//         expires:new Date('2018-07-06'),
//         httpOnly:false,
//         overwrite:false
//     
    
    ctx.body = 200;
})

module.exports = {
    routes: route.routes(),
    allowedMethods: route.allowedMethods()
}