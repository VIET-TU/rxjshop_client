'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { useState } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (_failureCount, error: any) => error.status !== 403 && error.status !== 401,
		},
	},
})

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default ReactQueryProvider
