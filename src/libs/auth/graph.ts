import { gql } from '@apollo/client'

export const CREATE_ACCOUNT = gql`
	mutation CreateAccount($input: AccountReq!) {
		CreateAccount(input: $input) {
			AccountId
			Username
			Email
		}
	}
`
