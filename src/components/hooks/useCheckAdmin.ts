import { checkAdmin } from '@/app/api/auth/auth.api'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

export default function useCheckAdmin() {
	const router = useRouter()
	const pathname = usePathname()
	const { data, error, isLoading, isFetching } = useQuery({
		queryKey: ['checkAdmin'],
		retry: 0,
		refetchOnWindowFocus: false,
		queryFn: () => checkAdmin(),

		onSuccess: (reponse) => {
			console.log('pathname', pathname)
			if (pathname === '/dashboard') {
				router.replace('/')
			}
		},
		onError: (error) => {
			console.log(error)
		},
	})

	return { data, isLoading, error }
}
