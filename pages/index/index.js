
const util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
   
  data: {
    list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    loading:false,
    plain:false
  },

  loadMore: function (e) {
    console.log(e.currentTarget.dataset)
    if (this.data.lenght == 0) return;
    var date = this.getNextDate();
    var that = this;
    that.setData({ loading: true });
    wx.request({
      url: 'https://news.at.zhihu.com/api/4/news/before/' + (Number(util.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: util.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate: function () {
    const now = new Date()
    now.setDate(now.getDate() - this.index++);
    return now
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          banner: res.data.top_stories,
          list: [{ header: '今日热闻' }].concat(res.data.stories)
        })
      }
    })
    this.index = 1;
  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})