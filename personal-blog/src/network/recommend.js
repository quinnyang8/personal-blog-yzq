import request from './request'

// 添加推荐阅读
const addRecommendN = (title,url) => {
    return request({
        url: 'recommend/addRecommend',
        method:'post',
        data:{
            title,
            url
        }
    })
}

//获取推荐列表
const getListN = () => {
    return request({
        url:'recommend/getList'
    })
}


//删除文章推荐列表
const delN = (list) => {
    return request({
        url:'recommend/del',
        method:'post',
        data:{
            list
        }
    })
}

export const addRecommend = addRecommendN
export const getList = getListN
export const del = delN

