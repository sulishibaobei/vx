
Page({
  data: {
     map:[]
  },
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
        this.setData({
          wd:Number(latitude),
          jd:Number(longitude)
        })
      }
    })
  }
})