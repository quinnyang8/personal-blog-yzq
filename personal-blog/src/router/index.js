import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { goVerify } from "../network/login";

Vue.use(VueRouter)


const router = new VueRouter({
    routes: routes,
    mode: 'history'
})


router.beforeEach((to, from, next) => {
  if (to.path == '/cms' || to.path == '/cms/publisharticle' || to.path == '/cms/EditArticle' || to.path == '/cms/photo' || to.path == '/cms/Recommend' || to.path == '/cms/leaveMessage' || to.path == '/cms/UpdateLog' || to.path == '/cms/Notice' || to.path == '/cms/commentMange' || to.path =='/cms/admin') {
        //如果本地没有token
        if (!sessionStorage.getItem("token")) {
            document.title = to.meta.title
            alert('对不起，您未登录')
            next('/login')
        } else {
            goVerify().then((data) => {
                // console.log(data);
                if (data.status == 200) {
                    next()
                    return
                } else {
                    alert('对不起，token异常')
                    next('/login')
                }

            }).catch((err) => {
                next('/login')
            })



        }

    }

    if (to.path != '/cms') {
        document.title = to.meta.title
        next()
    }

})


//解决重复点击
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router