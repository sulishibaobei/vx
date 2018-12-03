const app = getApp()
Page({
    data: {
        movies: [],
        name: 'Douban Movie',
        version: '0.1.0',
        loading: true
    },
    onLoad: function() {
        var that = this;
        this.getCache()
            .then(cache => {
                if (cache) {
                    return this.setData({ movies: cache.movies, loading: false })
                }
                app.douban.find('coming_soon', 1, 3)
                    .then(d => {
                        this.setData({ movies: d.subjects, loading: false })
                        return app.wechat.setStorage('last_splash_data', {
                            movies: d.subjects,
                            expires: Date.now() + 1 * 24 * 60 * 60 * 1000
                        })
                    })
                    .then(() => console.log('storage last splash data'))
            })
    },
    getCache() {
        return new Promise(resolve => {
            app.wechat.getStorage('last_splash_data')
                .then(res => {
                    const { movies, expires } = res.data
                        // 有缓存，判断是否过期
                    if (movies && expires > Date.now()) {
                        return resolve(res.data)
                    }
                    // 已经过期
                    console.log('uncached')
                    return resolve(null)
                })
                .catch(e => resolve(null))
        })
    },
    startExperience: function() {
        wx.navigateTo({
            url: '/douban/board/board'
        })
    }
})