
//前台业务 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'qiantai',
        path:'/qiantai',
        component:layoutHeaderAside,
        redirect: { name: 'qiantai-xxybm' },
        children:[
            {
                path:'xxybm',
                name:'qiantai-xxybm',
                component:()=>import('@/pages/qiantai/xxybm'),
                meta:{...meta,title:'新学员报名'}
            },
            
            {
                path:'xyxxgl',
                name:'qiantai-xyxxgl',
                component:()=>import('@/pages/qiantai/xyxxgl'),
                meta:{...meta,title:'学员信息管理'}
            },
            
            {
                path:'shoufei',
                name:'qiantai-shoufei',
                component:()=>import('@/pages/qiantai/shoufei'),
                meta:{...meta,title:'收费'}
            },
            
            {
                path:'jiezhuan',
                name:'qiantai-jiezhuan',
                component:()=>import('@/pages/qiantai/jiezhuan'),
                meta:{...meta,title:'结转'}
            },
            
            {
                path:'tuifei',
                name:'qiantai-tuifei',
                component:()=>import('@/pages/qiantai/tuifei'),
                meta:{...meta,title:'退费'}
            },
            
            {
                path:'yzdd',
                name:'qiantai-yzdd',
                component:()=>import('@/pages/qiantai/yzdd'),
                meta:{...meta,title:'预制订单'}
            },
            
            {
                path:'jfgl',
                name:'qiantai-jfgl',
                component:()=>import('@/pages/qiantai/jfgl'),
                meta:{...meta,title:'积分管理'}
            },
            
            {
                path:'stgl',
                name:'qiantai-stgl',
                component:()=>import('@/pages/qiantai/stgl'),
                meta:{...meta,title:'试听管理'}
            },
            
            {
                path:'gggl',
                name:'qiantai-gggl',
                component:()=>import('@/pages/qiantai/gggl'),
                meta:{...meta,title:'公告管理'}
            },
            
            {
                path:'xyxxdr',
                name:'qiantai-xyxxdr',
                component:()=>import('@/pages/qiantai/xyxxdr'),
                meta:{...meta,title:'学员信息导入'}
            },
             
        ]
    }
] 
       