import { createReducer } from 'typesafe-actions'

import initialState from 'libs/auth/state'
import { initializeAuthAsync, initializeSigninAsync } from 'libs/auth/action'
import { SIGNIN_FAILURE, SIGNIN_SUCCESS } from 'libs/auth/constant'

export const authReducer = createReducer(initialState)
	.handleAction([initializeAuthAsync.request, initializeAuthAsync.failure], (iState) =>
		iState.set('initialized', false)
	)
	.handleAction([initializeAuthAsync.success], (iState) => iState.set('initialized', true))
	.handleAction([initializeSigninAsync.request], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.contains(action.type)) {
			previousRunningOperations = previousRunningOperations.push(action.type)
		}

		return iState.set('loading', true).set('runningOperations', previousRunningOperations)
	})
	.handleAction([initializeSigninAsync.success], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (!previousRunningOperations.contains(SIGNIN_SUCCESS)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== SIGNIN_SUCCESS)
		}

		return iState
			.set('loading', false)
			.set('token', action.payload)
			.set('runningOperations', previousRunningOperations)
	})
	.handleAction([initializeSigninAsync.failure], (iState, action: any) => {
		let previousRunningOperations = iState.get('runningOperations')
		if (previousRunningOperations.contains(SIGNIN_FAILURE)) {
			previousRunningOperations = previousRunningOperations.filter((x) => x !== SIGNIN_FAILURE)
		}

		return iState
			.set('error', action.payload.message)
			.set('loading', false)
			.set('runningOperations', previousRunningOperations)
	})

export default authReducer
export type AuthState = ReturnType<typeof authReducer>
