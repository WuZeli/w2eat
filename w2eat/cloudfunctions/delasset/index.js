//删除评论
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: "doubledou-2b56ca"
})


// 云函数入口函数

exports.main = async (event, context) => {
  try {
    return await db.collection('asset').where({
      _id: event._id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}