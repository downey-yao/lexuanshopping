// pages/goods_list/index.js
import { request } from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';

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
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            },
        ],

        // 商品列表数据
        goodsList: []
    },

    // 接口要的参数
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },

    // 总页数 = 总条数 - 一页显示的条数
    // 商品列表总页数
    pageTotalNum: '',

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        this.QueryParams.cid = options.cid || ''
        this.QueryParams.query = options.query || ''

        this.getGoodsList()
    },

    // 获取商品列表数据
    async getGoodsList() {
        const res = await request({
            url: '/goods/search',
            data: this.QueryParams
        })
        console.log(res)

        // 总条数
        const total = res.total
            // 总页数
        this.pageTotalNum = Math.ceil(total / this.QueryParams.pagesize)

        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })

        // 请求完成，关闭下拉刷新动作，没有下拉刷新也不会报错
        wx.stopPullDownRefresh();
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

    // 页面上拉触底事件
    onReachBottom() {
        // console.log("asasms");

        if (this.QueryParams.pagenum > this.pageTotalNum) {
            // 说明没有更多数据了
            // console.log("没有更多数据了")
            wx.showToast({
                title: '没有更多数据了',
            })
        } else {
            // 还有数据
            // console.log("正在加载下一页")
            this.QueryParams.pagenum++
                this.getGoodsList()
        }
    },

    // 下来刷新事件
    onPullDownRefresh() {
        // 1. 重置商品列表
        this.setData({
            goodsList: []
        })

        // 2. 重置页码
        this.QueryParams.pagenum = 1

        // 3. 发起请求
        this.getGoodsList()
    }
})