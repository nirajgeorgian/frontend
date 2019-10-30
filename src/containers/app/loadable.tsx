import React, { Suspense, lazy } from 'react'
import PageLoading from 'components/loading/page'

const LazyApp = lazy(() => import('containers/app/index'))
const SuspenseApp: React.FC = () => {
	return (
		<Suspense fallback={<PageLoading />}>
			<LazyApp />
		</Suspense>
	)
}

export default SuspenseApp
