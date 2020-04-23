// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//返回用户openid
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    openid: wxContext.OPENID
  }
}