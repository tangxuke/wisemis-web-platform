
//系统设置 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'settings',
        path:'/settings',
        component:layoutHeaderAside,
        redirect: { name: 'settings-bmsz' },
        children:[
            {
                path:'bmsz',
                name:'settings-bmsz',
                component:()=>import('@/pages/settings/bmsz'),
                meta:{...meta,title:'部门设置'}
            },
            
            {
                path:'jssz',
                name:'settings-jssz',
                component:()=>import('@/pages/settings/jssz'),
                meta:{...meta,title:'教室设置'}
            },
            
            {
                path:'sksjsz',
                name:'settings-sksjsz',
                component:()=>import('@/pages/settings/sksjsz'),
                meta:{...meta,title:'上课时间设置'}
            },
            
            {
                path:'jjrsz',
                name:'settings-jjrsz',
                component:()=>import('@/pages/settings/jjrsz'),
                meta:{...meta,title:'节假日设置'}
            },
            
            {
                path:'jccssz',
                name:'settings-jccssz',
                component:()=>import('@/pages/settings/jccssz'),
                meta:{...meta,title:'基础参数设置'}
            },
            
            {
                path:'zdysz',
                name:'settings-zdysz',
                component:()=>import('@/pages/settings/zdysz'),
                meta:{...meta,title:'自定义设置'}
            },
            
            {
                path:'gjsz',
                name:'settings-gjsz',
                component:()=>import('@/pages/settings/gjsz'),
                meta:{...meta,title:'高级设置'}
            },
            
            {
                path:'cwqjsz',
                name:'settings-cwqjsz',
                component:()=>import('@/pages/settings/cwqjsz'),
                meta:{...meta,title:'财务期间设置'}
            },
            
            {
                path:'yhqgl',
                name:'settings-yhqgl',
                component:()=>import('@/pages/settings/yhqgl'),
                meta:{...meta,title:'优惠券管理'}
            },
            
            {
                path:'dymbsz',
                name:'settings-dymbsz',
                component:()=>import('@/pages/settings/dymbsz'),
                meta:{...meta,title:'打印模板设置'}
            },
            
            {
                path:'ddsz',
                name:'settings-ddsz',
                component:()=>import('@/pages/settings/ddsz'),
                meta:{...meta,title:'钉钉设置'}
            },
            
            {
                path:'czrz',
                name:'settings-czrz',
                component:()=>import('@/pages/settings/czrz'),
                meta:{...meta,title:'操作日志'}
            },
            
            {
                path:'help',
                name:'settings-help',
                component:()=>import('@/pages/settings/help'),
                meta:{...meta,title:'系统帮助'}
            },
            
            {
                path:'support',
                name:'settings-support',
                component:()=>import('@/pages/settings/support'),
                meta:{...meta,title:'技术支持授权'}
            },
            
            {
                path:'about',
                name:'settings-about',
                component:()=>import('@/pages/settings/about'),
                meta:{...meta,title:'关于...'}
            },
             
        ]
    }
] 
       