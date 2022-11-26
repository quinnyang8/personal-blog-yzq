import request from './request'

// 请求登录信息
const login = (name,password) => {
    return request({
        url: 'login',
        method:'post',
        data:{
            name,
            password
        }

    })
}


//进入cms时的验证
const verify = () => {
    return request({
        url:'enterCms',
  
    })

}


export const getLogin = login
export const goVerify = verify
