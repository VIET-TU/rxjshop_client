import { me } from '@/app/api/auth/auth.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useCheckAuth() {
	const router = useRouter()
	const pathname = usePathname()
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['me'],
		queryFn: () => me(),
		retry: 0,
		refetchOnWindowFocus: false,
		onSuccess: (reponse) => {
			if (
				reponse.data.success &&
				(pathname === '/auth/login' ||
					pathname === '/auth/signup' ||
					pathname === '/auth/forgot-password' ||
					pathname === '/change-password')
			) {
				router.replace('/')
			}
		},
		onError: (error) => {
			console.log(error)
		},
	})
	return { data, isLoading, error, refetch }
}
