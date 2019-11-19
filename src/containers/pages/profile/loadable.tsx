import React, { Suspense, lazy } from 'react'
import PageLoading from 'components/loading/page'

const LazyProfile = lazy(() => import('containers/pages/profile/index'))
const SuspenseProfile: React.FC = () => {
	return (
		<Suspense fallback={<PageLoading />}>
			<LazyProfile />
		</Suspense>
	)
}

export default SuspenseProfile
