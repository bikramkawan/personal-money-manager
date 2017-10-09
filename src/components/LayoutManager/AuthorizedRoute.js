import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import endpoints from '../../shared/endpoints'
class AuthorizedRoute extends React.Component {

    render() {
        let {component:Component, pending, logged, ...rest} = this.props
        return (
            <Route {...rest} render={props => {
                if (pending) return <div>Loading...</div>
                return logged
                    ? <Component {...props} />
                    : <Redirect to={endpoints.login}/>
            }}/>
        )
    }
}


function mapStateToProps(state) {
    const {user} = state;
    return {
        logged: true
    }


}
export default connect(mapStateToProps, null)(AuthorizedRoute)

