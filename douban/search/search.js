// douban/search/search.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        size: 20,
        movies: [],
        search: '',
        loading: false,
        hasMore: false
    },

    loadMore() {
        if (!this.data.hasMore) return
        this.setData({ loading: true })
        return app.douban.find('search', this.data.page++, this.data.size, this.data.search)
            .then(d => {
                if (d.subjects.length) {
                    this.setData({ movies: this.data.movies.concat(d.subjects), loading: false })
                } else {
                    this.setData({ hasMore: false, loading: false })
                }
            })
            .catch(e => {
                this.setData({ subtitle: '获取数据异常', loading: false })
                console.error(e)
            })
    },

    handleSearch(e) {
        if (!e.detail.value) return
        this.setData({ movies: [], page: 1 })
        this.setData({ hasMore: true, loading: true, search: e.detail.value })

        this.loadMore()
    },

    onReachBottom() {
        this.loadMore()
    }
})