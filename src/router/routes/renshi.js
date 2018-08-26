
//人事管理 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'renshi',
        path:'/renshi',
        component:layoutHeaderAside,
        redirect: { name: 'renshi-ygxxgl' },
        children:[
            {
                path:'ygxxgl',
                name:'renshi-ygxxgl',
                component:()=>import('@/pages/renshi/ygxxgl'),
                meta:{...meta,title:'员工信息管理'}
            },
            
            {
                path:'qxzgl',
                name:'renshi-qxzgl',
                component:()=>import('@/pages/renshi/qxzgl'),
                meta:{...meta,title:'权限组管理'}
            },
            
            {
                path:'gzgl',
                name:'renshi-gzgl',
                component:()=>import('@/pages/renshi/gzgl'),
                meta:{...meta,title:'工资管理'}
            },
             
        ]
    }
] 
       