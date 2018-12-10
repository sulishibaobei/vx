// timer/newTask/newTask.js
var pickerFile = require('../../tools/js/picker_datetime.js');
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '', //任务清单显示内容
        txtValue: '',
        detailList: true,
        tarToDay: new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes(),
        id: '',
        task: null
    },
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value,
            detailList: false
        })
    },
    bindTextAreaBlur: function(e) {
        this.setData({
            txtValue: e.detail.value
        })
    },
    formSubmit: function(e) {
        var that = this;
        var arr = [];
        var val = e.detail.value;
        console.log(val);
        if (!val.name) {
            wx.showToast({
                title: '请输入任务名称',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (!val.startTime) {
            wx.showToast({
                title: '请选择任务开始时间',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (!val.endTime) {
            wx.showToast({
                title: '请选择任务结束时间',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (util.compareDate(val.startTime, val.endTime)) {
            console.log(util.compareDate(val.startTime, val.endTime));
            wx.showToast({
                title: '任务开始时间要小于任务结束时间',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (!val.desc) {
            wx.showToast({
                title: '请输入备注',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        val.establishDate = this.data.tarToDay;
        val.status = false;
        wx.getStorage({
            key: 'task',
            success(res) {
                arr = res.data;
            },
            fail(error) {
                arr = [];
            },
            complete(res) {
                arr.push(val);
                that.setInfo(arr);
                wx.navigateTo({
                    url: '../list/list'
                })
            }
        })

    },
    setInfo: function(arr) {
        wx.setStorage({
            key: "task",
            data: arr
        })
    },
    formReset: function() {
        this.setData({
            startDate: '',
            endDate: '',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id;
        var that = this;
        if (options.id) {
            id = options.id;
            that.setData({
                id: id
            })
            wx.getStorage({
                key: 'task',
                success(res) {
                    that.setData({
                        task: res.data[that.data.id]
                    })
                },
                fail(error) {
                    console.log(error);
                }
            })
        }

        this.datetimePicker = new pickerFile.pickerDatetime({
            page: this,
            animation: 'slide',
            duration: 500,
        });

    },
    startTap: function(e) {
        this.datetimePicker.setPicker('startDate');
    },
    endTap: function() {
        this.datetimePicker.setPicker('endDate');
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