import { Record } from 'immutable'

interface _IAuthState {
	initialized: boolean
	loading: boolean
	error: string | null
}
const IInitialState = Record<_IAuthState>({
	initialized: false,
	loading: false,
	error: null
})

const initialState = new IInitialState()

export default initialState
export type AuthState = typeof initialState
