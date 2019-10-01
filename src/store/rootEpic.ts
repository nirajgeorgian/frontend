import authEpics from 'libs/auth/epic'
import { combineEpics } from 'redux-observable'

export const rootEpics = combineEpics(authEpics)
export default rootEpics
