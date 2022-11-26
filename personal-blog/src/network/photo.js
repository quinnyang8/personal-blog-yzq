import request from './request'

// 获取相册列表数据
const getPhotoListN = () => {
    return request({
        url: 'getPhoto/getphotolist'
    })
}


//删除相册
const delPhotoN = (data) => {
    return request({
        url: 'getPhoto/delPhoto',
        params:data
    })
}


export const getPhotoList = getPhotoListN
export const delPhoto = delPhotoN

