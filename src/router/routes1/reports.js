
//报表中心 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'reports',
        path:'/reports',
        component:layoutHeaderAside,
        redirect: { name: 'reports-zsfxbb' },
        children:[
            {
                path:'zsfxbb',
                name:'reports-zsfxbb',
                component:()=>import('@/pages/reports/zsfxbb'),
                meta:{...meta,title:'招生分析报表'}
            },
            
            {
                path:'xyfxbb',
                name:'reports-xyfxbb',
                component:()=>import('@/pages/reports/xyfxbb'),
                meta:{...meta,title:'学员分析报表'}
            },
            
            {
                path:'sfbb',
                name:'reports-sfbb',
                component:()=>import('@/pages/reports/sfbb'),
                meta:{...meta,title:'收费报表'}
            },
            
            {
                path:'kxbb',
                name:'reports-kxbb',
                component:()=>import('@/pages/reports/kxbb'),
                meta:{...meta,title:'课消报表'}
            },
            
            {
                path:'yjbb',
                name:'reports-yjbb',
                component:()=>import('@/pages/reports/yjbb'),
                meta:{...meta,title:'业绩报表'}
            },
            
            {
                path:'bjbb',
                name:'reports-bjbb',
                component:()=>import('@/pages/reports/bjbb'),
                meta:{...meta,title:'班级报表'}
            },
             
        ]
    }
] 
       