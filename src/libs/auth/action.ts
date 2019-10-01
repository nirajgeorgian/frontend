import { createAsyncAction } from 'typesafe-actions'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE } from 'libs/auth/constant'

export interface IAuthSignin {
	username: string
	password: string
}

export const initializeAsync = createAsyncAction(INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE)<
	undefined,
	undefined,
	undefined
>()
