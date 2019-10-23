import { createReducer } from 'typesafe-actions'

import initialAppState from 'containers/app/state'
import { initializeAppAsync } from 'containers/app/action'

export const appReducer = createReducer(initialAppState)
	.handleAction([initializeAppAsync.request, initializeAppAsync.failure], (state) => state.set('initialized', false))
	.handleAction([initializeAppAsync.success], (state) => state.set('initialized', true))

export default appReducer
export type AppState = ReturnType<typeof appReducer>
