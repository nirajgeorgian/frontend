import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

import checkStore from 'utils/check-store'
import { createRootReducer } from 'store/root-reducer'
import { Reducer } from 'redux'

export const injectReducerFactory = (store: any, isValid: boolean) => {
	return (key: string, reducer: Reducer) => {
		if (!isValid) checkStore(store)

		invariant(
			isString(key) && !isEmpty(key) && isFunction(reducer),
			'(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
		)

		// Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
		if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return

		store.injectedReducers[key] = reducer // eslint-disable-line no-param-reassign
		store.replaceReducer(createRootReducer(store.injectedReducers))
	}
}

export default (store: any) => {
	checkStore(store)

	return {
		injectReducer: injectReducerFactory(store, true)
	}
}
