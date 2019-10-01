import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'

import store from 'store/index'
import { history } from 'store/rootReducer'
import App from 'containers/app/index'

import './index.less'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Router>
				<App />
			</Router>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
