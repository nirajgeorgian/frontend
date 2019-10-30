import { Record } from 'immutable'

interface _IAppState {
	initialized: boolean
	loading: boolean
	error: string | null
}
const IInitialState = Record<_IAppState>({
	initialized: false,
	loading: false,
	error: null
})

export const initialAppState = new IInitialState()
export const initialAppRecord = Record({ app: initialAppState })
export type AppState = typeof initialAppState

export default initialAppState
