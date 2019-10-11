import { createAsyncAction } from 'typesafe-actions'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE } from 'containers/app/constant'

export interface IAppSignin {
	username: string
	password: string
}

export const initializeAsync = createAsyncAction(INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE)<
	undefined,
	undefined,
	undefined
>()
