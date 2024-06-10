import { Response } from './response.type'

export type UpdateCartInput = {
	id: string
	quantity?: number
	incrementBy?: number
}

export type UpdateCartResponse = Response & {
	data: 'ok'
}

export type CountCartResponse = Response & {
	data: {
		count: number
	}
}
