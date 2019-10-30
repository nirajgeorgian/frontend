import { StateType, ActionType } from 'typesafe-actions'
import { Record } from 'immutable'

declare module 'typesafe-actions' {
	export type Store = StateType<typeof import('store/index').default>
	export type RootState = Record<StateType<typeof import('store/root-reducer').default>>
	export type RootAction = ActionType<typeof import('store/root-action').default>

	interface ITypes {
		RootAction: RootAction
	}
}
