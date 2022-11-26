import request from './request'

//上传图片
const uploadimg_f = (data) => {
    return request(
        {
            url: 'uploadimg',
            method: 'post',
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' },
        }
    )
}


// 删除图片
const delimg_f = (imgurl)=>{
    return request(
        {
            url: 'delimg',
            method: 'post',
            data:{
                imgurl
            }
        }
    )

}


// 发布文章
const wz = (title, sort, content, imgUrl, text, markdownData) => {
    return request({
        url: 'fb',
        method: 'post',
        // 参数：标题   类型    内容   内容里的图片url   纯文本  markdown数据
        data: {
            title,
            sort,
            content,
            imgUrl,
            text,
          markdownData

        }
    })
}



export const fb = wz
export const uploadimg = uploadimg_f
export const delimg = delimg_f