// pages/index/index.js
var util = require('../../utils/utils.js')
var app = getApp();

var xiaojuedingArr = require('../../utils/xiaojueding.js')
console.log(xiaojuedingArr)
wx.setStorageSync('all', xiaojuedingArr);
wx.setStorageSync('num', 100);

function randomsort(a, b) {
  return Math.random() > .5 ? -1 : 1;
}

var page = {
  data: {
    size: { //转盘大小可配置
      w: 600,
      h: 600
    },
    xiaojuedingArr: xiaojuedingArr.sort(randomsort),//对内容进行排序
    s_awards: '？',//结果
    condition:true,
    share: true,

    colorArr: [
      '#EE534F',
      '#FF7F50',
      '#FFC928',
      '#66BB6A',
      '#42A5F6',
      '#FF7F50',
      '#AA47BC',
      '#EC407A',
      '#DA70D6',
      '#FFA827',
      '#AA47BC',
      '#EE534F',
      '#42A5F6',
      '#66BB6A',
      '#FFC928',
      '#42A5F6',
      '#5C6BC0'
    ],
    fontArr: ['italic', 'oblique', 'normal'],
    sizeArr: [12, 14, 16, 18, 20, 22, 24, 26, 28],
    shengchengUrl: '',
    saveFrameFlag: false,
  },

  //接收当前转盘初始化时传来的参数
  getData(e) {
    this.setData({
      awardsConfig: e.detail,
    })
  },

  //接收当前转盘结束后的答案选项
  getAwards(e) {
    console.log(e)
    this.setData({
      s_awards: e.detail.end ? "？" : e.detail.s_awards,
    })
    let all = wx.getStorageSync('listHistory'),
        lastest = all.slice(-1)[0]   //最新的菜单list
    lastest.s_awards = e.detail.s_awards
    console.log("添加结果")
    wx.setStorageSync('listHistory', all)
  },

  //开始转
  startZhuan(e) {
    this.setData({
      zhuanflg: e.detail ? true : false
    })
  },


  onLoad: function (options) {
    console.log('=========onload============');
    this.zhuanpan = this.selectComponent("#zhuanpan");
  },

  //点击切换转盘选项
  xiaojueding(e) {
    var that = this, idx = e.currentTarget.dataset.idx, xiaojuedingArr = that.data.xiaojuedingArr;

    if (!that.data.zhuanflg) {
      for (let x in xiaojuedingArr) {
        if (idx == x && xiaojuedingArr[x].option != that.data.awardsConfig.option) {
          that.zhuanpan.switchZhuanpan(xiaojuedingArr[x]);//切换当前转盘数据选项 
          return;
        }
      }
    }
  },

  onShow: function (e) {
    console.log('============onShow============');
    if(this.data.condition){
      var that = this,
        switchTab = wx.getStorageSync('switchTab'),
        all = wx.getStorageSync('listHistory'),
        lastest = all.slice(-1)[0]   //最新的菜单list
      xiaojuedingArr = that.data.xiaojuedingArr;
      
      //判断从热门榜单 还是个人列表跳转过来的 
      // all = app.globalData.myJueding ? all : xiaojuedingArr;
      //all = app.globalData.myJueding ? xiaojuedingArr : all ;

     if(lastest){
      for (let x in lastest.awards) {
        lastest.awards[x].color = this.data.colorArr[x];
      }
   
      that.zhuanpan.switchZhuanpan(lastest, true);//切换当前转盘数据选项 
      that.setData({
        zhuanflg: false
      })
    }
    }
    // //跳转过来的
    // if (!util.isNull(switchTab)) {

    //   switchTab = switchTab == '00' ? '0' : switchTab;
    //   setTimeout(function () {
    //     for (let i in all) {
    //       if (all[i].id == switchTab) {
    //         that.zhuanpan.switchZhuanpan(all[i], true);//切换当前转盘数据选项 
    //         that.setData({
    //           zhuanflg: false
    //         })
    //         break;
    //       }
    //     }
    //   }, 500)
    // }
  },

}
Page(page);