import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                lecturers: relayStylePagination()
            }
        }
    }
});

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
    cache
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
export default MyApp;
