// pages/logi/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 获取 用户信息
    handleGetUserInfo(e) {
        const { userInfo } = e.detail;
        // 本地存储
        wx.setStorageSync('USERINFO', userInfo)
            // 跳转
        wx.navigateBack({
            delta: 1
        })
    }
})