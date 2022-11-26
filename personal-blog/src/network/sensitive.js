import request from './request'

//获取推荐列表
const getListN = () => {
  return request({
    url: 'sensitive/getlist'
  })
}

//添加敏感词
const addN = (arr) => {
  return request({
    url:'sensitive/add',
    method:"post",
    data:{
      data:arr
    }
  })
}




export const getList = getListN
export const add =  addN


