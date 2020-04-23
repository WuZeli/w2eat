//app.js
App({
  globalData: {
    userInfo: null,
    openid:''
   // appid:"	wx22a5e19a1ba77fd2",
   // secret:"2f4f8ef7d981b1eaed341c197062c9c8" //小程序密钥
  },
  data: {
    active: 'home'
  },
  onChange(event) {
    this.setData({
      active: event.detail
    });
  },
  onLaunch: function () {
    //初始化云开发
    wx.cloud.init({
      env:"doubledou-2b56ca"
    })
    // 登录
    this.login()
    //获取openid
    this.getOpenid()
  },
  getOpenid(){
    let that = this;
    wx.cloud.callFunction({
      name:'getOpenid'
    }).then(res =>{
      console.log("获取到的用户openid:",res.result.openid)
      this.globalData.openid = res.result.openid
    })
  },
  login(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
 
})