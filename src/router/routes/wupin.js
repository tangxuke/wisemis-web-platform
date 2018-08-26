
//物品管理 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'wupin',
        path:'/wupin',
        component:layoutHeaderAside,
        redirect: { name: 'wupin-cksz' },
        children:[
            {
                path:'cksz',
                name:'wupin-cksz',
                component:()=>import('@/pages/wupin/cksz'),
                meta:{...meta,title:'仓库设置'}
            },
            
            {
                path:'wpsz',
                name:'wupin-wpsz',
                component:()=>import('@/pages/wupin/wpsz'),
                meta:{...meta,title:'物品设置'}
            },
            
            {
                path:'kccx',
                name:'wupin-kccx',
                component:()=>import('@/pages/wupin/kccx'),
                meta:{...meta,title:'库存查询'}
            },
            
            {
                path:'jckgl',
                name:'wupin-jckgl',
                component:()=>import('@/pages/wupin/jckgl'),
                meta:{...meta,title:'进出库管理'}
            },
            
            {
                path:'jckcx',
                name:'wupin-jckcx',
                component:()=>import('@/pages/wupin/jckcx'),
                meta:{...meta,title:'进出库查询'}
            },
            
            {
                path:'kcbdb',
                name:'wupin-kcbdb',
                component:()=>import('@/pages/wupin/kcbdb'),
                meta:{...meta,title:'库存变动表'}
            },
             
        ]
    }
] 
       