// miniprogram/pages/asset/asset.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({
  data: {
    assetList:[],
    userInfo:{},
    show:false,
    condition:false,
    newasset:{
      value:0,
      content:''
    }
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    console.log("openid",app.globalData.openid)
    //调用云函数获取评论内容
    // wx.cloud.init()
    this.getasset()
  },
//关闭评论
  onClose() {
    this.setData({show:false});
  },
  //打开评论
  onClick(){
    this.setData({show:true})
  },
  //输入评论内容
  contentChange(e){
    let str = 'newasset.content'
    this.setData({[str]: e.detail})
    console.log(this.data.newasset.content)  //{value: "dsdasdasdsadsd", cursor: 14}
  },
  //输入
  rateChange(e){
    let str = 'newasset.value'
    this.setData({ [str]: e.detail })
    console.log(this.data.newasset.value) 
  },
  
  //获取评论
  getasset(){
    wx.cloud.callFunction({
      name: 'getasset'
    })
      .then(res => {
        let newassetList = res.result.assetList
        if(newassetList.length == 0){
          this.setData({
            condition:true
          })
        }else{
          this.setData({
            condition: false
          })
          // newassetList.forEach((item) => {
          //   item.time = item.time.substring(0, 10)
          // })
           this.setData({ assetList: newassetList });
        }
      })
      .catch(console.error)
  },
  //添加评论
  addasset(){
    wx.cloud.callFunction({
      name: 'addasset',
      data:{
        openid: app.globalData.openid,
        content: this.data.newasset.content,
        value: this.data.newasset.value,
        time: new Date(),
        imgurl: this.data.userInfo.avatarUrl,
        username: this.data.userInfo.nickName
      }
    })
      .then(res => {
        if(res.result.status == 200){
          console.log("ok")
          // 清空评论区内容  无法双向绑定？
          let str1 = 'newasset.content'
          let str2 = 'newasset.value'
          this.setData({
            [str1]: '',
            [str2]: 0,
            show:false
          })
          this.getasset()
          Toast.success('发表成功');
          
        }
      })
      .catch(console.error)
  }
 
})

