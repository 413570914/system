import React, { Component } from 'react'
import Reg from './Reg'
import Login from './Login'
import { Route, Switch, Redirect} from 'react-router-dom';
import '../../assets/style/user.scss'
export default class user extends Component {
    render() {
        return (
            <>
                <div className="body">
                    <div className="main">
                        <React.Suspense fallback={<div>加载</div>}>
                            <Switch>
                                <Redirect from="/user" exact to="/user/login" />
                                <Route path="/user/login" component={Login} />
                                <Route path="/user/reg" component={Reg} />
                            </Switch>
                        </React.Suspense>
                    </div>
                </div>
            </>
        )
    }
}
