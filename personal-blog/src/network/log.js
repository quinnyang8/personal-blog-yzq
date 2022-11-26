import request from './request'

// 获取log列表
const getLogListN = () => {
    return request({
        url: 'log/getLogList',
    })
}

//添加log
const addLogN = (type,cont) => {
    return request({
        url:'log/addLog',
        method:'post',
        data:{
            type,
            cont
        }
    })
}

//添加个人介绍
const addIntroduceN = (cont) => {
    return request({
        url:'log/setIntroduction',
        method:'post',
        data:{
            cont
        }
    })
}


//获取个人介绍
const getIntroductionN = () => {
    return request({
        url: 'log/getIntroduction',
    })
}




export const getLogList = getLogListN
export const addLog = addLogN
export const addIntroduce = addIntroduceN
export const getIntroduction = getIntroductionN
