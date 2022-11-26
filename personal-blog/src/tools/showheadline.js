// 管理各个页面的标题


const home = {
    headline: ["welcome", "基于vue与node构建的个人博客"],
}
const about = {
    headline: ["About", "永远喜欢小渚"]
}
const leavemessage = {
    headline: ["Leavemessage", "如果有好的建议欢迎留言"]
}
const introduce = {
    headline: ["Introduce", "在这里你可以看到整个博客项目介绍"]
}
const photo = {
    headline: ["Photo", "个人图库,欢迎访问"]
}






export function homeShow(){

    return this.$emit('componentIsLoad',home.headline)
        
}

export function aboutShow(){

    return this.$emit('componentIsLoad',about.headline)
        
}

export function leavemessageShow(){

    return this.$emit('componentIsLoad', leavemessage.headline)
        
}

export function introduceShow(){

    return this.$emit('componentIsLoad', introduce.headline)
        
}

export function photoShow() {

    return this.$emit('componentIsLoad', photo.headline)

}
