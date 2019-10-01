import { Record } from 'immutable'

interface IAuthState {
	initialized: boolean
	loading: boolean
	error: string | null
}
const IInitialState = Record<IAuthState>({
	initialized: false,
	loading: false,
	error: null
})

const initialState = new IInitialState()

export default initialState
export type AuthState = typeof initialState
