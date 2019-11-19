import { Reducer, AnyAction } from 'redux'
import { combineReducers } from 'redux-immutable'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router/immutable'

import dashboardReducer from 'libs/dashboard/reducer'

/*
 * connectRouter
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

/**
 * Creates the main reducer with the dynamically injected ones
 */
export const history = createBrowserHistory()
export const createRootReducer = (injectedReducers?: Reducer<any, AnyAction>) => {
	return combineReducers({
		router: connectRouter(history),
		dashboard: dashboardReducer,
		...injectedReducers
	})
}

export default createRootReducer()
