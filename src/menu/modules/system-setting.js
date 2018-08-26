// layout
import layoutHeaderAside from '@/layout/header-aside'

//系统设置菜单
export default {
    path: '/system',
    title: '系统设置',
    icon: 'wrench',
    children: [
        {
            path: '/system/department',
            name:'system-department',
            icon:'users',
            title: '部门设置'
        },
        {
            path: '/system/classroom',
            name:'system-classroom',
            title: '教室设置'
        }
    ]
}