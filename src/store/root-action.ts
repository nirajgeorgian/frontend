import { routerActions } from 'connected-react-router/immutable'

import * as authActions from 'libs/auth/action'
import * as dashboardActions from 'libs/dashboard/action'
import * as appActions from 'containers/app/action'

export default {
	app: appActions,
	auth: authActions,
	dashboard: dashboardActions,
	router: routerActions
}
