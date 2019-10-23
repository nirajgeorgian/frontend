import React, { useState, useMemo, ReactNode, createContext, SFC, ComponentClass } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withApollo, WithApolloClient } from 'react-apollo'
import { compose } from 'redux'

export interface IAppProviderProps extends RouteComponentProps {
	children: ReactNode
}
export interface IAppContext {
	isAuthenticated: boolean
	setAuthenticated: (token: boolean) => void
	locale: string
	setLocale: (locale: string) => void
}
export interface IWithApolloClienProps {
	appContext: IAppContext
}

const TOKEN_NAME = 'adsflight-token'
const hasToken = (): boolean => {
	const token = localStorage.getItem(TOKEN_NAME)

	return !!token && token.length > 30
}

const AppContext = createContext<Partial<IAppContext>>({
	locale: 'en'
})
const { Provider, Consumer } = AppContext

const AppProviderBase: SFC<WithApolloClient<IAppProviderProps>> = ({ children, client }) => {
	const [locale, setLocale] = useState('en')
	const [isAuthenticated, setAuthenticated] = useState(hasToken())

	const value = useMemo(
		() => ({
			locale,
			isAuthenticated,
			setAuthenticated,
			setLocale,
			client
		}),
		[locale, isAuthenticated, setAuthenticated, setLocale, client]
	)

	return <Provider value={value}>{children}</Provider>
}

const withAppContext = <P extends IWithApolloClienProps>(WrappedComponent: React.ComponentType<P>) => {
	return (props: Pick<P, Exclude<keyof P, keyof IWithApolloClienProps>>) => (
		<AppContext.Consumer>{(state) => <WrappedComponent {...(props as P)} appContext={state} />}</AppContext.Consumer>
	)
}

const AppProviderWithHoc = compose<ComponentClass>(
	withApollo,
	withRouter
)(AppProviderBase)

export { AppProviderWithHoc as AppProvider, withAppContext, Consumer as AppConsumer }
export default AppContext
