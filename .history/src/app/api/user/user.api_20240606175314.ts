import { ForgetPassworResponse } from '@/types/auth.type'
import { UpdatePasswd, User } from '@/types/user.type'
import { HEADER } from '@/utils/constants'
import http from '@/utils/http'

export const updateUser = async (payload: FormData) =>
	await http.post<ForgetPassworResponse>('/user/', payload, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
			'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
			'Content-Type': 'multipart/form-data',
		},
	})

export const changePassword = async (payload: UpdatePasswd) =>
	await http.post<ForgetPassworResponse>('/user/passwd', payload, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
			'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
		},
	})
