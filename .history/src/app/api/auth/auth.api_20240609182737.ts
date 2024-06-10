
import { Products } from '@/types/product.type'
import { HEADER } from '@/utils/constants'
import http from '@/utils/http'
import axios from 'axios'
import { ChangePasswordInput, ChangePasswordReposne, ForgetPassworResponse, ForgetPasswordInput, LoginInput, LoginResponse, MeResponse, SignUpInput, SingUpResponse, VertifyEmailInput, VertifyEmailResponse, VertifyOtpInput, VertifyOtpResponse, checkAdminResponse } from '../../../../types/auth.type'

export const loginUser = (payload: LoginInput) => http.post<LoginResponse>('/auth/login', payload)

export const vertifyEmail = (payload: VertifyEmailInput) =>
	http.post<VertifyEmailResponse>('/auth/vertify-email', payload)

export const vertifyOtp = (payload: VertifyOtpInput) =>
	http.post<VertifyOtpResponse>('/auth/vertify-otp', payload)

export const signUp = (payload: SignUpInput) => http.post<SingUpResponse>('/auth/register', payload)

export const me = () =>
	http.get<MeResponse>('/auth/me', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
			'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
		},
	})

export const logout = async () =>
	await http.post(
		'/auth/logout',
		{
			payload: 'payload',
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
				'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
			},
		}
	)

export const changePassword = async (payload: ChangePasswordInput) =>
	await http.post<ChangePasswordReposne>('/auth/change-password', payload, {
		headers: {
			'Content-Type': 'application/json',
		},
	})

export const forgetPassowrd = async (payload: ForgetPasswordInput) =>
	await http.post<ForgetPassworResponse>('/auth/forget-password', payload, {
		headers: {
			'Content-Type': 'application/json',
		},
	})

export const checkAdmin = async () => {
	await http.get<checkAdminResponse>('/auth/check-admin', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
			'x-client-id': localStorage.getItem(HEADER.CLIENT_ID),
		},
	})
}
