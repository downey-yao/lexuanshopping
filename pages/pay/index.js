// pages/cart/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressInfo: {},
        cart: [],
        // 总价格
        totalPrice: 0,
        // 总数量
        totalNum: 0
    },

    onShow: function() {
        // 页面每次打开都会渲染
        const addressInfo = wx.getStorageSync("ADDRESS")
            // 获取购物车数据（就是加入购物车时的本地存储）
        let cart = wx.getStorageSync('CART') || []

        cart = cart.filter(v => v.checkout)

        /* 计算 总价格 总数量 */
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price
            totalNum += v.num
        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
            addressInfo
        })
    },

    /**
     * 点击支付按钮
     * 1. 先判断缓存中有没有token
     * 2. 没有token，就跳转到 授权界面获取token
     * 3. 有token 就正常向下执行，支付
     */
    handleOrderPay() {
        // 获取 token
        const token = wx.getStorageSync('TOKEN')
        if (!token) {
            return wx.navigateTo({
                url: '/pages/aut/index',
                success: (result) => {
                    console.log(result)
                }
            });
        }

        console.log("已经存在token");
        /**
         * 有 token 才能创建订单，现在是个人账号，不能完成以下 支付操作
         * 1. 创建订单 （拿到 订单编号）
         * 2. 预支付（拿到 返回的 pay 对象）
         * 3. 发起微信支付，将 pay 对象作为参数传递给 (wx.requestPayment) API即可
         * 4. 发起请求，查询后台订单状态
         * 5. 支付成功 跳转到订单页面 wx.navigateTo()
         */

    }
})