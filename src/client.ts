import { InMemoryCache, ApolloClient, HttpLink } from '@apollo/client'

const { REACT_APP_CIRCLES_URI, NODE_ENV } = process.env
const GraphQLLink = REACT_APP_CIRCLES_URI ? REACT_APP_CIRCLES_URI : 'http://api.joincircles.co'

const client = new ApolloClient({
	link: new HttpLink({ uri: GraphQLLink }),
	cache: new InMemoryCache({
		addTypename: NODE_ENV === 'development' ? true : false
	}),
	connectToDevTools: true
})

export default client
