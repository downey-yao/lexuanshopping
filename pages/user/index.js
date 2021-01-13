// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        // 收藏的商品数量
        collectNums: 0
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 获取缓存中的用户信息
        const userInfo = wx.getStorageSync('USERINFO')
        const collect = wx.getStorageSync('COLLECT')

        this.setData({
            userInfo,
            collectNums: collect.length
        })
    },
})