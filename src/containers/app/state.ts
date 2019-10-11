import { Record } from 'immutable'

interface IAppState {
	initialized: boolean
	loading: boolean
	error: string | null
}
const IInitialState = Record<IAppState>({
	initialized: false,
	loading: false,
	error: null
})

const initialState = new IInitialState()

export default initialState
export type AppState = typeof initialState
