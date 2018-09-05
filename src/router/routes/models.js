
//教务管理 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'models',
        path:'/models',
        component:layoutHeaderAside,
        redirect: { name: 'models-list' },
        children:[
            {
                path:'list',
                name:'models-list',
                component:()=>import('@/pages/models/list'),
                meta:{...meta,title:'模型列表'}
            },
            {
                path:'fields',
                name:'models-fields',
                component:()=>import('@/pages/models/fields'),
                meta:{...meta,title:'模型字段列表'}
            }        
        ]
    }
] 
       