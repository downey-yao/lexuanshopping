import { request } from '../../request/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航数组
        cateList: [],
        // 楼层数据
        floorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 发送异步请求获取轮播图
        // wx.request({
        //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //   // 请求成功之后的回调函数
        //   success: (res) => {
        //     // console.log(res.data.message)
        //     this.setData({
        //       swiperList: res.data.message
        //     })
        //   }
        // })
        // 优化异步请求
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },

    // 获取轮播图
    getSwiperList() {
        request({
                url: '/home/swiperdata'
            })
            .then((result) => {
                this.setData({
                    swiperList: result
                })
            })
    },

    // 获取导航数组
    getCateList() {
        request({
                url: '/home/catitems'
            })
            .then((result) => {
                this.setData({
                    cateList: result
                })
            })
    },

    // 获取楼层数组
    getFloorList() {
        request({
                url: '/home/floordata'
            })
            .then((result) => {
                this.setData({
                    floorList: result
                })
            })
    }
})