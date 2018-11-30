// douban/item/item.js
// 获取全局应用程序实例对象
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        movie: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({ title: '拼命加载中...' })

        app.douban.findOne(options.id)
            .then(d => {
                this.setData({ title: d.title, movie: d })
                wx.setNavigationBarTitle({ title: d.title })
                wx.hideLoading()
            })
            .catch(e => {
                this.setData({ title: '获取数据异常', movie: {} })
                console.error(e)
                wx.hideLoading()
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({ title: this.data.title })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: this.data.title,
            desc: this.data.title,
            path: '/pages/item?id=' + this.data.id
        }
    }
})