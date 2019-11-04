import React from 'react'
import SignupForm from 'components/auth/signup'
import { Formik } from 'formik'
import { CREATE_ACCOUNT } from 'libs/auth/graph'
import { useMutation } from '@apollo/client'

const CreateAccount: React.FC = () => {
	const [createAccount] = useMutation(CREATE_ACCOUNT)
	return (
		<Formik
			initialValues={{}}
			onSubmit={(values) => {
				createAccount({ variables: { input: { ...values } } })
			}}
			render={SignupForm}
		/>
	)
}

export default CreateAccount
