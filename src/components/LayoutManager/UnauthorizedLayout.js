import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import endpoints from '../../shared/endpoints'

// Pages
import Login from '../Login'
import Register from '../Register'
const UnauthorizedLayout = () => (
    <div className="unauthorized-layout">
        {/*

         Imagine this could be a general layout for all unauthorized pages like
         the login page, forgot password, email-verified, etc...

         For this example project, we'll just have a Login Page

         */}
        <Switch>
            <Route path={endpoints.login} component={Login}/>
            <Route path={endpoints.register} component={Register}/>
            <Redirect to={endpoints.login}/>
        </Switch>
    </div>
)

export default UnauthorizedLayout