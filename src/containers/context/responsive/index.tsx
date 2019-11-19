import React, { createContext, useState, useEffect } from 'react'

export interface IResponsiveProvider {
	isMobile: boolean
}
const ResponsiveContext = createContext<Partial<IResponsiveProvider>>({
	isMobile: false
})
const { Provider, Consumer } = ResponsiveContext

const ResponsiveProvider: React.SFC = ({ children }) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const [isMobile, setIsMobile] = useState(!(innerWidth > 767))

	useEffect(() => {
		const handleResize = () => {
			setInnerWidth(window.innerWidth)
			if (innerWidth > 767) {
				setIsMobile(false)
			} else {
				setIsMobile(true)
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [innerWidth, isMobile, setIsMobile])

	return <Provider value={{ isMobile }}>{children}</Provider>
}

export { ResponsiveProvider, Consumer as ResponsiveConsumer }
export default ResponsiveContext
