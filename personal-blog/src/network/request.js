import axios from 'axios'

import {baseIp} from '../allBase'

const request = function(config){
    const instance = axios.create({
        baseURL: baseIp,
        timeout: 6000,
        
    });

    // 拦截器
    instance.interceptors.request.use(info => { 
       
        let token = sessionStorage.getItem("token")
        if (token) {
            info.headers.authorization = token;   
        }

        return info }, err => { alert('网络请求失败') })
    instance.interceptors.response.use(res => { return res.data }, err => { return {'msg':'网络错误 error','status':400} })

    return instance(config)
}

export default request