// pages/aut/index.js

import { login } from '../../utils/asyncWX'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 获取授权
    async handleGetUserInfo(e) {
        try {
            // 1. 获取用户信息
            const { encryptedData, rawData, iv, signature } = e.detail

            // 2. 获取用户登录后的code 值
            const { code } = await login()

            const loginParams = { encryptedData, rawData, iv, signature, code }

            // 3. 发送请求，获取用户token
            const res = request({
                url: '/users/wxlogin',
                method: 'POST',
                data: loginParams
            })

            /* 只有企业账号才能获取 token, 完成支付，现在是个人账户无法获取token, 因此无法支付，就此为止 */
            console.log(res.token) // undefined

            // 4. 把 token 放入缓存中，并且跳转回上一个页面
            // wx.setStorageSync('TOKEN', res.token)

            wx.navigateBack({
                delta: 1
            })


        } catch (error) {
            console.log(error)
        }
    }
})