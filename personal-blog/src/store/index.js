import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)


let config = {

    state: {
        
        // 当前正在阅读的文章标题
        articleTitle:'',
        //当前正在阅读的文章文件名
        articleFileName:'',
        // 当前正在阅读的文章在数据库中的id
        articleId:'',

        //敏感词列表
        SensitiveList:[],

        // 当前登录的用户信息
        loadingUser:{}


    },

    mutations: {

        changeArticle(state,newArticle)
        {
            state.articleFileName = newArticle.FileName
            state.articleTitle = newArticle.Title
            state.articleId = newArticle.ArticleId
        },

        //获取当前登录的用户信息
        getloadingUserInfo(state,userinfo){
            state.loadingUser = userinfo
        },

        //获取敏感词
      getSensitive(state, Sensitive){
        state.SensitiveList = Sensitive
      }


    },

    getters: {

    }

}


const store = new Vuex.Store(config)


export default store