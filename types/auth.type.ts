import exp from 'constants'
import { Response } from './response.type'
import { User } from './user.type'

export type LoginInput = {
	email: string
	password: string
}

export type LoginResponse = Response & {
	data: {
		user: User
		accessToken: string
	}
}

export type VertifyEmailInput = Pick<LoginInput, 'email'>

export type VertifyEmailResponse = Response & {
	data: {
		otp: number
		email: string
	}
}

export type VertifyOtpInput = {
	email: string
	Otp: string
}

export type VertifyOtpResponse = Response & {
	data: string
}

export type SignUpInput = {
	email: string
	password: string
	firstName: string
	lastName: string
}

export type SingUpResponse = Response

export type ChangePasswordInput = {
	userId: string
	token: string
	password: string
}

export type ChangePasswordReposne = Response & {
	data: boolean
}

export type ForgetPasswordInput = {
	email: string
}

export type ForgetPassworResponse = Response & {
	data: boolean
}

export type checkAdminResponse = Response & {
	data: boolean
}

export type MeResponse = Response & {
	data: {
		data: User
	}
}
