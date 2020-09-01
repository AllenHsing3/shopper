import {combineReducers} from 'redux'
import auth from './auth'
import alert from './alert'
import item from './item'

export default combineReducers({auth, alert, item})
