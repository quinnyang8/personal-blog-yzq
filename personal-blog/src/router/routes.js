const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        meta: {
            title: 'home'
        },
        component: () => import('../views/home/Home')
    },
    {
        path: '/readarticle',
        meta: {
            title: 'Article'
        },
        component: () => import('../views/home/ReadArticle')
    },
    {
        path: '/about',
        meta: {
            title: 'about'
        },
        component: () => import('../views/about/About')
    },

    {

        path: '/leavemessage',
        meta: {
            title: 'leavemessage'
        },
        component: () => import('../views/leavemessage/LeaveMessage')
    },
    {

        path: '/introduce',
        meta: {
            title: 'introduce'
        },
        component: () => import('../views/introduce/Introduce')
    },
    {

        path: '/login',
        meta: {
            title: 'login'
        },
        component: () => import('../views/login/Login')
    },
    {

        path: '/photo',
        meta: {
            title: 'photo'
        },
        component: () => import('../views/home/homechild/rightmenu/Photo')
    },
    {

        path: '/cms',
        meta: {
            title: '后台管理系统'
        },
        component: () => import('../views/cms/Index'),
        children: [
            {
                // 发布文章
                path: 'publisharticle',
                meta: {
                    title: '后台管理系统-发布文章'
                },
                component: () => import('../views/cms/home/PublishArticle')
            },
            {
                // 编辑文章
                path: 'EditArticle',
                meta: {
                    title: '后台管理系统-编辑文章'
                },
                component: () => import('../views/cms/home/EditArticle')
            },
            {
                // 留言管理
                path: 'leaveMessage',
                meta: {
                    title: '后台管理系统-留言管理'
                },
                component: () => import('../views/cms/leavemessage/leaveMessage')
            },
            {
                // 个人图库
                path: 'photo',
                meta: {
                    title: '后台管理系统-个人图库'
                },
                component: () => import('../views/cms/home/Photo')
            },
            // 推荐阅读
            {
                path: 'Recommend',
                meta: {
                    title: '后台管理系统-推荐阅读'
                },
                component: () => import('../views/cms/home/Recommend')
            },
            //更新日志
            {
                path: 'UpdateLog',
                meta: {
                    title: '后台管理系统-更新日志'
                },
                component: () => import('../views/cms/about/UpdateLog')
            },
            {
                path: 'Notice',
                meta: {
                    title: '后台管理系统-公告管理'
                },
                component: () => import('../views/cms/about/Notice')
            },
            {
                path: 'commentMange',
                meta: {
                    title: '后台管理系统-评论管理'
                },
                component: () => import('../views/cms/comment/CommentMange')
            },
            {
                path: 'admin',
                meta: {
                    title: '后台管理系统-管理员'
                },
                component: () => import('../views/cms/admin/Admin')
            }
        ]
    },

    {
        path: '*',
        meta: {
            title: '404'
        },
        component: () => import('../views/404')

    }

]


export default routes