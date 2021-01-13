// components/Tabs/Tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 接收父组件传递过来的数据
        tabs: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击tabs 触发事件
        handleItemTap(e) {
            // 点击的索引
            const index = e.currentTarget.dataset.index
                // console.log(index)

            // 触发 父组件的事件 自定义事件
            this.triggerEvent('tabsItemChange', index)
        }
    }
})