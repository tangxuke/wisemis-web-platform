
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
                path:'new',
                name:'models-new',
                component:()=>import('@/pages/models/new'),
                meta:{...meta,title:'新建模型'}
            },
            {
                path:'edit',
                name:'models-edit',
                component:()=>import('@/pages/models/edit'),
                meta:{...meta,title:'编辑模型'}
            },
            {
                path:'fields',
                name:'models-fields',
                component:()=>import('@/pages/models/fields'),
                meta:{...meta,title:'模型字段列表'}
            },
            {
                path:'form-designer',
                name:'models-form-designer',
                component:()=>import('@/pages/models/form-designer'),
                meta:{...meta,title:'表单设计器'}
            }
        ]
    }
] 
       