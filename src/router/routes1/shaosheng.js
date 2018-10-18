
//招生管理 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'shaosheng',
        path:'/shaosheng',
        component:layoutHeaderAside,
        redirect: { name: 'shaosheng-yxkhgl' },
        children:[
            {
                path:'yxkhgl',
                name:'shaosheng-yxkhgl',
                component:()=>import('@/pages/shaosheng/yxkhgl'),
                meta:{...meta,title:'意向客户管理'}
            },
            
            {
                path:'yycx',
                name:'shaosheng-yycx',
                component:()=>import('@/pages/shaosheng/yycx'),
                meta:{...meta,title:'邀约查询'}
            },
            
            {
                path:'khgjtj',
                name:'shaosheng-khgjtj',
                component:()=>import('@/pages/shaosheng/khgjtj'),
                meta:{...meta,title:'客户跟进统计'}
            },
            
            {
                path:'yxkhdr',
                name:'shaosheng-yxkhdr',
                component:()=>import('@/pages/shaosheng/yxkhdr'),
                meta:{...meta,title:'意向客户导入'}
            },
             
        ]
    }
] 
       