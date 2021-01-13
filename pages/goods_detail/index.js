// pages/goods_detail/index.js
import { request } from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品详情数据
        goodsObj: {},
        // 判断商品是否被收藏
        isCollect: false
    },

    // 商品对象
    goods_Info: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {

        let pages = getCurrentPages()
        let currentPage = pages[pages.length - 1]
        const options = currentPage.options

        const goods_id = options.goods_id

        console.log(goods_id)
            // 请求
        this.getGoodsDetail(goods_id)
    },

    // 获取商品详情数据
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({
            url: '/goods/detail',
            data: {
                goods_id: goods_id
            }
        })

        this.goods_Info = goodsObj

        // 1. 获取缓存中收藏的商品
        let collect = wx.getStorageSync('COLLECT') || []
            // 2. 判断当前商品是否为 在收藏的数组里
        let isCollect = collect.some(v => v.goods_id === this.goods_Info.goods_id)

        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                // iOS 不识别 .webp格式的文件
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            },
            isCollect
        })
    },

    // 点击轮播图预览 大图
    handlePreviewimage(e) {

        // console.log(e)
        // 1. 找到当前点击的 图片链接
        let currentUrl = e.currentTarget.dataset.url

        // 2. 构造要预览的图片数组
        let urls = this.goods_Info.pics.map(v => v.pics_mid)
        wx.previewImage({
            current: currentUrl,
            urls: urls
        })
    },

    // 点击加入购物车
    handleCartTap() {
        // console.log("111")

        // 1. 获取缓存中的购物车数组
        let cart = wx.getStorageSync('CART') || []
        console.log(cart)

        // 2. 判断商品对象是否存在 购物车中
        let index = cart.findIndex(v =>
            v.goods_id === this.goods_Info.goods_id)

        if (index === -1) {
            // 没有数据，第一次添加
            this.goods_Info.num = 1
                // 添加购物车选中状态
            this.goods_Info.checkout = true
            cart.push(this.goods_Info)
        } else {
            // 有数据，继续追加
            cart[index].num++
        }

        // 把购物车重新添加到缓存中
        wx.setStorageSync('CART', cart);

        // 提示用户弹窗
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        });
    },

    // 点击收藏图标
    handleCollect() {
        let isCollect = false
        let collect = wx.getStorageSync('COLLECT') || []

        let index = collect.findIndex(v => v.goods_id === this.goods_Info.goods_id)

        if (index !== -1) {
            // 已经收藏过，取消收藏
            collect.splice(index, 1)
            isCollect = false
            wx.showToast({
                title: '取消收藏',
                icon: 'success',
                duration: 1500,
                mask: true
            })
        } else {
            // 没有收藏过，点击收藏
            collect.push(this.goods_Info)
            isCollect = true

            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 1500,
                mask: true
            })
        }

        // 重新设置本地存储
        wx.setStorageSync('COLLECT', collect);

        this.setData({
            isCollect
        })
    }
})