import request from './request'



// 层主级别的评论
const replyByMain_p = (conf) => {
    return request(
        {
            url: 'comment/replyByMain',
            method: 'post',
            data: conf
                
            
        }
    )

}


//层主下其他用户的评论
const replyByOther_p = (conf) => {
    return request({
        url:'comment/replyByMainor',
        method:'post',
        data:conf
    })
}


//获取评论列表
const getCommentListN_p = (id) => {
    return request({
        url:'comment/getCommentList',
        params:{
            articleId:id
        }
    })
}

//获取其他用户评论列表
const getOtherCommentList_p = (id)=>{
    return request({
        url:'comment/getOtherCommentList',
        params:{
            ceId:id
        }
    })
}

//获取用户头像列表
const getUserImgList_p = () => {
    return request({
        url:'comment/getUserImgList'
    })
}

//给文章点赞
const giveLike_p = (articleId) => {
    return request({
        url:'comment/giveLike',
        params:{
            articleId:articleId
        }
    })
}


//评论管理获取含有未回复的文章列表
const getAdminIsNoComList_p = () => {
  return request({
    url: 'comment/getAdminIsNoComList'
  })
}

//获取未回复的评论详情
const getNoComList_p = (id) => {
  return request({
    url: 'comment/getNoComList',
    params:{
      id
    }
  })
} 



export const replyByMain = replyByMain_p
export const replyByOther =  replyByOther_p
export const getCommentListN = getCommentListN_p
export const getOtherCommentListN = getOtherCommentList_p
export const getUserImgListN= getUserImgList_p
export const giveLikeN = giveLike_p
export const getAdminIsNoComList = getAdminIsNoComList_p
export const getNoComList = getNoComList_p