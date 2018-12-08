// timer/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        task: [],
        animation: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.getStorage({
            key: 'task',
            success(res) {
                that.setData({
                    task: res.data
                })
            },
            fail(error) {
                that.setData({
                    task: []
                })
            }
        })
    },

    gotoNewTask: function() {
        var animation = wx.createAnimation({
            transformOrigin: "100% 50%",
            duration: 1000,
            timingFunction: "ease",
            delay: 0
        });
        animation.opacity(0.8).step({ duration: 1000 });
        this.setData({
            animation: animation.export()
        });
        wx.navigateTo({
            url: '../newTask/newTask'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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

    }
})