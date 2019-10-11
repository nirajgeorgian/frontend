import authEpics from 'libs/auth/epic'
import appEpics from 'containers/app/epic'
import { combineEpics } from 'redux-observable'

export const rootEpics = combineEpics(appEpics, authEpics)
export default rootEpics
