import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import axios from '@/plugin/axios'
Vue.prototype.$axios = axios

//引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

//json-format
import JsonFormat from 'json-format'
Vue.prototype.$JsonFormat=JsonFormat

// flex.css
import 'flex.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import screenfull from 'screenfull'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
//import vueJsonTreeView from 'vue-json-tree-view'
//import i18n from './i18n'
//import util from '@/libs/util.js'
import store from '@/store/index'
import '@/assets/svg-icons'
import '@/wisemis-components'
import '@/components'



import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);


//import '@/mock'
//import pluginLog from '@/plugin/log'
//import pluginError from '@/plugin/error'
//import pluginImport from '@/plugin/import'
//import pluginExport from '@/plugin/export'
//import pluginOpen from '@/plugin/open'

Vue.config.debug = true;

// 菜单和路由设置
//import router from './router'
//import { menuHeader, menuAside } from '@/menu'
//import frameInRoutes from '@/router/my-router-index'
//import { frameInRoutes } from '@/router/routes'

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(contentmenu)
    //Vue.use(pluginLog)
    //Vue.use(pluginError)
    //Vue.use(pluginImport)
    //Vue.use(pluginExport)
    //Vue.use(pluginOpen)
    //Vue.use(vueJsonTreeView)

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV
Vue.prototype.$baseUrl = process.env.BASE_URL

window.myVue = new Vue({});

//等待异步任务完成
import CustomMethods from './wisemis-components/common-functions';
import CustomComponents from './wisemis-components/custom-components';
import CustomRouter from './router';

Promise.all([CustomMethods, CustomComponents, CustomRouter])
    .then(values => {
        var router = values[2].router;
        var frameInRoutes = values[2].customRoutes;
        window.myVue = new Vue({
            router,
            store,
            //i18n,
            render: h => h(App),
            created() {
                //获取用户菜单
                this.$store.commit('get-menu', this)
                    // 处理路由 得到每一级的路由设置
                this.getAllPageFromRoutes()
                    // 设置顶栏菜单
                    //this.$store.commit('d2adminMenuHeaderSet', menuHeader)
            },
            mounted() {
                // D2Admin 开发环境检查更新
                //util.checkUpdate(this)
                // 获取并记录用户 UA
                this.$store.commit('d2adminUaGet')
                    // 展示系统信息
                    //util.showInfo()
                    // 用户登陆后从数据库加载一系列的设置
                this.$store.commit('d2adminLoginSuccessLoad')
                    // 初始化全屏监听
                this.fullscreenListenerInit()


            },
            watch: {
                // 监听路由 控制侧边栏显示
                '$route.matched' (val) {
                    //const _side = menuAside.filter(menu => menu.path === val[0].path)
                    const _side = this.$store.state.d2admin.menuHeader.filter(menu => menu.path === val[0].path)
                    this.$store.commit('d2adminMenuAsideSet', _side.length > 0 ? _side[0].children : [])
                }
            },
            methods: {
                /**
                 * 初始化全屏监听
                 */
                fullscreenListenerInit() {
                    if (screenfull.enabled) {
                        screenfull.on('change', () => {
                            if (!screenfull.isFullscreen) {
                                this.$store.commit('d2adminFullScreenSet', false)
                            }
                        })
                    }
                },
                /**
                 * 处理路由 得到所有的页面
                 */
                getAllPageFromRoutes() {
                    const pool = []
                    const push = function(routes) {
                        routes.forEach(route => {
                            if (route.children) {
                                push(route.children)
                            } else {
                                const {
                                    meta,
                                    name,
                                    path
                                } = route
                                pool.push({
                                    meta,
                                    name,
                                    path
                                })
                            }
                        })
                    }
                    push(frameInRoutes)
                    this.$store.commit('d2adminPagePoolSet', pool)
                }
            }
        }).$mount('#app')

    })
    .catch(reason => {
        console.error('NG', reason);
    })