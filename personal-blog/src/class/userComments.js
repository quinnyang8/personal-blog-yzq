// 设计用户评论的类

/*
userImg 用户头像
userName 用户昵称
commentCont  发表内容
commentPoint  发表的指向  （第一层回复指向为空，后指向所选择的回复对象）
articleId  文章id
ceId       层主对应的id


*/

import { replyByMain, replyByOther, getCommentListN, getOtherCommentListN, getUserImgListN, giveLikeN} from '../network/comment'

export class uerComments {
    constructor(articleId, userImg, userName, commentCont, commentPoint, ceID,isadmin) {
  
        this.sendData = {
            articleId,
            userImg,
            userName,
            commentCont,
            commentPoint,
            ceID,
            isadmin
        }
    }

    //层主发布评论
    sendComment(sendData) {
        
        return replyByMain(sendData)

    }

    //其他用户发表评论
    sendOtherComment(sendData){
        return replyByOther(sendData)
    }

    //获取评论列表
    getCommentList(sendData){
        return getCommentListN(sendData)
    }

    //获取其他用户评论信息
    getOtherCommentList(sendData){
        return getOtherCommentListN(sendData)
    }

    //获取用户图片列表数据
    getUserImgList(){
        return getUserImgListN()
    }

    //给文章点赞
    giveLike(sendData){
        return giveLikeN(sendData)
    }


}




