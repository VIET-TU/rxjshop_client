import { Response } from './response.type'

export interface IProduct {
	id: string
	createdAt: Date
	updatedAt: Date
	product_name: string
	product_thumbs: string[] | File[]
	product_description: string
	product_slug: string
	product_price: string
	product_quantity: number
	product_type: string
	product_ratingsAverage: number
	product_attributes: {
		brand: string
		size: string
		color: string
	}
	product_shop: {
		id: string
		fullname: string
	}
}

export type ProductCreateInput = {
	product_name: string
	product_thumbs: File[]
	product_description: string
	product_price: string
	product_quantity: number
	product_type: string
	brand: string
	size: string
	colour: string
}

export interface IProductCreateInput {
	product_name: string
	product_thumbs: File[]
	product_description: string
	product_price: string
	product_quantity: number
	product_type: string
	product_attributes: {
		brand: string
		size: string
		colour: string
	}
}

export type Products = IProduct[]

export type GetProductsResponse = Response & {
	data: IProduct[]
}

export type GetProductReponse = Response & {
	data: IProduct
}

export type ProductFilter = {
	keySearch?: string
	price?: string
	type?: string
	shop?: string
	ratingsAverage?: string
	limit?: string
	page?: string
}

export type CreateProductReponse = Response & {}
