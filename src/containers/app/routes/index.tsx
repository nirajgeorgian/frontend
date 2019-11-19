import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthenticatedRoute from 'containers/app/routes/authenticatedRoute'
// import ProtectedRoute from 'containers/app/routes/protectedRoute'

import SuspenseHomepage from 'containers/pages/home'
import Layout from 'antd/lib/layout'
import Signin from 'containers/pages/auth/signin'
import Signup from 'containers/pages/auth/signup'
import AppContext from 'containers/context/app'

const AppRoutes: React.FC = () => {
	const { isAuthenticated } = useContext(AppContext)

	return (
		<Layout.Content>
			<Switch>
				<Route path="/" component={SuspenseHomepage} exact={true} />
				<AuthenticatedRoute isAuthenticated={isAuthenticated || false} path="/signin" component={Signin} exact={true} />
				<AuthenticatedRoute isAuthenticated={isAuthenticated || false} path="/signup" component={Signup} exact={true} />
			</Switch>
		</Layout.Content>
	)
}

export default AppRoutes
