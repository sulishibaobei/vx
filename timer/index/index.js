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
        taskArr: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.getInfo();
        that.sys();

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
    sys: function() {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log(res.windowWidth);
                console.log(res.windowHeight);
                that.setData({
                    windowW: res.windowWidth,
                    windowH: res.windowHeight / 2
                })
            },
        })
    },
    saveImage: function() {
        //  const ctx = wx.createCanvasContext('canvas')
        //  ctx.setFillStyle('red')
        // ctx.fillRect(0, 0, this.data.windowW, 360);
        // ctx.draw(true, setTimeout(function() {
        //     wx.canvasToTempFilePath({
        //         x: 0,
        //         y: 0,
        //         width: 150,
        //         height: 100,
        //         destWidth: 150,
        //         destHeight: 100,
        //         canvasId: 'canvas',
        //         success: function(res) {
        //             wx.saveImageToPhotosAlbum({
        //                 filePath: res.tempFilePath,
        //             })
        //         }
        //     })
        // }, 100))
        // wx.canvasGetImageData({
        //     canvasId: 'canvas',
        //     x: 0,
        //     y: 0,
        //     width: 100,
        //     height: 100,
        //     success(res) {
        //         console.log(res.width) // 100
        //         console.log(res.height) // 100
        //         console.log(res.data instanceof Uint8ClampedArray) // true
        //         console.log(res.data.length) // 100 * 100 * 4
        //     }
        // })

        wx.onUserCaptureScreen(function(res) {
            console.log('用户截屏了')
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
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})