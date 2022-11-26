// 该模块用于使用localStorage向浏览器存储信息

class setLocalStorage {
    // 存储的名字，持续时间
    constructor(name, time) {
        this.name = name
        this.time = time
    }

    //获取当前的时间戳
    getNowTime() {
        return Date.now()
    }

    //获取目的时间戳
    getHopeTime() {
        return parseInt(this.getNowTime()) + parseInt(this.time)
    }

    //创建一条记录
    create(){
        localStorage.setItem(this.name, this.getHopeTime());
    }

    //判断当前存储的信息是否应当存在
    judge() {
        //查看是否有这样一条数据
        let result = localStorage.getItem(this.name)
        if (result) {
            //如果有，则判断是否应当过期
            let isLose = parseInt(this.getNowTime()) - parseInt(result)
            if (isLose < 0) {
                //还没有到达过期时间
                return { msg: '还未到达过期时间', status: 100 }
            } else {
                //已经到了过期时间，删除此localStorage
                localStorage.removeItem(this.name)
                return { msg: '已经到了过期时间，并已删除', status: 101 }
            }

        }

        //没有这条数据
        return {msg:'未找到该数据',status:102}
    }

}

export default setLocalStorage