import React from 'react'
import { Route, Switch } from 'react-router-dom'

import SuspenseHomepage from 'containers/pages/homepage/loadable'
import Home from 'containers/pages/home/index'

const AppRoutes: React.SFC = () => (
	<Switch>
		<Route path="/" component={SuspenseHomepage} exact={true} />
		<Route path="/home" component={Home} exact={true} />
	</Switch>
)

export default AppRoutes
