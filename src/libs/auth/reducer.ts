import { createReducer } from 'typesafe-actions'

import initialState from 'libs/auth/state'
import { initializeAsync } from 'libs/auth/action'

export const authReducer = createReducer(initialState)
	.handleAction([initializeAsync.request, initializeAsync.failure], (state) => state.set('initialized', false))
	.handleAction([initializeAsync.success], (state) => state.set('initialized', true))

export default authReducer
export type AuthState = ReturnType<typeof authReducer>
