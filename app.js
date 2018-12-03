//app.js
/**
 * 将请求封装成promise
 */
const wechat = require('./utils/wechat.js');
/**
 * 为了根据经纬度获取地址
 */
const baidu = require('./utils/baidu.js');
/**
 * doubanAPI模块
 */
const douban = require('./utils/douban.js')
App({
    wechat: wechat,
    baidu: baidu,
    douban: douban,
    data: {
        currentCity: "深圳"
    },
    onLaunch: function(options) {
        wechat
            .getLocation()
            .then(res => {
                const { latitude, longitude } = res
                return baidu.getCityName(latitude, longitude)
            })
            .then(name => {
                this.data.currentCity = name.replace('市', '')
                console.log(`currentCity : ${this.data.currentCity}`)
            })
            .catch(err => {
                this.data.currentCity = '北京'
                console.error(err)
            });

        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        //  wx.setStorageSync('logs', logs)
        // 登录
        wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            })
            // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    onError: function(error) {
        wx.setStorageSync('logs', error);
    },
    globalData: {
        userInfo: null
    }
})