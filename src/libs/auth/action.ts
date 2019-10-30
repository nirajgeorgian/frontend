import { createAsyncAction } from 'typesafe-actions'
import {
	INITIALIZE,
	INITIALIZE_SUCCESS,
	INITIALIZE_FAILURE,
	SIGNIN_FAILURE,
	SIGNIN_SUCCESS,
	SIGNIN,
	SIGNOUT,
	SIGNOUT_FAILURE,
	SIGNOUT_SUCCESS
} from 'libs/auth/constant'

export const initializeAuthAsync = createAsyncAction(INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE)<
	undefined,
	undefined,
	undefined
>()

export interface IAuthSignin {
	email: string
	password: string
}
export const initializeSigninAsync = createAsyncAction(SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE)<
	IAuthSignin,
	string,
	Error
>()

export const initializeSignoutAsync = createAsyncAction(SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_FAILURE)<
	null,
	boolean,
	Error
>()
