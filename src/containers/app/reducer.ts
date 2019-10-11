import { createReducer } from 'typesafe-actions'

import initialState from 'containers/app/state'
import { initializeAsync } from 'containers/app/action'

export const authReducer = createReducer(initialState)
	.handleAction([initializeAsync.request, initializeAsync.failure], (state) => state.set('initialized', false))
	.handleAction([initializeAsync.success], (state) => state.set('initialized', true))

export default authReducer
export type AppState = ReturnType<typeof authReducer>
