import { CountCartResponse, UpdateCartInput, UpdateCartResponse } from '@/types/cart.type'
import { HEADER } from '@/utils/constants'
import http from '@/utils/http'

export const updateCart = ({ id, ...payload }: UpdateCartInput) =>
	http.put<UpdateCartResponse>(`carts/${id}`, payload, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
			'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
		},
	})

export const getCountInCart = () =>
	http.get<CountCartResponse>('/carts/count', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
			'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
		},
	})
