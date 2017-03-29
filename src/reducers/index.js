//import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
//import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'



const rootReducer = combineReducers({

  routing
})

export default rootReducer
