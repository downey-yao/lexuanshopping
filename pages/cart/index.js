// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWX'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressInfo: {},
        cart: [],
        allCheckout: false,
        // 总价格
        totalPrice: 0,
        // 总数量
        totalNum: 0
    },

    onShow: function() {
        // 页面每次打开都会渲染
        const addressInfo = wx.getStorageSync("ADDRESS")
            // 获取购物车数据（就是加入购物车时的本地存储）
        const cart = wx.getStorageSync('CART') || []


        this.setCart(cart)
        this.setData({
            addressInfo
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    // 获取收货地址
    async handleChooseAdress() {
        // // 1. 获取 用户权限状态
        // wx.getSetting({
        //     success: (result) => {
        //         // 2. 获取权限布尔值
        //         const scopeAddress = result.authSetting["scope.address"]
        //         console.log(scopeAddress)
        //             // 3. 确定状态, 发起用户地址请求
        //         if (scopeAddress === true || scopeAddress === undefined) {
        //             wx.chooseAddress({
        //                 success: (result1) => {
        //                     console.log(result1)
        //                 }
        //             });
        //         } else {
        //             // 4. 用户曾经拒绝过授予权限，诱导用户手动打开授权页面
        //             wx.openSetting({
        //                 success: (result2) => {
        //                     // 调用 选择收货地址代码
        //                     wx.chooseAddress({
        //                         success: (result3) => {
        //                             console.log(result3)
        //                         }
        //                     });

        //                 },
        //                 fail: () => {},
        //                 complete: () => {}
        //             });
        //         }
        //     },
        //     fail: () => {},
        //     complete: () => {}
        // });

        // wx.chooseAddress({
        //     success: (result) => {
        //         console.log(result)
        //     },
        //     fail: () => {},
        //     complete: () => {}
        // });

        /* async 封装以上 promise 代码 */

        try {
            // 1. 获取用户状态
            const res1 = await getSetting()
            const scopeAddress = res1.authSetting["scope.address"]

            if (scopeAddress === false) {
                // 2. 用户曾经拒绝过授予权限，诱导用户手动打开授权页面
                await openSetting()
            }

            // 3. 调起用户收货地址
            const address = await chooseAddress()

            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo

            // 4. 将地址 存储到 本地缓存中
            wx.setStorageSync('ADDRESS', address);
        } catch (error) {
            console.log(error)
        }

    },

    // 修改单个复选框的状态
    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id
        console.log(goods_id);

        let { cart } = this.data
            // 找到修改对象的 index
        let index = cart.findIndex(v => v.goods_id === goods_id)
            // 修改商品选中的状态
        cart[index].checkout = !cart[index].checkout

        // 调用存储数据
        this.setCart(cart)

    },

    // 定义一个设置 商品状态和总价格，总数量的方法
    setCart(cart) {

        // 计算全选按钮
        // every数组方法
        // 遍历数组，回调函数中全部为true，才为true,否则为 false
        // 数组为空是，也返回 true
        const allCheckout = cart.length ? cart.every(v => v.checkout) : false

        /* 计算 总价格 总数量 */
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            if (v.checkout) {
                totalPrice += v.num * v.goods_price
                totalNum += v.num
            }
        })
        this.setData({
            cart,
            allCheckout,
            totalPrice,
            totalNum
        })

        // 修改本地存储
        wx.setStorageSync('CART', cart);
    },

    // 点击全选 实现的功能
    handleItemAllChecked() {
        let { cart, allCheckout } = this.data

        allCheckout = !allCheckout

        cart.forEach(v => v.checkout = allCheckout)

        this.setCart(cart)
    },

    // 点击 + - 号，增减商品
    async handleItemNumEdit(e) {

        // 1. 获取传递过来的参数
        const { id, operation } = e.currentTarget.dataset
            // console.log(id, operation)

        // 2. 获取购物车数组
        let { cart } = this.data

        // 3. 找到对应的商品索引
        let index = cart.findIndex(v => v.goods_id === id)

        /* 处理商品数量为 1 的情况 */
        if (cart[index].num === 1 && operation === -1) {
            // 请求模态框
            const res = await showModal({ content: "确定要删除该商品吗？" })
            if (res.confirm) {
                // 删除该商品
                cart.splice(index, 1)
                this.setCart(cart)
            }
        } else {
            // 4. 根据索引 对商品数量进行修改
            cart[index].num += operation

            // 5. 修改 data的数据和 本地存储
            this.setCart(cart)
        }
    },

    /* 点击结算功能 */
    handlePay() {
        const { addressInfo, totalNum } = this.data

        // 没有地址
        if (!addressInfo) {
            return showToast({ title: "您还没选择收货地址！" })
        }

        // 没有勾选商品
        if (totalNum === 0) {
            return showToast({ title: "您还没选择支付商品！" })
        }

        // 跳转到支付页面
        wx.navigateTo({
            url: '/pages/pay/index'
        })
    }
})