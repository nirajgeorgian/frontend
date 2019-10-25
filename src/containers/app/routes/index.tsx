import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SuspenseHomepage from 'containers/pages/homepage/loadable'
import Home from 'containers/pages/home/index'
import Layout from 'antd/lib/layout'
import Dashboard from 'containers/pages/dashboard'

const AppRoutes: React.FC = () => (
	<Layout.Content>
		<Switch>
			<Route path="/" component={SuspenseHomepage} exact={true} />
			<Route path="/dashboard" component={Dashboard} exact={true} />
			<Route path="/home" component={Home} exact={true} />
		</Switch>
	</Layout.Content>
)

export default AppRoutes
