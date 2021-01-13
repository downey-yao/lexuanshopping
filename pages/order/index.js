// pages/orde/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            },
            {
                id: 2,
                value: "待发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ],
    },

    // 点击tabs触发父组件的事件
    handleItemChange(e) {
        const index = e.detail

        let tabs = this.data.tabs
        tabs.forEach((v, i) =>
            i === index ? v.isActive = true : v.isActive = false
        )

        this.setData({
            tabs
        })
    },
    onShow(options) {
        // 获取当前的页面栈
        let pages = getCurrentPages();
        // 数组中最大的索引就是当前页面
        console.log(pages)
        let currentPage = pages[pages.length - 1]
        console.log(currentPage.options)

        const { type } = currentPage.options

        // 获取订单
        this.getOrders(type)
    },

    /**
     * TODO:获取订单的方法
     * 没有 token 值，请求不了历史订单
     */
    getOrders(type) {}
})