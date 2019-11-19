import { routerActions } from 'connected-react-router/immutable'

import * as dashboardActions from 'libs/dashboard/action'
import * as appActions from 'containers/app/action'

export default {
	app: appActions,
	dashboard: dashboardActions,
	router: routerActions
}
