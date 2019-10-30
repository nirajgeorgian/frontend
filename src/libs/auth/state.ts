import { Record, List } from 'immutable'

interface IAuthState {
	initialized: boolean
	loading: boolean
	error: string | null
	token: string
	runningOperations: List<string>
}

const IInitialAuthState = Record<IAuthState>({
	initialized: false,
	loading: false,
	error: null,
	token: '',
	runningOperations: List([])
})

const initialAuthState = new IInitialAuthState()

export default initialAuthState
export type AuthState = typeof initialAuthState
