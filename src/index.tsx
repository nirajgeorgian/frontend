import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { ConnectedRouter } from 'connected-react-router/immutable'

import store from 'store/index'
import { history } from 'store/root-reducer'
import App from 'containers/app/loadable'

import 'index.less'
import * as serviceWorker from 'service-worker'
import client from 'client'
import { ResponsiveProvider } from 'containers/context/responsive'

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Router>
					<ResponsiveProvider>
						<App />
					</ResponsiveProvider>
				</Router>
			</ConnectedRouter>
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
