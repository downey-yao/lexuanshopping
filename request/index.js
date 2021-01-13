// 请求的数量
let ajaxNum = 0

export const request = (params) => {

    ajaxNum++

    // 显示加载中图标
    wx.showLoading({
        title: '加载中',
        mask: true
    })

    const baseurl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseurl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            // 无论成功还是失败 都会调用
            complete: () => {
                ajaxNum--

                if (ajaxNum === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}