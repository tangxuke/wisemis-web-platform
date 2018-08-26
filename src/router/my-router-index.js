
//招生管理
import shaosheng from './routes/shaosheng'
        
//前台业务
import qiantai from './routes/qiantai'
        
//教务管理
import jiaowu from './routes/jiaowu'
        
//人事管理
import renshi from './routes/renshi'
        
//物品管理
import wupin from './routes/wupin'
        
//财务管理
import caiwu from './routes/caiwu'
        
//微信应用
import weixin from './routes/weixin'
        
//报表中心
import reports from './routes/reports'
        
//系统设置
import settings from './routes/settings'
        
export default [...shaosheng,...qiantai,...jiaowu,...renshi,...wupin,...caiwu,...weixin,...reports,...settings]
