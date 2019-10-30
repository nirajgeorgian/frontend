import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SuspenseHomepage from 'containers/pages/home/index'
import Signin from 'containers/pages/auth/signin'
import Signup from 'containers/pages/auth/signup'
import Layout from 'antd/lib/layout'

const AppRoutes: React.FC = () => (
	<Layout.Content>
		<Switch>
			<Route path="/" component={SuspenseHomepage} exact={true} />
			<Route path="/signin" component={Signin} exact={true} />
			<Route path="/signup" component={Signup} exact={true} />
		</Switch>
	</Layout.Content>
)

export default AppRoutes
