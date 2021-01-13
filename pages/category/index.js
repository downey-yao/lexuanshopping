// pages/category/index.js
import { request } from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧菜单栏数据
        leftMenuList: [],
        // 右侧分类数据
        rightCateList: [],
        // 当前点击菜单栏的索引
        currentIndex: 0,
        // 右侧滚动条到顶部的位置
        scrollTop: 0
    },

    // 接口返回的数据
    cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        // 获取本地存储的数据
        const cates = wx.getStorageSync('CATES');

        if (!cates) {
            // 本地存储中没有数据，发起请求数据
            this.getCatesList()
        } else {
            // 把本地数据存储给 cates
            this.cates = cates.data
                // 构造左侧的大菜单数据
            let leftMenuList = this.cates.map(v => v.cat_name)

            // 构造右侧的分类数据
            let rightCateList = this.cates[0].children
            this.setData({
                leftMenuList,
                rightCateList
            })
        }

    },

    // 获取商品分类类表数据
    async getCatesList() {
        // request({
        //         url: "/categories"
        //     })
        //     .then((result) => {
        //         // console.log(result)
        //         this.cates = result.data.message;

        //         // 将数据存储到本地中
        //         wx.setStorageSync('CATES', {
        //             time: Date.now(),
        //             data: this.cates
        //         });

        //         // 构造左侧的大菜单数据
        //         let leftMenuList = this.cates.map(v => v.cat_name)

        //         // 构造右侧的分类数据
        //         let rightCateList = this.cates[0].children
        //         this.setData({
        //             leftMenuList,
        //             rightCateList
        //         })
        //     })

        const result = await request({
            url: '/categories'
        })
        this.cates = result;

        // 将数据存储到本地中
        wx.setStorageSync('CATES', {
            time: Date.now(),
            data: this.cates
        });

        // 构造左侧的大菜单数据
        let leftMenuList = this.cates.map(v => v.cat_name)

        // 构造右侧的分类数据
        let rightCateList = this.cates[0].children
        this.setData({
            leftMenuList,
            rightCateList
        })
    },

    // 点击菜单栏触发的事件
    handleItemTap(e) {
        // 把点击的索引 赋值给 当前索引
        let { index } = e.currentTarget.dataset
        let rightCateList = this.cates[index].children
        this.setData({
            currentIndex: index,
            rightCateList,
            scrollTop: 0
        })
    }

})