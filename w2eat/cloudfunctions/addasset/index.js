//添加评论
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: "doubledou-2b56ca"
})


// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('asset').add({
    //data字段表示需要新增的json数据
    data:{
      content: event.content,
      value: event.value,
      username: event.username,
      imgurl: event.imgurl,
      time: event.time.substring(0, 10),
      openid:event.openid
    }
  }).then(res => {
    return {
      status:200
    }
  })
    .catch(console.error)
}