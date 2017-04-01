import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Main from '../components/Main'
//import { resetErrorMessage } from '../actions'

class App extends Component {
    render() {
        const {children, inputValue} = this.props
        return (
            <div>
                <Main value={inputValue}
                      onChange={this.handleChange}/>
                {children}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
})

export default connect(mapStateToProps, {
    //resetErrorMessage
})(App)
