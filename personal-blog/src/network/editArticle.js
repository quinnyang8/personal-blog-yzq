//编辑文章的网络模块
import request from './request'

//获取md文档
const getMdStr_T = (mdStr) => {
  return request({
    url:'editArticle/getMdStr',
    params:{
      mdStr
    }
  })
}


// 提交修改
const editArticle_T = (articleData) => {
  return request(
    {
      url: 'editArticle/change',
      method: 'post',
      data: articleData
    }
  )

}


export const editArticle = editArticle_T
export const getMdStr = getMdStr_T