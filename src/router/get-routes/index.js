import axios from '../../plugin/axios';
import Vue from 'vue';

//微信应用 路由定义
// layout
import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true,keepAlive: true }

/**
 * 返回菜单列表（同时构造路由）
 * @returns {Promise}
 */
function GetRoutes() {
    return axios.get('/menus/menu-list')
        .then(value => {
            if (value.success) {
                var customRoutes = Array.from(value.result).map(item => {
                    return formatMenu(item);
                });

                var routes = [{
                    path: '/',
                    redirect: { name: 'index' },
                    component: layoutHeaderAside,
                    children: [
                        {
                            path: 'index',
                            name: 'index',
                            meta: { requiresAuth: true, title: '首页' },
                            component: () => import('@/pages/index')
                        }
                    ]
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/pages/login')
                },
                ...customRoutes,
                {
                    path: '*',
                    component: () => import('@/pages/error-page-404')
                }
                ];

                return Promise.resolve({ routes, customRoutes });

            } else {
                console.log(value.message);
                return Promise.reject(value.message);
            }
        })
        .catch(reason => {
            console.log(reason.message);
            return Promise.reject(reason.message);
        });
}

/**
 * 格式化菜单项
 * @param {{id: number,name: string,title:string,path:string,icon:string,parentid:number,orderid:number,disable: boolean,params:string,children:[id: number,name: string,title:string,path:string,icon:string,parentid:number,orderid:number,disable: boolean]}} item 菜单项 
 */
function formatMenu(item) {
    var node = {
        name: item.name,
        path: item.path || '/404',
        filepath: item.path,
        render: item.render_code,
        component: null,
        redirect: null,
        meta: { ...meta, title: item.title }
    };
    if (item.params) {
        var params = item.params.split(',').map(item => {
            return ':' + item;
        }).join('/');
        node.path = item.path + '/' + params;
    };
    if (item.children) {
        node.component = layoutHeaderAside;
        node.children = [];
        item.children.map(e => {
            return formatMenu(e);
        }).forEach(e1 => {
            node.children.push(e1);
        })
        node.redirect = { name: node.children[0].name }
    } else {
        if (node.render) {
            node.component = {
                render: new Function('h', node.render)
            };
        } else {
            node.component = () => import('@/pages' + node.filepath);
        }
    }
    return node;
}

//component:()=>import('@/pages/weixin/qunxx'),
//redirect: { name: 'weixin-qunxx' }
//meta:{...meta,title:'群消息'}
var result = GetRoutes()
    .then(res => {
        return Promise.resolve(res);
    });

export default result;
