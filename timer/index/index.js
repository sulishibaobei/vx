// timer/index/index.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        taskInfo: {},
        differenceTime: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.getInfo();
    },
    getInfo: function() {
        var that = this;
        wx.getStorage({
            key: 'task',
            success(res) {
                that.setData({
                    title: res.data[res.data.length - 1].name,
                    taskInfo: res.data,
                    differenceTime: util.timeDifference(res.data[res.data.length - 1].startTime, res.data[res.data.length - 1].endTime)
                })
                wx.setNavigationBarTitle({
                    title: that.data.title
                });
            },
            fail(error) {}
        })
    },
    startTask: function() {
        var that = this;
        var taskInfo = this.data.taskInfo;
        taskInfo[taskInfo.length - 1].status = true;
        wx.setStorage({
            key: 'task',
            data: taskInfo,
            success(res) {
                console.log(res.data);
                that.getInfo();
                wx.showToast({
                    title: '任务启动成功',
                    icon: 'none',
                    duration: 2000
                })
            },
            fail(err) {
                console.log(err);
            },
            complete(res) {
                console.log(res);
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

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