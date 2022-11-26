import request from './request'

//提交留言信息
const addLeaveMessageS = (emil, info) => {
    return request({
        url: 'leaveMessage/addLeaveMessage',
        method: 'post',
        data: {
            emil,
            info
        }
    })
}


//获取留言清单   参数：页码 ，一次找获取多少 ，类别
const getLeaveMessageListS = (page, itemNum, isreaded) => {
    return request({
        url: 'getLeaveMessage/list',
        params: {
            page,
            itemNum,
            isreaded
        }
    })
}


//阅读留言后修改阅读状态
const changeReadedS = (id) => {
    return request({
        url:'getLeaveMessage/read',
        params:{
            id
        }
    })
}


//删除留言
const delMessageByIdS = (id) => {
    return request({
        url: 'getLeaveMessage/delMessageById',
        params: {
            id
        }
    })
}


export const addLeaveMessage = addLeaveMessageS
export const getLeaveMessageList = getLeaveMessageListS
export const changeReaded = changeReadedS
export const delMessageById = delMessageByIdS