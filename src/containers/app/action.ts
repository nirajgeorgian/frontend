import { createAsyncAction } from 'typesafe-actions'
import { INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE } from 'containers/app/constant'

export const initializeAppAsync = createAsyncAction(INITIALIZE, INITIALIZE_SUCCESS, INITIALIZE_FAILURE)<
	boolean,
	boolean,
	boolean
>()
