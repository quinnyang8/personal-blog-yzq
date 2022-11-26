import request from './request'

// 文章列表数据
const list = (type, page, listNumber) => {
    return request({
        url:'home/getArticleList',
        params:{
            type,
            page,
            listNumber
        }
    })
}


//获取根据文章的文件路径获取文章信息

const articleData = (fileUrl) => {
    return request({
        url:'home/getArticleData',
        params:{
            fileUrl
        }
    })
}



export const getArticleList = list
export const getArticleData = articleData