// pages/detail/page.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    art:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.body) {
          var body = res.data.body;
          /**
           * 获取正文部分 p标签包裹的部分
           */
          body = body.match(/<p>.*?<\/p>/g);
          var text = [];
          if (body) {
            for (var i = 0, len = body.length; i < len; i++) {
              text[i] = /<img.*?>/.test(body[i]);
              if (text[i]) {
                body[i] = body[i].match(/(http:|https:).*?\.(jpg|jpeg|gif|png)/);
              } else {
                body[i] = body[i].replace(/<p>/g, '')
                  .replace(/<\/p>/g, '')
                  .replace(/<strong>/g, '')
                  .replace(/<\/strong>/g, '')
                  .replace(/<a.*?\/a>/g, '')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&ldquo;/g, '"')
                  .replace(/&rdquo;/g, '"');
              }
            }
          }
          res.data.body = body;
          console.log(res.data);
        }
        that.setData({
          art: res.data,
        })
      }
    })
  },
  onPageScroll: function (e) { 
    console.log(e) 
    if (e.scrollTop > 100) { 
         this.setData({ floorstatus: true });
       } else { 
         this.setData({ floorstatus: false }); 
      } 
  },
   //回到顶部 
   goTop: function (e) { // 一键回到顶部 
   if (wx.pageScrollTo) {
      wx.pageScrollTo({ 
        scrollTop: 0
      }) 
      } else { 
        wx.showModal({ 
          title: '提示', 
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。' 
      }) 
    } 
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