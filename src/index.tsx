import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'

import Amplify from 'aws-amplify'
import config from 'config'

import store from 'store/index'
import { history } from 'store/root-reducer'
import App from 'containers/app/loadable'

import 'index.less'
import * as serviceWorker from 'service-worker'
import { AppProvider } from 'containers/context/app'
import { ResponsiveProvider } from 'containers/context/responsive'
import LinguiProvider from 'containers/context/lingui'

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	Storage: {
		region: config.s3.REGION,
		bucket: config.s3.BUCKET,
		identityPoolId: config.cognito.IDENTITY_POOL_ID
	},
	API: {
		endpoints: [
			{
				name: 'notes',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			}
		]
	}
})

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Router>
				<AppProvider>
					<LinguiProvider>
						<ResponsiveProvider>
							<App />
						</ResponsiveProvider>
					</LinguiProvider>
				</AppProvider>
			</Router>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
