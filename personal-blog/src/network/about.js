import request from './request'

// 获取关于界面数据
const about = () => {
    return request({
        url:'/getAboutData'
    })
}

export const getAboutData = about