export type User = {
	id?: string
	createdAt?: Date
	updatedAt?: Date
	fullName: string
	email: string
	phone: string
	address: string
	avatar: File | string
}

export type UpdatePasswd = {
	currentPasswd: string
	newPasswd: string
	confirmPasswd: string
}
