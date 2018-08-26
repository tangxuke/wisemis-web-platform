
//财务管理 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'caiwu',
        path:'/caiwu',
        component:layoutHeaderAside,
        redirect: { name: 'caiwu-szls' },
        children:[
            {
                path:'szls',
                name:'caiwu-szls',
                component:()=>import('@/pages/caiwu/szls'),
                meta:{...meta,title:'收支流水'}
            },
            
            {
                path:'zxzfdz',
                name:'caiwu-zxzfdz',
                component:()=>import('@/pages/caiwu/zxzfdz'),
                meta:{...meta,title:'在线支付对账'}
            },
            
            {
                path:'tjbb',
                name:'caiwu-tjbb',
                component:()=>import('@/pages/caiwu/tjbb'),
                meta:{...meta,title:'统计报表'}
            },
            
            {
                path:'sjwh',
                name:'caiwu-sjwh',
                component:()=>import('@/pages/caiwu/sjwh'),
                meta:{...meta,title:'数据维护'}
            },
            
            {
                path:'fpgl',
                name:'caiwu-fpgl',
                component:()=>import('@/pages/caiwu/fpgl'),
                meta:{...meta,title:'发票管理'}
            },
            
            {
                path:'dzfyql',
                name:'caiwu-dzfyql',
                component:()=>import('@/pages/caiwu/dzfyql'),
                meta:{...meta,title:'呆滞费用清理'}
            },
             
        ]
    }
] 
       