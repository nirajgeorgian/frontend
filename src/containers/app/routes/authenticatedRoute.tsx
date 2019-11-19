import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export interface _IAuthenticatedRouteProps extends RouteProps {
	isAuthenticated: boolean
}

const AuthenticatedRoute: React.FC<_IAuthenticatedRouteProps> = ({ isAuthenticated, ...props }) => {
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />
	}

	return <Route {...props} />
}

export default AuthenticatedRoute
