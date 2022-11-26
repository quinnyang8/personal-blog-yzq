import request from './request'

// 发布公告
const addNotice = (title, duration, cont, markdownCont, imgUrl) => {
  return request({
    url: 'notice/addNewNotice',
    method: 'post',
    // 参数：标题   持续时间   内容   markdown数据  图片数组
    data: {
      title,
      duration,
      cont,
      markdownCont,
      imgUrl
    }
  })
}


//获取公告列表
const getNoticeListN = () => {
  return request({
    url: 'notice/getNoticeList',
  })
}

//删除公告
const delNoticeN = (arr) => {
  return request({
    url: 'notice/delNotice',
    method: 'post',
    data: {
      arr
    }
  })
}


//启用公告
const startNoticeN = (info) => {
  return request({
    url: 'notice/startNotice',
    method: 'post',
    data:info
  })
}

//停用公告
const stopNoticeN = () => {
  return request({
    url: 'notice/stopNotice',
    method: 'post',
  })
}


//首页获取公告
const gethomeNoticeN = () => {
  return request({
    url: 'notice/homeNotice',
  })
}



export const addNewNotice = addNotice
export const getNoticeList = getNoticeListN
export const delNotice = delNoticeN
export const startNotice = startNoticeN
export const gethomeNotice = gethomeNoticeN
export const stopNotice = stopNoticeN
