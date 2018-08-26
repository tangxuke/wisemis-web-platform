
//教务管理 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'
        
const meta = { requiresAuth: true}
export default [
    {
        name:'jiaowu',
        path:'/jiaowu',
        component:layoutHeaderAside,
        redirect: { name: 'jiaowu-kcgl' },
        children:[
            {
                path:'kcgl',
                name:'jiaowu-kcgl',
                component:()=>import('@/pages/jiaowu/kcgl'),
                meta:{...meta,title:'课程管理'}
            },
            
            {
                path:'bjgl',
                name:'jiaowu-bjgl',
                component:()=>import('@/pages/jiaowu/bjgl'),
                meta:{...meta,title:'班级管理'}
            },
            
            {
                path:'pkgl',
                name:'jiaowu-pkgl',
                component:()=>import('@/pages/jiaowu/pkgl'),
                meta:{...meta,title:'排课管理'}
            },
            
            {
                path:'kbhdm',
                name:'jiaowu-kbhdm',
                component:()=>import('@/pages/jiaowu/kbhdm'),
                meta:{...meta,title:'课表和点名'}
            },
            
            {
                path:'bkgl',
                name:'jiaowu-bkgl',
                component:()=>import('@/pages/jiaowu/bkgl'),
                meta:{...meta,title:'补课管理'}
            },
            
            {
                path:'xgsdb',
                name:'jiaowu-xgsdb',
                component:()=>import('@/pages/jiaowu/xgsdb'),
                meta:{...meta,title:'学管师带班'}
            },
            
            {
                path:'ksgl',
                name:'jiaowu-ksgl',
                component:()=>import('@/pages/jiaowu/ksgl'),
                meta:{...meta,title:'考试管理'}
            },
            
            {
                path:'sbgxsz',
                name:'jiaowu-sbgxsz',
                component:()=>import('@/pages/jiaowu/sbgxsz'),
                meta:{...meta,title:'升班关系设置'}
            },
             
        ]
    }
] 
       