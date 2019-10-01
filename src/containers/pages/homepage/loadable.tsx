import React, { Suspense, lazy } from 'react'
import PageLoading from 'components/loading/page'

const LazyHomepage = lazy(() => import('containers/pages/homepage/index'))
const SuspenseHomepage: React.FC = () => {
	return (
		<Suspense fallback={<PageLoading />}>
			<LazyHomepage />
		</Suspense>
	)
}

export default SuspenseHomepage
