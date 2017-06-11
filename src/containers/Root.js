import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router, browserHistory } from 'react-router'

const Root = ({ store, history }) => (
    <Provider store={store}>
        <div>
            <Router history={browserHistory} routes={routes} />
            <DevTools />
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root