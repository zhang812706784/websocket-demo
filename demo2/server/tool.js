/*
 * @Author: your name
 * @Date: 2021-09-13 15:23:45
 * @LastEditTime: 2021-09-13 16:07:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mutipage\webSocket\tool.js
 */
var Cookies = require('cookies')
function parseUser(obj){
    if(!obj){
        return;
    }
    let s = ''
    if(typeof obj == 'string'){
        s = obj
    }else if(obj.headers){
        let cookies = new Cookies(obj, null)
        s = cookies.get('name')
    }

    if(s){
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString())
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (error) {
            
        }
    }
}

module.exports = {
    parseUser
}