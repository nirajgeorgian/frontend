import { routerActions } from 'connected-react-router/immutable'

import * as authActions from 'libs/auth/action'
import * as appActions from 'containers/app/action'

export default {
	app: appActions,
	auth: authActions,
	router: routerActions
}
