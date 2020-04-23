function getHistory(that) {
  wx.getStorage({
    key: "listHistory",
    success: function (res) {
     that.setData({
        listHistory: res.data
      })
    },
    fail: function (res) {
      wx.setStorage({
        key: 'listHistory',
        data: []
      })
    }

  });
}

module.exports.getHistory = getHistory