import request from './request'

// 发布文章
const del = (id) => {
    return request({
        url: '/delArticleById',
        method: 'post',
        data: {
            id
        }
    })
}



export const delArticleById = del