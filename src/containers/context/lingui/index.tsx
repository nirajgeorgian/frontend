import React, { useState, useEffect, useContext } from 'react'
import { I18nProvider } from '@lingui/react'
import { setupI18n } from '@lingui/core'
import AppContext from 'containers/context/app'

const initialCalalogs: { [index: string]: any } = {}
export const i18n = setupI18n()

const LinguiProvider: React.SFC = ({ children }) => {
	const [catalogs, setCatalogs] = useState(initialCalalogs)
	const { locale } = useContext(AppContext)

	useEffect(() => {
		import(`@lingui/loader!../../../locales/${locale}/messages.po`).then((catalog) => {
			setCatalogs((prevCatalogs) => {
				if (locale) {
					return {
						...prevCatalogs,
						[locale]: catalog
					}
				}
			})
		})
	}, [locale])

	if (locale) {
		i18n.load({
			[locale]: catalogs[locale]
		})
		i18n.activate(locale)
	}

	return (
		<I18nProvider i18n={i18n} language={locale || 'en'} catalogs={catalogs}>
			{children}
		</I18nProvider>
	)
}

export default LinguiProvider
