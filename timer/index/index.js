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
        differenceTime: '',
        taskArr: []
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
        setTimeout(function() {
            wx.hideLoading()
        }, 2000)
        wx.getStorage({
            key: 'task',
            success: function(res) {
                wx.hideLoading();
                that.setData({
                    title: res.data[res.data.length - 1].name,
                    taskInfo: res.data[res.data.length - 1],
                    taskArr: res.data,
                    differenceTime: util.timeDifference(res.data[res.data.length - 1].startTime, res.data[res.data.length - 1].endTime),
                    timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
                        that.data.differenceTime--;
                        that.setData({
                            differenceTime: that.data.differenceTime
                        })
                        if (that.data.differenceTime == 0) {
                            clearInterval(that.data.timer);

                        }
                    }, 60000)
                })
                wx.setNavigationBarTitle({
                    title: that.data.title
                });
            },
            fail: function(error) {}
        })

    },
    startTask: function() {
        var that = this;
        var taskArr = this.data.taskArr;
        if (taskArr[taskArr.length - 1].status) {
            taskArr[taskArr.length - 1].status = false;
        } else {
            taskArr[taskArr.length - 1].status = true;
        }
        wx.setStorage({
            key: 'task',
            data: taskArr,
            complete: function(res) {
                that.getInfo();
                wx.showToast({
                    title: '操作成功',
                    icon: 'none',
                    duration: 2000
                })
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