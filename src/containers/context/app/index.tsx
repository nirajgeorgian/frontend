import React, { useState, useMemo, useEffect, ReactNode, createContext, SFC, ComponentClass } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Auth } from 'aws-amplify'

export interface IAppProviderProps extends RouteComponentProps {
	children: ReactNode
}
export interface IAppContext {
	isAuthenticated: boolean
	setAuthenticated: (token: boolean) => void
	locale: string
	setLocale: (locale: string) => void
}

const AppContext = createContext<Partial<IAppContext>>({
	locale: 'en'
})
const { Provider, Consumer } = AppContext

const AppProviderBase: SFC<IAppProviderProps> = ({ children }) => {
	const [locale, setLocale] = useState('en')
	const [isAuthenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		Auth.currentSession()
			.then(() => setAuthenticated(true))
			.catch(() => setAuthenticated(false))
	}, [])

	const value = useMemo(
		() => ({
			locale,
			isAuthenticated,
			setAuthenticated,
			setLocale
		}),
		[locale, isAuthenticated, setAuthenticated, setLocale]
	)

	return <Provider value={value}>{children}</Provider>
}

const withAppContext = <P extends IAppContext>(WrappedComponent: React.ComponentType<P>) => {
	return (props: Pick<P, Exclude<keyof P, keyof IAppContext>>) => (
		<Consumer>{(state) => <WrappedComponent {...(props as P)} {...state} />}</Consumer>
	)
}

const AppProviderWithHoc = compose<ComponentClass>(withRouter)(AppProviderBase)

export { AppProviderWithHoc as AppProvider, withAppContext, Consumer as AppConsumer }
export default AppContext
