// miniprogram/pages/home/home.js
let publicMethod = require("../../utils/publicMethod.js")
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
let tempsortidArr = []
let arr = []
Page({
  data: {
    swiperCurrent:0,
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    duration:500,//滑动动画时长
    circular: true,//是否采用衔接动画，
    text:"吃嘛嘛香，身体倍儿棒！",
    imgUrls: [  /**改为请求 */
      "./image/1.jpg",
      "./image/2.jpg",
      "./image/3.jpg"
    ],
    constList:[
      { text: "食堂", 
        sortid: 1,
       children:[
         { sortid:{ canteen: 1 },name: "一饭", icon: "flower-o"},
         { sortid:{ canteen: 2 },name: "二饭", icon: "flower-o"},
         { sortid: { canteen: 3 },name: "三饭", icon: "flower-o"},
         { sortid: { canteen: 4 },name: "四饭", icon: "flower-o"}
         ]
      },
      {
        text: "类别",
        sortid: 2,
        children: [
          { sortid: { meat: 1 },name: "荤菜", icon: "flower-o" },
          { sortid: { meat: 0 },name: "素菜", icon: "flower-o" },
          { sortid: { highenergy: 1 },name: "高热量", icon: "flower-o" },
          { sortid: { highenergy: 0 }, name: "低热量", icon: "flower-o" }
        ]
      },
      {
        text: "口味",
        sortid: 3,
        children: [
          { sortid: { spicy: 1},name: "辣", icon: "flower-o" },
          { sortid: { spicy: 0 },name: "不辣", icon: "flower-o" }
        ]
      }
    ],
    // sortidArr:[{canteen:1},1]
    listHistory:[]
  },
  //轮播图的切换事件
  swiperChange:function(e){
    this.setData({
      swiperCurrent:e.detail.current
    })
  },
  //点击指示点切换   /**补充 */

  //点击图片
  swiperClick:function(e){
    console.log(this.data.swiperCurrent);
    /**补充操作 */
  },
  //点击宫格
  gridItemClick(e){
    // console.log(e.currentTarget.dataset.sortid)
    let sortid = e.currentTarget.dataset.sortid
    let index = tempsortidArr.indexOf(sortid)
    if (index!==-1) {//若存在-f
      tempsortidArr.splice(index,1)
    }else{
      tempsortidArr.push(sortid)
    }
    this.setData({
      sortidArr: tempsortidArr
    })
    console.log(this.data.sortidArr)
  },
//点击搜索按钮
  searchcourse() {
    if (tempsortidArr.length == 0){
      Toast.fail("请先选择条件")
    }else{
      arr = this.data.sortidArr.reduce(function (acc, cur) {
        return Object.assign(acc, cur);
      });
      console.log(arr)
      wx.cloud.callFunction({
        name: 'searchcourse',
        data: {
          canteen: arr.canteen,
          meat: arr.meat,
          highenergy: arr.highenergy,
          spicy: arr.spicy
        }
      })
        .then(res => {
          console.log(res.result.courseList)
          if (res.result.courseList.length == 0){
            Toast.fail("无符合条件的菜品")
          }else{
            this.data.listHistory.push({
              sortidArr: arr,
              awards: res.result.courseList,
              s_awards:''
            })
            wx.setStorageSync('listHistory', this.data.listHistory);
            tempsortidArr = []  //保存至缓存之后清空tempsortidArr
            wx.switchTab({      //跳转到转盘页面
              url: '/pages/choose/choose',
            })
          }
        })
        .catch(console.error)
      
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: app.globalData.userInfo.nickName
    })
    wx.cloud.init()
    //获取历史转盘缓存
    var that = this
    publicMethod.getHistory(that)
  }







})