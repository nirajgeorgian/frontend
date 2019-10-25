import { createReducer } from 'typesafe-actions'

import initialState from 'libs/auth/state'
import { initializeAuthAsync } from 'libs/auth/action'

export const authReducer = createReducer(initialState)
	.handleAction([initializeAuthAsync.request, initializeAuthAsync.failure], (state) => state.set('initialized', false))
	.handleAction([initializeAuthAsync.success], (state) => state.set('initialized', true))

export default authReducer
export type AuthState = ReturnType<typeof authReducer>
