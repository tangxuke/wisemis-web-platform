
//微信应用 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'weixin',
        path:'/weixin',
        component:layoutHeaderAside,
        redirect: { name: 'weixin-qunxx' },
        children:[
            {
                path:'qunxx',
                name:'weixin-qunxx',
                component:()=>import('@/pages/weixin/qunxx'),
                meta:{...meta,title:'群消息'}
            },
            
            {
                path:'zuoye',
                name:'weixin-zuoye',
                component:()=>import('@/pages/weixin/zuoye'),
                meta:{...meta,title:'作业'}
            },
            
            {
                path:'tongzhi',
                name:'weixin-tongzhi',
                component:()=>import('@/pages/weixin/tongzhi'),
                meta:{...meta,title:'通知'}
            },
            
            {
                path:'lspjxs',
                name:'weixin-lspjxs',
                component:()=>import('@/pages/weixin/lspjxs'),
                meta:{...meta,title:'老师评价学生'}
            },
            
            {
                path:'jzpjls',
                name:'weixin-jzpjls',
                component:()=>import('@/pages/weixin/jzpjls'),
                meta:{...meta,title:'家长评价老师'}
            },
            
            {
                path:'tsyjy',
                name:'weixin-tsyjy',
                component:()=>import('@/pages/weixin/tsyjy'),
                meta:{...meta,title:'投诉与建议'}
            },
            
            {
                path:'grxx',
                name:'weixin-grxx',
                component:()=>import('@/pages/weixin/grxx'),
                meta:{...meta,title:'个人消息'}
            },
            
            {
                path:'szpjmb',
                name:'weixin-szpjmb',
                component:()=>import('@/pages/weixin/szpjmb'),
                meta:{...meta,title:'设置评价模板'}
            },
            
            {
                path:'szpjwd',
                name:'weixin-szpjwd',
                component:()=>import('@/pages/weixin/szpjwd'),
                meta:{...meta,title:'设置评价维度'}
            },
            
            {
                path:'zypjmb',
                name:'weixin-zypjmb',
                component:()=>import('@/pages/weixin/zypjmb'),
                meta:{...meta,title:'作业评价模板'}
            },
            
            {
                path:'zypfgz',
                name:'weixin-zypfgz',
                component:()=>import('@/pages/weixin/zypfgz'),
                meta:{...meta,title:'作业评分规则'}
            },
            
            {
                path:'xxmbsz',
                name:'weixin-xxmbsz',
                component:()=>import('@/pages/weixin/xxmbsz'),
                meta:{...meta,title:'消息模板设置'}
            },
            
            {
                path:'xxtssz',
                name:'weixin-xxtssz',
                component:()=>import('@/pages/weixin/xxtssz'),
                meta:{...meta,title:'消息推送设置'}
            },
            
            {
                path:'szxxjs',
                name:'weixin-szxxjs',
                component:()=>import('@/pages/weixin/szxxjs'),
                meta:{...meta,title:'设置学校介绍'}
            },
            
            {
                path:'wssc',
                name:'weixin-wssc',
                component:()=>import('@/pages/weixin/wssc'),
                meta:{...meta,title:'网上商城'}
            },
            
            {
                path:'wxcdsz',
                name:'weixin-wxcdsz',
                component:()=>import('@/pages/weixin/wxcdsz'),
                meta:{...meta,title:'微信菜单设置'}
            },
             
        ]
    }
] 
       