import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
function APP() {

    return (
        
        <ConfigProvider locale={zhCN}>
            <React.Suspense fallback={<div>加载。。。</div>}>
                <HashRouter>
                    <Switch>
                        <Redirect exact from="/" to="user" />
                        <Route path='/user' component={React.lazy(() => import('./pages/user/user'))} />
                        <Route path='/home' component={React.lazy(() => import('./pages/main/Home'))} />
                        <Route path='/home' component={React.lazy(() => import('./pages/user/Reg'))} />
                    </Switch>
                </HashRouter>
            </React.Suspense>
        </ConfigProvider>
          
    );
    
}
export default APP