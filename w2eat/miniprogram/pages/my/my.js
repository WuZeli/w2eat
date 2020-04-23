// miniprogram/pages/my/my.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    myassetList: [],
    activeNames: [''],  //展开的面板
    listHistory:[],
    _id:'' //点击的评论_id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  //当前展开的面板数组
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onShow:function(){
    console.log("渲染时")
    var all = wx.getStorageSync("listHistory")
    all.forEach((item)=>{
      item.str =""
      switch (item.sortidArr.canteen){
        case 1: item.str += '一饭+';break;
        case 2: item.str += '二饭+';break;
        case 3: item.str += '三饭+';break;
        case 4: item.str += '四饭+';break;
        default: item.str =''
      }
      switch (item.sortidArr.meat){
        case 0: item.str += '素+'; break;
        case 1: item.str += '荤+'; break;
        default: item.str += ''
      }
      switch (item.sortidArr.highenergy) {
        case 0: item.str += '低热量+'; break;
        case 1: item.str += '高热量+'; break;
        default: item.str += ''
      }
      switch (item.sortidArr.spicy) {
        case 0: item.str += '不辣'; break;
        case 1: item.str += '辣'; break;
        default: item.str += ''
      }
    
    })
    console.log(all)
    this.setData({
      listHistory:all
    })
    this.myasset()
  },
//再转一次
  turnToChoose(e){
    console.log("dianji")
    console.log(e.target.dataset.item)
    let item = e.target.dataset.item
    let all = wx.getStorageSync("listHistory")
    all.push(item)
    this.setData({
      listHistory:all
    })
    wx.setStorageSync("listHistory", all)
    wx.switchTab({
      url: '/pages/choose/choose',
    })
  },
//自定义关闭行为
  onClose(event) {
    const { position, instance } = event.detail;
    console.log(event.detail)
    switch (position) {
      case 'left':
      case 'cell':
      case 'outside':  //outside无法发挥
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除该评论？'
        }).then(() => {
          this.delasset()
          instance.close();
        }).catch(() => {
          instance.close();
        })
        break;
    }
  },
  
  //获取个人评论
  myasset(){
    let that = this
    wx.cloud.callFunction({
      name:"myasset",
      data:{
        openid:app.globalData.openid
      }
    }).then(res => { 
      console.log("获取个人列表")
      console.log(res.result)
      this.setData({
        myassetList:res.result.assetList
      })
      }).catch(console.error)
  },
//get_id
get_id(e){
  console.log(e.currentTarget.dataset.id)
  let _id = e.currentTarget.dataset.id
  this.setData({
    _id:_id
  })
  console.log(this.data._id)
},
//调用云函数删除
delasset(){
  var that = this
  wx.cloud.callFunction({
    name:'delasset',
    data:{
      _id:that.data._id
    }
  }).then(res => {
    console.log("jijjk")
    Toast.success("删除成功")
    this.myasset()
    }).catch(console.error)
}




})